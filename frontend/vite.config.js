import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Listen on all network addresses (0.0.0.0) so devices on the local network (LAN) can connect
    host: true,
    port: 5173,
  },
})
