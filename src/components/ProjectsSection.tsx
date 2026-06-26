import { motion } from 'framer-motion';
import { usePortfolio } from '../hooks/usePortfolio';
import ProjectCard from './ProjectCard';
import { fadeUp } from '../utils/animations';

const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();

  // Sort: highlight:true first, then by year desc
  const sorted = [...projects].sort((a, b) => {
    if (a.highlight && !b.highlight) return -1;
    if (!a.highlight && b.highlight) return 1;
    return Number(b.year) - Number(a.year);
  });

  return (
    <section
      id="projects"
      className="py-28 px-6 max-w-7xl mx-auto"
      style={{ scrollMarginTop: 80 }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="mb-16"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4">
          Selected Work
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <h2 className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: 'Kanit, sans-serif' }}>
            Projects
          </h2>
          <p className="text-gray-500 text-sm max-w-sm"
            style={{ fontFamily: 'Kanit, sans-serif' }}>
            {sorted.filter((p) => p.highlight).length} featured · {sorted.length} total
          </p>
        </div>
      </motion.div>

      {/* Sticky card stack */}
      <div className="flex flex-col gap-6">
        {sorted.map((project, i) => (
          <motion.div
            key={project.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            <ProjectCard project={project} index={i} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
