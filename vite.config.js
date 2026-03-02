import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        kndra: resolve(__dirname, 'kndra/index.html'),
      },
    },
  },
})
