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
        main: resolve(process.cwd(), 'notika/green-horizotal/index-vite.html')
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