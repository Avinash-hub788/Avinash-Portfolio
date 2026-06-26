import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import { fadeUp } from '../utils/animations';

const AboutSection: React.FC = () => {
  const { profile } = usePortfolio();

  return (
    <section
      id="about"
      className="py-28 px-6 max-w-7xl mx-auto"
      style={{ scrollMarginTop: 80 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: headline + bio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4">
            About Me
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8"
            style={{ fontFamily: 'Kanit, sans-serif' }}>
            Engineer. Builder.
            <br />
            <span className="hero-heading">Problem Solver.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed"
            style={{ overflowWrap: 'normal', wordBreak: 'normal', fontFamily: 'Kanit, sans-serif' }}>
            {profile.bio}
          </p>
        </motion.div>

        {/* Right: detail cards */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { label: 'Role', value: profile.role },
            { label: 'Specialization', value: profile.specialization },
            { label: 'Location', value: profile.location },
            { label: 'Status', value: 'Fresher — Open to Work' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-200"
            >
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{label}</p>
              <p className="text-white font-semibold" style={{ fontFamily: 'Kanit, sans-serif' }}>{value}</p>
            </div>
          ))}

          {/* Full-width education card */}
          <div className="col-span-2 p-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-200">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Education</p>
            <p className="text-white font-semibold" style={{ fontFamily: 'Kanit, sans-serif' }}>
              Chennai, Tamil Nadu, India
            </p>
            <p className="text-gray-500 text-sm mt-1">Passionate about Web Development & Video Editing</p>
          </div>
        </motion.div>
      </div>

      {/* Skills section inline */}
      <SkillsGrid />
    </section>
  );
};

const SkillsGrid: React.FC = () => {
  const { skills } = usePortfolio();

  return (
    <motion.div
      id="skills"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="mt-24"
      style={{ scrollMarginTop: 80 }}
    >
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4">
        Technical Skills
      </p>
      <h2 className="text-4xl md:text-5xl font-black text-white mb-12"
        style={{ fontFamily: 'Kanit, sans-serif' }}>
        What I Work With
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.categories.map((cat) => (
          <div
            key={cat.name}
            className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 group"
          >
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 group-hover:text-purple-300 transition-colors"
              style={{ fontFamily: 'Kanit, sans-serif' }}>
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-xs font-medium text-gray-400 bg-white/[0.05] border border-white/[0.06] hover:text-white hover:border-white/20 transition-colors duration-150"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AboutSection;
