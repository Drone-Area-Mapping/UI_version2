import { motion } from 'framer-motion';
import { pageTransition } from '../helper/animations';
import { BigBox } from '../components/big-box';
import { SmallButton } from '../components/small-button';
import { RangeSlider } from '../components/range-slider/range-slider';
import { ProgressBar } from '../components/progressbar';
import { RadialBar } from '../components/radial-bar/radial-bar';
import { sendCommand } from '../helper/api';

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
          <div className='flex flex-col h-full justify-between mt-10'>
            <div className='flex flex-row space-x-4 h-1/6'>
              <SmallButton
                name='Start'
                hover='hover:bg-startBtn'
                borderColor='border-startBtn'
                callBack={() => sendCommand('startCapturing', true)}
              />
              <SmallButton
                name='Stop'
                hover='hover:bg-stopBtn'
                borderColor='border-stopBtn'
                callBack={() => sendCommand('stopCapturing', true)}
              />
            </div>
            <div className='w-full space-y-4 flex flex-col items-center'>
              <RangeSlider />
              <p className='w-2/3 self-center text-center font-heading font-thin lg:text-base xl:text-lg text-sm'>
                Capture Interval (images per metre)
              </p>
            </div>
            <ProgressBar
              max={300}
              value={150}
              text='Amount of images'
              isProgress={false}
            />
          </div>
        </BigBox>
        {/* Right */}
        <div className='flex flex-row space-x-20'>
          <RadialBar value={90} name='battery_charging_full' />
          <RadialBar value={200} max={300} name='sd_storage' type='sd' />
        </div>
      </div>
    </motion.div>
  );
};

export default CaptureImages;
