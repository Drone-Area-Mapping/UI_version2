import Icon from '@material-tailwind/react/Icon';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const { ipcRenderer } = require('electron');

export const LongSmallBox = ({ text, title, eventType }) => {
  const input = useRef();
  const [filepath, setFilepath] = useState('');

  useEffect(() => {
    ipcRenderer.on(eventType, (event, obj) => setFilepath(obj.filePaths[0]));
  }, [eventType]);

  return (
    <div className='h-full w-full bg-box shadow-xl rounded-2xl p-6 flex flex-col justify-evenly space-y-2'>
      {/* LongBigBoxTitle */}
      <div className='flex flex-row space-x-4 items-end'>
        <Icon name={text} size='4xl' color='white' />
        <p className='font-title text-2xl lg:text-3xl xl:text-4xl font-normal'>
          {title}
        </p>
      </div>
      <div className='w-full flex flex-row space-x-4 h-1/2 items-center relative'>
        <input
          ref={input}
          value={filepath}
          placeholder='filepath to images'
          disabled={true}
          type='text'
          className='w-full h-full rounded-lg bg-transparent border-2 border-gray-400 focus:border-blue-300 outline-none font-text text-sm lg:text-base xl:text-lg p-2'
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          className='outline-none absolute right-16 flex items-center'
          onClick={() => ipcRenderer.send('open-file-dialog', eventType)}
        >
          <Icon name='folder' size='3xl' />
        </motion.button>

        {filepath !== '' ? (
          <Icon name='check_circle' size='4xl' color='lightGreen' />
        ) : (
          <Icon name='cancel' size='4xl' color='red' />
        )}
      </div>
    </div>
  );
};
