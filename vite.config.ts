import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin(['VITE_API_KEY', 'VITE_AUTH_DOMAIN', 'VITE_PROJECT_ID', 'VITE_STORAGE_BUCKET', 'VITE_MESSAGING_SENDER_ID', 'VITE_APP_ID', 'VITE_MEASUREMENT_ID'])],
  build: {
    chunkSizeWarningLimit: 1600
  },
  resolve: {
    alias: {
      path: 'dotenv'
    }
  }
})
