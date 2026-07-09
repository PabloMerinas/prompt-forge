import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // En GitHub Pages el sitio vive bajo /prompt-forge/; en local sigue siendo /
  base: process.env.GITHUB_ACTIONS ? '/prompt-forge/' : '/',
  plugins: [react()],
})
