import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { CoverScene } from '../components/CoverScene'
import { Dossier } from '../components/Dossier'
import { asset } from '../lib/asset'
import { Plate } from '../components/Plate'
import { SlimFooter } from '../components/SlimFooter'
import { gmailCompose, profile, projects, type Project } from '../lib/site'

const toneCycle = ['bg-sun-300', 'bg-cream-100', 'bg-grape-200', 'bg-mint-200']

/* --------------------------------------------------------------- overview */
/** One strip: who you are hiring, in the space of a single glance. */
function OverviewStrip({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <section id="overview" data-section="Overview" className="bg-cream-200 grain">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-3 py-2.5 desk:flex-row desk:items-center desk:gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <img
            src={asset('/art/avatar.png')}
            alt="Illustrated portrait of Ayush Thakur"
            className="size-[58px] shrink-0 rotate-[-3deg] rounded-[6px] border-2 border-ink object-cover shadow-hard2"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="chip !bg-sun-300">overview</span>
              <span className="chip">
                <span className="size-[6px] rounded-full bg-mint-400" /> open for work
              </span>
              <span className="chip !bg-grape-200">{profile.chip}</span>
            </div>
            <p className="mt-1 max-w-[62ch] text-[13px] leading-[1.45] text-ink/85">
              Full-stack developer in Delhi. Hand-written React, CSS and WebGL — sub-1.5s loads, 60fps motion,
              zero templates. Four live builds, one sprint each.
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-4 gap-1.5 desk:w-auto">
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-[7px] border-2 border-ink px-1.5 py-1 shadow-hard2 desk:w-[68px] ${toneCycle[i % 4]}`}
            >
              <p className="font-black text-[15px] leading-none">{s.value}</p>
              <p className="mt-0.5 text-[8.5px] font-bold uppercase leading-tight text-ink/70">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex w-full gap-1.5 desk:w-auto">
          <a
            href={gmailCompose()}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-ink min-w-0 flex-1 !min-h-[30px] !px-2.5 !text-[11px] desk:flex-none"
          >
            Brief ↗
          </a>
          <button
            type="button"
            onClick={() => onNavigate('/portfolio')}
            className="btn min-w-0 flex-1 !min-h-[30px] !px-2.5 !text-[11px] desk:flex-none"
          >
            Portfolio
          </button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- zip */
function PlateIn({
  project,
  index,
  progress,
  onOpen,
}: {
  project: Project
  index: number
  progress: MotionValue<number>
  onOpen: (p: Project) => void
}) {
  const from = 0.2 + index * 0.05
  const to = from + 0.2
  const y = useTransform(progress, [from, to], [80, 0])
  const opacity = useTransform(progress, [from, from + 0.1], [0, 1])
  const scale = useTransform(progress, [from, to], [0.95, 1])
  const rotate = useTransform(progress, [from, to], [index % 2 ? 2 : -2, 0])

  return (
    <motion.div style={{ y, opacity, scale, rotate }}>
      <Plate project={project} onOpen={onOpen} variant="track" />
    </motion.div>
  )
}

function ZipStage({ onOpen }: { onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [desk, setDesk] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    const on = () => setDesk(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const animated = desk && reduced !== true
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  const topY = useTransform(p, [0.05, 0.5], ['0%', '-102%'])
  const bottomY = useTransform(p, [0.05, 0.5], ['0%', '102%'])
  // Kept off the very edges: the tab hangs 19px to the left of its track, so
  // 0%/-100% would clip half of it against the viewport.
  const tabX = useTransform(p, [0.02, 0.54], ['5%', '95%'])
  // Faded out before the plates finish arriving, so the tab never sits on top
  // of a project card.
  const tabOpacity = useTransform(p, [0.4, 0.5], [1, 0])

  useMotionValueEvent(p, 'change', (v) => setRevealed(!animated || v > 0.1))

  useEffect(() => {
    const el = gridRef.current as (HTMLDivElement & { inert: boolean }) | null
    if (el) el.inert = animated ? !revealed : false
  }, [revealed, animated])

  return (
    <section
      id="plates"
      ref={ref}
      data-section="Plates"
      className={`relative bg-tang-300 stripes ${animated ? 'desk:h-[165vh]' : ''}`}
    >
      <div className="relative desk:sticky desk:top-0 desk:h-[100svh] desk:overflow-hidden">
        {/* the projects, revealed by the zip */}
        <div ref={gridRef} className="relative flex h-full flex-col justify-center gap-3 py-3">
          <div className="pointer-events-none absolute inset-0 grain" />
          <div className="shell relative flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="chip !bg-sun-300">plates</span>
                <span className="chip">2025 – 2026</span>
                <span className="chip !bg-mint-200">4 live sites</span>
              </div>
              <h2 className="display h2 mt-1.5">
                The <span className="highlight-type">work</span>, unzipped.
              </h2>
            </div>
            <p className="mono max-w-[24ch] text-ink/70 desk:text-right">
              {animated ? 'the zip is open — pick a site' : 'four live builds, open a file'}
            </p>
          </div>

          <div className="shell grid grid-cols-4 gap-2.5 tab:grid-cols-2 phone:grid-cols-1">
            {projects.map((pr, i) =>
              animated ? (
                <PlateIn key={pr.id} project={pr} index={i} progress={p} onOpen={onOpen} />
              ) : (
                <Plate key={pr.id} project={pr} onOpen={onOpen} variant="list" />
              ),
            )}
          </div>
        </div>

        {/* the closed zip */}
        {animated && (
          <>
            <motion.div
              className="absolute inset-x-0 top-0 z-10 h-1/2 overflow-hidden border-b-2 border-ink bg-sun-300"
              style={{ y: topY }}
              aria-hidden="true"
            >
              <div className="pointer-events-none absolute inset-0 halftone opacity-[0.09]" />
              {/* pb-* reserves a clear gutter so the riding tab never covers the
                  title, and the subtitle never collides with its label. */}
              <div className="shell relative flex h-full flex-col justify-between py-4 pb-16">
                <span className="mono">Vol. 01 — closed file</span>
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="display text-[clamp(30px,5vw,64px)] leading-[0.9]">Plates</p>
                    <p className="mono mt-1">four live sites inside</p>
                  </div>
                  <span className="mono rotate-[-4deg] rounded-[5px] border-2 border-ink bg-cream-100 px-2 py-1 shadow-hard2">
                    pull ↓
                  </span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[12px] zip-seam" />
            </motion.div>

            <motion.div
              className="absolute inset-x-0 bottom-0 z-10 h-1/2 border-t-2 border-ink bg-grape-400 text-cream-100"
              style={{ y: bottomY }}
              aria-hidden="true"
            >
              <div className="pointer-events-none absolute inset-0 halftone opacity-[0.08]" />
              <div className="absolute inset-x-0 top-0 h-[12px] zip-seam" />
              <div className="shell relative flex h-full flex-col justify-between py-4 pt-16">
                <div className="flex items-start justify-between gap-6">
                  <p className="max-w-[34ch] text-[13px] leading-snug text-cream-200">
                    {projects.map((p2) => p2.title).join(' · ')}
                  </p>
                  <span className="mono text-cream-200">scroll to open</span>
                </div>
                <span className="mono text-cream-200">Ayush Thakur — catalogue of work</span>
              </div>
            </motion.div>

            {/* the tab, riding the seam left → right */}
            <motion.div
              className="pointer-events-none absolute top-1/2 z-20 -translate-y-1/2"
              style={{ left: tabX, opacity: tabOpacity }}
              aria-hidden="true"
            >
              <div className="relative -ml-[19px] flex flex-col items-center">
                <div className="relative h-12 w-9 rounded-[5px] border-2 border-ink bg-cream-100 shadow-hard3">
                  <span className="absolute inset-x-[9px] top-[7px] h-3 rounded-[2px] border-2 border-ink bg-ink" />
                  <span className="absolute inset-x-[9px] bottom-[7px] h-[3px] rounded-full bg-ink/40" />
                </div>
                <span className="mono mt-1.5 whitespace-nowrap rounded-[4px] border-2 border-ink bg-cream-100 px-1.5 py-0.5 shadow-hard2">
                  pull
                </span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- page */
export function Home({ onNavigate }: { onNavigate: (to: string) => void }) {
  const [open, setOpen] = useState<Project | null>(null)
  return (
    <div id="top">
      <CoverScene />
      <OverviewStrip onNavigate={onNavigate} />
      <ZipStage onOpen={setOpen} />
      <SlimFooter onNavigate={onNavigate} />
      <Dossier project={open} onClose={() => setOpen(null)} />
    </div>
  )
}
