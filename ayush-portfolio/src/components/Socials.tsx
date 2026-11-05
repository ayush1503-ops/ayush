import { gmailCompose, social, socials, type SocialId } from '../lib/site'
import { GmailIcon, LinkedInIcon, WhatsAppIcon } from './BrandIcons'

/** Brand colour behind each mark, plus the ink/cream used on top of it. */
export const SOCIAL_BRAND: Record<SocialId, { box: string; glyph: string }> = {
  gmail: { box: 'bg-cream-100', glyph: 'text-[#ea4335]' },
  whatsapp: { box: 'bg-[#25d366]', glyph: 'text-cream-100' },
  linkedin: { box: 'bg-[#0a66c2]', glyph: 'text-cream-100' },
}

/** Mail first, then chat, then the professional network. */
export const socialOrder: SocialId[] = ['gmail', 'whatsapp', 'linkedin']

export function SocialGlyph({
  id,
  className = 'size-[13px]',
}: {
  id: SocialId
  className?: string
}) {
  if (id === 'gmail') return <GmailIcon className={className} />
  if (id === 'whatsapp') return <WhatsAppIcon className={className} />
  return <LinkedInIcon className={className} />
}

/** The logo on its own brand-coloured sticker. */
export function SocialMark({
  id,
  className = 'size-[22px]',
  glyphClass = 'size-[13px]',
}: {
  id: SocialId
  className?: string
  glyphClass?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-[4px] border-2 border-ink ${SOCIAL_BRAND[id].box} ${SOCIAL_BRAND[id].glyph} ${className}`}
    >
      <SocialGlyph id={id} className={glyphClass} />
    </span>
  )
}

/**
 * One contact option: brand logo + label, styled like every other chip on the
 * site. Always opens the real destination in a new tab.
 */
export function SocialLink({
  id,
  label = true,
  subject,
  className = '',
  markClass,
  glyphClass,
}: {
  id: SocialId
  label?: boolean
  subject?: string
  className?: string
  markClass?: string
  glyphClass?: string
}) {
  const item = social[id]
  const href = id === 'gmail' ? gmailCompose(subject) : item.href

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      title={`${item.label} · ${item.note}`}
      aria-label={label ? undefined : `${item.label} — opens in a new tab`}
      className={`group/social inline-flex min-h-[28px] items-center gap-1.5 rounded-[6px] border-2 border-ink bg-cream-100 p-[3px] font-extrabold uppercase tracking-[0.04em] text-ink shadow-hard2 transition-transform duration-200 ease-pop hover:-translate-y-[2px] hover:bg-sun-100 ${
        label ? 'pr-2' : ''
      } ${className}`}
    >
      <SocialMark
        id={id}
        className={markClass ?? (label ? 'size-[18px]' : 'size-[24px]')}
        glyphClass={glyphClass ?? (label ? 'size-[11px]' : 'size-[13px]')}
      />
      {label ? (
        <>
          <span className="text-[10.5px] leading-none">{item.label}</span>
          <span
            aria-hidden="true"
            className="text-[9px] leading-none text-ink/50 transition-transform duration-300 group-hover/social:translate-x-[1px]"
          >
            ↗
          </span>
        </>
      ) : null}
    </a>
  )
}

/** The three logos in a row — used in the résumé, contact cards and footer. */
export function SocialRow({
  subject,
  compact = false,
  className = '',
}: {
  subject?: string
  compact?: boolean
  className?: string
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {socials.map((s) => (
        <li key={s.id}>
          <SocialLink id={s.id} label={!compact} subject={subject} />
        </li>
      ))}
    </ul>
  )
}
