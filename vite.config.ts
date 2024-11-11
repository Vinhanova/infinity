/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  /*   server: {
    port: 8083
  }, */
  plugins: [react()],
  test: {
    globals: true
    /* coverage: {
      reporter: ["text", "html"]
    } */
  },
  build: {
    chunkSizeWarningLimit: 1600
  }
})
