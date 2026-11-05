import { useState } from 'react'
import { useRouter } from '../lib/router'
import { DeskScene } from '../components/DeskScene'
import { Dossier } from '../components/Dossier'
import { PortfolioApp } from '../components/PortfolioApp'
import { SlimFooter } from '../components/SlimFooter'
import type { Project } from '../lib/site'

/**
 * The reference's portfolio page: one desk, one laptop, one window running
 * PORTFOLIO.EXE. Everything the catalogue has to say lives inside that window.
 */
export function Portfolio({ onNavigate }: { onNavigate: (to: string) => void }) {
  const [open, setOpen] = useState<Project | null>(null)
  const { hash } = useRouter()

  return (
    <div id="top" className="flex min-h-[100svh] flex-col">
      <DeskScene onHome={() => onNavigate('/')}>
        <PortfolioApp
          key={hash}
          onOpen={setOpen}
          initialTab={hash === '#contact' ? 'contact' : 'work'}
        />
      </DeskScene>
      <SlimFooter onNavigate={onNavigate} />
      <Dossier project={open} onClose={() => setOpen(null)} />
    </div>
  )
}
