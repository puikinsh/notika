import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'

export default defineConfig({
  // Root directory where index.html is located
  root: './notika/green-horizotal',
  
  // Build configuration
  build: {
    outDir: '../../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'notika/green-horizotal/index.html'),
        analytics: resolve(__dirname, 'notika/green-horizotal/analytics.html'),
        charts: resolve(__dirname, 'notika/green-horizotal/flot-charts.html'),
        tables: resolve(__dirname, 'notika/green-horizotal/data-table.html'),
        forms: resolve(__dirname, 'notika/green-horizotal/form-elements.html'),
        email: resolve(__dirname, 'notika/green-horizotal/inbox.html'),
        login: resolve(__dirname, 'notika/green-horizotal/login-register.html')
      },
      output: {
        manualChunks: {
          vendor: ['chart.js', 'swiper', 'bootstrap'],
          charts: ['chart.js'],
          ui: ['tom-select', 'flatpickr', 'nouidslider']
        }
      }
    },
    target: 'es2020',
    minify: 'terser',
    sourcemap: true
  },
  
  // Development server
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: 'default'
        })
      ]
    }
  },
  
  // Plugins
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  
  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot'],
  
  // Public directory
  publicDir: 'img',
  
  // Base path for production
  base: './',
  
  // Resolve aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@css': resolve(__dirname, './notika/green-horizotal/css'),
      '@js': resolve(__dirname, './notika/green-horizotal/js'),
      '@img': resolve(__dirname, './notika/green-horizotal/img')
    }
  },
  
  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '2.0.0')
  },
  
  // Optimization
  optimizeDeps: {
    include: [
      'bootstrap',
      'chart.js', 
      'swiper',
      'dayjs',
      'tom-select'
    ],
    exclude: [
      // Exclude problematic legacy libraries
      'jquery-ui',
      'moment',
      'datatables'
    ]
  }
})