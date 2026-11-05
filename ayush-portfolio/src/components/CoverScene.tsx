import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from '../lib/router'
import { profile, social, socials } from '../lib/site'
import { SocialLink, SocialMark } from './Socials'

/* ------------------------------------------------------------------ badges */
function EnamelBadge({
  image,
  alt,
  label,
  tone,
  size = 92,
  className = '',
  spin = false,
}: {
  image: string
  alt: string
  label: string
  tone: string
  size?: number
  className?: string
  spin?: boolean
}) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full border-[3px] border-ink shadow-hard3"
        style={{ background: tone, clipPath: 'polygon(100% 50%, 93% 61%, 97% 74%, 86% 82%, 85% 95%, 71% 96%, 65% 108%, 52% 103%, 42% 112%, 32% 103%, 20% 108%, 14% 96%, 1% 95%, 0% 82%, -9% 74%, -5% 61%, -12% 50%, -5% 39%, -9% 26%, 0% 18%, 1% 5%, 14% 4%, 20% -8%, 32% -3%, 42% -12%, 52% -3%, 65% -8%, 71% 4%, 85% 5%, 86% 18%, 97% 26%, 93% 39%)' }}
      />
      <div className={`absolute inset-[7px] overflow-hidden rounded-full border-2 border-ink bg-cream-100 ${spin ? 'spin' : ''}`}>
        <img src={image} alt={alt} className="h-full w-full object-cover" />
        <span className="absolute inset-x-0 bottom-0 bg-ink py-[1px] text-center text-[6.5px] font-black uppercase tracking-[0.04em] text-cream-100">
          {label}
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------- cover tab trio */
function TabCard({
  title,
  tone,
  sub,
  onClick,
  tilt,
  children,
}: {
  title: string
  tone: string
  sub: string
  onClick?: () => void
  tilt: number
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block w-[98px] text-left tab:w-[112px] desk:w-[132px]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span className={`block rounded-t-[8px] border-2 border-b-0 border-ink px-2 py-1.5 text-center text-[12px] font-black uppercase tracking-[0.06em] ${tone}`}>
        {title}
      </span>
      <span className="block border-2 border-ink bg-cream-100 px-1.5 py-2 shadow-hard3 transition-transform duration-300 group-hover:-translate-y-1">
        <span className="mono block rounded-[3px] border border-ink/50 px-1 py-[1px] text-center text-[7px] text-ink/70">
          {sub}
        </span>
        {children}
      </span>
    </button>
  )
}

