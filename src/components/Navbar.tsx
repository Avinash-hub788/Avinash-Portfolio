import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0C0C0C]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-xl'
            : 'bg-transparent'
        }`}
        style={{ height: 72 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group" style={{ fontFamily: 'Kanit, sans-serif' }}>
            <span className="hero-heading text-xl font-black tracking-widest leading-none">AVINASH</span>
            <span className="w-px h-5 bg-white/20" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 group-hover:text-gray-300 transition-colors">PORTFOLIO</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 tracking-wide uppercase"
                style={{ fontFamily: 'Kanit, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white accent-gradient hover:scale-105 transition-transform duration-200"
            style={{ fontFamily: 'Kanit, sans-serif' }}
          >
            Let's Talk
          </a>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0C0C0C]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 pt-20"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-bold text-gray-300 hover:text-white transition-colors tracking-tight"
                style={{ fontFamily: 'Kanit, sans-serif' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 rounded-full text-white font-semibold accent-gradient"
              style={{ fontFamily: 'Kanit, sans-serif' }}
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
