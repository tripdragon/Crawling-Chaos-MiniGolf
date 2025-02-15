import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Crawling-Chaos-MiniGolf/',

  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Useful if file changes are not detected
    },
    // fs: {
    //   allow: ["public"],
    // },
  },
  resolve: {
    alias: {
      '@liblibgib': '/src/liblibgib',
    },
  },

})
