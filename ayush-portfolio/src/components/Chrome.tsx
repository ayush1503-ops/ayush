import { useRouter } from '../lib/router'
import { profile } from '../lib/site'

const HINTS: Record<string, string> = {
  '/': 'Scroll for the overview — the zip opens onto the work',
  '/portfolio': 'Check out the project cartridges — click one to open its case study',
  '/resume': 'Prefer paper? Grab the PDF on the right',
}

/** The reference's top bar: HOME · PORTFOLIO · hint chip · RÉSUMÉ · DOWNLOAD CV */
export function Toolbar() {
  const { route, navigate } = useRouter()
  return (
    <div className="fixed inset-x-0 top-0 z-[var(--z-nav)] border-b-2 border-ink bg-cream-100">
      <div className="mx-auto flex h-[46px] max-w-[1560px] items-center gap-1.5 px-2">
        <button
          type="button"
          onClick={() => navigate('/')}
          className={`flex h-[32px] items-center gap-1.5 rounded-[6px] border-2 border-ink px-2.5 text-[12px] font-extrabold uppercase tracking-[0.05em] shadow-hard2 transition-transform hover:-translate-y-[1px] ${
            route === '/' ? 'bg-grape-400 text-cream-100' : 'bg-cream-100'
          }`}
        >
          <span aria-hidden="true">←</span> Home
        </button>
        <button
          type="button"
          onClick={() => navigate('/portfolio')}
          className={`flex h-[32px] items-center rounded-[6px] border-2 border-ink px-2.5 text-[12px] font-extrabold uppercase tracking-[0.05em] shadow-hard2 transition-transform hover:-translate-y-[1px] ${
            route === '/portfolio' ? 'bg-grape-400 text-cream-100' : 'bg-cream-100'
          }`}
        >
          Portfolio
        </button>

        <p className="ml-1 hidden items-center gap-1.5 rounded-[6px] border-2 border-ink bg-sun-100 px-2.5 py-[3px] text-[12px] font-semibold text-ink desk:flex">
          <span aria-hidden="true">✦</span>
          {HINTS[route] ?? HINTS['/']}
        </p>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/resume')}
            className={`flex h-[32px] items-center rounded-[6px] border-2 border-ink px-2.5 text-[12px] font-extrabold uppercase tracking-[0.05em] shadow-hard2 transition-transform hover:-translate-y-[1px] ${
              route === '/resume' ? 'bg-mint-300' : 'bg-mint-200'
            }`}
          >
            Résumé
          </button>
          <a
            href="/ayush-thakur-cv.pdf"
            download
            className="flex h-[32px] items-center gap-1.5 rounded-[6px] border-2 border-ink bg-sun-300 px-2.5 text-[12px] font-extrabold uppercase tracking-[0.05em] shadow-hard2 transition-transform hover:-translate-y-[1px]"
          >
            <span aria-hidden="true">↓</span>
            <span className="hidden sm:inline">Download </span>CV
          </a>
        </div>
      </div>
    </div>
  )
}

/** The reference's phone-shaped contact widget, pinned to the right. */
export function PhoneContact() {
  const [linkedin, email, whatsapp] = [profile.socials[0], profile.socials[1], profile.socials[2]]
  return (
    <aside
      className="fixed right-3 top-1/2 z-[var(--z-nav)] hidden -translate-y-1/2 desk:block"
      aria-label="Quick contact"
    >
      <div className="relative w-[112px] rounded-[14px] border-2 border-ink bg-chilli-300 p-2 shadow-hard5">
        {/* antenna */}
        <span aria-hidden="true" className="absolute -right-1.5 -top-3 h-3.5 w-2 rounded-t-[2px] border-2 border-ink bg-ink" />
        {/* screen */}
        <div className="rounded-[6px] border-2 border-ink bg-mint-200 px-1.5 py-1.5">
          <p className="mono text-[7.5px] text-ink/60">contact</p>
          <p className="mt-0.5 text-[10.5px] font-black uppercase leading-none">Ayush</p>
          <p className="mono mt-0.5 text-[7px] text-ink/70">delhi · ist</p>
        </div>
        {/* speaker grille */}
        <div aria-hidden="true" className="mt-1 flex justify-center gap-[3px] rounded-[3px] border border-ink/60 bg-chilli-500 px-1 py-[3px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="h-2 w-[2px] bg-ink/70" />
          ))}
        </div>
        <div className="mt-1.5 flex flex-col gap-1">
          {[
            { label: 'LinkedIn', href: linkedin.href },
            { label: 'Email', href: email.href },
            { label: 'WhatsApp', href: whatsapp.href },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-[24px] items-center justify-center rounded-[4px] border-2 border-ink bg-grape-300 text-[9px] font-black uppercase tracking-[0.04em] text-cream-100 transition-colors hover:bg-grape-400"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}
