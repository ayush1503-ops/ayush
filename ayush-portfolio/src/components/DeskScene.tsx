import type { ReactNode } from 'react'
import { socials } from '../lib/site'
import { SOCIAL_BRAND, SocialGlyph } from './Socials'

/**
 * The reference's portfolio page: a laptop on the desk running PORTFOLIO.EXE,
 * a wall of shelves behind it, a can and a contact phone on the desk.
 * The laptop keeps one fixed size so every app tab sits in the same frame.
 */
export function DeskScene({ children, onHome }: { children: ReactNode; onHome: () => void }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden border-b-2 border-ink bg-tang-300">
      {/* wall: blue shelves with cartridges on the left, striped wallpaper on the right */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[46%] bg-grape-300">
          <div className="absolute left-[10%] top-[14%] flex items-end gap-[5px]">
            {[34, 46, 28, 40].map((h, i) => (
              <span
                key={i}
                className={`w-[9px] rounded-t-[2px] border-2 border-ink ${
                  ['bg-sun-300', 'bg-chilli-300', 'bg-mint-200', 'bg-cream-100'][i]
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <span className="absolute inset-x-0 top-[calc(14%+48px)] h-[3px] bg-grape-500/70" />
          <div className="absolute left-[46%] top-[34%] flex items-end gap-[4px]">
            {[26, 38, 22].map((h, i) => (
              <span
                key={i}
                className={`w-[12px] rounded-[2px] border-2 border-ink ${
                  ['bg-cream-100', 'bg-sun-300', 'bg-chilli-400'][i]
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <span className="absolute inset-x-0 top-[calc(34%+42px)] h-[3px] bg-grape-500/70" />
        </div>
        <div
          className="absolute inset-y-0 right-0 w-[54%] bg-cream-300"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(10,10,10,0.12) 0 12px, transparent 12px 34px)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[30%] border-t-[3px] border-ink bg-tang-400" />
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-3 pb-4 pt-[calc(var(--site-header-h)+12px)] desk:pr-[112px]">
        {/* the laptop */}
        <div className="mx-auto w-full max-w-[880px]">
          <div className="relative rounded-t-[26px] rounded-b-[10px] border-[3px] border-ink bg-mint-200 px-4 pb-4 pt-5 shadow-hard8">
            <div className="relative rounded-[10px] border-[3px] border-ink bg-cream-100 p-2">
              <div className="h-[54svh] overflow-y-auto desk:h-[58svh]">{children}</div>
            </div>
            <button
              type="button"
              onClick={onHome}
              aria-label="Back to the cover"
              className="absolute -bottom-3 left-1/2 grid size-7 -translate-x-1/2 place-items-center rounded-full border-2 border-ink bg-grape-300 text-cream-100 shadow-hard2 transition-transform hover:-translate-y-[1px]"
            >
              <span aria-hidden="true" className="text-[11px]">
                ⌂
              </span>
            </button>
          </div>
          {/* slim base */}
          <div className="relative mx-auto -mt-1 h-[16px] w-full max-w-none tab:w-[104%] tab:-translate-x-[2%] rounded-b-[10px] border-[3px] border-ink bg-mint-300 shadow-hard8" />
        </div>

        {/* can + contact phone on the desk, like the reference */}
        <div className="absolute bottom-6 right-2 hidden items-end gap-2 desk:flex">
          <div aria-hidden="true" className="h-[70px] w-[28px] rounded-[6px] border-2 border-ink bg-chilli-400 shadow-hard2">
            <span className="mt-3 block h-[3px] w-full bg-cream-100/80" />
            <span className="mt-1.5 block h-[3px] w-full bg-cream-100/80" />
          </div>
          <div className="relative w-[86px] rounded-[9px] border-2 border-ink bg-chilli-300 p-1 shadow-hard3">
            <span aria-hidden="true" className="absolute -right-1 -top-2 h-2.5 w-1.5 rounded-t-[1px] border-2 border-ink bg-ink" />
            <div className="rounded-[4px] border-2 border-ink bg-mint-200 px-1 py-1">
              <p className="mono text-[6px] uppercase text-ink/60">contact</p>
              <p className="mt-[1px] text-[8px] font-black uppercase leading-none text-ink/80">ayush · del</p>
            </div>
            <div className="mt-1 flex flex-col gap-[3px]">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  title={s.label}
                  className={`flex h-[22px] items-center justify-center rounded-[3px] border-2 border-ink transition-transform hover:-translate-y-[1px] ${SOCIAL_BRAND[s.id].box} ${SOCIAL_BRAND[s.id].glyph}`}
                >
                  <SocialGlyph id={s.id} className="size-[12px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
