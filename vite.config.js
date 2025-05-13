import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/search': {
        target: 'https://saavn-api.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/search/, '/search'),
      },
    },
    host: '0.0.0.0',
    port: 3000
  }
})