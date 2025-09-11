import type { Plugin, ResolvedConfig as ViteConfig } from 'vite'
import type { Options as EnvOptions } from '@babel/preset-env'
import { OutputChunk, Plugin as RollupPlugin } from 'rollup'
import commonJS from '@rollup/plugin-commonjs'
import dedent from 'dedent'
import babel from '@babel/core'
import chalk from 'chalk'
import { KnownPolyfill, knownPolyfills } from './polyfills'

/** Plugin configuration */
type PluginConfig = {
  /** Define which browsers must be supported */
  targets?: EnvOptions['targets']
  /** Define which polyfills to load from Polyfill.io */
  polyfills?: KnownPolyfill[]
  /** Use inlined `core-js@3` modules instead of Polyfill.io */
  corejs?: boolean
  /** Disable browserslint configuration */
  ignoreBrowserslistConfig?: boolean
  /**
   * The JS version your legacy bundle is expecting. Set this as low as possible,
   * but keep in mind which JS features your code needs.
   *
   * You can use https://kangax.github.io/compat-table/es2016plus/
   * to know which JS version has the features your bundle needs.
   *
   * @default viteConfig.esbuild.target || "es2020"
   */
  ecmaVersion?: string
}

export default (config: PluginConfig = {}): Plugin => {
  return {
    name: 'vite:legacy',
    apply: 'build',
    // Ensure this plugin runs before vite:html
    enforce: 'pre',
    configResolved(viteConfig) {
      let entryChunks: OutputChunk[]
      let legacyChunks = new Map<OutputChunk, OutputChunk>()

      this.generateBundle = async function (_, bundle) {
        entryChunks = Object.values(bundle).filter(
          asset => asset.type == 'chunk' && asset.isEntry
        ) as OutputChunk[]

        viteConfig.logger.info(chalk.cyan('creating legacy bundle...'))
        for (const entryChunk of entryChunks) {
          const legacyChunk = await createLegacyChunk(
            entryChunk,
            config,
            viteConfig
          )
          bundle[legacyChunk.fileName] = legacyChunk
          legacyChunks.set(entryChunk, legacyChunk)
        }
      }

      const target = resolveTarget(config, viteConfig)
      const renderScript = createScriptFactory(target, config)
      const getBasePath = (fileName: string) => viteConfig.base + fileName

      this.transformIndexHtml = html =>
        html.replace(
          /<script type="module" src="([^"]+)"><\/script>/g,
          (match, moduleId) => {
            const entryChunk = entryChunks.find(
              entryChunk => moduleId == getBasePath(entryChunk.fileName)
            )
            const legacyChunk = entryChunk && legacyChunks.get(entryChunk)
            return legacyChunk
              ? renderScript(
                  moduleId,
                  getBasePath(legacyChunk.fileName),
                  !config.corejs &&
                    /\bregeneratorRuntime\b/.test(legacyChunk.code)
                )
              : match
          }
        )
    },
  }
}

const regeneratorUrl = 'https://cdn.jsdelivr.net/npm/regenerator-runtime@0.13.7'

// Only es2018+ are tested since the `script.noModule` check
// is enough for earlier ES targets.
const syntaxTests: { [target: string]: string } = {
  // Spread operator, dot-all regexp, async generator
  es2018: 'void ({...{}}, /0/s, async function*(){})',
  // Optional catch binding
  es2019: 'try{} catch{}',
  // Optional chaining
  es2020: '0?.$',
}

const getBabelEnv = ({
  targets = 'defaults',
  ignoreBrowserslistConfig,
  corejs,
}: PluginConfig): EnvOptions => ({
  bugfixes: true,
  useBuiltIns: corejs && 'usage',
  corejs: corejs ? 3 : undefined,
  targets,
  ignoreBrowserslistConfig,
})

/**
 * The script factory returns a script element that loads the modern bundle
 * when syntax requirements are met, else the legacy bundle is loaded.
 */
