import { defineConfig } from 'vite'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  // Root directory where index.html is located
  root: './notika/green-horizotal',
  
  // Build configuration for Vite 7.x
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
          ui: ['tom-select', 'flatpickr', 'nouislider'],
          utils: ['dayjs', 'aos']
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
  
  // Plugins for Vite 7.x
  plugins: [
    eslint({
      include: ['src/**/*.js', 'src/**/*.ts']
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