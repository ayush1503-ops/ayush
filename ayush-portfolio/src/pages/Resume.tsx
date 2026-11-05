import { SlimFooter } from '../components/SlimFooter'
import { SocialLink, SocialRow } from '../components/Socials'
import {
  arsenal,
  education,
  experience,
  languages,
  profile,
  skills,
  social,
  TEL,
} from '../lib/site'

const toneCycle = ['bg-sun-300', 'bg-cream-100', 'bg-grape-200', 'bg-mint-200']

type ContactRow = { k: string; v: string; href?: string }

/** One screen of CV: masthead strip, experience, capability, contact rail. */
export function Resume({ onNavigate }: { onNavigate: (to: string) => void }) {
  const contacts: ContactRow[] = [
    { k: 'Email', v: profile.email, href: social.gmail.href },
    { k: 'Phone', v: profile.phone, href: `tel:${TEL}` },
    { k: 'Base', v: profile.location },
    { k: 'Status', v: profile.availability },
    { k: 'Languages', v: languages.map((l) => l.name).join(', ') },
    { k: 'Education', v: education.title },
  ]

  return (
    <div id="top" className="flex min-h-[100svh] flex-col">
      {/* masthead strip */}
      <header className="relative overflow-hidden border-b-2 border-ink bg-mint-200 pt-[calc(var(--site-header-h)+10px)] grain">
        <div className="mx-auto max-w-[1240px] px-3 pb-3">
          <div className="flex items-center gap-2.5">
            <img
              src="/art/avatar.png"
              alt="Illustrated portrait of Ayush Thakur"
              className="size-[52px] shrink-0 rotate-[-3deg] rounded-[6px] border-2 border-ink object-cover shadow-hard2"
            />
            <div className="min-w-0 flex-1">
              <h1 className="display h2 leading-none">{profile.name}</h1>
              <p className="mono mt-0.5 truncate text-ink/70">
                full-stack developer · {profile.location} · {profile.timezone}
              </p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="chip !bg-cream-100">curriculum vitae</span>
            <span className="chip !bg-sun-300">edition 2026</span>
            <span className="chip">{profile.availability}</span>

            <div className="ml-auto flex flex-wrap items-center gap-1.5">
              <SocialRow compact />
              <a href="/ayush-thakur-cv.pdf" download className="btn btn-ink !min-h-[30px] !px-2.5 !text-[11px]">
                PDF ↓
              </a>
              <button
                type="button"
                onClick={() => onNavigate('/portfolio')}
                className="btn !min-h-[30px] !px-2.5 !text-[11px]"
              >
                Catalogue
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* body */}
      <div className="flex flex-1 bg-cream-200 py-3 grain">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] items-stretch gap-3 px-3 tab:grid-cols-1">
          {/* experience */}
          <section className="h-full rounded-[9px] border-2 border-ink bg-cream-100 shadow-hard3">
            <div className="flex items-center justify-between border-b-2 border-ink bg-sun-300 px-2 py-1">
              <p className="mono uppercase">experience.exe</p>
              <span className="mono text-ink/60">{experience.length} roles</span>
            </div>
            <ol className="flex flex-col divide-y-2 divide-dashed divide-ink/15">
              {experience.map((job, i) => (
                <li key={job.role} className="px-2.5 py-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <h3 className="display text-[14px] leading-tight">{job.role}</h3>
                    <span
                      className={`mono rounded-[3px] border-2 border-ink px-1 py-[0px] ${toneCycle[i % 4]}`}
                    >
                      {job.period}
                    </span>
                  </div>
                  <p className="mono text-ink/60">
                    {job.place} — {job.summary}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-1.5 text-[11.5px] leading-[1.35] text-ink/85">
                        <span aria-hidden="true" className="mt-[6px] size-[3px] shrink-0 rounded-full bg-ink" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {job.links.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {job.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.href}
                          target={l.href.startsWith('http') ? '_blank' : undefined}
                          rel={l.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                          className="mono inline-flex min-h-[22px] items-center rounded-[4px] border-2 border-ink bg-cream-200 px-1.5 text-[9px] text-ink transition-colors hover:bg-sun-200"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* rail */}
          <div className="flex h-full flex-col gap-2.5">
            <section className="flex-1 rounded-[9px] border-2 border-ink bg-cream-100 shadow-hard3">
              <div className="flex items-center justify-between border-b-2 border-ink bg-grape-400 px-2 py-1 text-cream-100">
                <p className="mono uppercase">skills.txt</p>
                <span className="mono text-cream-200">{skills.length} groups</span>
              </div>
              <div className="flex flex-col gap-1.5 p-2">
                {skills.map((group, i) => (
                  <div key={group.group} className="flex flex-wrap items-baseline gap-1.5">
                    <p
                      className={`mono shrink-0 rounded-[3px] border-2 border-ink px-1 py-[0px] ${toneCycle[i % 4]}`}
                    >
                      {group.group}
                    </p>
                    <p className="text-[11.5px] leading-[1.35] text-ink/80">{group.items.join(' · ')}</p>
                  </div>
                ))}
                <p className="mono mt-0.5 border-t-2 border-dashed border-ink/25 pt-1.5 text-ink/60">
                  arsenal · {arsenal.map((a) => a.title).join(' · ')}
                </p>
              </div>
            </section>

            <section className="flex-1 rounded-[9px] border-2 border-ink bg-cream-100 shadow-hard3">
              <div className="flex items-center justify-between border-b-2 border-ink bg-mint-300 px-2 py-1">
                <p className="mono uppercase">contact.txt</p>
                <span className="mono text-ink/60">delhi, in</span>
              </div>
              <ul className="grid grid-cols-2 gap-1.5 p-2">
                {contacts.map((row) => (
                  <li key={row.k} className="min-w-0 rounded-[5px] border-2 border-ink/80 bg-cream-200 px-1.5 py-1">
                    <p className="mono text-ink/55">{row.k}</p>
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.href.startsWith('http') ? '_blank' : undefined}
                        rel={row.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                        className="wrap-anywhere text-[11.5px] font-bold leading-tight underline decoration-2 underline-offset-2 transition-colors hover:text-grape-400"
                      >
                        {row.v}
                      </a>
                    ) : (
                      <p className="wrap-anywhere text-[11.5px] font-bold leading-tight">{row.v}</p>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-1.5 border-t-2 border-dashed border-ink/25 px-2 py-1.5">
                <p className="mono text-ink/55">reach me</p>
                <SocialLink id="gmail" className="!min-h-[24px] !text-[9.5px]" markClass="size-[16px]" glyphClass="size-[10px]" />
                <SocialLink id="whatsapp" className="!min-h-[24px] !text-[9.5px]" markClass="size-[16px]" glyphClass="size-[10px]" />
                <SocialLink id="linkedin" className="!min-h-[24px] !text-[9.5px]" markClass="size-[16px]" glyphClass="size-[10px]" />
              </div>
            </section>
          </div>
        </div>
      </div>

      <SlimFooter onNavigate={onNavigate} />
    </div>
  )
}
