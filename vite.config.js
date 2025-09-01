import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio_threejs/', // Your repository name from the screenshot
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})