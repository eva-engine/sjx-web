import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true
  },
  base: "/sjx/",
  root: './',
  publicDir: "./public",
  plugins: [react()]
})
