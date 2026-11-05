import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/* ---------------------------------------------------------------- reveal */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -6% 0px' }}
      transition={{ duration: 0.62, delay, ease: [0.34, 1.2, 0.4, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------- line-by-line type */
export function Lines({
  lines,
  className = '',
  delay = 0,
  stagger = 0.08,
  as: Tag = 'h1',
}: {
  lines: (string | ReactNode)[]
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}) {
  const reduced = useReducedMotion()
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.08em]"
          initial={reduced ? undefined : 'hidden'}
          whileInView={reduced ? undefined : 'show'}
          viewport={{ once: true, margin: '-8%' }}
        >
          <motion.span
            className="block"
            variants={{
              hidden: { y: '112%' },
              show: { y: '0%', transition: { duration: 0.85, delay: delay + i * stagger, ease: [0.16, 0.84, 0.24, 1] } },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

/* --------------------------------------------------------------- magnetic */
export function Magnetic({ children, strength = 10 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 16, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 260, damping: 16, mass: 0.3 })

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={reduced ? undefined : { x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduced || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2)
        y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

/* ------------------------------------------------------------ window card */
export function WindowCard({
  title,
  tone = 'sun',
  children,
  className = '',
  bodyClassName = '',
}: {
  title: string
  tone?: 'sun' | 'grape' | 'mint' | 'chilli' | 'cream'
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  const tones = {
    sun: 'bg-sun-300 text-ink',
    grape: 'bg-grape-400 text-cream-100',
    mint: 'bg-mint-200 text-ink',
    chilli: 'bg-chilli-300 text-ink',
    cream: 'bg-cream-200 text-ink',
  }
  return (
    <div className={`card overflow-hidden bg-cream-100 ${className}`}>
      <div className={`win-bar ${tones[tone]}`}>
        <span>{title}</span>
        <span className="win-dots" aria-hidden="true">
          <i className="!bg-sun-200" />
          <i className="!bg-cream-100" />
          <i className="!bg-chilli-300" />
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}

/* --------------------------------------------------------- section heading */
export function SectionHead({
  index,
  label,
  title,
  note,
  tone = 'ink',
}: {
  index: string
  label: string
  title: ReactNode
  note?: string
  tone?: 'ink' | 'cream'
}) {
  const text = tone === 'cream' ? 'text-cream-100' : 'text-ink'
  const sub = tone === 'cream' ? 'text-cream-200' : 'text-ink'
  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`grid size-8 place-items-center rounded-full border-2 border-ink bg-cream-100 font-black text-[11px] ${text}`}>
          {index}
        </span>
        <span className={`mono ${sub}`}>{label}</span>
        <span className="h-[2px] flex-1 bg-ink/30" />
        <span className={`mono hidden tab:block ${sub}`}>Ayush Thakur — vol. 01</span>
      </div>
      <h2 className={`display h2 ${text}`}>{title}</h2>
      {note ? <p className={`small max-w-[58ch] font-medium ${tone === 'cream' ? 'text-cream-200' : 'text-ink/80'}`}>{note}</p> : null}
    </header>
  )
}

/* -------------------------------------------------------------- arrow link */
export function ArrowLink({
  children,
  href,
  onClick,
  external,
  className = '',
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  external?: boolean
  className?: string
}) {
  const inner = (
    <>
      <span className="underline decoration-2 underline-offset-4">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        ↗
      </span>
    </>
  )
  const cls = `group inline-flex min-h-[28px] items-center gap-2 py-1 font-extrabold uppercase tracking-[0.04em] text-[13.5px] ${className}`
  if (href) {
    return (
      <a href={href} className={cls} target={external ? '_blank' : undefined} rel={external ? 'noreferrer noopener' : undefined}>
        {inner}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}

/* ----------------------------------------------------------------- marquee */
export function Marquee({
  items,
  tone = 'ink',
  reverse = false,
  className = '',
}: {
  items: string[]
  tone?: 'ink' | 'sun' | 'grape' | 'cream' | 'mint'
  reverse?: boolean
  className?: string
}) {
  const tones = {
    ink: 'bg-ink text-sun-300',
    sun: 'bg-sun-300 text-ink',
    grape: 'bg-grape-300 text-cream-100',
    cream: 'bg-cream-100 text-ink',
    mint: 'bg-mint-200 text-ink',
  }
  const ref = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setPaused(!e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const row = [...items, ...items, ...items, ...items]
  return (
    <div
      ref={ref}
      className={`overflow-hidden border-y-2 border-ink py-2 ${tones[tone]} ${className}`}
      aria-hidden="true"
    >
      <div className={`marquee-track ${paused ? 'is-paused' : ''}`} style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {row.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-4 px-4 font-extrabold uppercase tracking-[0.06em] text-[13px]">
            {t}
            <span className="text-[15px] leading-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- stamp */
export function Stamp({
  top,
  bottom,
  size = 76,
  tone = 'sun',
  className = '',
  tilt = -8,
}: {
  top: string
  bottom?: string
  size?: number
  tone?: 'sun' | 'grape' | 'mint' | 'chilli' | 'cream'
  className?: string
  tilt?: number
}) {
  const tones = {
    sun: 'bg-sun-300 text-ink',
    grape: 'bg-grape-300 text-cream-100',
    mint: 'bg-mint-200 text-ink',
    chilli: 'bg-chilli-300 text-ink',
    cream: 'bg-cream-100 text-ink',
  }
  return (
    <span
      className={`stamp shadow-hard3 ${tones[tone]} ${className}`}
      style={{ width: size, height: size, transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      <span className="block px-1.5 text-[9.5px] font-black leading-[1.05]">
        {top}
        {bottom ? (
          <>
            <br />
            <span className="text-[8.5px] opacity-80">{bottom}</span>
          </>
        ) : null}
      </span>
    </span>
  )
}

/* ------------------------------------------------------------- IST clock */
export function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
          hour12: false,
        }).format(new Date())
      )
    tick()
    const id = window.setInterval(tick, 20000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <span className="mono tabular-nums" aria-label="Local time in Delhi">
      {time} IST
    </span>
  )
}

/* ------------------------------------------------------ scroll progress bar */
export function Progress() {
  const { scrollYProgress } = useScrollProgress()
  const width = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[calc(var(--z-nav)+1)] h-[5px] w-full bg-transparent">
      <motion.div className="h-full border-r-2 border-ink bg-sun-300" style={{ width }} />
    </div>
  )
}

function useScrollProgress() {
  const scrollYProgress = useMotionValue(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      scrollYProgress.set(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scrollYProgress])
  return { scrollYProgress }
}
