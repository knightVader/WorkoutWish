import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployment-ready config for GitHub Pages (served at /WorkoutWish/)
export default defineConfig({
  base: '/WorkoutWish/',
  plugins: [react()],
})
