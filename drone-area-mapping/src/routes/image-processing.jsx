import { motion } from 'framer-motion';
import { pageTransition } from '../helper/animations';

const ImageProcessing = () => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageTransition}
      className='w-full h-5/6 flex items-center justify-center'
    >
      <div className='w-5/6 h-full flex flex-row justify-between items-center'>
        <div className='w-full h-14 bg-blue-300'></div>
      </div>
    </motion.div>
  );
};

export default ImageProcessing;
