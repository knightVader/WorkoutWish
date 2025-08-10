import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configure base for GitHub Pages deployment (repository name) so assets resolve correctly
// If you deploy to a custom domain or user/organization root, you can change/remove the base.
export default defineConfig({
  base: '/WorkoutWish/',
  plugins: [react()],
})
