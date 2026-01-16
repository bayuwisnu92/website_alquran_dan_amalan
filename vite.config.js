import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react()
    ,
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'alquran-web',
        short_name: 'quran',
        description: 'aplikasi alquran',
        theme_color: '#4a90e2',
        icons: [
          {
            src: 'back.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'quranlagi.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'iconsquran.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/--web-Ba/', // Sesuaikan dengan nama repository GitHub
  root: '.',          // Pastikan root folder adalah '.'
  build: {
    outDir: 'dist',  // Output directory untuk hasil build
  },
});