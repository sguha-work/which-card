import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174, // Replace with your desired port
    strictPort: true, // Optional: fails if the port is already in use
  },
  base: '/which-card/',
  build: {
    target: 'esnext', // Modern browsers allow for smaller syntax
    minify: 'terser', // Terser often yields smaller results than esbuild for complex code
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Move large node_modules into separate chunks to improve caching and prevent duplicates
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  }
})
