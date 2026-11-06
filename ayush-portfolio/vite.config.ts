import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local dev is answered on localhost. A cloud preview hostname is passed in at
// start-up (`PREVIEW_HOSTNAME`), so only that exact host is trusted — never a
// blanket wildcard.
const previewHost = process.env.PREVIEW_HOSTNAME?.trim()
const allowedHosts = previewHost ? [previewHost] : []

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs so the built site also works when index.html is opened
  // straight from a folder, not just from a server root.
  base: './',
  server: { host: '0.0.0.0', port: 5173, allowedHosts },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts },
})
