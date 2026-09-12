import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, PointerEvent, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSubmitContact } from '@workspace/api-client-react';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Github, Instagram, Layers3, Mail, Menu, MoveUpRight, Send,
  X, Zap,
} from 'lucide-react';

const LazyCore = lazy(async () => ({ default: CoreScene }));

const quotes = [
  'Just a random guy',
  'I survived all the snakes but a butterfly killed me 😁',
  'Pretty poison, right?',
];

const skills = [
  { label: '[01] / System craft', title: 'Interface Architecture', note: 'Building and configuring robust server-side mechanics, custom property files, and high-performance network structures across multiple Minecraft platforms.', mark: '01' },
  { label: '[02] / Motion systems', title: 'Creative Frontend', note: 'Crafting responsive UI designs, motion-design portfolios with GSAP frameworks, and custom glassmorphism web layouts.', mark: '02' },
  { label: '[03] / Product instinct', title: 'Product Thinking', note: 'Developing full-stack web applications, authentication platforms, and real-time multiplayer web games like EcoClean 3D deployed via Render.', mark: '03' },
  { label: '[04] / Prototype lab', title: 'Visual Prototyping', note: 'Engineering automated arena mechanics in Roblox, designing interactive web experiences, and structuring custom dashboard code frameworks.', mark: '04' },
];

const projects = [
  {
    id: 'P-001',
    title: 'J.A.R.V.I.S',
    subtitle: 'An AI made by Utkarsh himself.',
    type: 'Experimental Product / Web Game',
    year: '2024',
    color: '#95fff0',
    description: 'An AI made by Utkarsh himself — the project he is very proud of.',
    stack: ['AI', 'Web', 'Interactive UI'],
    result: 'Personal build / proud project',
  },
  {
    id: 'P-002',
    title: 'NordenMC',
    subtitle: 'A custom-configured Minecraft server community.',
    type: 'Data Experience / Community Network',
    year: '2023',
    color: '#ffb7e8',
    description: 'A custom-configured Minecraft server community featuring advanced YAML data layouts, custom command hooks, and live property management.',
    stack: ['Minecraft', 'YAML', 'Command Hooks'],
    result: 'Community network / active',
  },
  {
    id: 'P-003',
    title: 'GARDEN OF DEATH',
    subtitle: 'A web application built with custom interactive components.',
    type: 'Community Experiment / Web Application',
    year: '2023',
    color: '#ffd58a',
    description: 'A web-based application built with custom interactive components and deployed to Render.',
    stack: ['Web App', 'Interactive Components', 'Render'],
    result: 'Deployed / Render',
  },
];

const timeline = [
  { year: 'NOW', title: 'Building in public', copy: 'Independent experiments at the intersection of code, culture, and the browser.' },
  { year: '2023', title: 'The deep end', copy: 'Shipped products, broke interfaces, rebuilt them with better questions.' },
  { year: '2021', title: 'First commit', copy: 'Found out that a screen can be a place, not just a rectangle.' },
];

