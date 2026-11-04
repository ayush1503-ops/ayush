import type { Project } from '../lib/site'
import { profile } from '../lib/site'
import { CartridgeRack } from './CartridgeRack'

/**
 * The reference's portfolio page: a laptop on the desk with PORTFOLIO.EXE running
 * on the screen, a window shelf behind it, a can and a phone on the desk.
 */
export function DeskScene({
  onOpen,
  onHome,
}: {
  onOpen: (p: Project) => void
  onHome: () => void
}) {
  return (
    <div className="relative overflow-hidden border-b-2 border-ink bg-tang-300">
      {/* wall: blue shelf with a tower on the left, striped wallpaper on the right */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[46%] bg-grape-300">
          {[18, 34, 52, 70].map((t) => (
            <span key={t} className="absolute inset-x-0 h-[3px] bg-grape-500/60" style={{ top: `${t}%` }} />
          ))}
          {/* tower */}
          <div className="absolute left-[14%] top-[12%] flex h-[58%] w-[26px] flex-col items-center">
            <span className="h-[8px] w-[8px] rounded-full border-2 border-ink bg-sun-300" />
            <span className="h-[26%] w-[10px] border-2 border-ink bg-chilli-300" />
            <span className="h-[16%] w-[34px] rounded-[4px] border-2 border-ink bg-sun-300" />
            <span className="h-[20%] w-[14px] border-2 border-ink bg-mint-200" />
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-[54%] bg-cream-300" style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(10,10,10,0.12) 0 12px, transparent 12px 34px)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[30%] border-t-[3px] border-ink bg-tang-400" />
      </div>

      <div className="relative mx-auto w-full max-w-[1180px] px-3 pb-6 pt-[calc(var(--site-header-h)+16px)] pr-[104px] desk:pr-[110px]">
        {/* the laptop */}
        <div className="mx-auto w-full max-w-[880px]">
          {/* lid */}
          <div className="relative rounded-t-[26px] rounded-b-[10px] border-[3px] border-ink bg-mint-200 px-4 pb-4 pt-5 shadow-hard8">
            <div className="relative rounded-[10px] border-[3px] border-ink bg-cream-100 p-2">
              {/* screen content */}
              <div className="max-h-[52svh] overflow-y-auto desk:max-h-[46svh]">
                <CartridgeRack onOpen={onOpen} />
              </div>
            </div>
            <button
              type="button"
              onClick={onHome}
              aria-label="Back to the cover"
              className="absolute -bottom-4 left-1/2 grid size-8 -translate-x-1/2 place-items-center rounded-full border-2 border-ink bg-grape-300 text-cream-100 shadow-hard2 transition-transform hover:-translate-y-[1px]"
            >
              <span aria-hidden="true" className="text-[11px]">⌂</span>
            </button>
          </div>
          {/* base + keyboard */}
          <div className="relative mx-auto -mt-1 h-[84px] w-[104%] max-w-none -translate-x-[2%] rounded-b-[14px] border-[3px] border-ink bg-cream-200 shadow-hard8">
            <div aria-hidden="true" className="absolute inset-x-6 top-2 grid grid-cols-12 gap-[2px]">
              {Array.from({ length: 60 }).map((_, i) => (
                <span key={i} className="h-[9px] rounded-[2px] border border-ink/70 bg-cream-100" />
              ))}
            </div>
            <div aria-hidden="true" className="absolute inset-x-24 bottom-2 h-[10px] rounded-[2px] border border-ink/70 bg-cream-100" />
          </div>
        </div>

        {/* can + contact phone on the desk, like the reference */}
        <div className="absolute bottom-8 right-3 hidden items-end gap-2 desk:flex">
          <div aria-hidden="true" className="h-[74px] w-[30px] rounded-[6px] border-2 border-ink bg-chilli-400 shadow-hard2">
            <span className="mt-3 block h-[3px] w-full bg-cream-100/80" />
            <span className="mt-1.5 block h-[3px] w-full bg-cream-100/80" />
          </div>
          <div className="w-[86px] rounded-[9px] border-2 border-ink bg-chilli-300 p-1 shadow-hard3">
            <span aria-hidden="true" className="absolute -right-1 -top-2 h-2.5 w-1.5 rounded-t-[1px] border-2 border-ink bg-ink" />
            <div className="rounded-[4px] border-2 border-ink bg-mint-200 px-1 py-1">
              <p className="mono text-[6px] uppercase text-ink/60">contact</p>
              <p className="mt-[1px] text-[8px] font-black uppercase leading-none text-ink/80">ayush · del</p>
            </div>
            <div className="mt-1 flex flex-col gap-[3px]">
              {[
                { label: 'LinkedIn', href: profile.socials[0].href },
                { label: 'Email', href: profile.socials[1].href },
                { label: 'WhatsApp', href: profile.socials[2].href },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex h-[24px] items-center justify-center rounded-[3px] border-2 border-ink bg-grape-400 text-[7.5px] font-black uppercase tracking-[0.03em] text-cream-100 transition-colors hover:bg-grape-500"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
