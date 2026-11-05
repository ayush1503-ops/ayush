export const EMAIL = 'ayusheditor1503@gmail.com'
export const WHATSAPP = 'https://wa.me/919599648246'
export const LINKEDIN = 'https://www.linkedin.com/in/ayush-thakur-a91827419/'
export const TEL = '+919599648246'

export const gmailCompose = (subject = 'Project Requirements & Inquiry — Let’s connect') => {
  const body = `Hi Ayush,

I saw your portfolio and would like to connect regarding a project.

Here are the details and requirements:
• Project / Brand Name:
• Scope & Requirements (e.g. Website, 3D experience, E-commerce, Portfolio):
• Timeline & Target Launch Date:
• Estimated Budget:
• Reference Links or Inspiration:

Looking forward to hearing from you!

Best regards,`
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EMAIL
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/* ---------- contact channels: every one is a working destination ---------- */
export type SocialId = 'gmail' | 'whatsapp' | 'linkedin'

export const social: Record<
  SocialId,
  { id: SocialId; label: string; note: string; href: string }
> = {
  gmail: { id: 'gmail', label: 'Gmail', note: EMAIL, href: gmailCompose() },
  whatsapp: { id: 'whatsapp', label: 'WhatsApp', note: '+91 95996 48246', href: WHATSAPP },
  linkedin: {
    id: 'linkedin',
    label: 'LinkedIn',
    note: 'in/ayush-thakur',
    href: LINKEDIN,
  },
}

/** Mail first, then chat, then the professional network. */
export const socials = [social.gmail, social.whatsapp, social.linkedin]

export const profile = {
  name: 'Ayush Thakur',
  role: 'Full-Stack Developer',
  chip: 'FULL-STACK DEVELOPER',
  tagline: 'Full-stack developer from Delhi. Custom code · zero template slop.',
  summary: `Full-stack developer with 4+ live production builds across e-commerce, interactive 3D and creative media. I hand-write React, Next.js and vanilla JavaScript instead of stacking drag-and-drop builders, then tune every page to a sub-1.5s load budget.`,
  location: 'Delhi, India',
  timezone: 'IST · UTC+5:30',
  availability: 'Available for new missions',
  email: EMAIL,
  phone: '+91 95996 48246',
  socials,
  stats: [
    { value: '04', label: 'live shipped apps', tone: 'yellow' as const },
    { value: '7–14d', label: 'typical sprint', tone: 'white' as const },
    { value: '1.5s', label: 'page load budget', tone: 'blue' as const },
    { value: '95+', label: 'lighthouse score', tone: 'green' as const },
  ],
}

export type Project = {
  id: string
  index: string
  title: string
  aka?: string
  category: 'E-commerce' | 'Interactive 3D' | 'Creative media'
  filter: 'commerce' | 'three' | 'media'
  kicker: string
  blurb: string
  shot: string
  domain: string
  live: string
  role: string
  year: string
  status: string
  stack: string[]
  palette: string
  sfx: string
  spec: { k: string; v: string }[]
  bullets: string[]
}

export const projects: Project[] = [
  {
    id: 'pasha',
    index: '01',
    title: 'The Pasha Atelier',
    category: 'E-commerce',
    filter: 'commerce',
    kicker: 'E-commerce · Publishing',
    blurb:
      'A storefront for a personalised magazine studio, built so ordering one feels like flipping through one.',
    shot: '/shots/pasha.png',
    domain: 'thepashaatelier.vercel.app',
    live: 'https://thepashaatelier.vercel.app/',
    role: 'Design & Development',
    year: '2026',
    status: 'Live / Production',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Vercel'],
    palette: '#ffd31e',
    sfx: 'パラパラ',
    spec: [
      { k: 'Type', v: 'Editorial e-commerce' },
      { k: 'Scope', v: 'Design + build' },
      { k: 'Timeline', v: '9 days' },
    ],
    bullets: [
      'Editorial product pages that preview a personalised magazine before checkout.',
      'Configurable cover and issue flow written as typed React state, no form libraries.',
      'Motion budget: page-level transitions only, zero layout shift on mobile.',
      'Deployed on Vercel with preview builds for each cover variant.',
    ],
  },
  {
    id: 'nexstudio',
    index: '02',
    title: 'Brainchild Games',
    aka: 'NexStudio Games',
    category: 'Interactive 3D',
    filter: 'three',
    kicker: 'Interactive · Game Studio',
    blurb: 'A playful site for an indie game studio, with a game shelf you can filter by mood.',
    shot: '/shots/games.png',
    domain: 'games-studio-smoky.vercel.app',
    live: 'https://games-studio-smoky.vercel.app/',
    role: 'Creative Development',
    year: '2026',
    status: 'Live / Production',
    stack: ['React', 'Three.js', 'WebGL', 'CSS Motion'],
    palette: '#4b6aff',
    sfx: 'ゴゴゴゴ',
    spec: [
      { k: 'Type', v: 'Interactive showcase' },
      { k: 'Scope', v: 'Creative development' },
      { k: 'Timeline', v: '12 days' },
    ],
    bullets: [
      'Game shelf with mood filters that re-order cards without a page reload.',
      'Three.js scene for the studio world, capped at 60fps on mid-range Android.',
      'Reduced-motion and low-power fallbacks so the shelf stays usable everywhere.',
      'Ambient WebAudio cues wired to hover states, muted by default.',
    ],
  },
  {
    id: 'pulse',
    index: '03',
    title: 'Archive N°9',
    aka: 'Pulse Commerce',
    category: 'E-commerce',
    filter: 'commerce',
    kicker: 'E-commerce · Fashion',
    blurb:
      'A store for a limited-edition clothing label: twelve pieces per edition, no restocks.',
    shot: '/shots/pulse.png',
    domain: 'frontented-e-commerce-website-desig.vercel.app',
    live: 'https://frontented-e-commerce-website-desig.vercel.app/',
    role: 'Full-stack Experience',
    year: '2025',
    status: 'Live / Production',
    stack: ['JavaScript', 'CSS', 'LocalStorage', 'HTML'],
    palette: '#84ebb4',
    sfx: 'シャキン',
    spec: [
      { k: 'Type', v: 'Drops storefront' },
      { k: 'Scope', v: 'Full-stack build' },
      { k: 'Timeline', v: '7 days' },
    ],
    bullets: [
      'Vanilla JavaScript storefront — no framework, 42KB of JS on first paint.',
      'Persistent cart and edition state in LocalStorage, survives a refresh.',
      'Drop countdown, size picker and checkout summary written by hand.',
      'Fully keyboard navigable product grid with visible focus states.',
    ],
  },
  {
    id: 'editing-box',
    index: '04',
    title: 'EditingBox',
    category: 'Creative media',
    filter: 'media',
    kicker: 'Creative Media · Portfolio',
    blurb:
      'A portfolio for a video-editing studio that puts the showreel first and turns views into enquiries.',
    shot: '/shots/editing.png',
    domain: 'editing-box-j3as.vercel.app',
    live: 'https://editing-box-j3as.vercel.app/',
    role: 'Design & Development',
    year: '2025',
    status: 'Live / Production',
    stack: ['React', 'Framer Motion', 'Video', 'Vercel'],
    palette: '#fb3748',
    sfx: 'カット!',
    spec: [
      { k: 'Type', v: 'Showreel-first portfolio' },
      { k: 'Scope', v: 'Design + build' },
      { k: 'Timeline', v: '6 days' },
    ],
    bullets: [
      'Showreel autoplays muted above the fold with a click-to-unmute control.',
      'Heavy video assets lazy-loaded behind IntersectionObserver.',
      'Project tiles animate on scroll with 200ms stagger, nothing longer.',
      'Enquiry CTA repeated at three depths with a prefilled brief.',
    ],
  },
]

export const filters = [
  { id: 'all', label: 'ALL', count: 4 },
  { id: 'commerce', label: 'E-COMMERCE', count: 2 },
  { id: 'three', label: '3D', count: 1 },
  { id: 'media', label: 'CREATIVE', count: 1 },
] as const

export const arsenal = [
  {
    jp: '反応',
    title: 'React',
    body: 'Component systems for scalable state and interactive web apps.',
    used: 'Used in · 01 · 02 · 04',
  },
  {
    jp: '次',
    title: 'Next.js',
    body: 'SSR and static builds that index perfectly on Google and ship fast on Vercel.',
    used: 'Used in · 01',
  },
  {
    jp: '三次元',
    title: 'Three.js',
    body: 'WebGL scenes that turn static pages into immersive 3D worlds, optimised for 60fps mobile.',
    used: 'Used in · 02',
  },
  {
    jp: '型',
    title: 'TypeScript',
    body: 'Strong type contracts that eliminate production runtime bugs and safe data schemas.',
    used: 'Used in · 01',
  },
  {
    jp: '術',
    title: 'JavaScript',
    body: 'Zero-dependency vanilla JS when 50ms initial paint matters more than framework overhead.',
    used: 'Used in · 03',
  },
  {
    jp: '根',
    title: 'Node.js',
    body: 'APIs, microservices and serverless edge functions that keep backends running fast.',
    used: 'Side projects & tooling',
  },
  {
    jp: '蛇',
    title: 'Python',
    body: 'Data processing, scraping and automation scripts delivered with zero fuss.',
    used: 'Side projects & tooling',
  },
  {
    jp: '動',
    title: 'Motion',
    body: 'Framer Motion and CSS physics that guide attention without causing layout shifts.',
    used: 'Used in · 01 · 04',
  },
  {
    jp: '様式',
    title: 'CSS Grid/Flex',
    body: 'Hand-crafted responsive layouts that look intentional on every viewport.',
    used: 'Used in · 01 · 02 · 03 · 04',
  },
]

export const process = [
  {
    jp: '壱',
    no: '01',
    title: 'SCOPE & WIRE',
    body: 'We clarify goals, user flows and technical requirements over email or a call. You receive a structured milestone breakdown within 24 hours.',
  },
  {
    jp: '弐',
    no: '02',
    title: 'INTERACTIVE DRAFT',
    body: 'A working prototype in your browser within 3 to 5 days. We test real typography, layout rhythm and interactions before locking code.',
  },
  {
    jp: '参',
    no: '03',
    title: 'PRODUCTION SPRINT',
    body: 'Clean React, Next.js or lightweight JS. Performance budgets, responsive polish for every screen, and SEO metadata built into the markup.',
  },
  {
    jp: '肆',
    no: '04',
    title: 'DEPLOY & SUPPORT',
    body: 'Zero-downtime deployment on Vercel, full GitHub repository handover, plus 14 days of complimentary post-launch support and tweaks.',
  },
]

export const sprints = [
  {
    tag: 'Sprint 01',
    jp: '壱',
    title: 'STUDIO PORTFOLIO / LANDING PAGE',
    price: '₹12,000 – ₹19,999',
    usd: '~$145 – $240',
    eta: 'Turnaround: 5 – 7 days',
    items: [
      'Custom responsive design system (1 to 3 pages)',
      'Hand-crafted typography, motion & micro-interactions',
      'Google Lighthouse 95+ score guaranteed',
      'SEO meta tags, OpenGraph cards & sitemap',
      'Production deployment on Vercel + custom domain setup',
      '14 days of post-launch bug fixes & tweaks',
    ],
    tone: 'white' as const,
    popular: false,
  },
  {
    tag: 'Sprint 02',
    jp: '弐',
    title: 'E-COMMERCE & WEB APPLICATION',
    price: '₹24,999 – ₹39,999',
    usd: '~$300 – $480',
    eta: 'Turnaround: 1 – 2 weeks',
    items: [
      'Everything in Sprint 01',
      'Filterable product catalog with instant category search',
      'Custom cart, checkout flows or WhatsApp order links',
      'Client-editable data files or lightweight headless CMS',
      'Full-stack API routes & database/storage integration',
      'Speed-optimised asset pipeline & mobile-first touch UI',
    ],
    tone: 'yellow' as const,
    popular: true,
  },
  {
    tag: 'Sprint 03',
    jp: '参',
    title: '3D & INTERACTIVE EXPERIENCE',
    price: '₹36,999 – ₹54,999',
    usd: '~$450 – $660',
    eta: 'Turnaround: 2 – 3 weeks',
    items: [
      'Everything in Sprint 01 & 02',
      'Three.js / WebGL 3D scenes & model rendering',
      'Custom scroll camera animation & interactive physics',
      'Hardware-accelerated 60fps mobile fallback modes',
      'Sound effects, ambient audio & shader customisation',
      'Full asset compression & progressive loading pipeline',
    ],
    tone: 'blue' as const,
    popular: false,
  },
]

export const guarantees = [
  {
    icon: 'bolt' as const,
    title: 'Sub-1.5s Load Budget',
    body: 'Every page is audited for speed. Lighthouse 90+ score guaranteed on desktop and mobile.',
  },
  {
    icon: 'phone' as const,
    title: 'Real Device Tested',
    body: 'Tested on physical iOS iPhones, Android phones, tablets and wide monitors for zero awkward breaks.',
  },
  {
    icon: 'rocket' as const,
    title: 'Zero-Downtime Deploy',
    body: 'Automated GitHub-to-Vercel CI/CD pipeline, SSL certificates and custom domain connection included.',
  },
  {
    icon: 'shield' as const,
    title: '14-Day Warranty',
    body: 'Every contract includes two weeks of post-launch bug fixes, performance checks and minor adjustments.',
  },
]

export const fitList = {
  yes: [
    'You want a memorable, handcrafted website that stands out from generic SaaS templates.',
    'You care about loading speed, performance scores and clean readable source code.',
    'You want to talk directly to the developer building your site, not three account managers.',
    'You need custom e-commerce, interactive 3D or an editorial layout that tells a story.',
  ],
  no: [
    'You need a generic $50 WordPress template installed in one hour without custom code.',
    'You want a large 50-person agency with round-the-clock shift staffing.',
    'You need native iOS/Android mobile apps (Swift/Kotlin) rather than responsive web applications.',
  ],
}

export const faq = [
  {
    q: 'How do we start working together?',
    a: 'Click “HIRE ME” or “START A MISSION” to send your requirements via Gmail. Tell me about your project, target launch date and references. I’ll reply within 24 hours with a scope outline and timeline.',
  },
  {
    q: 'Do you take projects outside India?',
    a: 'Yes, over 60% of my clients are in the United States, United Kingdom, Canada and Europe. Communication happens asynchronously over email and WhatsApp, with scheduled video calls when needed.',
  },
  {
    q: 'Can my team edit content without code knowledge?',
    a: 'Yes. I organise your content into straightforward data configs or connect a lightweight headless CMS so you can easily add products, change text or update photos anytime.',
  },
  {
    q: 'How are payments and milestones structured?',
    a: 'Standard terms are a 50% upfront deposit to reserve your sprint date on my schedule, and the remaining 50% upon final delivery, QA sign-off and domain launch.',
  },
]

/* ---------- résumé data ---------- */
export const skills = [
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript (ES2023)', 'Tailwind CSS', 'CSS Grid & Flex', 'Accessibility (WCAG AA)'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'API routes', 'Serverless functions', 'Python automation', 'REST schemas', 'Auth flows'],
  },
  {
    group: '3D & motion',
    items: ['Three.js', 'WebGL', 'Framer Motion', 'GSAP', 'Scroll-linked camera', '60fps budgets'],
  },
  {
    group: 'Delivery',
    items: ['Vercel', 'GitHub Actions', 'Lighthouse audits', 'SEO & OpenGraph', 'Asset pipelines', 'Preview builds'],
  },
]

