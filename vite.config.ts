import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import Sitemap from "vite-plugin-sitemap"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    vueDevTools(),
    Sitemap({ hostname: "https://emlviewer.okcomputer.app/"}),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "EML VIEWER",
        short_name: "EML VIEWER",
        theme_color: "#ffffff",
        description: "ブラウザ上で動作するEMLファイルビューア。PWA対応でオフラインでも利用可能。メールの内容を閲覧し、添付ファイルのダウンロードもできます。",
        "icons": [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/[name].js",
        manualChunks: (id) => {
          if(id.includes("node_modules")) {
            if(id.includes("eml-parse-js")) {
              console.log(id);
              return "vender_eml"
            } else if(id.includes("vuetify")) {
              return "vender_vuetify"
            } else if(id.includes("vue")) {
              return "vender_vue"
            } else {
              console.log(id);
              return "vendor_other"
            }
          }
        },
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
