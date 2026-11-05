import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toolbar } from './components/Chrome'
import { Progress } from './components/primitives'
import { Home } from './pages/Home'
import { Portfolio } from './pages/Portfolio'
import { Resume } from './pages/Resume'
import { useRouter } from './lib/router'

const titles: Record<string, string> = {
  '/': 'Ayush Thakur — Full-stack developer, Delhi',
  '/portfolio': 'Catalogue of work — Ayush Thakur',
  '/resume': 'Curriculum vitae — Ayush Thakur',
}

export default function App() {
  const { route, navigate } = useRouter()
  const liveRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    document.title = titles[route] ?? titles['/']
    const content = document.getElementById('content')
    content?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [route])

  return (
    <>
      <a href="#content" className="skip">
        Skip to content
      </a>
      <Progress />
      <Toolbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={route}
          id="content"
          tabIndex={-1}
          className="outline-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.34, ease: [0.22, 0.61, 0.24, 1] }}
        >
          {route === '/' && <Home onNavigate={navigate} />}
          {route === '/portfolio' && <Portfolio onNavigate={navigate} />}
          {route === '/resume' && <Resume onNavigate={navigate} />}
        </motion.main>
      </AnimatePresence>

      <span className="sr-only" aria-live="polite" ref={liveRef}>
        {titles[route]} loaded
      </span>
    </>
  )
}
