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
import { Plate } from '../components/Plate'
import {
  ArrowLink,
  Clock,
  Lines,
  Magnetic,
  Marquee,
  Reveal,
  SectionHead,
  Stamp,
  WindowCard,
} from '../components/primitives'
import { ContactBand, Faq, Tariff } from '../components/sections'
import { gmailCompose, profile, projects, skills, type Project } from '../lib/site'

const tileTone = ['bg-sun-300', 'bg-cream-100', 'bg-grape-200', 'bg-mint-200']

/* ------------------------------------------------------------------- hero */
function Hero({ onNavigate }: { onNavigate: (to: string) => void }) {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden bg-tang-300 stripes pt-[calc(var(--site-header-h)+26px)] grain">
      <div className="shell relative z-10 grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-8 pb-10 tab:grid-cols-1 tab:gap-10">
        {/* the note */}
        <div className="relative">
          <div className="card paper-note relative rotate-[-1.4deg] rounded-[18px] p-6 tab:p-5 phone:rotate-0">
            <span className="tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-2deg]" aria-hidden="true" />

            <div className="flex flex-wrap items-center gap-2">
              <span className="chip !bg-sun-300">since 2025</span>
              <span className="chip">
                <span className="size-[6px] rounded-full bg-mint-400" /> open for work
              </span>
              <span className="chip !bg-grape-200">delhi · remote</span>
            </div>

            <Lines
              as="h1"
              className="display mt-4 text-[clamp(38px,4.8vw,64px)] leading-[0.92]"
              delay={0.05}
              lines={['Custom code', 'for bold', <span key="t" className="accent-type">brands.</span>]}
            />

            <p className="lead mt-4 max-w-[44ch] text-ink/85">
              I’m {profile.name} — a full-stack developer in Delhi. I hand-write React, CSS and WebGL, then hold
              every page to a sub-1.5s load budget.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href="#plates"
                className="btn btn-ink"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('plates')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                See the plates ↓
              </a>
              <Magnetic>
                <a href={gmailCompose()} target="_blank" rel="noreferrer noopener" className="btn btn-sun">
                  Start a project ↗
                </a>
              </Magnetic>
              <button type="button" className="btn" onClick={() => onNavigate('/resume')}>
                CV
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-ink/30 pt-3">
              <span className="mono text-ink/70">
                <Clock />
              </span>
              <span className="mono text-ink/70">04 live builds · 0 templates</span>
            </div>

            <span className="pointer-events-none absolute -bottom-6 -right-4 hidden tab:block">
              <Stamp top="hand" bottom="coded" size={70} tone="chilli" tilt={8} />
            </span>
          </div>
        </div>

        {/* the collage */}
        <div className="relative mx-auto w-full max-w-[460px] py-4 tab:hidden">
          {/* stack card, behind */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: -18, rotate: 4 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute right-0 top-0 w-[54%]"
          >
            <WindowCard title="stack.exe" tone="grape" bodyClassName="bg-cream-100 p-2.5">
              {['React · Next', 'TypeScript', 'Three.js · GSAP'].map((t) => (
                <p
                  key={t}
                  className="mb-1 rounded-[4px] border-2 border-ink px-1.5 py-[1px] font-mono text-[9.5px] font-medium uppercase last:mb-0"
                >
                  {t}
                </p>
              ))}
            </WindowCard>
          </motion.div>

          {/* portrait polaroid */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 22, rotate: -6 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.34, 1.3, 0.4, 1] }}
            className="card relative z-20 mx-auto mt-16 w-[70%] bg-cream-100 p-2.5"
          >
            <img
              src="/art/avatar.png"
              alt="Illustrated portrait of Ayush Thakur"
              className="aspect-[6/5] w-full rounded-[6px] border-2 border-ink object-cover"
            />
            <p className="mt-1.5 text-center font-extrabold uppercase tracking-[0.06em] text-[12px]">
              Ayush · Delhi
            </p>
            <span className="tape absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg]" aria-hidden="true" />
          </motion.div>

          {/* availability card, front-left */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, x: -26 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="absolute -left-1 bottom-6 z-30 w-[62%] rotate-[-2deg]"
          >
            <WindowCard title="available.txt" tone="mint" bodyClassName="bg-cream-100 px-2.5 py-2">
              <p className="display text-[13px] leading-tight">Q1 sprint open</p>
              <p className="mt-1 text-[11.5px] leading-tight text-ink/75">
                Booking studio sites, stores &amp; 3D worlds.
              </p>
            </WindowCard>
          </motion.div>

          {/* sticker, front-right */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -right-2 bottom-2 z-40 bob"
          >
            <Stamp top="4 live" bottom="builds" size={80} tone="sun" tilt={-7} />
          </motion.div>

          <span className="absolute -left-3 top-6 z-30 hidden rotate-[-8deg] rounded-[8px] border-2 border-ink bg-mint-200 px-2 py-1 shadow-hard3 tab:block">
            <p className="mono">60fps</p>
            <p className="display text-[12px] leading-none">motion</p>
          </span>
        </div>
      </div>

      <Marquee
        tone="ink"
        items={['CUSTOM CODE', 'ZERO TEMPLATES', 'SUB-1.5S LOADS', '60FPS MOTION', 'LIGHTHOUSE 95+', 'DELHI → WORLDWIDE']}
      />
    </section>
  )
}

