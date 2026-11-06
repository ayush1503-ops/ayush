import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Route = '/' | '/portfolio' | '/resume'

const routes: Route[] = ['/', '/portfolio', '/resume']

const normalise = (p: string): Route => {
  const path = ('/' + p.replace(/^\/+|\/+$/g, '')).replace(/\/$/, '')
  const found = routes.find((r) => r === path || (r === '/' && path === ''))
  return found ? found : '/'
}

type RouterValue = {
  route: Route
  hash: string
  navigate: (to: string) => void
}

type Location = { route: Route; hash: string; isRoute: boolean }

/**
 * A build opened straight from disk is served from `file://`, where the
 * History API cannot switch paths (the origin is opaque). There the route
 * rides in the fragment instead: `index.html#/portfolio#contact`.
 */
const isFileUrl = () =>
  typeof window !== 'undefined' && window.location.protocol === 'file:'

const readLocation = (): Location => {
  if (isFileUrl()) {
    const fragment = window.location.hash.replace(/^#/, '')
    if (!fragment.startsWith('/')) return { route: '/', hash: '', isRoute: false }
    const [path, ...rest] = fragment.split('#')
    return {
      route: normalise(path),
      hash: rest.length ? `#${rest.join('#')}` : '',
      isRoute: true,
    }
  }

  return {
    route: normalise(window.location.pathname),
    hash: window.location.hash,
    isRoute: true,
  }
}

const RouterContext = createContext<RouterValue | null>(null)

/**
 * One router for the whole app. Every `useRouter()` consumer (toolbar, cover
 * tabs, footer, pages) shares the same state, so a navigation started in the
 * toolbar actually re-renders the page instead of only rewriting the URL.
 */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(readLocation)
  const [route, setRoute] = useState<Route>(initial.route)
  const [hash, setHash] = useState(initial.hash)

  const syncFromLocation = useCallback(() => {
    const next = readLocation()
    // In-page anchors (`#top`, `#content`) must not reset the page on a
    // file:// build — only a fragment that names a route changes it.
    if (!next.isRoute) return
    setRoute(next.route)
    setHash(next.hash)
  }, [])

  const navigate = useCallback((to: string) => {
    const [rawPath, rawHash = ''] = to.split('#')
    const target = normalise(rawPath)
    const nextHash = rawHash ? `#${rawHash}` : ''
    const current = readLocation()
    const same =
      current.isRoute && target === current.route && nextHash === current.hash

    if (same) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (isFileUrl()) {
      window.location.hash = `${target}${nextHash}`
    } else {
      window.history.pushState({}, '', target + nextHash)
    }
    setRoute(target)
    setHash(nextHash)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', syncFromLocation)
    window.addEventListener('hashchange', syncFromLocation)
    return () => {
      window.removeEventListener('popstate', syncFromLocation)
      window.removeEventListener('hashchange', syncFromLocation)
    }
  }, [syncFromLocation])

  const value = useMemo(() => ({ route, hash, navigate }), [route, hash, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside <RouterProvider>')
  return ctx
}