export const languages = [
  { name: 'Hindi', level: 'Native' },
  { name: 'English', level: 'Professional · C1' },
]

export const education = {
  title: 'Full-stack web development',
  body: 'Self-taught track: shipped four production builds, plus continuous work in React, Node and WebGL. Delhi, India.',
}

export const experience = [
  {
    role: 'Independent Full-Stack Developer',
    place: 'Delhi, India · Remote',
    period: '2025 — Now',
    summary: 'Client work across e-commerce, interactive 3D and creative-media portfolios.',
    points: [
      'Designed and shipped four live production sites, all still online with real traffic.',
      'Own the whole pipeline: scope, UI design in Figma, React/Three.js build, deployment and 14-day support.',
      'Hold every page to a sub-1.5s load budget and 95+ Lighthouse on mid-range Android.',
      'Wrote the personalised-magazine ordering flow for The Pasha Atelier in typed React state.',
    ],
    links: [{ label: 'See the four builds', href: '#portfolio' }],
  },
  {
    role: 'Creative Developer · Brainchild Games',
    place: 'Indie game studio · Remote',
    period: '2026',
    summary: 'Interactive studio site with a mood-filterable game shelf and a WebGL world.',
    points: [
      'Built the game shelf so a filter change re-orders cards in place, no page reload.',
      'Kept the Three.js scene at 60fps on mid-range Android by capping DPR and draw calls.',
      'Added reduced-motion and low-power fallbacks so the shelf works on old hardware.',
    ],
    links: [{ label: 'games-studio-smoky.vercel.app', href: 'https://games-studio-smoky.vercel.app/' }],
  },
  {
    role: 'Full-stack Build · Archive N°9',
    place: 'Limited-edition fashion label · Remote',
    period: '2025',
    summary: 'A drops storefront in 42KB of hand-written JavaScript.',
    points: [
      'Vanilla JS product grid, size picker, countdown and cart — zero framework weight.',
      'Cart and edition state persisted in LocalStorage so a refresh never loses an order.',
      'Keyboard-navigable grid with visible focus states throughout.',
    ],
    links: [{ label: 'frontented-e-commerce-website-desig.vercel.app', href: 'https://frontented-e-commerce-website-desig.vercel.app/' }],
  },
  {
    role: 'Design & Build · EditingBox',
    place: 'Video-editing studio · Remote',
    period: '2025',
    summary: 'Showreel-first portfolio that turns views into enquiries.',
    points: [
      'Muted autoplaying showreel above the fold with an explicit click-to-unmute control.',
      'Video assets lazy-loaded behind IntersectionObserver to protect first paint.',
      'Enquiry CTA repeated at three depths with a prefilled project brief.',
    ],
    links: [{ label: 'editing-box-j3as.vercel.app', href: 'https://editing-box-j3as.vercel.app/' }],
  },
]
