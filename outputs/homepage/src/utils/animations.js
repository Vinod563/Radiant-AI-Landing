export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export const floatAnimation = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 5, ease: 'easeInOut', repeat: Infinity },
  },
};

export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(145, 196, 107, 0)',
      '0 0 20px 4px rgba(145, 196, 107, 0.15)',
      '0 0 0 0 rgba(145, 196, 107, 0)',
    ],
    transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
  },
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -5, scale: 0.95 },
  animate: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};
