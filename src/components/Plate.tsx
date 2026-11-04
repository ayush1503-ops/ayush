import type { Project } from '../lib/site'

const categoryTone: Record<string, string> = {
  'E-commerce': 'bg-sun-300 text-ink',
  'Interactive 3D': 'bg-grape-400 text-cream-100',
  'Creative media': 'bg-mint-200 text-ink',
}

/**
 * Poster card: chunky border, hard shadow, screenshot on top, caption below.
 * Hover: lift + tilt, the arrow spins, the screenshot pushes in.
 */
export function Plate({
  project,
  onOpen,
  variant = 'list',
  eager = false,
}: {
  project: Project
  onOpen: (p: Project) => void
  variant?: 'list' | 'track'
  eager?: boolean
}) {
  const tone = categoryTone[project.category] ?? 'bg-sun-300'
  return (
    <article className={`plate group relative ${variant === 'track' ? 'w-[min(80vw,380px)] shrink-0' : ''}`}>
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="card card-tight block w-full overflow-hidden bg-cream-100 text-left transition-transform duration-300 ease-pop hover:-translate-y-1.5 hover:-rotate-[0.5deg]"
        aria-label={`Open the ${project.title} case file`}
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-ink bg-cream-200">
          <img
            src={project.shot}
            alt={`${project.title} — live site screenshot`}
            loading={eager ? 'eager' : 'lazy'}
            className="plate-img h-full w-full object-cover object-top transition-transform duration-700"
          />
          <span className={`absolute left-2 top-2 rounded-[5px] border-2 border-ink px-1.5 py-[2px] font-black uppercase text-[10px] leading-tight shadow-hard2 ${tone}`}>
            {project.index} · {project.category}
          </span>
          <span className="absolute bottom-2 right-2 rounded-[5px] border-2 border-ink bg-ink px-1.5 py-[2px] font-black uppercase text-[10px] text-sun-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            open file ↗
          </span>
        </div>

        <div className="flex items-start justify-between gap-3 px-3 py-2.5">
          <div className="min-w-0">
            <h3 className="display text-[clamp(17px,1.6vw,21px)] leading-tight">{project.title}</h3>
            <p className="mt-1 line-clamp-2 text-[13.5px] leading-[1.35] text-ink/85">{project.blurb}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {project.stack.slice(0, 3).map((t) => (
                <span key={t} className="rounded-[4px] border-2 border-ink px-1.5 py-[1px] font-mono text-[9.5px] font-medium uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <span className={`grid size-8 shrink-0 place-items-center rounded-full border-2 border-ink shadow-hard2 transition-transform duration-300 group-hover:rotate-45 ${tone}`}>
            <span aria-hidden="true" className="text-[15px] font-black leading-none">
              ↗
            </span>
          </span>
        </div>
      </button>
    </article>
  )
}

export function PlateRow({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group flex w-full items-center gap-3 border-b-2 border-ink/25 py-2.5 text-left transition-colors hover:border-ink"
    >
      <span className="mono w-6 shrink-0">{project.index}</span>
      <span className="display min-w-0 flex-1 truncate text-[16px] transition-transform duration-300 group-hover:translate-x-1">
        {project.title}
      </span>
      <span className="mono hidden shrink-0 text-ink/70 tab:block">{project.category}</span>
    </button>
  )
}
