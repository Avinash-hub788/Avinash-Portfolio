import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Rocket, Globe, Film, ShoppingCart, Brain, ChevronDown, ExternalLink, Book } from 'lucide-react';
import { fadeUp } from '../utils/animations';
import type { LucideIcon } from 'lucide-react';

/* ── Startup idea data ─────────────────────────────────────────── */
const IDEAS: {
  id:          string;
  icon:        LucideIcon;
  logo?:       string;          // optional image path (served from /public)
  stage:       string;
  stageColor:  string;
  title:       string;
  tagline:     string;
  description: string;
  problem:     string;
  solution:    string;
  stack:       string[];
  glow:        string;
}[] = [
  {
    id: 'idea-1',
    icon: Book,
    logo: 'Editing Videos/Jun 25, 2026, 02_27_21 PM.png',
    stage: 'Concept',
    stageColor: 'text-purple-300 bg-purple-500/15 border-purple-500/25',
    title: 'Nexarivu',
    tagline: 'Arivupaalam: Bridging Students to AI Opportunities',
    description: 'A AI-powered learning platform designed to make AI education accessible and personalized for students and professionals. Nexarivu bridges the gap between academic knowledge and real-world AI skills through curated courses, hands-on projects, and expert mentorship.',
    problem: 'In the current education system, there is a significant gap between theoretical knowledge and practical skills required for emerging fields like AI. Students often struggle to find relevant, updated course content and lack guidance on how to apply their learning to real-world challenges. This results in a lack of job-ready graduates and missed opportunities in the rapidly growing AI industry.',
    solution: 'Nexarivu addresses this gap by offering an AI-powered learning ecosystem that delivers personalized learning paths, real-world projects, and expert-led mentorship. The platform combines cutting-edge AI technology with practical, industry-relevant curriculum to equip learners with the skills and confidence needed to excel in the AI-driven future.',
    glow: 'rgba(124,58,237,0.4)',
    stack: ["Frontend", "Backend", "AI / ML", "Databases"]
  },
];

