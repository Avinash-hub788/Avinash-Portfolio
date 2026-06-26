import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import type { Testimonial } from '../types/portfolio';
import { fadeUp } from '../utils/animations';

const QUOTE_EMOJI = '✦';

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => {
  const initial = t.name.charAt(0).toUpperCase();

  return (
    <div
      className="marquee-card flex-shrink-0 w-80 sm:w-96 mx-4 p-7 rounded-3xl border border-white/[0.07] bg-[#111]"
    >
      <span className="text-2xl text-purple-500/40 mb-4 block">{QUOTE_EMOJI}</span>
      <p className="text-gray-300 text-sm leading-relaxed italic mb-6"
        style={{ fontFamily: 'Kanit, sans-serif' }}>
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ backgroundColor: t.avatarColor, fontFamily: 'Kanit, sans-serif' }}
        >
          {initial}
        </div>
        <div>
          <p className="text-white text-sm font-bold uppercase tracking-wider"
            style={{ fontFamily: 'Kanit, sans-serif' }}>
            {t.name}
          </p>
          <p className="text-gray-500 text-xs" style={{ fontFamily: 'Kanit, sans-serif' }}>
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const { testimonials } = usePortfolio();
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="py-28 overflow-hidden bg-[#0C0C0C]"
      style={{ scrollMarginTop: 80 }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="px-6 max-w-7xl mx-auto mb-16"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4">
          Social Proof
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white"
          style={{ fontFamily: 'Kanit, sans-serif' }}>
          What People Say
        </h2>
      </motion.div>

      <div className="marquee-wrapper relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #0C0C0C, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #0C0C0C, transparent)' }} />
        <div className="marquee-track py-4">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
