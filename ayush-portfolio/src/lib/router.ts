import { useCallback, useEffect, useState } from 'react'

export type Route = '/' | '/portfolio' | '/resume'

const routes: Route[] = ['/', '/portfolio', '/resume']
const normalise = (p: string): Route => {
  const path = ('/' + p.replace(/^\/+|\/+$/g, '')).replace(/\/$/, '')
  const found = routes.find((r) => r === path || (r === '/' && path === ''))
  return found ? found : '/'
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(() => normalise(window.location.pathname))

  const commit = useCallback((to: Route) => {
    window.history.pushState({}, '', to)
    setRoute(to)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const navigate = useCallback(
    (to: string) => {
      const target = normalise(to)
      if (target === route) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      commit(target)
    },
    [route, commit]
  )

  useEffect(() => {
    const onPop = () => setRoute(normalise(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return { route, navigate }
}