/* ── Expand/collapse card ───────────────────────────────────────── */
const IdeaCard: React.FC<{ idea: typeof IDEAS[0]; index: number }> = ({ idea, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const Icon = idea.icon;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        border: hovered ? `1px solid ${idea.glow.replace('0.4', '0.55')}` : '1px solid rgba(255,255,255,0.07)',
        background: expanded ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.02)',
        boxShadow: hovered ? `0 0 40px ${idea.glow}, 0 16px 48px rgba(0,0,0,0.5)` : '0 2px 20px rgba(0,0,0,0.3)',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* glow orb */}
      <div style={{
        position: 'absolute', top: '-50px', left: '-30px',
        width: '200px', height: '200px', borderRadius: '50%',
        background: idea.glow.replace('0.4', '0.1'),
        filter: 'blur(50px)',
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s',
        pointerEvents: 'none',
      }} />

      {/* ── Card header (always visible) ─────────────────────── */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%', textAlign: 'left',
          padding: '24px 28px', background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
          {/* icon / logo */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
            background: idea.glow.replace('0.4', '0.15'),
            border: `1px solid ${idea.glow.replace('0.4', '0.3')}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: hovered ? `0 0 22px ${idea.glow}` : 'none',
            transition: 'box-shadow 0.3s',
          }}>
            {idea.logo ? (
              <img
                src={idea.logo}
                alt={`${idea.title} logo`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }}
              />
            ) : (
              <Icon size={19} style={{ color: '#ddd' }} />
            )}
          </div>

          <div style={{ flex: 1 }}>
            {/* stage + number row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${idea.stageColor}`}
                style={{ fontFamily: 'Kanit, sans-serif' }}>
                {idea.stage}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#444' }}>
                #{String(index + 1).padStart(2, '0')}
              </span>
            </div>
            {/* title */}
            <h3 style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 800, fontSize: '18px', color: '#fff', margin: 0, marginBottom: '4px' }}>
              {idea.title}
            </h3>
            {/* tagline */}
            <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#666', margin: 0 }}>
              {idea.tagline}
            </p>
          </div>
        </div>

        {/* chevron */}
        <div style={{
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s ease',
          color: '#555', flexShrink: 0, marginTop: '4px',
        }}>
          <ChevronDown size={18} />
        </div>
      </button>

      {/* ── Expanded content ───────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 28px 28px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '14px', color: '#888', lineHeight: 1.7, marginTop: '20px', marginBottom: '20px' }}>
                {idea.description}
              </p>

              {/* problem / solution */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  padding: '14px 16px', borderRadius: '12px',
                  background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.14)',
                }}>
                  <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f87171', marginBottom: '6px' }}>
                    🔴 Problem
                  </p>
                  <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '12px', color: '#888', lineHeight: 1.6, margin: 0 }}>
                    {idea.problem}
                  </p>
                </div>
                <div style={{
                  padding: '14px 16px', borderRadius: '12px',
                  background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.14)',
                }}>
                  <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4ade80', marginBottom: '6px' }}>
                    🟢 Solution
                  </p>
                  <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '12px', color: '#888', lineHeight: 1.6, margin: 0 }}>
                    {idea.solution}
                  </p>
                </div>
              </div>

              {/* stack tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Kanit, sans-serif', fontSize: '10px', color: '#444', marginRight: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Tech:
                </span>
                {idea.stack.map(t => (
                  <span key={t} style={{
                    padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 500,
                    color: '#666', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Kanit, sans-serif',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Section ────────────────────────────────────────────────────── */
const StartupIdeasSection: React.FC = () => (
  <section
    id="startup-ideas"
    className="py-28 px-6 max-w-7xl mx-auto"
    style={{ scrollMarginTop: 80 }}
  >
    {/* ── Heading ────────────────────────────────────────────── */}
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="mb-16"
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4"
        style={{ fontFamily: 'Kanit, sans-serif' }}>
        Ideas in the Making
      </p>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-4xl md:text-5xl font-black text-white"
          style={{ fontFamily: 'Kanit, sans-serif' }}>
          Startup Ideas
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lightbulb size={14} color="#a855f7" />
          <p className="text-gray-500 text-sm" style={{ fontFamily: 'Kanit, sans-serif' }}>
            Click a card to explore the idea
          </p>
        </div>
      </div>
    </motion.div>

    {/* ── Stage legend ──────────────────────────────────────── */}
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}
    >
      {[
        { label: 'Concept',   color: 'text-purple-300 bg-purple-500/15 border-purple-500/25' },
        { label: 'Exploring', color: 'text-cyan-300 bg-cyan-500/15 border-cyan-500/25' },
        { label: 'Research',  color: 'text-yellow-300 bg-yellow-500/15 border-yellow-500/25' },
      ].map(({ label, color }) => (
        <span key={label} className={`px-3 py-1 rounded-full text-xs font-semibold border ${color}`}
          style={{ fontFamily: 'Kanit, sans-serif' }}>
          {label}
        </span>
      ))}
      <span style={{ fontFamily: 'Kanit, sans-serif', fontSize: '12px', color: '#444', alignSelf: 'center', marginLeft: '4px' }}>
        — idea stages
      </span>
    </motion.div>

    {/* ── Ideas grid ────────────────────────────────────────── */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
      gap: '16px',
    }}>
      {IDEAS.map((idea, i) => (
        <IdeaCard key={idea.id} idea={idea} index={i} />
      ))}
    </div>

    {/* ── Bottom note ───────────────────────────────────────── */}
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true }}
      style={{
        marginTop: '56px', padding: '28px 36px', borderRadius: '16px',
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}
    >
      <Lightbulb size={28} color="#a855f7" style={{ flexShrink: 0 }} />
      <div>
        <p style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '15px', color: '#ccc', marginBottom: '4px' }}>
          Got a similar idea? Let's talk.
        </p>
        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#555', margin: 0 }}>
          I'm always open to collaborating on products that solve real problems — whether it's building the MVP or just validating the idea.
        </p>
      </div>
      <a
        href="#contact"
        style={{
          marginLeft: 'auto', flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '10px 22px', borderRadius: '99px', fontSize: '13px', fontWeight: 600,
          fontFamily: 'Kanit, sans-serif', textDecoration: 'none',
          background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)',
          color: '#c084fc', transition: 'all 0.25s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(168,85,247,0.28)';
          (e.currentTarget as HTMLAnchorElement).style.color = '#e9d5ff';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(168,85,247,0.15)';
          (e.currentTarget as HTMLAnchorElement).style.color = '#c084fc';
        }}
      >
        <ExternalLink size={13} />
        Collaborate
      </a>
    </motion.div>
  </section>
);

export default StartupIdeasSection;
