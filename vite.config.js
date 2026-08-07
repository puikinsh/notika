import { defineConfig } from 'vite'
import { resolve } from 'path'
import { glob } from 'glob'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import handlebars from 'vite-plugin-handlebars'

// import.meta.dirname, not process.cwd(): Vite 8 resolves configs natively and
// process.cwd() depends on where npm happens to be invoked from.
const rootDir = import.meta.dirname
const pagesDir = resolve(rootDir, 'notika/green-horizotal')

// Every page in the template, discovered at build time. Adding an .html file
// no longer means remembering to register it here.
const pageInputs = Object.fromEntries(
  glob
    .sync('*.html', { cwd: pagesDir })
    .map((file) => [file.replace(/\.html$/, ''), resolve(pagesDir, file)])
)

export default defineConfig({
  // Root directory where index.html is located
  root: './notika/green-horizotal',

  // Plugins
  plugins: [
    handlebars({
      partialDirectory: resolve(pagesDir, 'src/partials'),
      context: (pagePath) => {
        // Extract page name from path
        const pageName = pagePath.split('/').pop()?.replace('.html', '') || ''

        // Default context for all pages
        return {
          title: 'Notika Admin Template',
          pageTitle: pageName.charAt(0).toUpperCase() + pageName.slice(1).replace('-', ' '),
          searchPlaceholder: pageName.replace('-', ' '),
          year: new Date().getFullYear(),
          // Navigation active states based on page name
          isComponents: ['tabs', 'accordion', 'alert', 'modals', 'buttons', 'notification', 'dialog', 'tooltips', 'popovers', 'dropdown'].some(p => pageName.includes(p)),
          isHome: ['index', 'analytics', 'widgets'].some(p => pageName.includes(p)),
          isCharts: ['bar-charts', 'line-charts', 'area-charts', 'flot-charts'].some(p => pageName.includes(p)),
          isForms: ['form-'].some(p => pageName.includes(p)),
          isTables: ['table'].some(p => pageName.includes(p)),
          isPages: ['typography', 'color', 'contact', 'invoice', '404', 'login'].some(p => pageName.includes(p)),
          isEmail: ['inbox', 'compose-email', 'view-email'].some(p => pageName.includes(p)),
          isInterface: ['animations', 'google-map', 'data-map', 'code-editor', 'image-cropper', 'wizard'].some(p => pageName.includes(p)),
          // Specific page flags
          activePage: {
            [pageName.replace('-vite', '')]: true
          },
          // Breadcrumb icon based on section
          breadcrumbIcon: pageName.includes('tabs') ? 'fa-solid fa-cube' :
                          pageName.includes('form') ? 'fa-solid fa-file-lines' :
                          pageName.includes('chart') ? 'fa-solid fa-chart-column' :
                          pageName.includes('table') ? 'fa-solid fa-table-columns' :
                          'fa-solid fa-house'
        }
      }
    })
  ],
  
  // Build configuration for Vite 7.x
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: pageInputs,
      output: {
        // Vite 8 builds with Rolldown, which only accepts a function here.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('bootstrap')) return 'vendor'
          if (id.includes('chart.js')) return 'charts'
          if (id.includes('swiper') || id.includes('aos')) return 'ui'
        }
      }
    },
    target: 'es2022',
    // Vite 8 minifies with Oxc; it no longer bundles esbuild for this.
    minify: 'oxc',
    // Source maps are dev-only: shipping them exposed the original sources
    // and added roughly 2 MB to dist/.
    sourcemap: false,
    reportCompressedSize: true
  },
  
  // Development server
  server: {
    port: 3100,
    open: true,
    cors: true,
    host: true
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
    cors: true,
    host: true
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    },
    postcss: {
      plugins: [
        autoprefixer(),
        cssnano({
          preset: 'default'
        })
      ]
    }
  },
  
  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],
  
  // Public directory
  publicDir: 'img',
  
  // Base path for production
  base: './',
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src'),
      '@css': resolve(process.cwd(), './notika/green-horizotal/css'),
      '@js': resolve(process.cwd(), './notika/green-horizotal/js'),
      '@img': resolve(process.cwd(), './notika/green-horizotal/img')
    }
  },
  
  // Optimization
  optimizeDeps: {
    include: [
      'bootstrap',
      'chart.js', 
      'swiper',
      'dayjs',
      'aos'
    ],
    exclude: []
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify('2.0.0')
  }
})