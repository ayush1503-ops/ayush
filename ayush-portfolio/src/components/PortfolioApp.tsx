import { useState } from 'react'
import { CartridgeRack } from './CartridgeRack'
import { Faq, Tariff } from './sections'
import { Stamp } from './primitives'
import { arsenal, fitList, gmailCompose, profile, skills, socials } from '../lib/site'
import type { Project } from '../lib/site'
import { GmailIcon } from './BrandIcons'
import { SocialLink } from './Socials'

const TABS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'rates', label: 'Rates' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const

export type TabId = (typeof TABS)[number]['id']

/**
 * Everything the site has to say, inside one window — the way the reference keeps
 * a whole portfolio on a single screen.
 */
export function PortfolioApp({
  onOpen,
  initialTab = 'work',
}: {
  onOpen: (p: Project) => void
  initialTab?: TabId
}) {
  const [tab, setTab] = useState<TabId>(initialTab)

  return (
    <div className="overflow-hidden rounded-[8px] border-2 border-ink bg-cream-100">
      {/* app menu */}
      <div className="flex flex-wrap items-center gap-1 border-b-2 border-ink bg-cream-200 px-1.5 py-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`min-h-[26px] rounded-[5px] border-2 border-ink px-1.5 text-[10px] desk:px-2 desk:text-[11px] font-extrabold uppercase tracking-[0.04em] shadow-hard2 transition-transform hover:-translate-y-[1px] ${
              tab === t.id ? 'bg-grape-400 text-cream-100' : 'bg-cream-100'
            }`}
          >
            {t.label}
          </button>
        ))}
        <span className="mono ml-auto hidden pr-1 text-[9px] text-ink/50 tab:block">ayush.exe v2.0</span>
      </div>

      <div className="p-2">
        {tab === 'work' && <CartridgeRack onOpen={onOpen} bare />}

        {tab === 'about' && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <img
                src="/art/avatar.png"
                alt="Illustrated portrait of Ayush Thakur"
                className="h-[92px] w-[80px] shrink-0 rounded-[6px] border-2 border-ink object-cover"
              />
              <div className="min-w-0">
                <p className="mono text-ink/60">origin.txt</p>
                <p className="mt-0.5 text-[12.5px] leading-[1.4] text-ink/85">
                  Full-stack developer in Delhi — hand-written React, CSS and WebGL, held to a sub-1.5s load
                  budget. One conversation, one scope document, one sprint.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5 tab:grid-cols-2">
              {profile.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`rounded-[6px] border-2 border-ink p-1.5 ${
                    ['bg-sun-300', 'bg-cream-100', 'bg-grape-200', 'bg-mint-200'][i % 4]
                  }`}
                >
                  <p className="text-[15px] font-black leading-none">{s.value}</p>
                  <p className="mt-0.5 text-[8.5px] font-bold uppercase leading-tight text-ink/70">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5 tab:grid-cols-1">
              {skills.slice(0, 4).map((g, i) => (
                <div key={g.group} className="rounded-[6px] border-2 border-ink bg-cream-100 p-1.5">
                  <p className={`mono inline-block rounded-[3px] border-2 border-ink px-1 ${['bg-sun-300', 'bg-grape-200', 'bg-mint-200', 'bg-chilli-100'][i % 4]}`}>
                    {g.group}
                  </p>
                  <p className="mt-1 text-[10.5px] leading-[1.35] text-ink/80">{g.items.slice(0, 4).join(' · ')}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {arsenal.slice(0, 6).map((a) => (
                <span key={a.title} className="rounded-[4px] border-2 border-ink px-1.5 py-[1px] font-mono text-[9px] font-medium uppercase">
                  {a.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {tab === 'rates' && <Tariff compact />}

        {tab === 'faq' && <Faq />}

        {tab === 'contact' && (
          <div className="flex flex-col gap-2">
            <div className="rounded-[6px] border-2 border-ink bg-ink p-2 text-cream-100">
              <p className="mono text-sun-300">open for one q1 sprint</p>
              <p className="mt-1 text-[12.5px] leading-snug">
                Storefront, studio site or an odd idea that needs a 3D world — send the brief and the timeline.
              </p>
              <a
                href={gmailCompose()}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex min-h-[26px] items-center gap-1.5 rounded-[4px] border-2 border-sun-300 bg-sun-300 px-2 text-[10.5px] font-black uppercase text-ink"
              >
                <GmailIcon className="size-[13px]" />
                {profile.email} ↗
              </a>
            </div>
            <ul className="grid grid-cols-2 gap-1.5 tab:grid-cols-1">
              {socials.map((s) => (
                <li key={s.id}>
                  <SocialLink id={s.id} className="!min-h-[28px] w-full justify-between" />
                </li>
              ))}
              <li>
                <a
                  href="/ayush-thakur-cv.pdf"
                  download
                  className="flex min-h-[28px] items-center justify-between rounded-[5px] border-2 border-ink bg-cream-100 px-2 text-[11px] font-extrabold uppercase tracking-[0.04em] shadow-hard2 transition-transform hover:-translate-y-[1px]"
                >
                  Download CV <span aria-hidden="true">↓</span>
                </a>
              </li>
            </ul>
            <div className="rounded-[6px] border-2 border-ink bg-mint-100 p-1.5">
              <p className="mono text-ink/70">a good fit if</p>
              <p className="mt-1 text-[11px] leading-[1.4] text-ink/85">{fitList.yes[0]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
