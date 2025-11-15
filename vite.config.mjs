import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// I didn't change anything fancy here, just the basic React + Vite setup.
export default defineConfig({
  plugins: [react()],
})
