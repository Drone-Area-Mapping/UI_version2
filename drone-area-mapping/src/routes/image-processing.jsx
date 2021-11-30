import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { pageTransition } from '../helper/animations';
import { BigBox } from '../components/big-box';
import { SmallButton } from '../components/small-button';
import { BigButton } from '../components/big-button';
import { LongBigBox } from '../components/Long-big-box';
import { LongSmallBox } from '../components/Long-Small-box';
import { ProgressBar } from '../components/progressbar';
import { channels } from '../shared/constants';
import { sendCommand, getData } from '../helper/api';

const { ipcRenderer } = require('electron');

const ImageProcessing = () => {
  useEffect(() => {
    // Listen for the event
    ipcRenderer.on(channels.GET_DATA, (event, arg) => {
      console.log(arg);
    });
    // Clean the listener after the component is dismounted
    return () => ipcRenderer.removeAllListeners();
  }, []);

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageTransition}
      className='w-full h-5/6 flex items-center justify-center'
    >
      {/* Parent Div */}
      <div className='w-5/6 h-full flex flex-row justify-between items-center'>
        {/*left box*/}
        <BigBox title='Processing'>
          <div className='flex flex-col h-full justify-evenly'>
            <div className='flex flex-row space-x-4 h-1/6'>
              <SmallButton
                name='Start'
                hover='hover:bg-startBtn'
                borderColor='border-startBtn'
                callBack={() => sendCommand('startProcessing', true)}
              />
              <SmallButton
                name='Stop'
                hover='hover:bg-stopBtn'
                borderColor='border-stopBtn'
                callBack={() => sendCommand('stopProcessing', true)}
              />
            </div>
            <div className='flex flex-col h-1/6 space-y-4 justify-evenly'>
              <BigButton
                name='Export'
                callBack={() => sendCommand('exportProcessing', true)}
              />
            </div>
            <ProgressBar
              color='#159AFB'
              labelFormat='%'
              max={100}
              value={50}
              text='Progress'
            />
          </div>
        </BigBox>

        <div className='w-8/12 h-4/5 flex flex-col justify-evenly space-y-4'>
          {/*small box top*/}
          <div className='h-1/4'>
            <LongSmallBox
              title='Import file path'
              text='file_download'
              eventType='import-directory'
            />
          </div>

          {/*Right long big box middle*/}
          <div className='h-1/2'>
            <LongBigBox title='Layers to stich' text='extension' />
          </div>

          {/*small box bottom*/}
          <div className='h-1/4'>
            <LongSmallBox
              title='Export file path'
              text='file_upload'
              eventType='export-directory'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageProcessing;
