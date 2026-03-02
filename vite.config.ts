import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Injects <link rel="modulepreload" href="..."> for the main entry script in built index.html. */
function modulepreloadPlugin() {
  return {
    name: 'modulepreload',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      const match = html.match(
        /<script[^>]+type=["']module["'][^>]+src=["']([^"']+\.js)["']/
      )
      const href = match?.[1]
      if (!href || !href.startsWith('/assets/')) return html
      const link = `<link rel="modulepreload" href="${href}">`
      return html.replace('</head>', `${link}\n  </head>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), modulepreloadPlugin()],
  server: {
    host: true, // 같은 Wi-Fi 기기에서 접속 가능 (0.0.0.0)
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'
          }
          if (id.includes('ChatBot') || id.includes('components/ChatBot')) {
            return 'chatbot'
          }
        },
      },
    },
  },
})
