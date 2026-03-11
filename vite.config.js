import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'lucide-react']
  },
  server: {
    allowedHosts: ['9fe4-2401-4900-5d36-fe23-44af-dfe1-d198-ab49.ngrok-free.app']
  }
})