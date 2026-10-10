import { useEffect, useState } from 'react'
import {
  Atom,
  BookOpen,
  Briefcase,
  Check,
  ChevronRight,
  CircuitBoard,
  Cpu,
  FileText,
  Github,
  GraduationCap,
  LayoutGrid,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  PenLine,
  Phone,
  ScanLine,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Twitter,
} from 'lucide-react'

/* ------------------------------------------------------------------ data */

/* Fill these in later — empty string keeps the icon as a dimmed placeholder */
const PROFILE = {
  linkedin: 'https://www.linkedin.com/in/zichen-song-3613541a1/',
  x: '', // e.g. 'https://x.com/ZCWarren'
}

/* Resume PDFs live in public/ — replace the files to update, or point to external URLs */
const RESUMES = [
  { label: 'Résumé · EN', href: `${import.meta.env.BASE_URL}resume-en.pdf` },
  { label: '简历 · 中文', href: `${import.meta.env.BASE_URL}resume-cn.pdf` },
]

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/ZCWarren' },
  { icon: Linkedin, label: 'LinkedIn', href: PROFILE.linkedin },
  { icon: Twitter, label: 'X (Twitter)', href: PROFILE.x },
  { icon: Mail, label: 'e1127317@u.nus.edu', href: 'mailto:e1127317@u.nus.edu' },
  { icon: Phone, label: '+86 153 9807 8036', href: 'tel:+8615398078036' },
]

const experience = [
  {
    role: 'Algorithm & Modeling Engineer — Computational Lithography',
    org: 'Shanghai Yuliangsheng Technology',
    period: '2025.03 — Present',
    tags: ['C++', 'SMO', 'OPC / DFM', 'Linux'],
    points: [
      'Develop SMO (Source Mask Optimization) algorithms in C++ on Linux and drive commercialization.',
      'Fab-facing owner of SMO — on-site exposure & metrology validation at customer fabs.',
    ],
  },
  {
    role: 'Technology Transfer Intern',
    org: 'NUS Enterprise',
    period: '2024.01 — 2024.12',
    tags: ['Tech Transfer', 'Patent Portfolio', 'Commercialization'],
    points: [
      'Assessed commercialization potential of technologies and managed patent portfolios.',
    ],
  },
  {
    role: 'Master Thesis — Fast Qubit State Measurement & Feedback',
    org: 'Centre for Quantum Technologies, NUS',
    period: '2023.09 — 2024.12',
    tags: ['FPGA', 'Verilog', 'Python', 'YOLOv8'],
    points: [
      'Built an ion-state measurement & feedback platform with EMCCD + FPGA (DE10-Standard).',
      'Image processing, photon statistics and thresholding in Python; state discrimination in Verilog.',
    ],
  },
  {
    role: 'Summer Research — Cosmic-Ray Propagation Simulation',
    org: 'Tsung-Dao Lee Institute, SJTU',
    period: '2024.06 — 2024.08',
    tags: ['Numerical Simulation', 'HPC'],
    points: [
      'Studied PeV cosmic-ray density & energy spectra under anisotropic propagation models.',
    ],
  },
]

const education = [
  {
    school: 'National University of Singapore',
    degree: 'M.Sc. Physics for Technology',
    period: '2023 — 2025',
    note: 'GPA 4.38/5 · Trapped-ion quantum computing',
  },
  {
    school: 'China University of Mining and Technology',
    degree: 'B.Sc. Optoelectronic Information Science & Engineering',
    period: '2019 — 2023',
    note: 'GPA 3.7/4 · Top 15% · Statistical physics thesis',
  },
]

const workProjects = [
  {
    icon: ScanLine,
    name: 'SMO Engine',
    desc: 'Core Source Mask Optimization stages in C++. Built Good Initial Illumination & Job Inherit; Pattern Selection stage shipped in the product.',
    meta: 'C++ · Python · Shipped',
  },
  {
    icon: LayoutGrid,
    name: 'Test Pattern Generator',
    desc: 'Sole architect & maintainer. Plugin-based layout generator with NumPy-vectorized geometry, GUI, scripting and external APIs — delivered to OPC, SMO R&D and FAE teams.',
    meta: 'Python · Sole owner · 1yr+',
  },
  {
    icon: Sparkles,
    name: 'AI-Assisted SRAF',
    desc: 'BicycleGAN-based SRAF generation model integrated into a prototype; cut CTM runtime by over 50% offline.',
    meta: 'PyTorch · GAN · Prototype',
  },
]

