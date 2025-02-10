import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: false, // websocket 미사용
    cors: true,
    proxy: {'/api': {target: process.env.VITE_API_KEY, changeOrigin: true,},},
  },
  plugins: [react()],
})
