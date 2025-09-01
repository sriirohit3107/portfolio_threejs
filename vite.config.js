import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Remove the base path for Vercel - it handles this automatically
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})