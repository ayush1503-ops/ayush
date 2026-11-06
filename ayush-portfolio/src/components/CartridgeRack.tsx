import { useState } from 'react'
import type { Project } from '../lib/site'
import { projects } from '../lib/site'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'commerce', label: 'E-commerce' },
  { id: 'three', label: '3D' },
  { id: 'media', label: 'Creative' },
] as const

type FilterId = (typeof filters)[number]['id']

/** The reference's PORTFOLIO.EXE window: LIBRARY status counts + category tabs + cartridges. */
export function CartridgeRack({ onOpen, bare = false }: { onOpen: (p: Project) => void; bare?: boolean }) {
  const [filter, setFilter] = useState<FilterId>('all')
  const [status, setStatus] = useState<'all' | 'live'>('all')

  const list = projects.filter((p) => (filter === 'all' ? true : p.filter === filter))

  const statuses = [
    { id: 'all' as const, label: 'All', count: projects.length },
    { id: 'live' as const, label: 'Live', count: projects.length },
    { id: 'dev' as const, label: 'In dev', count: 0 },
    { id: 'draft' as const, label: 'Draft', count: 0 },
  ]

  return (
    <div className={bare ? '' : 'overflow-hidden rounded-[10px] border-2 border-ink bg-cream-100 shadow-hard6'}>
      {!bare && (
        <div className="flex items-center justify-between border-b-2 border-ink bg-sun-300 px-2.5 py-1.5">
          <p className="text-[12px] font-black uppercase tracking-[0.04em]">Portfolio.exe</p>
          <span aria-hidden="true" className="flex gap-[4px]">
            {['bg-sun-100', 'bg-cream-100', 'bg-chilli-300'].map((c) => (
              <span key={c} className={`block size-[12px] rounded-full border-2 border-ink ${c}`} />
            ))}
          </span>
        </div>
      )}

      <div className="grid grid-cols-[128px_minmax(0,1fr)] tab:grid-cols-1">
        {/* library sidebar */}
        <div className="border-b-2 border-r-2 border-ink bg-cream-200 p-1.5 tab:border-r-0 tab:pb-1">
          <p className="mono hidden px-1 pb-1 text-ink/60 desk:block">Library</p>
          <ul className="flex flex-wrap gap-1 tab:flex-row">
            {statuses.map((s) => {
              const active = status === s.id || (s.id === 'live' && status === 'live')
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setStatus(s.id === 'all' ? 'all' : 'live')}
                    aria-pressed={s.id === 'all' ? status === 'all' : status === 'live'}
                    disabled={s.count === 0}
                    className={`flex items-center justify-between gap-2 rounded-[4px] px-1.5 py-[3px] desk:mb-1 desk:w-full text-[11px] font-bold uppercase tracking-[0.03em] transition-colors ${
                      active ? 'border-2 border-ink bg-grape-400 text-cream-100' : 'border-2 border-transparent hover:border-ink/30'
                    } ${s.count === 0 ? 'opacity-45' : ''}`}
                  >
                    <span>{s.label}</span>
                    <span className={`rounded-[3px] border-2 border-ink px-1 text-[10px] ${active ? 'bg-sun-300 text-ink' : 'bg-cream-100'}`}>
                      {s.count}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* cartridges */}
        <div className="p-2">
          <div
            role="tablist"
            aria-label="Filter projects"
            className="no-scrollbar mb-2 flex flex-nowrap gap-1.5 overflow-x-auto pb-0.5 desk:flex-wrap desk:overflow-visible"
          >
            {filters.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`min-h-[26px] shrink-0 rounded-[5px] border-2 border-ink px-2 py-[2px] text-[11px] font-extrabold uppercase tracking-[0.04em] shadow-hard2 transition-transform hover:-translate-y-[1px] ${
                    active ? 'bg-grape-400 text-cream-100' : 'bg-cream-100'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>

          <ul className={`grid gap-2 ${bare ? 'grid-cols-2 tab:grid-cols-2' : 'grid-cols-3 tab:grid-cols-2'} phone:grid-cols-1`}>
            {list.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onOpen(p)}
                  className="group block w-full overflow-hidden rounded-[7px] border-2 border-ink bg-cream-100 shadow-hard2 transition-transform duration-200 ease-pop hover:-translate-y-1"
                  aria-label={`Open the ${p.title} case file`}
                >
                  <span className="mono flex items-center justify-between bg-cream-200 px-1.5 py-[2px] text-[7.5px] text-ink/70">
                    choose <span aria-hidden="true">▸</span>
                  </span>
                  <span
                    className={`relative block overflow-hidden border-y-2 border-ink bg-tang-300 ${
                      bare ? 'aspect-[2/1]' : 'aspect-[16/11]'
                    }`}
                  >
                    <img
                      src={p.shot}
                      alt={`${p.title} cartridge art`}
                      className="h-full w-full object-cover object-top opacity-95 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 border-t-2 border-ink bg-sun-300 px-1 py-[2px] text-center text-[8px] font-black uppercase tracking-[0.04em] text-ink">
                      {p.title}
                    </span>
                  </span>
                  <span className="mono block px-1.5 py-[2px] text-[7.5px] uppercase text-ink/60">{p.category}</span>
                </button>
              </li>
            ))}
          </ul>

          {!bare && (
            <p className="mono mt-2 text-[9px] text-ink/50">
              {list.length} cartridge{list.length === 1 ? '' : 's'} · click one to open its case study
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
