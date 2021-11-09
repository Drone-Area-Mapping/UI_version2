import { motion } from 'framer-motion';

export const BigButton = ({ text }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className='w-2/3 h-4/5 focus:outline-none rounded-full border-2 border-blue-300 hover:bg-blue-300 shadow-lg text-2xl text-heading font-light'
    >
      {text}
    </motion.button>
  );
};
