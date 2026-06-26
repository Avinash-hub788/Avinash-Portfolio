import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MapPin } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import SocialLinks from './SocialLinks';
import { fadeUp } from '../utils/animations';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Footer: React.FC = () => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!profile.social.email) return;
    try {
      await navigator.clipboard.writeText(profile.social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silently
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="border-t border-white/[0.06] bg-[#0C0C0C]"
      style={{ scrollMarginTop: 80 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20"
        >
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <h2 className="hero-heading text-4xl font-black"
              style={{ fontFamily: 'Kanit, sans-serif' }}>
              {profile.name}
            </h2>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Kanit, sans-serif' }}>
              {profile.specialization}
            </p>
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <MapPin size={14} />
              <span>{profile.location}</span>
            </div>
            <SocialLinks social={profile.social} className="mt-2" />
          </div>

          {/* Col 2: Navigate */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6"
              style={{ fontFamily: 'Kanit, sans-serif' }}>
              Navigate
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    style={{ fontFamily: 'Kanit, sans-serif' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Reach Out */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-6"
              style={{ fontFamily: 'Kanit, sans-serif' }}>
              Reach Out
            </h3>
            <div className="space-y-4">
              {profile.social.email && (
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${profile.social.email}`}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                    style={{ fontFamily: 'Kanit, sans-serif' }}
                  >
                    {profile.social.email}
                  </a>
                  <button
                    id="footer-copy-email-btn"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="text-gray-600 hover:text-white transition-colors p-1 rounded"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              )}

              {profile.social.phone && (
                <a
                  href={`tel:${profile.social.phone.replace(/\s/g, '')}`}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: 'Kanit, sans-serif' }}
                >
                  {profile.social.phone}
                </a>
              )}

              <div className="pt-4">
                {profile.social.email && (
                  <a
                    href={`mailto:${profile.social.email}`}
                    id="footer-cta-btn"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white accent-gradient hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200"
                    style={{ fontFamily: 'Kanit, sans-serif' }}
                  >
                    Start a Conversation
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs" style={{ fontFamily: 'Kanit, sans-serif' }}>
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs" style={{ fontFamily: 'Kanit, sans-serif' }}>
            Designed &amp; built with ♥ using React + TypeScript + Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
