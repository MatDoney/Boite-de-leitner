import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {VitePWA} from "vite-plugin-pwa";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'], // Ajout de jpeg et webp
        runtimeCaching: [
          {
            urlPattern: ({ request }) => { // Utilisation d'une fonction pour plus de flexibilité
              return true; // Cache tout par défaut
              // Ou une condition plus précise:
              // return request.destination === 'image' || request.destination === 'script' || request.destination === 'style' || request.destination === 'document';
            },
            handler: 'NetworkFirst', // Stratégie de cache : d'abord le réseau, puis le cache
            options: {
              cacheName: 'leitner-cache',
              expiration: {
                maxAgeSeconds: 24 * 3600, // 24 heures
                maxEntries: 30 // Optionnel : nombre maximal d'entrées dans le cache
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache les réponses avec les status 0 (pour les fichiers locaux) et 200 (OK)
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
