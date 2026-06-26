import type { Variants } from 'framer-motion';

/** Standard fade-up entrance variant */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

/** Staggered fade-up variant factory */
export const fadeUpDelayed = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: 'easeOut' as const },
  },
});
