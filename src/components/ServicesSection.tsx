import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor, Film, Code2, Scissors, Layers, Clapperboard,
  Palette, Globe, Zap, Play,
} from 'lucide-react';
import { fadeUp } from '../utils/animations';
import type { LucideIcon } from 'lucide-react';

/* ── Service data ───────────────────────────────────────────────── */
const SERVICES: {
  num:         string;
  icon:        LucideIcon;
  accent:      string;          // tailwind colour name prefix
  title:       string;
  category:    string;
  description: string;
  tags:        string[];
  glow:        string;          // CSS box-shadow colour
}[] = [
  /* ── WEB DEVELOPMENT ── */
  {
    num: '01',
    icon: Monitor,
    accent: 'purple',
    category: 'Web Development',
    title: 'Responsive Website Design',
    description:
      'Clean, modern, fully responsive websites built from scratch — pixel-perfect on every device. From landing pages to multi-page portfolio sites, each project is crafted with modern HTML, CSS, and JavaScript best practices.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX'],
    glow: 'rgba(124,58,237,0.35)',
  },
  {
    num: '02',
    icon: Code2,
    accent: 'violet',
    category: 'Web Development',
    title: 'React & Frontend Apps',
    description:
      'Interactive, component-driven web apps built with React and modern tooling. Fast performance, smooth animations via Framer Motion, and clean state management — tailored to your product vision.',
    tags: ['React', 'Vite', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    glow: 'rgba(139,92,246,0.35)',
  },
  {
    num: '03',
    icon: Globe,
    accent: 'blue',
    category: 'Web Development',
    title: 'Portfolio & Personal Sites',
    description:
      'Stand-out portfolio websites for creatives, developers, and professionals. Custom designs that reflect your brand identity, with fast load times and SEO-friendly structure to help you get discovered.',
    tags: ['Portfolio', 'SEO', 'Google Fonts', 'Performance', 'Animations'],
    glow: 'rgba(59,130,246,0.35)',
  },

  /* ── VIDEO EDITING ── */
  {
    num: '04',
    icon: Scissors,
    accent: 'pink',
    category: 'Video Editing',
    title: 'Reels & Short-Form Content',
    description:
      'High-energy short-form videos for Instagram Reels, YouTube Shorts, and TikTok. Beat-synced cuts, speed ramps, smooth transitions, and mobile-first framing — built to stop the scroll.',
    tags: ['Reels', 'CapCut', 'Alight Motion', 'Beat Sync', 'Transitions'],
    glow: 'rgba(219,39,119,0.35)',
  },
  {
    num: '05',
    icon: Clapperboard,
    accent: 'orange',
    category: 'Video Editing',
    title: 'Title Cards & Motion Graphics',
    description:
      'Eye-catching title cards, intros, and kinetic text animations. From cinematic movie-style title sequences to branded lower thirds — every frame designed to impress and captivate.',
    tags: ['After Effects', 'Alight Motion', 'Motion Graphics', 'Typography'],
    glow: 'rgba(234,88,12,0.35)',
  },
  {
    num: '06',
    icon: Palette,
    accent: 'teal',
    category: 'Video Editing',
    title: 'Colour Grading & VFX',
    description:
      'Professional colour grading to give your videos a cinematic, polished look. LUT application, skin tone balancing, highlight & shadow control — plus light leaks, particle effects, and glitch VFX.',
    tags: ['Colour Grading', 'LUTs', 'VFX', 'Blender', 'After Effects'],
    glow: 'rgba(20,184,166,0.35)',
  },
];

/* ── Accent colour maps ─────────────────────────────────────────── */
const ACCENT: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-400', badge: 'bg-purple-500/15 text-purple-300 border-purple-500/25' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/25', text: 'text-violet-400', badge: 'bg-violet-500/15 text-violet-300 border-violet-500/25' },
  blue:   { bg: 'bg-blue-500/10',   border: 'border-blue-500/25',   text: 'text-blue-400',   badge: 'bg-blue-500/15   text-blue-300   border-blue-500/25'   },
  pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/25',   text: 'text-pink-400',   badge: 'bg-pink-500/15   text-pink-300   border-pink-500/25'   },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/25', text: 'text-orange-400', badge: 'bg-orange-500/15 text-orange-300 border-orange-500/25' },
  teal:   { bg: 'bg-teal-500/10',   border: 'border-teal-500/25',   text: 'text-teal-400',   badge: 'bg-teal-500/15   text-teal-300   border-teal-500/25'   },
};

/* ── Category tab ───────────────────────────────────────────────── */
const TABS = ['All', 'Web Development', 'Video Editing'] as const;
type Tab = typeof TABS[number];

