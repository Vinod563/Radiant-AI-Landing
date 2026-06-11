import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Local dev: proxy /api/* to the chat backend on :3001 so the frontend
    // can use the same relative path it uses in production (same-origin via
    // reverse proxy). No VITE_CHAT_API_URL env var needed.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
