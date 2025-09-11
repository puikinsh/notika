# vite-plugin-legacy

Easily generate a legacy bundle for outdated browser support.

### Features

- **Based on `@babel/preset-env`**  
  Easily customize which browsers you want to support (via the `targets` option).

- **Automatic feature detection**  
  The injected `<script>` that decides which bundle to load will check whether
  ES modules (eg: `import`) and the expected JavaScript version (determined by
  `esbuildTarget` in your Vite config) are supported by the user's browser.
  If not, the legacy bundle is loaded instead!

- **Hassle-free polyfills**  
  With the help of [Polyfill.io], you can add polyfills without `npm install`.
  Just add `"InteractionObserver"` to the `polyfills` array, and the legacy
  bundle will automatically load it. [Learn more](#polyfills)

- **Usage-based `core-js@3` inlining**  
  When `corejs: true` is passed, modern features are detected by Babel, and only
  the necessary [`core-js`] polyfills are embedded in the legacy bundle.

- **Sourcemap support**  
  Set `sourcemap: true` in your Vite config to easily debug your production
  bundles.

- **Minify support**  
  When `minify` is truthy in your Vite config, the legacy bundle (which includes
  any `core-js` polyfills) is minified with [`terser`]. Customize the minifier
  via the `terserOption` in your Vite config.

- **Production only**  
  The legacy bundle is only generated when `vite build` runs, because Vite never
  bundles during development (that's the whole point of Vite).

[`core-js`]: https://www.npmjs.com/package/core-js
[`terser`]: https://www.npmjs.com/package/terser

&nbsp;

### Example

```ts
import legacyPlugin from 'vite-plugin-legacy'

export default {
  plugins: [
    // The default options are listed below. Pass nothing to use them.
    legacyPlugin({
      // The browsers that must be supported by your legacy bundle.
      // https://babeljs.io/docs/en/babel-preset-env#targets
      targets: [
        '> 0.5%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
      ],
      // Define which polyfills your legacy bundle needs. They will be loaded
      // from the Polyfill.io server. See the "Polyfills" section for more info.
      polyfills: [
        // Empty by default
      ],
      // Toggles whether or not browserslist config sources are used.
      // https://babeljs.io/docs/en/babel-preset-env#ignorebrowserslistconfig
      ignoreBrowserslistConfig: false,
      // When true, core-js@3 modules are inlined based on usage.
      // When false, global namespace APIs (eg: Object.entries) are loaded
      // from the Polyfill.io server.
      corejs: false,
    })
  ]
}
```

&nbsp;

### Polyfills

The `polyfills` option lets you define which APIs to load from the
[Polyfill.io] server. If you're using TypeScript in your Vite config, you'll
get auto-completion for all supported polyfills. The list is incomplete, so
open an issue if there's a missing polyfill that you need.

Polyfills related to global namespaces (eg: `Object.entries`) are inferred
from the `esbuildTarget` in your Vite config, which defaults to `es2020` if
undefined. Be careful not to use an API that your target does not support.
For example, don't use `Promise.prototype.finally` if your target is older
than `es2018`. You can use [this tool](http://kangax.github.io/compat-table/es2016plus)
to know when APIs were introduced.

By default, this plugin does **not** check if your bundle is using the global
namespace APIs before importing their polyfills from [Polyfill.io]. If you want
that, you can pass `corejs: true` to the plugin, which only includes the
polyfills your legacy bundle needs. The downside of using `corejs: true` is that
polyfills are inlined instead of being loaded separately, which allows for the
browser to reuse cached polyfills between websites. Even if you set `corejs` to
true, you can still use the `polyfills` option if you need APIs not supported
by `core-js` (like `IntersectionObserver`).

The `polyfills` option allows any of the values in [this list](https://github.com/alloc/vite-plugin-legacy/blob/master/src/polyfills.ts).

[Polyfill.io]: https://polyfill.io/v3/
