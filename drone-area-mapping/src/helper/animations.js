export const pageTransition = {
  initial: { opacity: 0, x: 15 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.61, 1, 0.88, 1],
    },
  },
  exit: { opacity: 0, x: 8 },
};
