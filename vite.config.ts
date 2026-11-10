import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Project Pages are served from https://<user>.github.io/<repo>/
  base: process.env.VITE_BASE || '/fate/',
})
