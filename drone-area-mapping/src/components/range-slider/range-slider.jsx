import Slider from 'react-rangeslider';
import { useState } from 'react';
import './range-slider.css';
import { sendCommand } from '../../helper/api';

export const RangeSlider = () => {
  const [value, setValue] = useState(
    localStorage.getItem('captureInterval') || 1
  );

  const handleChange = (value) => {
    localStorage.setItem('captureInterval', value);
    sendCommand('captureInterval', value);
  };

  return (
    <div className=' w-full'>
      <div className='w-11/12 relative'>
        <div
          className='absolute -mt-8 font-text font-thin'
          style={{ left: `${value}%` }}
        >
          {value}
        </div>
      </div>
      <Slider
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        onChangeComplete={() => handleChange(value)}
        tooltip={false}
        min={1}
        max={100}
      />
    </div>
  );
};
