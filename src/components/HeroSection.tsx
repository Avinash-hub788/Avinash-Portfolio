import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Volume2, VolumeX } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import SocialLinks from './SocialLinks';
import type { Variants } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { profile } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleAudio = () => {
    if (!videoRef.current) return;
    const next = !muted;
    videoRef.current.muted = next;
    setMuted(next);
  };

  // ── Auto-mute when hero scrolls out of view ──────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (!entry.isIntersecting) {
          // Scrolled away — mute and update button state
          videoRef.current.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.2 } // mute once less than 20% of hero is visible
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const makeVariant = (i: number): Variants => ({
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' as const },
    },
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ scrollMarginTop: 80 }}
    >
      {/* ── Background Video ─────────────────────────────────── */}
      <video
        ref={videoRef}
        src="/profile.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={`${profile.name} profile video`}
      />

      {/* ── Dark overlay so text stays readable ─────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/70 via-[#0C0C0C]/55 to-[#0C0C0C]/85" />

      {/* ── Subtle vignette edges ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 120px 40px #0C0C0C' }}
      />

      {/* ── Audio toggle button — top-right corner ───────────── */}
      <motion.button
        id="hero-audio-toggle"
        onClick={toggleAudio}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute top-24 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full
                   border border-white/20 bg-black/40 backdrop-blur-md
                   text-white/80 hover:text-white hover:border-white/40 hover:bg-black/60
                   transition-all duration-200 text-xs font-semibold tracking-wide"
        style={{ fontFamily: 'Kanit, sans-serif' }}
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        {muted ? 'Sound Off' : 'Sound On'}
      </motion.button>

      {/* ── Hero content ─────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-7 px-6 pt-24 pb-16">

        {/* Role pill */}
        <motion.div variants={makeVariant(0)} initial="hidden" animate="show">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-purple-300 bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm">
            <Briefcase size={12} />
            {profile.role}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={makeVariant(1)}
          initial="hidden"
          animate="show"
          className="hero-heading text-6xl md:text-8xl font-black leading-none tracking-tight drop-shadow-2xl"
          style={{ fontFamily: 'Kanit, sans-serif' }}
        >
          Hi, I'm {profile.shortName}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={makeVariant(2)}
          initial="hidden"
          animate="show"
          className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed font-light drop-shadow-lg"
          style={{ fontFamily: 'Kanit, sans-serif' }}
        >
          {profile.tagline}
        </motion.p>

        {/* Location */}
        <motion.div variants={makeVariant(3)} initial="hidden" animate="show"
          className="flex items-center gap-1.5 text-sm text-white/50">
          <MapPin size={14} />
          <span>{profile.location}</span>
        </motion.div>

        {/* Social links */}
        <motion.div variants={makeVariant(4)} initial="hidden" animate="show">
          <SocialLinks social={profile.social} />
        </motion.div>

        {/* CTAs */}
        <motion.div variants={makeVariant(5)} initial="hidden" animate="show"
          className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            id="hero-view-work-btn"
            className="px-8 py-3.5 rounded-full font-semibold text-white accent-gradient hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            style={{ fontFamily: 'Kanit, sans-serif' }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            id="hero-contact-btn"
            className="px-8 py-3.5 rounded-full font-semibold text-white/80 border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:text-white hover:border-white/30 transition-all duration-200"
            style={{ fontFamily: 'Kanit, sans-serif' }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={makeVariant(6)} initial="hidden" animate="show"
          className="flex flex-wrap items-center justify-center gap-10 mt-4 pt-8 border-t border-white/10 w-full">
          {[
            { value: 'Fresher', label: 'Ready to Work' },
            { value: 'Web', label: 'Development' },
            { value: 'Video', label: 'Editing' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="hero-heading text-3xl font-black drop-shadow-lg" style={{ fontFamily: 'Kanit, sans-serif' }}>{value}</div>
              <div className="text-xs text-white/40 tracking-wider uppercase mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator — animated mouse + wheel ────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase font-medium"
          style={{ fontFamily: 'Kanit, sans-serif' }}>
          Scroll
        </span>

        {/* Mouse body */}
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex justify-center pt-1.5 relative">
          {/* Animated scroll wheel dot */}
          <motion.div
            className="w-1 h-2 rounded-full bg-white/50"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Chevron arrows */}
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 border-b-2 border-r-2 border-white/20 rotate-45"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
