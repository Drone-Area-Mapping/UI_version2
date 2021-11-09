import { motion } from 'framer-motion';
import { pageTransition } from '../helper/animations';

const Home = () => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageTransition}
    >
      <div className='w-1/2 bg-black h-14'></div>
    </motion.div>
  );
};

export default Home;
