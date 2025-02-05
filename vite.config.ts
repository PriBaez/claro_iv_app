import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@services', replacement: fileURLToPath(new URL('./src/services', import.meta.url)) },
      { find: '@models', replacement: fileURLToPath(new URL('./src/models', import.meta.url)) },
      { find: '@containers', replacement: fileURLToPath(new URL('./src/containers', import.meta.url)) },
      { find: '@components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@shared', replacement: fileURLToPath(new URL('./src/shared', import.meta.url)) },
    ],
  },
})
