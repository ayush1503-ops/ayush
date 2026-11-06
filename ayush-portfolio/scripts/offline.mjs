/**
 * Builds a single self-contained `index.html` for the downloadable zip.
 *
 * A normal Vite build loads `<script type="module" src="./assets/…">`, which
 * browsers refuse from `file://` (the origin is opaque, so the request is a
 * CORS failure and the page stays blank). An *inline* module has nothing to
 * fetch, so it runs. This build inlines the script, the stylesheet, the fonts,
 * artwork, screenshots, favicon and CV into one file: double-click and go.
 */
import { build } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const outDir = path.join(root, 'dist-offline')

const MIME = {
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
}

const dataUri = (file) => {
  const mime = MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream'
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`
}

await build({
  root,
  logLevel: 'warn',
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // One chunk, so the inline script has nothing left to import.
        inlineDynamicImports: true,
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})

const assetsDir = path.join(outDir, 'assets')
const built = fs.readdirSync(assetsDir)
const jsName = built.find((f) => f.endsWith('.js'))
const cssName = built.find((f) => f.endsWith('.css'))
if (!jsName) throw new Error(`no JS bundle in ${assetsDir}: ${built.join(', ')}`)

let js = fs.readFileSync(path.join(assetsDir, jsName), 'utf8')

// Every file in `public/` is referenced from the app as a plain string such as
// "/art/avatar.png" or "/shots/pasha.png".
const publicFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const abs = path.join(dir, entry.name)
    return entry.isDirectory() ? publicFiles(abs) : [abs]
  })

for (const abs of publicFiles(publicDir)) {
  const rel = path.relative(publicDir, abs).split(path.sep).join('/')
  if (!/\.(png|jpe?g|webp|svg|pdf|woff2?)$/i.test(rel)) continue
  js = js.split(JSON.stringify(`/${rel}`)).join(JSON.stringify(dataUri(abs)))
}

// The stylesheet is emitted beside the JS, so its fonts and cursors sit at
// `../fonts/…`. Inlined into <style> they would resolve above the document.
const css = cssName
  ? fs
      .readFileSync(path.join(assetsDir, cssName), 'utf8')
      .replace(/url\(\s*(["']?)(?:\.\.\/)?(fonts|cursors)\/([^)"'\s]+)\1\s*\)/g, (match, _q, dir, name) => {
        const abs = path.join(publicDir, dir, name)
        return fs.existsSync(abs) ? `url(${dataUri(abs)})` : match
      })
  : ''

let html = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
html = html
  .replace(/<link rel="preload"[^>]*>\s*/g, '')
  .replace(/<link rel="icon"[^>]*href="([^"]+)"[^>]*>/, (_match, href) => {
    const abs = path.join(outDir, href.replace(/^\.\//, ''))
    return `<link rel="icon" type="image/svg+xml" href="${dataUri(abs)}">`
  })
  .replace(/<link rel="stylesheet"[^>]*>\s*/g, () => (css ? `<style>\n${css}\n</style>` : ''))
  .replace(/<script[^>]*src="\.\/assets\/[^"]+"[^>]*><\/script>\s*/g, '')

if (!html.includes('</body>')) throw new Error('no </body> to inline the app script into')

// Function replacements throughout: `$&`/`$'` inside a minified bundle are
// otherwise interpreted as replacement patterns and corrupt the output.
html = html.replace(
  '</body>',
  () =>
    `<script type="module">\n${js.replace(/<\/script/gi, '<\\/script')}\n</script>\n</body>`
)

fs.writeFileSync(path.join(outDir, 'index.html'), html)

// Only the single file ships; everything else is now embedded.
for (const entry of fs.readdirSync(outDir)) {
  if (entry !== 'index.html') fs.rmSync(path.join(outDir, entry), { recursive: true, force: true })
}

const kb = (fs.statSync(path.join(outDir, 'index.html')).size / 1024).toFixed(0)
console.log(`offline build: dist-offline/index.html (${kb} kB, self-contained)`)
