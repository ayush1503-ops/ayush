import { profile } from '../lib/site'
import { SocialLink } from './Socials'

/** One-line footer: real contact logos, CV and the catalogue, in 44px. */
export function SlimFooter({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <footer className="border-t-2 border-ink bg-ink text-cream-100">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-3 py-2.5">
        <p className="mono text-cream-200">
          © {new Date().getFullYear()} {profile.name} · delhi, in
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <ul className="flex items-center gap-1.5" aria-label="Contact links">
            {(['gmail', 'whatsapp', 'linkedin'] as const).map((id) => (
              <li key={id}>
                <SocialLink id={id} label={false} />
              </li>
            ))}
          </ul>
          <a
            href="/ayush-thakur-cv.pdf"
            download
            className="mono flex min-h-[30px] items-center rounded-[4px] border-2 border-ink bg-cream-100 px-2 text-[10px] text-ink shadow-hard2"
          >
            cv ↓
          </a>
          <button
            type="button"
            onClick={() => onNavigate('/portfolio')}
            className="mono flex min-h-[30px] items-center rounded-[4px] border-2 border-ink bg-cream-100 px-2 text-[10px] text-ink shadow-hard2"
          >
            portfolio
          </button>
        </div>
      </div>
    </footer>
  )
}
