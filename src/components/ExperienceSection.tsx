import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { fadeUp } from '../utils/animations';
import type { VideoProject } from '../types/portfolio';

/* ── Category badge colours ────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  Reels:          'text-purple-300 bg-purple-500/15 border-purple-500/30',
  Commercial:     'text-pink-300   bg-pink-500/15   border-pink-500/30',
  'Short Film':   'text-orange-300 bg-orange-500/15 border-orange-500/30',
  Event:          'text-teal-300   bg-teal-500/15   border-teal-500/30',
  'Title Card':   'text-yellow-300 bg-yellow-500/15 border-yellow-500/30',
  Entertainment:  'text-cyan-300   bg-cyan-500/15   border-cyan-500/30',
};

/* ── Single video card ─────────────────────────────────────────── */
const VideoCard: React.FC<{
  project: VideoProject;
  index: number;
  isActive: boolean;
  angle: number;        // degrees this card sits on the circle
  total: number;
  onClick: () => void;
}> = ({ project, index, isActive, angle, total, onClick }) => {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);
  const [hovered, setHovered] = useState(false);

  /* radius & tilt depend on how many cards there are */
  const radius   = Math.max(420, total * 90);   // px – distance from centre
  const tiltDeg  = 12;                           // slight top-tilt for depth

  /* pause whenever card leaves the active slot */
  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [isActive]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isActive) { onClick(); return; }
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else         { videoRef.current.play();  setPlaying(true);  }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  const badgeClass = CATEGORY_COLORS[project.category] ?? 'text-gray-300 bg-white/10 border-white/20';

  /* 3-D transform: place this card on the wheel */
  const transform = `
    rotateY(${angle}deg)
    translateZ(${radius}px)
    rotateX(${tiltDeg}deg)
  `;

  const scale  = isActive ? 1 : 0.78;
  const zIndex = isActive ? 20 : 5;
  const blur   = isActive ? 0  : 6;

  return (
    <div
      onClick={!isActive ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:  'absolute',
        width:     '340px',
        transform,
        transition: 'all 0.7s cubic-bezier(0.34,1.3,0.64,1)',
        scale,
        zIndex,
        filter:    `blur(${blur}px) brightness(${isActive ? 1 : 0.55})`,
        cursor:    isActive ? 'default' : 'pointer',
      }}
    >
      <div
        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          border: isActive
            ? '1.5px solid rgba(168,85,247,0.55)'
            : '1px solid rgba(255,255,255,0.06)',
          background: '#111',
          boxShadow: isActive
            ? '0 0 60px rgba(124,58,237,0.35), 0 24px 60px rgba(0,0,0,0.7)'
            : '0 8px 32px rgba(0,0,0,0.5)',
          transition: 'all 0.5s ease',
        }}
      >
        {/* ── Video area ─────────────────────────────────────── */}
        <div
          style={{ position: 'relative', aspectRatio: '16/9', background: '#0a0a0a', cursor: 'pointer' }}
          onClick={togglePlay}
        >
          {project.video ? (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
              onEnded={() => setPlaying(false)}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '12px',
              background: 'linear-gradient(135deg, rgba(109,40,217,0.25), rgba(219,39,119,0.12))',
            }}>
              <Film size={36} color="#555" />
              <p style={{ color: '#555', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                No video yet
              </p>
            </div>
          )}

          {/* overlay */}
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
            opacity: hovered || !playing ? 1 : 0, transition: 'opacity 0.3s',
          }} />

          {/* play/pause */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered || !playing ? 1 : 0, transition: 'opacity 0.3s',
          }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.22)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.2s, background 0.2s',
            }}>
              {playing
                ? <Pause size={20} color="#fff" />
                : <Play  size={20} color="#fff" style={{ marginLeft: '3px' }} />}
            </div>
          </div>

          {/* mute */}
          {isActive && (
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Unmute' : 'Mute'}
              style={{
                position: 'absolute', top: '10px', right: '10px',
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)', opacity: hovered ? 1 : 0,
                transition: 'opacity 0.2s',
              }}
            >
              {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
          )}

          {/* category badge */}
          <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
            <span className={`px-3 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${badgeClass}`}>
              {project.category}
            </span>
          </div>

          {/* year */}
          <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '11px', padding: '2px 10px', borderRadius: '99px',
              background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#888',
            }}>
              {project.year}
            </span>
          </div>
        </div>

        {/* ── Text content ──────────────────────────────────── */}
        <div style={{ padding: '20px 24px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '16px', color: isActive ? '#f3e8ff' : '#fff', margin: 0 }}>
              {project.title}
            </h3>
            <span style={{ fontFamily: 'Kanit, sans-serif', fontSize: '12px', fontWeight: 900, color: '#333' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#666', lineHeight: 1.6, marginBottom: '14px' }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tools.map((tool) => (
              <span key={tool} style={{
                padding: '2px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 500,
                color: '#666', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                fontFamily: 'Kanit, sans-serif',
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Section ───────────────────────────────────────────────────── */
const ExperienceSection: React.FC = () => {
  const { videoProjects } = usePortfolio();
  const [active, setActive] = useState(0);
  const total  = videoProjects.length;

  const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(a => (a + 1)         % total), [total]);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  /* angle step between cards on the circle */
  const step = total > 0 ? 360 / total : 0;

  return (
    <section
      id="experience"
      style={{ padding: '112px 24px', maxWidth: '1200px', margin: '0 auto', scrollMarginTop: '80px' }}
    >
      {/* ── Heading ──────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        style={{ marginBottom: '64px' }}
      >
        <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a855f7', marginBottom: '16px', fontFamily: 'Kanit, sans-serif' }}>
          Creative Work
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
          <h2 style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', margin: 0 }}>
            Video Projects
          </h2>
          <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#555', margin: 0 }}>
            {total} projects · Click to play
          </p>
        </div>
      </motion.div>

      {/* ── 3-D Carousel ─────────────────────────────────────── */}
      {total === 0 ? (
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{
            padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '24px',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <Film size={48} color="#444" style={{ marginBottom: '16px' }} />
          <p style={{ fontFamily: 'Kanit, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '8px' }}>
            No Projects Yet
          </p>
          <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#555', maxWidth: '300px' }}>
            Add your video projects to <code style={{ color: '#a855f7' }}>portfolio.json</code> and drop videos into <code style={{ color: '#a855f7' }}>public/videos/</code>
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
        >
          {/* 3-D scene wrapper */}
          <div style={{ position: 'relative', width: '100%', height: '520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {/* Perspective + preserve-3d container */}
            <div style={{
              perspective: '1100px',
              perspectiveOrigin: '50% 45%',
              width: '340px',
              height: '100%',
              position: 'relative',
            }}>
              <div style={{
                width: '340px',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {videoProjects.map((project, i) => {
                  const angle = (i - active) * step;
                  return (
                    <VideoCard
                      key={project.id}
                      project={project}
                      index={i}
                      isActive={i === active}
                      angle={angle}
                      total={total}
                      onClick={() => setActive(i)}
                    />
                  );
                })}
              </div>
            </div>

            {/* ── Left arrow ──────────────────────────────────── */}
            <button
              onClick={prev}
              aria-label="Previous video"
              style={{
                position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                width: '46px', height: '46px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#ccc', transition: 'all 0.2s', zIndex: 30,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(168,85,247,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              <ChevronLeft size={20} />
            </button>

            {/* ── Right arrow ─────────────────────────────────── */}
            <button
              onClick={next}
              aria-label="Next video"
              style={{
                position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                width: '46px', height: '46px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#ccc', transition: 'all 0.2s', zIndex: 30,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(168,85,247,0.25)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* ── Dot indicators ──────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {videoProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                style={{
                  width:  i === active ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '99px',
                  background: i === active ? '#a855f7' : 'rgba(255,255,255,0.15)',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.34,1.3,0.64,1)',
                }}
              />
            ))}
          </div>

          {/* active project title below dots */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              style={{
                textAlign: 'center', marginTop: '16px',
                fontFamily: 'Kanit, sans-serif', fontSize: '13px', color: '#555',
              }}
            >
              {active + 1} / {total} — {videoProjects[active]?.title}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Tip ─────────────────────────────────────────────────── */}
      <motion.p
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        style={{
          textAlign: 'center', fontSize: '11px', color: '#333', marginTop: '40px',
          fontFamily: 'Kanit, sans-serif',
        }}
      >
        💡 Copy videos into <code style={{ color: '#581c87' }}>public/videos/</code> and update paths in <code style={{ color: '#581c87' }}>portfolio.json</code>
      </motion.p>
    </section>
  );
};

export default ExperienceSection;
