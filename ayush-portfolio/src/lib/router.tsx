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

const RouterContext = createContext<RouterValue | null>(null)

/**
 * One router for the whole app. Every `useRouter()` consumer (toolbar, cover
 * tabs, footer, pages) shares the same state, so a navigation started in the
 * toolbar actually re-renders the page instead of only rewriting the URL.
 */
export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => normalise(window.location.pathname))
  const [hash, setHash] = useState(() => window.location.hash)

  const syncFromLocation = useCallback(() => {
    setRoute(normalise(window.location.pathname))
    setHash(window.location.hash)
  }, [])

  const navigate = useCallback((to: string) => {
    const [rawPath, rawHash = ''] = to.split('#')
    const target = normalise(rawPath)
    const nextHash = rawHash ? `#${rawHash}` : ''
    const same =
      target === normalise(window.location.pathname) && nextHash === window.location.hash

    if (same) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.history.pushState({}, '', target + nextHash)
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
