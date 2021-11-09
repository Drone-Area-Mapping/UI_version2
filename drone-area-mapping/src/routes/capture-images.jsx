import { motion } from 'framer-motion';
import { pageTransition } from '../helper/animations';
import { BigBox } from '../components/big-box';
import { SmallButton } from '../components/small-button';
import { BigButton } from '../components/big-button';

const CaptureImages = () => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageTransition}
      className='w-full h-5/6 flex items-center justify-center'
    >
      <div className='w-5/6 h-full flex flex-row justify-between items-center'>
        {/* Left */}
        <BigBox title='Images'>
          <div className='flex flex-col h-full justify-center space-y-10'>
            <div className='flex flex-row space-x-4 h-1/6'>
              <SmallButton name='Start' color='startBtn' />
              <SmallButton name='Stop' color='stopBtn' />
            </div>
            <div className='h-1/6'>
              <BigButton name='create' />
            </div>
          </div>
        </BigBox>
        {/* Right */}
        <div></div>
      </div>
    </motion.div>
  );
};

export default CaptureImages;
