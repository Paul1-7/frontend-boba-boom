import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import process from 'process'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      mode: 'production',
      base: '/',
      includeAssets: ['favicon-32x32.png'],
      devOptions: {
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      },
      manifest: {
        display: 'fullscreen',
        name: 'BOBA BOO',
        short_name: 'BOBA BOO',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'boba-192-192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/boba-512-512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'boba-512-512.png', // <== don't add slash, for testing
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        swDest: 'src/workers/notifications.js'
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), './src')
    }
  },
  server: {
    open: true
  }
})
