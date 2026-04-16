import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    proxy: {
      // During local dev, proxy admin API calls to the Express backend
      '/admin-api': 'http://localhost:3001',
    },
  },
})
