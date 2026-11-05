import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '../lib/site'

/** Case file as a window: yellow title bar, cream paper, chunky everything. */
export function Dossier({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    if (!project) return
    setBooting(true)
    const id = window.setTimeout(() => setBooting(false), 620)
    return () => window.clearTimeout(id)
  }, [project])

  useEffect(() => {
    if (!project) return
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[var(--z-modal)] overflow-y-auto bg-ink/60 px-3 py-6 phone:px-2 phone:py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} case file`}
            className="card relative mx-auto w-full max-w-[980px] bg-cream-100"
            initial={{ y: 24, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 16, scale: 0.99 }}
            transition={{ duration: 0.36, ease: [0.34, 1.3, 0.4, 1] }}
          >
            <div className="win-bar sticky top-0 z-10 bg-sun-300 !rounded-t-[12px]">
              <span className="flex items-center gap-2">
                <span className="hidden mono tab:inline">{project.index} / 04</span>
                <span>{project.title}</span>
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="rounded-[6px] border-2 border-ink bg-cream-100 px-2 py-[3px] text-[11px] font-black uppercase shadow-hard2 transition-transform hover:-translate-y-[1px]"
              >
                Close ✕
              </button>
            </div>

            {booting ? (
              <div className="flex min-h-[320px] items-center justify-center p-8" aria-live="polite">
                <div className="w-full max-w-[280px] rounded-[6px] border-2 border-ink bg-cream-100 p-3 shadow-hard3">
                  <p className="text-center text-[13px] font-black uppercase tracking-[0.06em]">Opening…</p>
                  <p className="mono mt-0.5 text-center text-[9px] text-ink/60">{project.title}</p>
                  <div className="mt-2 h-[14px] overflow-hidden rounded-[3px] border-2 border-ink bg-cream-200">
                    <motion.span
                      className="block h-full bg-ink"
                      initial={{ width: '8%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.62, ease: 'linear' }}
                    />
                  </div>
                </div>
              </div>
            ) : (
            <div className="p-5 phone:p-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="mono text-ink/70">{project.kicker}</p>
                  <h2 className="display h2 mt-1.5 text-[clamp(30px,5vw,58px)]">{project.title}</h2>
                  {project.aka && <p className="mono mt-1 text-ink/70">a.k.a. {project.aka}</p>}
                </div>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-grape !min-h-[38px] !text-[12px]"
                >
                  Visit live ↗
                </a>
              </div>

              <p className="lead mt-4 max-w-[62ch] text-ink/85">{project.blurb}</p>

              <div className="mt-4 grid grid-cols-3 gap-2 tab:grid-cols-2 phone:grid-cols-1">
                {project.spec.map((s) => (
                  <div key={s.k} className="rounded-[7px] border-2 border-ink bg-cream-200 px-2.5 py-1.5">
                    <p className="mono text-ink/60">{s.k}</p>
                    <p className="text-[13.5px] font-bold">{s.v}</p>
                  </div>
                ))}
              </div>

              <figure className="mt-4 overflow-hidden rounded-[8px] border-2 border-ink">
                <img src={project.shot} alt={`${project.title} — full screenshot`} className="w-full" />
              </figure>
              <figcaption className="mt-1.5 flex items-center justify-between">
                <span className="mono text-ink/60">Fig. {project.index} — live build</span>
                <span className="mono text-ink/60">{project.status}</span>
              </figcaption>

              <h3 className="display mt-6 text-[18px]">What was built</h3>
              <ul className="mt-2 flex flex-col gap-2">
                {project.bullets.map((b, i) => (
                  <li key={b} className="flex gap-3 rounded-[7px] border-2 border-ink/15 bg-cream-200/60 px-3 py-2">
                    <span className="mono shrink-0 pt-0.5 text-ink/50">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[14px] leading-[1.4]">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-ink/20 pt-4">
                <div>
                  <p className="mono text-ink/60">Stack</p>
                  <p className="mt-1 text-[14px] font-bold uppercase">{project.stack.join(' · ')}</p>
                </div>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono underline decoration-2 underline-offset-4"
                >
                  {project.domain} ↗
                </a>
              </div>
            </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