/* ---------------------------------------------------------------- overview */
function Overview({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <section id="overview" data-section="Overview" className="relative bg-cream-200 py-[clamp(40px,6vw,72px)] grain">
      <div className="shell">
        <SectionHead
          index="I"
          label="Overview — who you are hiring"
          title={
            <>
              I make pixels and code <span className="text-grape-500">get along.</span>
            </>
          }
        />

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_320px] gap-5 tab:grid-cols-1">
          <WindowCard title="origin.txt" tone="sun" bodyClassName="bg-cream-100 p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-[150px] shrink-0 rotate-[-1.5deg] self-start">
                <div className="rounded-[10px] border-2 border-ink bg-sun-200 p-2 shadow-hard3">
                  <img
                    src="/art/avatar.png"
                    alt="Illustrated portrait of Ayush Thakur"
                    className="aspect-[6/5] w-full rounded-[5px] border-2 border-ink object-cover"
                  />
                  <p className="mt-1.5 text-center font-extrabold uppercase text-[11px]">Ayush · Delhi</p>
                </div>
                <div className="mt-2 flex justify-center">
                  <Stamp top="verified" bottom="since 2025" size={58} tone="mint" tilt={-6} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap gap-1.5">
                  <span className="chip !bg-grape-200">{profile.chip}</span>
                  <span className="chip !bg-mint-100">open for work</span>
                  <span className="chip">{profile.timezone}</span>
                </div>
                <p className="lead mt-3 text-ink/85">{profile.summary}</p>
                <p className="small mt-2 text-ink/70">
                  No page builders, no theme marketplaces — every layout here is hand-written React and CSS.
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['E-commerce', 'Interactive 3D', 'Editorial sites', 'Performance', 'Motion'].map((t) => (
                    <span key={t} className="rounded-[5px] border-2 border-ink px-1.5 py-[2px] font-mono text-[9.5px] font-medium uppercase">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="btn btn-ink !min-h-[38px] !text-[12px]" onClick={() => onNavigate('/portfolio')}>
                    Full catalogue ↗
                  </button>
                  <button type="button" className="btn !min-h-[38px] !text-[12px]" onClick={() => onNavigate('/resume')}>
                    Curriculum vitae
                  </button>
                </div>
              </div>
            </div>
          </WindowCard>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2.5">
              {profile.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`rounded-[9px] border-2 border-ink p-2.5 shadow-hard3 ${tileTone[i % 4]}`}
                >
                  <p className="font-black text-[clamp(22px,2.4vw,30px)] leading-none tracking-tight">{s.value}</p>
                  <p className="mt-1 text-[10.5px] font-bold uppercase leading-tight text-ink/75">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[10px] border-2 border-ink bg-ink p-3 text-cream-100 shadow-hard3">
              <p className="mono text-sun-300">currently</p>
              <p className="mt-1 text-[13.5px] leading-snug">
                Open for one Q1 sprint — e-commerce, studio site or an interactive 3D world.
              </p>
              <a href={gmailCompose()} target="_blank" rel="noreferrer noopener" className="mt-2 inline-flex min-h-[28px] items-center mono underline decoration-2 underline-offset-4 text-sun-300">
                send a brief ↗
              </a>
            </div>
          </div>
        </div>

        {/* practice strip */}
        <div className="mt-4 grid grid-cols-4 gap-2.5 tab:grid-cols-2 phone:grid-cols-1">
          {skills.slice(0, 4).map((g, i) => (
            <div key={g.group} className="rounded-[9px] border-2 border-ink bg-cream-100 p-2.5 shadow-hard2">
              <p className={`mono inline-block rounded-[4px] border-2 border-ink px-1.5 py-[1px] ${tileTone[i % 4]}`}>
                {g.group}
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.4] text-ink/80">{g.items.slice(0, 4).join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------ zip seam → plates */
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
  // each plate slides up out of the seam once the zip has passed it
  const from = 0.22 + index * 0.06
  const to = from + 0.22
  const y = useTransform(progress, [from, to], [90, 0])
  const opacity = useTransform(progress, [from, from + 0.12], [0, 1])
  const scale = useTransform(progress, [from, to], [0.94, 1])
  const rotate = useTransform(progress, [from, to], [index % 2 ? 2.5 : -2.5, 0])

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
  const p = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.45 })

  // the two halves peel away from the seam as the tab travels across it
  const topY = useTransform(p, [0.06, 0.52], ['0%', '-102%'])
  const bottomY = useTransform(p, [0.06, 0.52], ['0%', '102%'])
  const tabX = useTransform(p, [0.03, 0.56], ['0%', '100%'])
  const tabOpacity = useTransform(p, [0.52, 0.6], [1, 0])
  const gapScale = useTransform(p, [0.08, 0.5], [0, 1])

  useMotionValueEvent(p, 'change', (v) => setRevealed(!animated || v > 0.12))

  useEffect(() => {
    const el = gridRef.current as (HTMLDivElement & { inert: boolean }) | null
    if (el) el.inert = animated ? !revealed : false
  }, [revealed, animated])

  return (
    <section
      id="plates"
      ref={ref}
      data-section="Plates"
      className={`relative bg-tang-300 stripes ${animated ? 'desk:h-[215vh]' : ''}`}
    >
      <div className="relative desk:sticky desk:top-0 desk:h-[100svh] desk:overflow-hidden">
        {/* ---------------- the projects, revealed by the zip ---------------- */}
        <div
          ref={gridRef}
          className="relative flex h-full flex-col justify-center gap-5 py-[clamp(28px,4vw,52px)]"
        >
          <div className="pointer-events-none absolute inset-0 grain" />
          <div className="shell relative flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip !bg-sun-300">II — plates</span>
                <span className="chip">2025 – 2026</span>
                <span className="chip !bg-mint-200">4 live sites</span>
              </div>
              <h2 className="display h2 mt-2">
                The <span className="highlight-type">work</span>, unzipped.
              </h2>
            </div>
            <p className="mono max-w-[24ch] text-ink/70 desk:text-right">
              {animated ? 'the zip is open — pick a site' : 'four live builds, open a file'}
            </p>
          </div>

          <div className="shell grid grid-cols-4 gap-3 tab:grid-cols-2 phone:grid-cols-1">
            {projects.map((pr, i) =>
              animated ? (
                <PlateIn key={pr.id} project={pr} index={i} progress={p} onOpen={onOpen} />
              ) : (
                <Plate key={pr.id} project={pr} onOpen={onOpen} variant="list" />
              )
            )}
          </div>
        </div>

        {/* ---------------- the closed zip ---------------- */}
        {animated && (
          <>
            <motion.div
              className="absolute inset-x-0 top-0 z-10 h-1/2 overflow-hidden border-b-2 border-ink bg-sun-300"
              style={{ y: topY }}
              aria-hidden="true"
            >
              <div className="pointer-events-none absolute inset-0 halftone opacity-[0.09]" />
              <div className="shell relative flex h-full flex-col justify-between py-5">
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
              <div className="shell relative flex h-full flex-col justify-between py-5">
                <div className="flex items-start justify-between gap-6">
                  <p className="max-w-[34ch] text-[13.5px] leading-snug text-cream-200">
                    {projects.map((p2) => p2.title).join(' · ')}
                  </p>
                  <span className="mono text-cream-200">scroll to open</span>
                </div>
                <span className="mono text-cream-200">Ayush Thakur — catalogue of work</span>
              </div>
            </motion.div>

            {/* the gap where the teeth have parted */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-1/2 z-[11] h-6 -translate-y-1/2 bg-cream-100/0"
              style={{ scaleY: gapScale }}
              aria-hidden="true"
            />

            {/* the tab, riding the seam left → right */}
            <motion.div
              className="pointer-events-none absolute left-0 top-1/2 z-20 -translate-y-1/2"
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

/* -------------------------------------------------------------- engagement */
function Engagement({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <section id="engagement" data-section="Engagement" className="bg-cream-100 py-[clamp(36px,5vw,64px)]">
      <div className="shell">
        <SectionHead
          index="III"
          label="Engagement — the tariff"
          title={
            <>
              Pick a <span className="text-grape-500">sprint.</span>
            </>
          }
          note="Three ways to work together. Each ships in one sprint with the repository, the deploy and two weeks of support."
        />
        <Tariff />
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-ink" onClick={() => onNavigate('/portfolio')}>
            Full catalogue ↗
          </button>
          <ArrowLink href={gmailCompose()} external>
            {profile.email}
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- notes */
function Notes() {
  return (
    <section id="notes" data-section="Notes" className="relative bg-grape-100 py-[clamp(36px,5vw,64px)] grain">
      <div className="shell grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 tab:grid-cols-1">
        <div>
          <SectionHead index="IV" label="Notes" title={<>Questions, answered.</>} />
        </div>
        <Faq />
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
      <Overview onNavigate={onNavigate} />
      <ZipStage onOpen={setOpen} />
      <Engagement onNavigate={onNavigate} />
      <Notes />
      <ContactBand onNavigate={onNavigate} />
      <Dossier project={open} onClose={() => setOpen(null)} />
    </div>
  )
}
