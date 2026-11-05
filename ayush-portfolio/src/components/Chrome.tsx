import { useRouter } from '../lib/router'
import { socials } from '../lib/site'
import { SocialLink } from './Socials'

const HINTS: Record<string, string> = {
  '/': 'Scroll for the overview — the zip opens onto the work',
  '/portfolio': 'Check out the project cartridges — click one to open its case study',
  '/resume': 'Prefer paper? Grab the PDF on the right',
}

const navChip =
  'flex h-[32px] shrink-0 items-center gap-1.5 rounded-[6px] border-2 border-ink px-2.5 text-[12px] font-extrabold uppercase tracking-[0.05em] shadow-hard2 transition-transform hover:-translate-y-[1px]'

/** Top bar: HOME · PORTFOLIO · hint chip · contact logos · RÉSUMÉ · DOWNLOAD CV */
export function Toolbar() {
  const { route, navigate } = useRouter()

  return (
    <div className="fixed inset-x-0 top-0 z-[var(--z-nav)] border-b-2 border-ink bg-cream-100">
      <div className="mx-auto flex h-[46px] max-w-[1560px] items-center gap-1.5 px-2">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Home"
          aria-current={route === '/' ? 'page' : undefined}
          className={`${navChip} ${route === '/' ? 'bg-grape-400 text-cream-100' : 'bg-cream-100'}`}
        >
          <span aria-hidden="true">←</span>
          <span className="hidden sm:inline">Home</span>
        </button>
        <button
          type="button"
          onClick={() => navigate('/portfolio')}
          aria-current={route === '/portfolio' ? 'page' : undefined}
          className={`${navChip} ${
            route === '/portfolio' ? 'bg-grape-400 text-cream-100' : 'bg-cream-100'
          }`}
        >
          Portfolio
        </button>

        <p className="ml-1 hidden items-center gap-1.5 rounded-[6px] border-2 border-ink bg-sun-100 px-2.5 py-[3px] text-[12px] font-semibold text-ink desk:flex">
          <span aria-hidden="true">✦</span>
          {HINTS[route] ?? HINTS['/']}
        </p>

        <div className="ml-auto flex items-center gap-1.5">
          {/* the three contact logos, always one click away on a wide screen */}
          <ul className="hidden items-center gap-1.5 desk:flex" aria-label="Contact links">
            {socials.map((s) => (
              <li key={s.id}>
                <SocialLink id={s.id} label={false} markClass="size-[20px]" glyphClass="size-[12px]" />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => navigate('/resume')}
            aria-current={route === '/resume' ? 'page' : undefined}
            className={`${navChip} ${route === '/resume' ? 'bg-mint-300' : 'bg-mint-200'}`}
          >
            Résumé
          </button>
          <a href="/ayush-thakur-cv.pdf" download className={`${navChip} bg-sun-300`}>
            <span aria-hidden="true">↓</span>
            <span className="hidden sm:inline">Download </span>CV
          </a>
        </div>
      </div>
    </div>
  )
}

/** The phone-shaped contact widget, pinned to the right on wide screens. */
export function PhoneContact() {
  return (
    <aside
      className="fixed right-3 top-1/2 z-[var(--z-nav)] hidden -translate-y-1/2 desk:block"
      aria-label="Quick contact"
    >
      <div className="relative w-[128px] rounded-[14px] border-2 border-ink bg-chilli-300 p-2 shadow-hard5">
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
          {socials.map((s) => (
            <SocialLink
              key={s.id}
              id={s.id}
              className="!min-h-[24px] w-full justify-center !gap-1 !px-1 !text-[9px]"
              markClass="size-[15px]"
              glyphClass="size-[9px]"
            />
          ))}
        </div>
      </div>
    </aside>
  )
}