/* ── Single service card ────────────────────────────────────────── */
const ServiceCard: React.FC<{ svc: typeof SERVICES[0]; i: number }> = ({ svc, i }) => {
  const [hovered, setHovered] = useState(false);
  const ac = ACCENT[svc.accent];
  const Icon = svc.icon;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      custom={i}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        border: hovered ? `1px solid ${svc.glow.replace('0.35', '0.6')}` : '1px solid rgba(255,255,255,0.07)',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        boxShadow: hovered ? `0 0 40px ${svc.glow}, 0 16px 48px rgba(0,0,0,0.5)` : '0 2px 20px rgba(0,0,0,0.3)',
        padding: '28px',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* glow orb behind card */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px',
        width: '160px', height: '160px', borderRadius: '50%',
        background: svc.glow.replace('0.35', '0.12'),
        filter: 'blur(40px)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s',
        pointerEvents: 'none',
      }} />

      {/* header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* icon box */}
          <div className={`w-11 h-11 rounded-xl ${ac.bg} ${ac.border} border flex items-center justify-center flex-shrink-0 transition-all duration-300`}
            style={{ boxShadow: hovered ? `0 0 20px ${svc.glow}` : 'none' }}>
            <Icon size={19} className={ac.text} />
          </div>
          {/* category badge */}
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${ac.badge}`}
            style={{ fontFamily: 'Kanit, sans-serif' }}>
            {svc.category}
          </span>
        </div>
        {/* number */}
        <span style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 900, fontSize: '22px', color: hovered ? 'rgba(255,255,255,0.15)' : '#222', transition: 'color 0.3s' }}>
          {svc.num}
        </span>
      </div>

      {/* title */}
      <h3 style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '10px' }}>
        {svc.title}
      </h3>

      {/* description */}
      <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#666', lineHeight: 1.7, marginBottom: '18px' }}>
        {svc.description}
      </p>

      {/* tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {svc.tags.map((tag) => (
          <span key={tag} style={{
            padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 500,
            color: '#555', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
            fontFamily: 'Kanit, sans-serif',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

/* ── Section ────────────────────────────────────────────────────── */
const ServicesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const filtered = activeTab === 'All'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeTab);

  return (
    <section
      id="services"
      className="py-28 px-6 max-w-7xl mx-auto"
      style={{ scrollMarginTop: 80 }}
    >
      {/* ── Heading ──────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-12"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4"
          style={{ fontFamily: 'Kanit, sans-serif' }}>
          What I Offer
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'Kanit, sans-serif' }}>
            Services
          </h2>
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Kanit, sans-serif' }}>
            Professional quality · Delivered fast
          </p>
        </div>
      </motion.div>

      {/* ── Category tabs ────────────────────────────────────── */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          const tabIcon = tab === 'Web Development' ? <Monitor size={13} /> : tab === 'Video Editing' ? <Film size={13} /> : <Zap size={13} />;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 18px', borderRadius: '99px', fontSize: '13px', fontWeight: 600,
                fontFamily: 'Kanit, sans-serif', cursor: 'pointer',
                background: isActive ? 'linear-gradient(135deg,#7c3aed,#db2777)' : 'rgba(255,255,255,0.05)',
                border: isActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
                color: isActive ? '#fff' : '#888',
                boxShadow: isActive ? '0 4px 20px rgba(124,58,237,0.4)' : 'none',
                transition: 'all 0.3s ease',
              }}
            >
              {tabIcon}
              {tab}
            </button>
          );
        })}
      </motion.div>

      {/* ── Service cards grid ───────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {filtered.map((svc, i) => (
          <ServiceCard key={svc.num} svc={svc} i={i} />
        ))}
      </div>

      {/* ── Bottom CTA strip ─────────────────────────────────── */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show"
        viewport={{ once: true }}
        style={{
          marginTop: '56px', padding: '32px 40px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(219,39,119,0.10))',
          border: '1px solid rgba(124,58,237,0.2)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
        }}
      >
        <div>
          <p style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '4px' }}>
            Ready to build something great?
          </p>
          <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#777' }}>
            Whether it's a website or a cinematic reel — let's make it happen.
          </p>
        </div>
        <a
          href="#contact"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px', borderRadius: '99px', fontSize: '14px', fontWeight: 700,
            fontFamily: 'Kanit, sans-serif', textDecoration: 'none',
            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
            color: '#fff', boxShadow: '0 4px 24px rgba(124,58,237,0.45)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(124,58,237,0.6)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 24px rgba(124,58,237,0.45)';
          }}
        >
          <Play size={14} />
          Get in Touch
        </a>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
