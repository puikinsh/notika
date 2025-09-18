import { defineConfig } from 'vite'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default defineConfig({
  // Root directory where index.html is located
  root: './notika/green-horizotal',
  
  // Build configuration for Vite 7.x
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'notika/green-horizotal/index.html'),
        analytics: resolve(process.cwd(), 'notika/green-horizotal/analytics-vite.html'),
        'index-2': resolve(process.cwd(), 'notika/green-horizotal/index-2-vite.html'),
        'index-3': resolve(process.cwd(), 'notika/green-horizotal/index-3-vite.html'),
        'index-4': resolve(process.cwd(), 'notika/green-horizotal/index-4-vite.html'),
        'bar-charts': resolve(process.cwd(), 'notika/green-horizotal/bar-charts-vite.html'),
        'line-charts': resolve(process.cwd(), 'notika/green-horizotal/line-charts-vite.html'),
        'area-charts': resolve(process.cwd(), 'notika/green-horizotal/area-charts-vite.html'),
        'form-elements': resolve(process.cwd(), 'notika/green-horizotal/form-elements-vite.html'),
        'form-components': resolve(process.cwd(), 'notika/green-horizotal/form-components-vite.html'),
        'form-examples': resolve(process.cwd(), 'notika/green-horizotal/form-examples-vite.html'),
        'widgets': resolve(process.cwd(), 'notika/green-horizotal/widgets-vite.html'),
        'buttons': resolve(process.cwd(), 'notika/green-horizotal/buttons-vite.html'),
        'typography': resolve(process.cwd(), 'notika/green-horizotal/typography-vite.html'),
        'color': resolve(process.cwd(), 'notika/green-horizotal/color-vite.html'),
        'modals': resolve(process.cwd(), 'notika/green-horizotal/modals-vite.html'),
        'notification': resolve(process.cwd(), 'notika/green-horizotal/notification-vite.html'),
        'data-table': resolve(process.cwd(), 'notika/green-horizotal/data-table-vite.html')
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
    port: 3000,
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