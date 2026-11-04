import { useState } from 'react'
import { DeskScene } from '../components/DeskScene'
import { Dossier } from '../components/Dossier'
import { Plate } from '../components/Plate'
import { ArrowLink, Lines, Marquee, Reveal, SectionHead, Stamp, WindowCard } from '../components/primitives'
import { ContactBand, Faq, Tariff } from '../components/sections'
import { arsenal, fitList, gmailCompose, process, profile, projects, type Project } from '../lib/site'

const toneCycle = ['bg-sun-300', 'bg-cream-100', 'bg-grape-200', 'bg-mint-200', 'bg-chilli-100']

export function Portfolio({ onNavigate }: { onNavigate: (to: string) => void }) {
  const [open, setOpen] = useState<Project | null>(null)

  return (
    <div id="top">
      <DeskScene onOpen={setOpen} onHome={() => onNavigate('/')} />

      {/* origin */}
      <section id="origin" data-section="Origin" className="bg-cream-200 py-[clamp(32px,4.5vw,56px)] grain">
        <div className="shell">
          <SectionHead
            index="I"
            label="Origin"
            title={
              <>
                A developer who <span className="text-grape-500">draws the layout.</span>
              </>
            }
          />
          <div className="mt-6 grid grid-cols-[280px_minmax(0,1fr)] gap-4 tab:grid-cols-1">
            <WindowCard title="id.png" tone="sun" bodyClassName="bg-cream-100 p-2.5">
              <div className="relative">
                <img
                  src="/art/avatar.png"
                  alt="Illustrated portrait of Ayush Thakur"
                  className="aspect-[6/5] w-full rounded-[6px] border-2 border-ink object-cover"
                />
                <span className="absolute -bottom-3 -right-2">
                  <Stamp top="verified" bottom="since 2025" size={58} tone="mint" tilt={-8} />
                </span>
              </div>
              <p className="mt-4 text-center font-extrabold uppercase text-[12px]">Ayush Thakur · Delhi, IN</p>
            </WindowCard>

            <WindowCard title="summary.txt" tone="grape" bodyClassName="bg-cream-100 p-4">
              <p className="lead text-ink/85">{profile.summary}</p>
              <p className="mt-3 text-[13.5px] leading-[1.5] text-ink/75">
                I work directly with founders: one conversation, one scope document, one sprint. Everything is
                written by hand — React components, CSS layout, the WebGL scene — and handed over as a repository
                you own.
              </p>
              <div className="mt-4 grid grid-cols-4 gap-2 tab:grid-cols-2">
                {profile.stats.map((s, i) => (
                  <div key={s.label} className={`rounded-[8px] border-2 border-ink p-2 shadow-hard2 ${toneCycle[i % 4]}`}>
                    <p className="font-black text-[19px] leading-none">{s.value}</p>
                    <p className="mt-1 text-[9.5px] font-bold uppercase leading-tight text-ink/70">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={gmailCompose()} target="_blank" rel="noreferrer noopener" className="btn btn-ink !min-h-[36px] !text-[11.5px]">
                  Start a project ↗
                </a>
                <button type="button" className="btn !min-h-[36px] !text-[11.5px]" onClick={() => onNavigate('/resume')}>
                  Curriculum
                </button>
              </div>
            </WindowCard>
          </div>
        </div>
      </section>

      {/* plates */}
      <section id="plates" data-section="Plates" className="relative bg-tang-300 stripes py-[clamp(32px,4.5vw,56px)] grain">
        <div className="shell">
          <SectionHead
            index="II"
            label="Plates — four live builds"
            title={
              <>
                Evidence, <span className="highlight-type">not promises.</span>
              </>
            }
            note="Open a card for the case file: the stack, the timeline, what was built and where it lives."
          />
          <div className="mt-6 grid grid-cols-2 gap-4 tab:grid-cols-1">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={(i % 2) * 0.05}>
                <Plate project={p} onOpen={setOpen} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* practice */}
      <section id="practice" data-section="Practice" className="bg-cream-100 py-[clamp(32px,4.5vw,56px)]">
        <div className="shell">
          <SectionHead
            index="III"
            label="Practice — the toolkit"
            title={
              <>
                Nine tools, <span className="text-grape-500">used in anger.</span>
              </>
            }
            note="Nothing here is theoretical. Every one has shipped on a live domain and survived a real release."
          />
          <ul className="mt-6 grid grid-cols-3 gap-3 tab:grid-cols-2 phone:grid-cols-1">
            {arsenal.map((a, i) => (
              <li
                key={a.title}
                className={`rounded-[10px] border-2 border-ink p-3 shadow-hard3 ${toneCycle[i % 5]}`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="display text-[15px]">{a.title}</h3>
                  <span className="mono text-ink/50">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-[1.4] text-ink/80">{a.body}</p>
                <p className="mono mt-2 text-ink/55">{a.used.replace('Used in · ', 'plates ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* method */}
      <section id="method" data-section="Method" className="relative bg-cream-200 py-[clamp(32px,4.5vw,56px)] grain">
        <div className="shell">
          <SectionHead
            index="IV"
            label="Method — four steps"
            title={
              <>
                From sketch to <span className="text-grape-500">ship.</span>
              </>
            }
            note="You always know what is happening, what is next and what it costs."
          />
          <ol className="mt-6 grid grid-cols-4 gap-3 tab:grid-cols-2 phone:grid-cols-1">
            {process.map((step, i) => (
              <li key={step.no}>
                <Reveal delay={i * 0.04}>
                  <div className={`flex h-full flex-col rounded-[10px] border-2 border-ink p-3 shadow-hard3 ${toneCycle[(i + 1) % 5]}`}>
                    <span className="mono text-ink/50">{step.no}</span>
                    <h3 className="display mt-1 text-[14.5px] leading-tight">{step.title}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.4] text-ink/80">{step.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* tariff */}
      <section id="tariff" data-section="Tariff" className="bg-cream-100 py-[clamp(32px,4.5vw,56px)]">
        <div className="shell">
          <SectionHead
            index="V"
            label="Tariff"
            title={
              <>
                Transparent <span className="text-grape-500">pricing.</span>
              </>
            }
            note="Fifty percent reserves the sprint, fifty percent on launch. No retainers, no surprise invoices."
          />
          <Tariff />
        </div>
      </section>

      {/* terms */}
      <section id="terms" data-section="Terms" className="relative bg-grape-100 py-[clamp(32px,4.5vw,56px)] grain">
        <div className="shell">
          <SectionHead
            index="VI"
            label="Terms — the fit check"
            title={
              <>
                A good fit, or an <span className="text-grape-500">honest no.</span>
              </>
            }
          />
          <div className="mt-6 grid grid-cols-2 gap-4 phone:grid-cols-1">
            <WindowCard title="works_if.txt" tone="mint" bodyClassName="bg-cream-100 p-3">
              <ul className="flex flex-col gap-2">
                {fitList.yes.map((t) => (
                  <li key={t} className="flex gap-2 text-[13px] leading-[1.4]">
                    <span aria-hidden="true" className="mt-[1px] font-black text-mint-500">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </WindowCard>
            <WindowCard title="not_for_you.txt" tone="chilli" bodyClassName="bg-cream-100 p-3">
              <ul className="flex flex-col gap-2">
                {fitList.no.map((t) => (
                  <li key={t} className="flex gap-2 text-[13px] leading-[1.4]">
                    <span aria-hidden="true" className="mt-[1px] font-black text-chilli-400">
                      ✕
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </WindowCard>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href={gmailCompose()} target="_blank" rel="noreferrer noopener" className="btn btn-ink">
              Send a brief ↗
            </a>
            <ArrowLink onClick={() => onNavigate('/resume')}>See the curriculum</ArrowLink>
          </div>
        </div>
      </section>

      {/* notes */}
      <section id="notes" data-section="Notes" className="bg-cream-200 py-[clamp(32px,4.5vw,56px)] grain">
        <div className="shell">
          <SectionHead index="VII" label="Notes — the small print" title={<>Read before you write.</>} />
          <div className="mt-5">
            <Faq startOpen={null} />
          </div>
        </div>
      </section>

      <ContactBand onNavigate={onNavigate} compact />
      <Dossier project={open} onClose={() => setOpen(null)} />
    </div>
  )
}
