import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'react-icons/fi',
      'react-icons/fa'
    ],
    exclude: []
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})