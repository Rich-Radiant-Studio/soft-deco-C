import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 8084,
    host: '0.0.0.0',
    strictPort: false,
    cors: true,
    allowedHosts: [
      'insider-representations-miscellaneous-ban.trycloudflare.com',
      '.trycloudflare.com',
      'localhost'
    ],
    hmr: false,
    origin: '',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [],
      output: {
        format: 'umd',
        entryFileNames: 'index.js'
      }
    }
  }
})
