import { ArrowLink, Reveal, SectionHead, Stamp, WindowCard } from '../components/primitives'
import { ContactBand } from '../components/sections'
import { education, experience, gmailCompose, languages, profile, skills } from '../lib/site'

const toneCycle = ['bg-sun-300', 'bg-cream-100', 'bg-grape-200', 'bg-mint-200']

export function Resume({ onNavigate }: { onNavigate: (to: string) => void }) {
  return (
    <div id="top">
      {/* masthead */}
      <header className="relative overflow-hidden bg-mint-200 pt-[calc(var(--site-header-h)+22px)] grain">
        <div className="shell pb-8">
          <div className="grid grid-cols-[minmax(0,1fr)_300px] items-center gap-6 tab:grid-cols-1">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip !bg-cream-100">curriculum vitae</span>
                <span className="chip !bg-sun-300">edition 2026</span>
              </div>
              <h1 className="display h1 mt-4">{profile.name}</h1>
              <p className="mono mt-2 text-ink/70">
                full-stack developer · {profile.location} · {profile.timezone}
              </p>
              <p className="lead mt-3 max-w-[52ch] text-ink/85">
                Available for a Q1 sprint. Four live production builds, hand-written code, sub-1.5s budgets.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="/ayush-thakur-cv.pdf" download className="btn btn-ink">
                  Download PDF ↓
                </a>
                <a href={gmailCompose()} target="_blank" rel="noreferrer noopener" className="btn btn-sun">
                  {profile.email}
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-[240px] rotate-[2deg]">
              <div className="card bg-cream-100 p-2.5">
                <img
                  src="/art/avatar.png"
                  alt="Illustrated portrait of Ayush Thakur"
                  className="aspect-[6/5] w-full rounded-[6px] border-2 border-ink object-cover"
                />
                <p className="mt-1.5 text-center font-extrabold uppercase text-[12px]">Ayush · Delhi</p>
              </div>
              <span className="absolute -bottom-4 -left-4">
                <Stamp top="open for" bottom="work" size={66} tone="chilli" tilt={-9} />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* body */}
      <div className="bg-tang-300 stripes py-[clamp(28px,4vw,52px)] grain">
        <div className="shell grid grid-cols-[280px_minmax(0,1fr)] items-start gap-4 tab:grid-cols-1">
          {/* rail */}
          <aside className="flex flex-col gap-3 desk:sticky desk:top-[calc(var(--site-header-h)+20px)]">
            <WindowCard title="contact.txt" tone="sun" bodyClassName="bg-cream-100 p-3">
              <ul className="flex flex-col gap-2">
                {[
                  ['Email', profile.email],
                  ['Phone', profile.phone],
                  ['Base', profile.location],
                  ['Status', profile.availability],
                ].map(([k, v]) => (
                  <li key={k}>
                    <p className="mono text-ink/55">{k}</p>
                    <p className="wrap-anywhere text-[13px] font-bold leading-tight">{v}</p>
                  </li>
                ))}
              </ul>
            </WindowCard>

            <WindowCard title="languages.txt" tone="mint" bodyClassName="bg-cream-100 p-3">
              <ul className="flex flex-col gap-1.5">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-bold">{l.name}</span>
                    <span className="mono text-ink/60">{l.level}</span>
                  </li>
                ))}
              </ul>
            </WindowCard>

            <WindowCard title="education.doc" tone="grape" bodyClassName="bg-cream-100 p-3">
              <p className="text-[13px] font-bold leading-tight">{education.title}</p>
              <p className="mt-1.5 text-[12.5px] leading-[1.4] text-ink/75">{education.body}</p>
            </WindowCard>

            <button type="button" className="btn btn-ink w-full" onClick={() => onNavigate('/portfolio')}>
              Catalogue ↗
            </button>
          </aside>

          {/* main */}
          <main className="flex flex-col gap-4">
            <WindowCard title="experience.exe" tone="sun" bodyClassName="bg-cream-100 p-4">
              <SectionHead index="I" label="Experience" title={<>Where the work happened</>} />
              <ol className="mt-5 flex flex-col gap-3">
                {experience.map((job, i) => (
                  <li key={job.role}>
                    <Reveal delay={i * 0.04}>
                      <article className={`rounded-[10px] border-2 border-ink p-3 shadow-hard2 ${toneCycle[i % 4]}`}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="display text-[16px]">{job.role}</h3>
                          <span className="mono rounded-[4px] border-2 border-ink bg-cream-100 px-1.5 py-[1px]">
                            {job.period}
                          </span>
                        </div>
                        <p className="mono mt-1 text-ink/60">{job.place}</p>
                        <p className="mt-2 text-[13px] font-semibold leading-snug">{job.summary}</p>
                        <ul className="mt-2 flex flex-col gap-1">
                          {job.points.map((p) => (
                            <li key={p} className="flex gap-2 text-[12.5px] leading-[1.4] text-ink/85">
                              <span aria-hidden="true" className="mt-[7px] size-[4px] shrink-0 rounded-full bg-ink" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </WindowCard>

            <WindowCard title="skills.txt" tone="grape" bodyClassName="bg-cream-100 p-4">
              <SectionHead index="II" label="Capability" title={<>What I actually write</>} />
              <div className="mt-4 grid grid-cols-2 gap-3 phone:grid-cols-1">
                {skills.map((group, i) => (
                  <div key={group.group} className="rounded-[9px] border-2 border-ink p-2.5 shadow-hard2">
                    <p className={`mono inline-block rounded-[4px] border-2 border-ink px-1.5 py-[1px] ${toneCycle[i % 4]}`}>
                      {group.group}
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-[1.4] text-ink/80">{group.items.join(' · ')}</p>
                  </div>
                ))}
              </div>
            </WindowCard>

            <WindowCard title="plates.doc" tone="mint" bodyClassName="bg-cream-100 p-4">
              <SectionHead index="III" label="Selected work" title={<>Four plates, still live</>} />
              <ul className="mt-4 flex flex-col">
                {[
                  ['01', 'The Pasha Atelier', 'E-commerce · Next.js', '2025'],
                  ['02', 'Brainchild Games', 'Interactive 3D · Three.js', '2025'],
                  ['03', 'Archive N°9', 'Drops storefront · JS', '2025'],
                  ['04', 'EditingBox', 'Creative media · React', '2026'],
                ].map(([no, title, kind]) => (
                  <li key={no} className="flex items-baseline gap-3 border-b-2 border-ink/15 py-2 last:border-b-0">
                    <span className="mono w-6 shrink-0 text-ink/50">{no}</span>
                    <span className="display flex-1 truncate text-[14.5px]">{title}</span>
                    <span className="mono hidden text-ink/60 desk:block">{kind}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <ArrowLink onClick={() => onNavigate('/portfolio')}>Open the catalogue</ArrowLink>
              </div>
            </WindowCard>
          </main>
        </div>
      </div>

      <ContactBand onNavigate={onNavigate} compact />
    </div>
  )
}
