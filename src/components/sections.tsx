import { useState } from 'react'
import { ArrowLink, Reveal, Stamp } from './primitives'
import { faq, gmailCompose, guarantees, profile, sprints } from '../lib/site'

const guaranteeTone = ['bg-sun-100', 'bg-grape-100', 'bg-mint-100', 'bg-chilli-100']

/* ------------------------------------------------------------------ tariff */
export function Tariff() {
  const tones = ['bg-cream-100', 'bg-sun-300', 'bg-grape-200']
  return (
    <>
      <div className="mt-8 grid grid-cols-3 gap-4 tab:grid-cols-1">
        {sprints.map((s, i) => (
          <Reveal key={s.tag} delay={i * 0.06}>
            <div className={`card relative flex h-full flex-col p-4 ${tones[i % 3]}`}>
              {s.popular && (
                <span className="absolute -right-3 -top-3">
                  <Stamp top="most" bottom="popular" size={64} tone="chilli" tilt={9} />
                </span>
              )}
              <p className="mono text-ink/70">{s.tag}</p>
              <h3 className="display mt-1.5 text-[clamp(17px,1.5vw,20px)] leading-[1.05]">{s.title}</h3>
              <p className="mt-2.5 font-black text-[clamp(22px,2.2vw,28px)] leading-none tracking-tight">{s.price}</p>
              <p className="mono mt-1 text-ink/60">{s.usd}</p>
              <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-[5px] border-2 border-ink bg-cream-100 px-1.5 py-[2px] mono">
                ⚡ {s.eta.replace('Turnaround: ', '')}
              </p>
              <ul className="mt-3 flex flex-1 flex-col gap-1.5 border-t-2 border-dashed border-ink/40 pt-2.5">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[13.5px] leading-[1.35]">
                    <span aria-hidden="true" className="mt-[6px] size-[5px] shrink-0 rounded-full bg-ink" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href={gmailCompose(`Sprint ${i + 1} — project enquiry`)}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ink mt-3 w-full !min-h-[38px] !text-[12px]"
              >
                Book sprint {i + 1} ↗
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3 tab:grid-cols-2 phone:grid-cols-1">
        {guarantees.map((g, i) => (
          <div key={g.title} className={`rounded-[10px] border-2 border-ink p-3 shadow-hard3 ${guaranteeTone[i % 4]}`}>
            <p className="display text-[13.5px] leading-tight">{g.title}</p>
            <p className="mt-1.5 text-[12.5px] leading-[1.4] text-ink/85">{g.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

/* --------------------------------------------------------------------- faq */
export function Faq({ startOpen = 0 }: { startOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(startOpen)
  return (
    <ul className="flex flex-col gap-2">
      {faq.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.q} className={`overflow-hidden rounded-[10px] border-2 border-ink shadow-hard3 ${isOpen ? 'bg-sun-100' : 'bg-cream-100'}`}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink bg-cream-100 font-black text-[10px]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 text-[14.5px] font-bold leading-tight">{item.q}</span>
                <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-[5px] border-2 border-ink bg-sun-300 font-black text-[13px]">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h3>
            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-400 ease-pop"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="min-h-0">
                <p className="px-3 pb-3 pl-12 text-[13.5px] leading-[1.5] text-ink/85">{item.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/* ------------------------------------------------------------- contact band */
export function ContactBand({ onNavigate, compact = false }: { onNavigate: (to: string) => void; compact?: boolean }) {
  return (
    <section id="contact" data-section="Contact" className="relative overflow-hidden bg-ink text-cream-100">
      <div className="pointer-events-none absolute inset-0 halftone opacity-[0.12]" />
      <div className={`shell relative ${compact ? 'py-10' : 'py-[clamp(48px,8vw,96px)]'}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-[5px] border-2 border-ink bg-sun-300 px-2 py-0.5 mono text-ink">Contact</span>
          <span className="mono text-cream-200">{profile.location} · {profile.timezone}</span>
        </div>
        <h2 className={`display mt-4 text-sun-300 ${compact ? 'h2' : 'h1'}`}>
          Let’s build
          <br />
          <span className="text-cream-100">something legendary.</span>
        </h2>
        <p className="lead mt-4 max-w-[52ch] text-cream-200">
          Storefront, studio site or an odd idea that needs a 3D world — send it over with the timeline. I reply
          within a day.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={gmailCompose()} target="_blank" rel="noreferrer noopener" className="btn btn-sun">
            {profile.email}
          </a>
          <a href={profile.socials[2].href} target="_blank" rel="noreferrer noopener" className="btn btn-mint">
            WhatsApp ↗
          </a>
          <a href={profile.socials[0].href} target="_blank" rel="noreferrer noopener" className="btn !bg-grape-400 !text-cream-100">
            LinkedIn ↗
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t-2 border-cream-100/25 pt-4">
          <p className="mono text-cream-200">
            © {new Date().getFullYear()} {profile.name} · built by hand, no templates
          </p>
          <div className="flex flex-wrap gap-4">
            <button type="button" className="mono inline-flex min-h-[28px] items-center text-cream-200 underline decoration-2 underline-offset-4 hover:text-sun-300" onClick={() => onNavigate('/portfolio')}>
              Catalogue
            </button>
            <button type="button" className="mono inline-flex min-h-[28px] items-center text-cream-200 underline decoration-2 underline-offset-4 hover:text-sun-300" onClick={() => onNavigate('/resume')}>
              Curriculum
            </button>
            <a href="#top" className="mono inline-flex min-h-[28px] items-center text-cream-200 underline decoration-2 underline-offset-4 hover:text-sun-300">
              Top ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ArrowLink }
