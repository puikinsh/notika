import { defineConfig } from 'vite'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import handlebars from 'vite-plugin-handlebars'

export default defineConfig({
  // Root directory where index.html is located
  root: './notika/green-horizotal',

  // Plugins
  plugins: [
    handlebars({
      partialDirectory: resolve(process.cwd(), 'notika/green-horizotal/src/partials'),
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
      input: {
        main: resolve(process.cwd(), 'notika/green-horizotal/index.html'),
        analytics: resolve(process.cwd(), 'notika/green-horizotal/analytics.html'),
        'index-2': resolve(process.cwd(), 'notika/green-horizotal/index-2.html'),
        'index-3': resolve(process.cwd(), 'notika/green-horizotal/index-3.html'),
        'index-4': resolve(process.cwd(), 'notika/green-horizotal/index-4.html'),
        'bar-charts': resolve(process.cwd(), 'notika/green-horizotal/bar-charts.html'),
        'line-charts': resolve(process.cwd(), 'notika/green-horizotal/line-charts.html'),
        'area-charts': resolve(process.cwd(), 'notika/green-horizotal/area-charts.html'),
        'form-elements': resolve(process.cwd(), 'notika/green-horizotal/form-elements.html'),
        'form-components': resolve(process.cwd(), 'notika/green-horizotal/form-components.html'),
        'form-examples': resolve(process.cwd(), 'notika/green-horizotal/form-examples.html'),
        widgets: resolve(process.cwd(), 'notika/green-horizotal/widgets.html'),
        buttons: resolve(process.cwd(), 'notika/green-horizotal/buttons.html'),
        typography: resolve(process.cwd(), 'notika/green-horizotal/typography.html'),
        color: resolve(process.cwd(), 'notika/green-horizotal/color.html'),
        modals: resolve(process.cwd(), 'notika/green-horizotal/modals.html'),
        notification: resolve(process.cwd(), 'notika/green-horizotal/notification.html'),
        'data-table': resolve(process.cwd(), 'notika/green-horizotal/data-table.html'),
        tabs: resolve(process.cwd(), 'notika/green-horizotal/tabs.html'),
        'tabs-hbs': resolve(process.cwd(), 'notika/green-horizotal/tabs-hbs.html')
      },
      output: {
        manualChunks: {
          vendor: ['bootstrap'],
          charts: ['chart.js'],
          ui: ['swiper', 'aos']
        }
      }
    },
    target: 'es2022',
    minify: 'esbuild',
    sourcemap: true,
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