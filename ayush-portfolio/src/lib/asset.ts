/**
 * Public files (art, fonts, the CV) live at the site root, so they are linked
 * with a leading slash while the site is served. A build opened straight from
 * disk (`file://`) has no site root, so the slash is dropped and the path
 * resolves next to `index.html` instead.
 */
export const asset = (path: string) =>
  typeof window !== 'undefined' && window.location.protocol === 'file:'
    ? path.replace(/^\/+/, '')
    : path
