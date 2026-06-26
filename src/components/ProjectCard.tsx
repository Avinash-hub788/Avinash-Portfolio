import type { Project } from '../types/portfolio';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const PLACEHOLDER_COLORS = [
  'from-purple-900/40 to-pink-900/30',
  'from-blue-900/40 to-purple-900/30',
  'from-orange-900/40 to-red-900/30',
  'from-teal-900/40 to-blue-900/30',
  'from-rose-900/40 to-orange-900/30',
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const num = String(index + 1).padStart(2, '0');
  const placeholderGradient = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];

  return (
    <div
      id={`project-card-${project.id}`}
      className="sticky group relative rounded-3xl border border-white/[0.07] bg-[#111] overflow-hidden
                 hover:border-white/[0.14] transition-all duration-500"
      style={{ top: `${100 + index * 20}px` }}
    >
      {/* Image area */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${placeholderGradient} flex items-end p-6`}>
            {/* Grid pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
            <span className="relative text-4xl font-black text-white/10"
              style={{ fontFamily: 'Kanit, sans-serif' }}>
              {project.title}
            </span>
          </div>
        )}

        {/* Highlight badge */}
        {project.highlight && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white accent-gradient">
              Featured
            </span>
          </div>
        )}

        {/* Year badge */}
        <div className="absolute top-4 right-4">
          <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-gray-400 backdrop-blur-sm">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-black text-gray-600" style={{ fontFamily: 'Kanit, sans-serif' }}>
                {num}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors"
                style={{ fontFamily: 'Kanit, sans-serif' }}>
                {project.title}
              </h3>
            </div>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'Kanit, sans-serif' }}>
              {project.subtitle}
            </p>
          </div>

          {/* Live link — hidden when empty */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-link-${project.id}`}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold
                         text-white accent-gradient hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20
                         transition-all duration-200"
            >
              <ExternalLink size={12} />
              Live Project
            </a>
          )}
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-5"
          style={{ fontFamily: 'Kanit, sans-serif' }}>
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <span key={tech}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-500 bg-white/[0.04] border border-white/[0.06]">
              {tech}
            </span>
          ))}
        </div>

        {/* Role */}
        <p className="text-xs text-gray-600 uppercase tracking-widest"
          style={{ fontFamily: 'Kanit, sans-serif' }}>
          Role: <span className="text-gray-500">{project.role}</span>
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
