import { profile } from '../lib/site'

/** One-line footer: everything the long scrolls used to carry, in 44px. */
export function SlimFooter({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <footer className="border-t-2 border-ink bg-ink text-cream-100">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-3 py-2.5">
        <p className="mono text-cream-200">
          © {new Date().getFullYear()} {profile.name} · delhi, in
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <a
            href={profile.socials[1].href}
            target="_blank"
            rel="noreferrer noopener"
            className="mono flex min-h-[26px] items-center rounded-[4px] border-2 border-ink bg-sun-300 px-2 text-[10px] text-ink"
          >
            email ↗
          </a>
          <a
            href={profile.socials[2].href}
            target="_blank"
            rel="noreferrer noopener"
            className="mono flex min-h-[26px] items-center rounded-[4px] border-2 border-ink bg-mint-200 px-2 text-[10px] text-ink"
          >
            whatsapp ↗
          </a>
          <a
            href={profile.socials[0].href}
            target="_blank"
            rel="noreferrer noopener"
            className="mono flex min-h-[26px] items-center rounded-[4px] border-2 border-ink bg-grape-400 px-2 text-[10px] text-cream-100"
          >
            linkedin ↗
          </a>
          <a
            href="/ayush-thakur-cv.pdf"
            download
            className="mono flex min-h-[26px] items-center rounded-[4px] border-2 border-ink bg-cream-100 px-2 text-[10px] text-ink"
          >
            cv ↓
          </a>
          <button
            type="button"
            onClick={() => onNavigate('/portfolio')}
            className="mono flex min-h-[26px] items-center rounded-[4px] border-2 border-ink bg-cream-100 px-2 text-[10px] text-ink"
          >
            portfolio
          </button>
        </div>
      </div>
    </footer>
  )
}