const ossProjects = [
  {
    icon: BookOpen,
    name: '计算光刻 Wiki · litho-wiki',
    desc: 'Interactive Chinese wiki on computational lithography — Rayleigh criterion to ILT/EUV, with live demos (Abbe imaging, ILT/SMO optimizer).',
    href: 'https://zcwarren.github.io/litho-wiki/',
    stars: 0,
    lang: 'JavaScript',
  },
  {
    icon: Atom,
    name: 'Fast-Qubit-State-Measurement-and-Feedback',
    desc: 'FPGA-based fast qubit state detection for trapped-ion quantum computing.',
    href: 'https://github.com/ZCWarren/Fast-Qubit-State-Measurement-and-Feedback',
    stars: 1,
  },
  {
    icon: CircuitBoard,
    name: 'Quantum-information-and-computation',
    desc: 'NUS PC5228 final project on quantum information and computation.',
    href: 'https://github.com/ZCWarren/Quantum-information-and-computation',
    stars: 3,
    lang: 'Jupyter Notebook',
  },
  {
    icon: MapPin,
    name: 'Global-Flight-Network-Analysis',
    desc: 'Network analysis of the global flight route graph.',
    href: 'https://github.com/ZCWarren/Global-Flight-Network-Analysis',
    stars: 2,
    lang: 'Python',
  },
  {
    icon: Cpu,
    name: 'Accelerometer-Microphone',
    desc: 'Experiments with accelerometer-as-microphone sensing.',
    href: 'https://github.com/ZCWarren/Accelerometer-Microphone',
    stars: 3,
    lang: 'Jupyter Notebook',
  },
]

const skills = [
  {
    label: 'Languages',
    items: ['Python', 'C++', 'C', 'Verilog', 'Rust', 'Swift', 'JavaScript', 'SQL'],
  },
  {
    label: 'Workflow',
    items: ['Linux', 'Shell', 'Vim', 'Git', 'Git-mm', 'Codex', 'Cursor', 'Kimi Code'],
  },
  {
    label: 'Domains',
    items: ['Computational Lithography', 'SMO / OPC', 'Transformers & GANs', 'Quantum Computing', 'HPC Clusters'],
  },
]

const hobbies = [
  {
    icon: Trophy,
    title: 'Football',
    desc: 'Captain of college and company teams, with multiple championships.',
  },
  {
    icon: BookOpen,
    title: 'Reading & Film',
    desc: 'Full-time engineer, part-time critic with strong opinions on endings.',
    href: 'https://www.douban.com/people/176249555/',
    linkLabel: 'Douban ↗',
  },
  {
    icon: PenLine,
    title: 'Writing & Languages',
    desc: 'IELTS 7.0, fluent English; strong technical writing, always following AI.',
  },
]

/* -------------------------------------------------------------- helpers */

function SectionTitle({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <h2 className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
      <Icon className="h-4 w-4" />
      {children}
    </h2>
  )
}

/* ----------------------------------------------------------------- page */

