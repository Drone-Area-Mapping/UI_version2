import Slider from 'react-rangeslider';
import { useState } from 'react';
import './range-slider.css';

export const RangeSlider = () => {
  const [value, setValue] = useState(1);

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
        onChange={(value) => setValue(value)}
        tooltip={false}
        min={1}
        max={100}
      />
    </div>
  );
};