function CoreScene() {
  const coreRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = coreRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTilt({
      x: ((event.clientY - rect.top) / rect.height - 0.5) * -16,
      y: ((event.clientX - rect.left) / rect.width - 0.5) * 16,
    });
  };
  return (
    <div
      ref={coreRef}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative h-[360px] w-full sm:h-[500px]"
      data-testid="interactive-3d-centerpiece"
    >
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#95fff0]/10 blur-[70px]" />
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        style={{ transformStyle: 'preserve-3d', perspective: 900 }}
        className="orb absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 sm:h-[310px] sm:w-[310px]"
      >
        <div className="absolute inset-0 rounded-full border border-[#95fff0]/45 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,.42),transparent_13%),radial-gradient(circle_at_52%_45%,rgba(149,255,240,.33),transparent_48%),linear-gradient(135deg,rgba(40,77,83,.9),rgba(17,17,23,.96))] shadow-[inset_-28px_-24px_55px_rgba(3,11,15,.7),inset_20px_20px_50px_rgba(149,255,240,.15),0_0_80px_rgba(149,255,240,.13)]" />
        <div className="orb-inner absolute inset-[-24px] rounded-full border border-dashed border-[#95fff0]/25" style={{ transform: 'translateZ(28px)' }} />
        <div className="absolute left-[15%] top-[22%] h-10 w-10 rounded-full border border-[#ffb7e8]/40 bg-[#ffb7e8]/10 blur-[1px]" style={{ transform: 'translateZ(56px)' }} />
        <div className="absolute bottom-[15%] right-[18%] h-5 w-5 rounded-full bg-[#ffd58a]/70 shadow-[0_0_22px_#ffd58a]" style={{ transform: 'translateZ(70px)' }} />
        <div className="absolute -right-10 top-[42%] rounded-full border border-[#95fff0]/30 bg-[#95fff0]/5 px-3 py-2 font-mono text-[9px] tracking-[.18em] text-[#95fff0]" style={{ transform: 'translateZ(90px)' }}>LIVE / 001</div>
      </motion.div>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[.22em] text-[#8d8c9d]">move the field</div>
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: .7, delay, ease: [0.22, 1, .36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [booting, setBooting] = useState(true);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formState, setFormState] = useState<'idle' | 'error' | 'sending' | 'sent' | 'provider-error'>('idle');
  const [cursor, setCursor] = useState({ x: 50, y: 30 });
  const reduce = useReducedMotion();
  const contactMutation = useSubmitContact({
    mutation: {
      onSuccess: () => {
        setFormState('sent');
        setForm({ name: '', email: '', message: '' });
      },
      onError: () => setFormState('provider-error'),
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setQuoteIndex((index) => (index + 1) % quotes.length), 3800);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard?.writeText('utkarshpandeypropl@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    if (!payload.name || !/^\S+@\S+\.\S+$/.test(payload.email) || payload.message.length < 10) {
      setFormState('error');
      return;
    }
    setFormState('sending');
    contactMutation.mutate({ data: payload });
  };
  const navItems = useMemo(() => [['about', 'About'], ['work', 'Work'], ['signal', 'Signal'], ['contact', 'Contact']], []);

  return (
    <div
      style={{ '--cursor-x': `${cursor.x}%`, '--cursor-y': `${cursor.y}%` } as CSSProperties}
      onPointerMove={(event) => setCursor({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 })}
      className="min-h-[100dvh] bg-[#111117] text-[#e6e1d8]"
    >
      {booting && (
        <motion.div
          initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.05, duration: .35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111117]"
          onAnimationComplete={() => setBooting(false)}
          data-testid="intro-boot-screen"
        >
          <div className="w-[260px] font-mono text-[10px] uppercase tracking-[.18em] text-[#95fff0]">
            <div className="mb-5 flex items-center justify-between text-[#8d8c9d]"><span>UP / OS</span><span>v.01.24</span></div>
            <div className="mb-3 h-px bg-[#95fff0]/25"><motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.05 }} className="h-full bg-[#95fff0]" /></div>
            <div className="flex justify-between"><span>loading personal system</span><span className="blink">_</span></div>
          </div>
        </motion.div>
      )}

      <div className="pointer-events-none fixed left-[var(--cursor-x)] top-[var(--cursor-y)] z-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#95fff0]/[.045] blur-[80px] transition-[left,top] duration-700" />

      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#e6e1d8]/[.08] bg-[#111117]/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3" data-testid="link-home">
            <span className="flex h-8 w-8 items-center justify-center border border-[#95fff0]/50 font-display text-sm font-bold text-[#95fff0] transition group-hover:bg-[#95fff0] group-hover:text-[#111117]">U</span>
            <span className="font-mono text-[10px] uppercase tracking-[.18em] text-[#8d8c9d] group-hover:text-[#e6e1d8]">Utkarsh / Pandey</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(([id, label], index) => (
              <a href={`#${id}`} key={id} className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#8d8c9d] transition hover:text-[#95fff0]" data-testid={`link-nav-${id}`}>
                <span className="text-[#95fff0]/60">0{index + 1}</span>{label}<span className="h-px w-0 bg-[#95fff0] transition-all group-hover:w-4" />
              </a>
            ))}
          </div>
          <a href="#contact" className="hidden items-center gap-2 border border-[#95fff0]/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[.14em] text-[#95fff0] transition hover:bg-[#95fff0] hover:text-[#111117] sm:flex" data-testid="link-availability">Available / 2024 <ArrowUpRight size={12} /></a>
          <button onClick={() => setMenuOpen((open) => !open)} className="border border-[#e6e1d8]/15 p-2 text-[#e6e1d8] md:hidden" aria-label="Toggle navigation" data-testid="button-menu">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
        </nav>
        {menuOpen && <div className="border-t border-[#e6e1d8]/10 bg-[#111117] px-5 py-5 md:hidden">{navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block border-b border-[#e6e1d8]/10 py-3 font-mono text-xs uppercase tracking-[.16em] text-[#e6e1d8]" data-testid={`link-mobile-${id}`}>{label}</a>)}</div>}
      </header>

      <main id="top">
        <section className="scanlines relative min-h-[100dvh] overflow-hidden border-b border-[#e6e1d8]/10 pt-[72px]">
          <div className="grid-bg absolute inset-0 opacity-70" />
          <div className="absolute right-[-16%] top-[18%] h-[600px] w-[600px] rounded-full border border-[#95fff0]/10" />
          <div className="absolute right-[-11%] top-[24%] h-[500px] w-[500px] rounded-full border border-[#ffb7e8]/10" />
          <div className="relative mx-auto grid min-h-[calc(100dvh-72px)] max-w-[1280px] items-center px-5 py-16 sm:px-8 lg:grid-cols-[1.03fr_.97fr] lg:gap-4 lg:py-10">
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: booting ? 1.35 : .1, duration: .7 }} className="mb-7 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#95fff0] shadow-[0_0_12px_#95fff0]" /><span className="eyebrow">Independent developer / visual thinker</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: booting ? 1.48 : .2, duration: .8 }} className="font-display text-[clamp(4.2rem,13vw,10.5rem)] font-semibold leading-[.83] tracking-[-.075em] text-[#e6e1d8]">
                Utkarsh<br /><span className="text-[#95fff0] text-glow">Pandey<span className="text-[#ffb7e8]">.</span></span>
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: booting ? 1.8 : .55 }} className="mt-10 max-w-[580px]">
                <div className="mb-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.2em] text-[#8d8c9d]"><span className="text-[#95fff0]">01</span><span className="h-px w-12 bg-[#8d8c9d]/40" />current transmission</div>
                <div className="min-h-[74px] overflow-hidden font-display text-xl leading-snug text-[#e6e1d8] sm:text-2xl" data-testid="text-hero-quote">
                  <motion.p key={quoteIndex} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>{quotes[quoteIndex]}</motion.p>
                </div>
                <p className="mt-1 max-w-[430px] text-sm leading-6 text-[#8d8c9d]">I make digital things with a pulse — interfaces that feel a little more alive than they need to.</p>
              </motion.div>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#work" className="group flex items-center gap-3 bg-[#95fff0] px-5 py-3 font-mono text-[10px] uppercase tracking-[.13em] text-[#111117] transition hover:bg-[#e6e1d8]" data-testid="link-view-work">Enter the work <ArrowRight size={14} className="transition group-hover:translate-x-1" /></a>
                <a href="https://github.com/Slayers-001" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-[#e6e1d8]/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[.13em] text-[#e6e1d8] transition hover:border-[#95fff0]/60 hover:text-[#95fff0]" data-testid="link-github-hero"><Github size={14} /> GitHub</a>
              </div>
            </div>
            <div className="relative mt-2 lg:mt-16"><Suspense fallback={<div className="h-[360px] sm:h-[500px]" />}><LazyCore /></Suspense><div className="absolute left-0 top-1/2 hidden -translate-y-1/2 font-mono text-[9px] uppercase tracking-[.18em] text-[#8d8c9d] [writing-mode:vertical-rl] lg:block">a small universe / built in browser</div></div>
          </div>
          <a href="#about" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[.2em] text-[#8d8c9d] transition hover:text-[#95fff0] sm:flex" data-testid="link-scroll-about">scroll to explore <ArrowDown size={13} className="animate-bounce" /></a>
        </section>

        <div className="overflow-hidden border-b border-[#e6e1d8]/10 py-4"><div className="marquee flex w-max items-center gap-8 font-mono text-[10px] uppercase tracking-[.21em] text-[#8d8c9d]"><span>code with a point of view</span><i className="text-[#95fff0]">/</i><span>interfaces with a pulse</span><i className="text-[#ffb7e8]">/</i><span>curious by default</span><i className="text-[#ffd58a]">/</i><span>code with a point of view</span><i className="text-[#95fff0]">/</i><span>interfaces with a pulse</span><i className="text-[#ffb7e8]">/</i></div></div>

        <section id="about" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 sm:px-8 lg:py-40">
          <Reveal><div className="mb-12 flex items-end justify-between border-b border-[#e6e1d8]/10 pb-4"><span className="eyebrow">02 / About the operator</span><span className="hidden font-mono text-[10px] text-[#8d8c9d] sm:block">coordinates: 28.6139° N / 77.2090° E</span></div></Reveal>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-28"><Reveal><h2 className="font-display text-4xl font-medium leading-[.98] tracking-[-.05em] text-[#e6e1d8] sm:text-6xl">Not a portfolio.<br /><span className="text-[#95fff0]">A point of view.</span></h2></Reveal><Reveal delay={.12}><div className="max-w-[590px]"><p className="text-xl leading-8 text-[#e6e1d8]">I’m Utkarsh — a developer who notices the tiny things. The pause before a page loads. The way a button says “try again.” The strange confidence of a good typeface.</p><p className="mt-7 text-sm leading-7 text-[#8d8c9d]">I work across product, frontend, and visual systems. My favorite projects sit somewhere between useful and unexpected — they solve a real problem, then leave a little room for wonder.</p><div className="mt-9 grid grid-cols-2 gap-px border border-[#e6e1d8]/10 bg-[#e6e1d8]/10 sm:grid-cols-4"><div className="bg-[#111117] p-4"><b className="font-display text-2xl text-[#95fff0]">04</b><span className="mt-2 block font-mono text-[9px] uppercase tracking-widest text-[#8d8c9d]">years making</span></div><div className="bg-[#111117] p-4"><b className="font-display text-2xl text-[#ffb7e8]">17</b><span className="mt-2 block font-mono text-[9px] uppercase tracking-widest text-[#8d8c9d]">rabbit holes</span></div><div className="bg-[#111117] p-4"><b className="font-display text-2xl text-[#ffd58a]">∞</b><span className="mt-2 block font-mono text-[9px] uppercase tracking-widest text-[#8d8c9d]">tabs open</span></div><div className="bg-[#111117] p-4"><b className="font-display text-2xl text-[#95fff0]">01</b><span className="mt-2 block font-mono text-[9px] uppercase tracking-widest text-[#8d8c9d]">good question</span></div></div></div></Reveal></div>
        </section>

        <section id="signal" className="border-y border-[#e6e1d8]/10 bg-[#15151d] scroll-mt-24"><div className="mx-auto max-w-[1280px] px-5 py-28 sm:px-8 lg:py-36"><Reveal><div className="mb-14 flex items-end justify-between"><div><span className="eyebrow">03 / Signal stack</span><h2 className="mt-4 font-display text-4xl tracking-[-.05em] sm:text-6xl">What I bring<br /><span className="text-[#8d8c9d]">to the table.</span></h2></div><Zap className="hidden text-[#ffd58a] sm:block" size={27} /></div></Reveal><div className="grid gap-3 md:grid-cols-2">{skills.map((skill, index) => <Reveal key={skill.label} delay={index * .06}><article className="group relative overflow-hidden border border-[#e6e1d8]/10 p-6 transition duration-500 hover:border-[#95fff0]/45 hover:bg-[#111117] sm:p-8"><span className="absolute right-5 top-5 font-mono text-[10px] text-[#8d8c9d]">{skill.mark}</span><div className="mb-16 flex h-10 w-10 items-center justify-center border border-[#95fff0]/30 text-[#95fff0] transition group-hover:rotate-45 group-hover:bg-[#95fff0]/10"><Layers3 size={17} /></div><span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#95fff0]">{skill.label}</span><h3 className="mt-3 font-display text-2xl text-[#e6e1d8]">{skill.title}</h3><p className="mt-3 text-sm text-[#8d8c9d]">{skill.note}</p><ArrowUpRight size={17} className="absolute bottom-7 right-7 text-[#8d8c9d] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#95fff0]" /></article></Reveal>)}</div></div></section>

        <section id="work" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-28 sm:px-8 lg:py-40"><Reveal><div className="mb-14 flex items-end justify-between border-b border-[#e6e1d8]/10 pb-5"><div><span className="eyebrow">04 / Selected transmissions</span><h2 className="mt-4 font-display text-4xl tracking-[-.05em] sm:text-6xl">Work in<br /><span className="text-[#ffb7e8]">progress.</span></h2></div><span className="hidden font-mono text-[10px] uppercase tracking-[.17em] text-[#8d8c9d] sm:block">click a signal to inspect</span></div></Reveal><div className="space-y-3">{projects.map((project, index) => <Reveal key={project.id} delay={index * .08}><button onClick={() => setSelectedProject(project)} className="group relative grid w-full gap-5 border-b border-[#e6e1d8]/10 py-8 text-left transition hover:px-4 hover:bg-[#15151d] sm:grid-cols-[90px_1fr_180px_50px] sm:items-center" data-testid={`button-project-${project.id}`}><span className="font-mono text-[10px] text-[#8d8c9d]">{project.id}</span><span><span className="block font-display text-3xl tracking-[-.04em] text-[#e6e1d8] transition group-hover:text-[#95fff0] sm:text-4xl">{project.title}</span><span className="mt-2 block text-sm text-[#8d8c9d]">{project.subtitle}</span></span><span className="font-mono text-[9px] uppercase tracking-[.13em] text-[#8d8c9d]">{project.type}<br /><span style={{ color: project.color }}>{project.year}</span></span><span className="flex h-10 w-10 items-center justify-center border border-[#e6e1d8]/15 text-[#8d8c9d] transition group-hover:border-[#95fff0] group-hover:text-[#95fff0]"><MoveUpRight size={16} /></span></button></Reveal>)}</div></section>

        <section className="border-y border-[#e6e1d8]/10 bg-[#15151d]"><div className="mx-auto grid max-w-[1280px] gap-16 px-5 py-28 sm:px-8 lg:grid-cols-[.65fr_1.35fr] lg:py-36"><Reveal><div><span className="eyebrow">05 / Runtime log</span><h2 className="mt-4 font-display text-4xl tracking-[-.05em] sm:text-5xl">Still<br /><span className="text-[#ffd58a]">becoming.</span></h2></div></Reveal><div className="border-l border-[#e6e1d8]/15">{timeline.map((item, index) => <Reveal key={item.year} delay={index * .1}><div className="relative border-b border-[#e6e1d8]/10 py-7 pl-7 first:pt-0 sm:pl-12"><span className="absolute -left-[5px] top-8 h-2 w-2 rounded-full bg-[#95fff0] shadow-[0_0_10px_#95fff0] first:top-1" /><span className="font-mono text-[10px] tracking-[.18em] text-[#95fff0]">{item.year}</span><h3 className="mt-2 font-display text-2xl">{item.title}</h3><p className="mt-2 max-w-[450px] text-sm leading-6 text-[#8d8c9d]">{item.copy}</p></div></Reveal>)}</div></div></section>

         <section id="contact" className="relative mx-auto max-w-[1280px] scroll-mt-24 overflow-hidden px-5 py-28 sm:px-8 lg:py-40"><div className="pointer-events-none absolute right-[-60px] top-24 h-72 w-72 rounded-full border border-[#95fff0]/10" /><Reveal><div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-28"><div><span className="eyebrow">06 / Open channel</span><h2 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.06em] sm:text-7xl">Have a strange<br /><span className="text-[#95fff0]">idea?</span></h2><p className="mt-8 max-w-[330px] text-sm leading-7 text-[#8d8c9d]">Good. Send it over. The best work usually starts as something that sounds slightly impossible.</p><div className="mt-10 flex flex-wrap gap-3"><a href="https://www.instagram.com/gojostolemywifi/" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-[#e6e1d8]/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#8d8c9d] hover:border-[#ffb7e8]/60 hover:text-[#ffb7e8]" data-testid="link-instagram-primary"><Instagram size={14} /> gojostolemywifi</a><a href="https://www.instagram.com/getoategojo/" target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-[#e6e1d8]/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[#8d8c9d] hover:border-[#ffb7e8]/60 hover:text-[#ffb7e8]" data-testid="link-instagram-secondary"><Instagram size={14} /> getoategojo</a></div></div><form onSubmit={submitForm} className="relative border border-[#e6e1d8]/15 bg-[#15151d] p-6 sm:p-8" noValidate><div className="mb-7 flex items-center justify-between border-b border-[#e6e1d8]/10 pb-4"><span className="font-mono text-[10px] uppercase tracking-[.18em] text-[#95fff0]">message protocol</span><span className="font-mono text-[9px] text-[#8d8c9d]">FORM / 001</span></div><label className="mb-5 block"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[.16em] text-[#8d8c9d]">your name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border-b border-[#e6e1d8]/20 bg-transparent py-3 text-sm text-[#e6e1d8] outline-none transition placeholder:text-[#8d8c9d]/50 focus:border-[#95fff0]" placeholder="What should I call you?" data-testid="input-contact-name" /></label><label className="mb-5 block"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[.16em] text-[#8d8c9d]">return address</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border-b border-[#e6e1d8]/20 bg-transparent py-3 text-sm text-[#e6e1d8] outline-none transition placeholder:text-[#8d8c9d]/50 focus:border-[#95fff0]" placeholder="you@somewhere.good" data-testid="input-contact-email" /></label><label className="mb-6 block"><span className="mb-2 block font-mono text-[9px] uppercase tracking-[.16em] text-[#8d8c9d]">the transmission</span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full resize-none border-b border-[#e6e1d8]/20 bg-transparent py-3 text-sm leading-6 text-[#e6e1d8] outline-none transition placeholder:text-[#8d8c9d]/50 focus:border-[#95fff0]" placeholder="Tell me the thing..." data-testid="input-contact-message" /></label>{formState === 'error' && <p className="mb-4 font-mono text-[10px] text-[#ffb7e8]" data-testid="status-form-error">Please add a name, a valid email, and a little more signal.</p>}{formState === 'provider-error' && <p className="mb-4 font-mono text-[10px] text-[#ffb7e8]" data-testid="status-form-provider-error">Transmission failed. Please try again or use the email link below.</p>}{formState === 'sent' && <p className="mb-4 flex items-center gap-2 font-mono text-[10px] text-[#95fff0]" data-testid="status-form-success"><Check size={13} /> Transmission received. I’ll find you.</p>}<button type="submit" disabled={contactMutation.isPending} className="group flex w-full items-center justify-between bg-[#95fff0] px-5 py-4 font-mono text-[10px] uppercase tracking-[.15em] text-[#111117] transition hover:bg-[#e6e1d8] disabled:cursor-wait disabled:opacity-60" data-testid="button-submit-contact">{contactMutation.isPending ? 'Sending transmission…' : 'Send transmission'} <Send size={15} className="transition group-hover:translate-x-1" /></button></form></div></Reveal></section>
      </main>

      <footer className="border-t border-[#e6e1d8]/10"><div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 py-9 sm:px-8 md:flex-row md:items-end md:justify-between"><div><a href="#top" className="font-display text-2xl tracking-[-.05em]" data-testid="link-footer-home">UP<span className="text-[#95fff0]">.</span></a><p className="mt-2 font-mono text-[9px] uppercase tracking-[.17em] text-[#8d8c9d]">made with attention / Delhi, IN</p></div><div className="flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[.14em] text-[#8d8c9d]"><a href="https://github.com/Slayers-001" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#95fff0]" data-testid="link-footer-github"><Github size={14} /> GitHub</a><a href="https://www.instagram.com/gojostolemywifi/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#ffb7e8]" data-testid="link-footer-instagram"><Instagram size={14} /> Instagram</a><button onClick={copyEmail} className="flex items-center gap-2 hover:text-[#ffd58a]" data-testid="button-copy-email">{copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Email'}</button><a href="mailto:utkarshpandeypropl@gmail.com" className="flex items-center gap-2 hover:text-[#95fff0]" data-testid="link-footer-mail"><Mail size={14} /> Contact</a></div></div></footer>

      {selectedProject && <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#09090c]/80 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" data-testid="project-detail-modal"><motion.div initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative max-h-[90dvh] w-full max-w-[700px] overflow-y-auto border border-[#e6e1d8]/15 bg-[#15151d] p-6 sm:p-10"><button onClick={() => setSelectedProject(null)} className="absolute right-5 top-5 border border-[#e6e1d8]/15 p-2 text-[#8d8c9d] hover:text-[#95fff0]" aria-label="Close project detail" data-testid="button-close-project"><X size={17} /></button><span className="eyebrow">{selectedProject.id} / {selectedProject.type}</span><h2 className="mt-5 max-w-[520px] font-display text-5xl leading-[.92] tracking-[-.06em]" style={{ color: selectedProject.color }}>{selectedProject.title}</h2><p className="mt-7 max-w-[530px] text-lg leading-8 text-[#e6e1d8]">{selectedProject.description}</p><div className="mt-9 grid gap-5 border-y border-[#e6e1d8]/10 py-5 sm:grid-cols-2"><div><span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#8d8c9d]">stack</span><p className="mt-2 text-sm">{selectedProject.stack.join(' / ')}</p></div><div><span className="font-mono text-[9px] uppercase tracking-[.16em] text-[#8d8c9d]">status</span><p className="mt-2 text-sm">{selectedProject.result}</p></div></div><a href="#contact" onClick={() => setSelectedProject(null)} className="mt-8 inline-flex items-center gap-2 border border-[#95fff0]/50 px-4 py-3 font-mono text-[10px] uppercase tracking-[.13em] text-[#95fff0] hover:bg-[#95fff0] hover:text-[#111117]" data-testid="link-project-contact">Talk about a similar idea <ArrowRight size={14} /></a></motion.div></div>}
    </div>
  );
}

export default App;