export default function Home() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light')
    } catch {}
  }, [dark])

  const copyWeChat = async () => {
    try {
      await navigator.clipboard.writeText('Szc1123581321')
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* ---------------------------------------------------------- nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <a href="#top" onClick={scrollTo('top')} className="font-mono text-sm font-semibold tracking-tight">
            zc<span className="text-amber-600 dark:text-amber-500">·</span>warren
          </a>
          <nav className="flex items-center gap-1 text-sm text-muted-foreground sm:gap-2">
            {[
              ['Experience', 'experience'],
              ['Projects', 'projects'],
              ['Skills', 'skills'],
            ].map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={scrollTo(id)}
                className="hidden rounded-md px-2.5 py-1.5 transition-colors hover:text-foreground sm:block"
              >
                {label}
              </a>
            ))}
            <a
              href="https://github.com/ZCWarren"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-md p-2 transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <button
              onClick={() => setDark(!dark)}
              aria-label="Toggle theme"
              className="rounded-md p-2 transition-colors hover:text-foreground"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-3xl px-6">
        {/* --------------------------------------------------------- hero */}
        <section className="pb-16 pt-32">
          <p className="mb-4 text-sm text-muted-foreground">Hey, I am</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Zichen (Warren) Song
            <span className="text-amber-600 dark:text-amber-500">.</span>
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Algorithm &amp; Modeling Engineer in Computational Lithography
          </p>

          <div className="mt-6 space-y-3 leading-relaxed text-muted-foreground">
            <p>
              I develop{' '}
              <span className="text-foreground">SMO (Source Mask Optimization)</span> engines in C++ at
              Shanghai Yuliangsheng Technology, and own fab-facing validation at customer fabs — from exposure
              &amp; metrology all the way back to SMO/OPC R&amp;D.
            </p>
            <p>
              Before that, I earned my M.Sc. at{' '}
              <span className="text-foreground">NUS</span> (Physics for Technology, GPA 4.38/5), where I built an
              FPGA-based fast qubit state measurement system for trapped-ion quantum computing at{' '}
              <span className="text-foreground">CQT</span>.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-1">
            {socials.map(({ icon: Icon, label, href }) =>
              href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  title={label}
                  className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ) : (
                <span
                  key={label}
                  title={`${label} — link coming soon`}
                  aria-label={`${label} placeholder`}
                  className="cursor-not-allowed rounded-lg p-2.5 text-muted-foreground/35"
                >
                  <Icon className="h-5 w-5" />
                </span>
              ),
            )}
            <button
              onClick={copyWeChat}
              title={copied ? 'Copied: Szc1123581321' : 'WeChat: Szc1123581321 (click to copy)'}
              className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <MessageCircle className="h-5 w-5" />}
            </button>
            <span className="mx-2 hidden h-4 w-px bg-border sm:block" />
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> Singapore / Shanghai
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {RESUMES.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-amber-600/40 hover:text-foreground dark:hover:border-amber-500/40"
              >
                <FileText className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                {label}
              </a>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------- experience */}
        <section id="experience" className="scroll-mt-20 border-t border-border/60 py-14">
          <SectionTitle icon={Briefcase}>Experience</SectionTitle>
          <div className="space-y-10">
            {experience.map((job) => (
              <article key={job.role} className="group relative pl-6">
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-amber-600/70 dark:bg-amber-500/70" />
                <span className="absolute bottom-0 left-[3.5px] top-5 w-px bg-border" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-semibold leading-snug">{job.role}</h3>
                  <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-amber-700/90 dark:text-amber-500/80">{job.org}</p>
                <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted-foreground">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-50" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <h3 className="mb-6 mt-14 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            Education
          </h3>
          <div className="space-y-5">
            {education.map((ed) => (
              <div key={ed.school} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="font-medium">{ed.school}</p>
                  <p className="text-sm text-muted-foreground">
                    {ed.degree} · <span className="opacity-80">{ed.note}</span>
                  </p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{ed.period}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------------- projects */}
        <section id="projects" className="scroll-mt-20 border-t border-border/60 py-14">
          <SectionTitle icon={CircuitBoard}>Projects</SectionTitle>

          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
            Computational Lithography @ Work
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {workProjects.map(({ icon: Icon, name, desc, meta }) => (
              <div
                key={name}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/25"
              >
                <div className="mb-2 flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-500" />
                  <span className="font-medium">{name}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">{meta}</p>
              </div>
            ))}
          </div>

          <p className="mb-4 mt-10 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
            Open Source &amp; Research —{' '}
            <a
              href="https://github.com/ZCWarren"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
            >
              github/ZCWarren
            </a>
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {ossProjects.map(({ icon: Icon, name, desc, href, stars, lang }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/25"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                    <span className="truncate font-medium">{name}</span>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3" />
                    {stars}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                {lang && (
                  <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground/70">
                    <span className="h-2 w-2 rounded-full bg-amber-600/70 dark:bg-amber-500/70" />
                    {lang}
                  </p>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- skills */}
        <section id="skills" className="scroll-mt-20 border-t border-border/60 py-14">
          <SectionTitle icon={Cpu}>Skills</SectionTitle>
          <div className="space-y-6">
            {skills.map(({ label, items }) => (
              <div key={label} className="grid gap-3 sm:grid-cols-[110px_1fr] sm:items-baseline">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item, i) => (
                    <span
                      key={item}
                      className={
                        i < 2 && label === 'Languages'
                          ? 'rounded-md border border-amber-600/30 bg-amber-600/10 px-2.5 py-1 text-xs text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400'
                          : 'rounded-md border border-border bg-muted/40 px-2.5 py-1 text-xs text-foreground/80'
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              Beyond Work
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {hobbies.map(({ icon: Icon, title, desc, href, linkLabel }) => (
                <div key={title} className="rounded-lg border border-border bg-card p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                    <span className="text-sm font-medium">{title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block font-mono text-xs text-muted-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
                    >
                      {linkLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm italic text-muted-foreground/80">
              “The corners of the world, our mere prologue.”
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------- footer */}
        <footer className="border-t border-border/60 py-10 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>
              © 2026 <span className="text-foreground">Zichen (Warren) Song</span> · 宋紫辰
            </p>
            <div className="flex items-center gap-4 font-mono text-xs">
              <a href="mailto:e1127317@u.nus.edu" className="transition-colors hover:text-foreground">
                mail
              </a>
              <a
                href="https://github.com/ZCWarren"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                github
              </a>
              {PROFILE.linkedin && (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  linkedin
                </a>
              )}
              {PROFILE.x && (
                <a
                  href={PROFILE.x}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  x
                </a>
              )}
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
