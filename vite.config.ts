import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        dimensions: false, // отключает добавление width и height
        icon: true,
        ref: true
      },
      include: '**/*.svg?react'
    })
  ]
})
