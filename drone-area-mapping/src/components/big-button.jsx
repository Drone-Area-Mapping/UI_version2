import { motion } from 'framer-motion';

export const BigButton = ({ text }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className='w-full h-20 focus:outline-none rounded-full border-2 border-blue-300 hover:bg-blue-300 shadow-lg text-2xl text-heading font-light'
    >
      {text}
    </motion.button>
  );
};