/* ------------------------------------------------------------- ID badge */
function IdBadge() {
  return (
    <div className="relative w-[190px] rotate-[-3deg]">
      {/* lanyard */}
      <div aria-hidden="true" className="absolute -top-10 left-1/2 h-10 w-[22px] -translate-x-1/2 rounded-[3px] border-2 border-ink bg-chilli-500">
        <span className="absolute inset-x-[5px] top-2 bottom-2 border border-ink/40" />
        <span className="absolute left-1/2 top-1/2 h-4 w-6 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border-2 border-ink bg-cream-100" />
      </div>
      <span aria-hidden="true" className="absolute -top-2 left-1/2 h-3 w-8 -translate-x-1/2 rounded-[2px] border-2 border-ink bg-cream-200" />
      <div className="relative rounded-[12px] border-2 border-ink bg-sun-200 p-2 shadow-hard5">
        <div className="overflow-hidden rounded-[7px] border-2 border-ink">
          <img src="/art/avatar.png" alt="Illustrated portrait of Ayush Thakur" className="aspect-[6/5] w-full object-cover" />
        </div>
        <p className="mt-1.5 rounded-[5px] border-2 border-ink bg-cream-100 px-1.5 py-[3px] text-center text-[13px] font-black uppercase leading-none">
          {profile.name.split(' ')[0]}
        </p>
        <p className="mt-1 rounded-[5px] border-2 border-ink bg-cream-100 px-1.5 py-[3px] text-center text-[9.5px] font-bold uppercase leading-none text-ink/80">
          Full-stack developer
        </p>
        <ul className="mt-1.5 flex justify-between gap-1">
          {socials.map((s) => (
            <li key={s.id}>
              <SocialLink
                id={s.id}
                label={false}
                className="!min-h-[30px] !p-[2px]"
                markClass="size-[26px]"
                glyphClass="size-[14px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ the cover */
export function CoverScene() {
  const { navigate } = useRouter()
  const reduced = useReducedMotion()
  const [desk, setDesk] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    const on = () => setDesk(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  const { scrollY } = useScroll()
  const zipY = useTransform(scrollY, [0, 900], [0, 260])

  return (
    <section className="relative overflow-hidden bg-tang-300 stripes grain">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] border-t-[3px] border-ink bg-tang-400/80" />

      {/* the zipper that runs down the page, exactly like the reference */}
      <div aria-hidden="true" className="absolute left-1/2 top-0 z-[6] hidden h-full w-[38px] -translate-x-1/2 desk:block">
        <div className="relative h-full w-full border-x-2 border-ink/80 bg-cream-200">
          {Array.from({ length: 64 }).map((_, i) => (
            <span
              key={i}
              className="absolute left-0 h-[2px] bg-ink"
              style={{ top: `${(i / 64) * 100}%`, width: i % 5 === 0 ? '100%' : '46%' }}
            />
          ))}
          <span className="absolute inset-x-0 top-0 h-6 bg-[repeating-linear-gradient(90deg,#0a0a0a_0_3px,transparent_3px_7px)] opacity-70" />
        </div>
        <motion.div style={reduced ? undefined : { y: zipY }} className="absolute left-1/2 top-[46%] -translate-x-1/2">
          <div className="relative">
            <div className="h-[46px] w-[62px] rounded-[5px] border-2 border-ink bg-sun-300 shadow-hard3" />
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 rounded-[5px] border-2 border-ink bg-grape-400 px-1.5 py-1 text-cream-100 shadow-hard2">
                <span className="mono text-[8px]">scroll</span>
                <span aria-hidden="true" className="text-[10px] leading-none">⌄</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-8 px-[5%] pb-12 pt-[calc(var(--site-header-h)+34px)] desk:h-[calc(100svh-var(--site-header-h))] desk:min-h-[620px] desk:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---------------- left: the paper note + badges ---------------- */}
        <div className="relative max-w-[560px]">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 22, rotate: -2 }}
            animate={reduced ? undefined : { opacity: 1, y: 0, rotate: -1.2 }}
            transition={{ duration: 0.7, ease: [0.34, 1.2, 0.4, 1] }}
            className="relative rounded-[10px] border-2 border-ink bg-cream-100 p-6 shadow-hard6"
          >
            {/* rivets */}
            {['left-2 top-2', 'right-2 top-2', 'left-2 bottom-2', 'right-2 bottom-2'].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} size-2 rounded-full border-2 border-ink/40 bg-cream-300`}
              />
            ))}
            <p className="mono text-ink/60">since 2025</p>
            <h1 className="display mt-2 text-[clamp(30px,4.4vw,58px)] leading-[0.94]">
              Custom code
              <br />
              for <span className="text-tang-300">complex</span>
              <br />
              brands
            </h1>
            <p className="small mt-3 max-w-[36ch] font-medium text-ink/80">
              {profile.name} — full-stack developer in Delhi. Hand-written React, CSS and WebGL, held to a
              sub-1.5s load budget.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="btn btn-ink !min-h-[38px] !text-[12px]" onClick={() => navigate('/portfolio')}>
                See the work ↗
              </button>
              <a
                href={social.gmail.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-sun !min-h-[38px] !text-[12px]"
              >
                <SocialMark id="gmail" className="size-[19px]" glyphClass="size-[11px]" />
                Start a project
              </a>
            </div>
          </motion.div>

          {/* enamel badges, pinned exactly like the reference */}
          <div className="pointer-events-none absolute -right-4 -top-10 hidden tab:block">
            <EnamelBadge image="/art/mascot-bee.png" alt="" label="ships on time" tone="#f3670e" size={82} spin />
          </div>
          <div className="pointer-events-none absolute -bottom-12 left-2 flex origin-bottom-left items-end gap-2 phone:scale-[0.72]">
            <EnamelBadge image="/art/mascot-bird.png" alt="" label="no templates" tone="#4b6aff" size={74} />
            <EnamelBadge image="/art/mascot-dog.png" alt="" label="hand coded" tone="#ffd31e" size={74} />
          </div>
        </div>

        {/* ---------------- right: tabs + container + lanyard ---------------- */}
        <div className="relative mx-auto w-full max-w-[540px] desk:pl-8">
          <div className="relative">
            {/* tab trio sitting on the container */}
            <div className="relative z-20 -mb-1 flex items-end justify-center gap-1.5">
              <TabCard title="Résumé" tone="bg-sun-300" sub="read" tilt={-2} onClick={() => navigate('/resume')} />
              <TabCard title="Portfolio" tone="bg-grape-400 text-cream-100" sub="choose" tilt={0} onClick={() => navigate('/portfolio')} />
              <TabCard title="Contact" tone="bg-chilli-300" sub="write" tilt={2} onClick={() => navigate('/portfolio#contact')} />
            </div>

            {/* the red striped container */}
            <div className="relative z-10 overflow-hidden rounded-b-[10px] border-2 border-ink bg-chilli-400 shadow-hard6">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(10,10,10,0.22) 0 10px, transparent 10px 26px)' }}
              />
              <div className="relative flex items-end gap-2 p-3">
                <img src="/art/folder-art.png" alt="" className="h-[150px] flex-1 rounded-[6px] border-2 border-ink object-cover" />
                <img src="/art/folder-art.png" alt="" className="hidden h-[110px] w-[42%] rounded-[6px] border-2 border-ink object-cover tab:block" />
              </div>
              <p className="relative border-t-2 border-ink bg-ink py-1 pl-3 pr-2 text-left text-[9.5px] font-black uppercase tracking-[0.05em] text-sun-300 desk:pl-[248px] desk:pr-4">
                4 case files · open laptop
              </p>
            </div>

            {/* desk props, like the reference's can and phone */}
            <div aria-hidden="true" className="absolute -right-3 bottom-4 z-20 hidden items-end gap-1.5 desk:flex">
              <span className="h-[64px] w-[26px] rounded-[5px] border-2 border-ink bg-chilli-400 shadow-hard2" />
              <span className="flex h-[78px] w-[40px] flex-col gap-[3px] rounded-[6px] border-2 border-ink bg-chilli-300 p-1 shadow-hard2">
                <span className="block h-[26px] rounded-[2px] border border-ink bg-mint-200" />
                <span className="block h-[7px] rounded-[1px] border border-ink bg-grape-300" />
                <span className="block h-[7px] rounded-[1px] border border-ink bg-grape-300" />
              </span>
            </div>

            {/* lanyard badge hanging over the container */}
            <motion.div
              initial={reduced ? undefined : { opacity: 0, y: -16 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute -bottom-12 left-[8%] z-30 origin-bottom phone:static phone:mx-auto phone:mt-3 phone:w-fit"
            >
              <div className="origin-top scale-[0.72] desk:scale-[0.8]">
                <IdBadge />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
