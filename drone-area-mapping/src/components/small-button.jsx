import { motion } from 'framer-motion';

export const SmallButton = ({ name, color }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={`w-36 h-16 focus:outline-none rounded-full border-2 border-${color} hover:bg-${color} shadow-lg text-xl text-heading font-light`}
    >
      {name}
    </motion.button>
  );
};