function createScriptFactory(target: string, config: PluginConfig) {
  const polyfills: string[] = (config.polyfills || [])
    .filter(name => {
      if (!knownPolyfills.includes(name)) {
        throw Error(`Unknown polyfill: "${name}"`)
      }
      return true
    })
    .sort()

  // Include polyfills for the expected JavaScript version.
  if (!config.corejs) {
    const targetYear = parseTargetYear(target)
    for (let year = Math.min(targetYear, 2019); year >= 2015; --year) {
      polyfills.unshift('es' + year)
    }
  }

  // Polyfills are only loaded for the legacy bundle.
  const polyfillHost = 'https://polyfill.io/v3/polyfill.min.js?version=3.53.1'
  const polyfillScript =
    polyfills.length > 0 &&
    `load('${polyfillHost}&features=${polyfills.join(',')}')`

  // The modern bundle is *not* loaded when its JavaScript version is unsupported.
  const syntaxTest = syntaxTests[target]

  // The modern bundle is *not* loaded when import/export syntax is unsupported.
  const moduleTest = 'script.noModule.$'

  return (
    modernBundleId: string,
    legacyBundleId: string,
    needsRegenerator: boolean
  ) => dedent`
    <script>
      (function() {
        var script = document.createElement('script')
        function load(src, type) {
          var s = script.cloneNode()
          if (type) s.type = type
          s.src = src
          document.head.appendChild(s)
        }
        try {
          ${joinLines(
            moduleTest,
            syntaxTest && `eval('${syntaxTest}')`,
            `load('${modernBundleId}', 'module')`
          )}
        } catch(e) {
          ${joinLines(
            polyfillScript,
            needsRegenerator && `load('${regeneratorUrl}')`,
            `load('${legacyBundleId}')`
          )}
        }
      })()
    </script>
  `
}

function joinLines(...lines: (string | false)[]) {
  return lines.filter(Boolean).join('\n')
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

function resolveTarget(config: PluginConfig, viteConfig: ViteConfig): string {
  let result = config.ecmaVersion
  if (!result) {
    let { target } = viteConfig.build
    if (!target) {
      target =
        typeof viteConfig.esbuild !== 'function' &&
        (viteConfig.esbuild || {}).target!
    }
    if (target) {
      result = toArray(target as string).find(value => /^es\d+$/i.test(value))
    }
  }
  if (result && /^es\d+$/i.test(result)) {
    return result.toLowerCase()
  }
  return 'es2020'
}

/** Convert `esbuildTarget` to a version year (eg: "es6" ➜ 2015). */
function parseTargetYear(target: string) {
  if (target == 'es5' || target == 'esnext') {
    throw Error('[vite-legacy] Unsupported "esbuildTarget" value: ${target}')
  }
  const version = Number(/\d+/.exec(target)![0])
  return version + (version < 2000 ? 2009 : 0)
}

async function createLegacyChunk(
  mainChunk: OutputChunk,
  config: PluginConfig,
  viteConfig: ViteConfig
): Promise<OutputChunk> {
  const viteBuild = viteConfig.build

  // Transform the modern bundle into a dinosaur.
  const transformed = await babel.transformAsync(mainChunk.code, {
    configFile: false,
    inputSourceMap: mainChunk.map ?? undefined,
    sourceMaps: viteBuild.sourcemap,
    presets: [[require('@babel/preset-env'), getBabelEnv(config)]],
    plugins: !config.corejs
      ? [require('@babel/plugin-transform-regenerator')]
      : null,
  })

  const { code, map } = transformed || {}
  if (!code) {
    throw Error('[vite-plugin-legacy] Failed to transform modern bundle')
  }

  const legacyPath = mainChunk.fileName.replace(/\.js$/, '.legacy.js')
  const legacyPlugins: RollupPlugin[] = []

  // core-js imports are CommonJS modules.
  if (config.corejs)
    legacyPlugins.push(
      commonJS({
        sourceMap: !!viteBuild.sourcemap,
      })
    )

  // Provide our transformed code to Rollup.
  legacyPlugins.push({
    name: 'vite-legacy:resolve',
    resolveId(id) {
      if (id == legacyPath) return id
      if (/^(core-js|regenerator-runtime)\//.test(id)) {
        return require.resolve(id)
      }
    },
    load(id) {
      if (id == legacyPath) {
        return { code, map }
      }
    },
  })

  // Use rollup-plugin-terser even if "minify" option is esbuild.
  if (viteBuild.minify)
    legacyPlugins.push(
      require('rollup-plugin-terser').terser(viteBuild.terserOptions)
    )

  const rollup = require('rollup').rollup as typeof import('rollup').rollup

  // Prepare the module graph.
  const bundle = await rollup({
    input: legacyPath,
    plugins: legacyPlugins,
  })

  // Generate the legacy bundle.
  const { output } = await bundle.generate({
    entryFileNames: legacyPath,
    format: 'iife',
    sourcemap: viteBuild.sourcemap,
    sourcemapExcludeSources: true,
    inlineDynamicImports: true,
  })

  return output[0]
}
