import { motion } from 'framer-motion';
import { pageTransition } from '../helper/animations';

const ImageProcessing = () => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageTransition}
    >
      <div className='w-full h-14 bg-blue-300'></div>
    </motion.div>
  );
};

export default ImageProcessing;
