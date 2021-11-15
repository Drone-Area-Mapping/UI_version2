import { useState } from 'react';

export const ProgressBar = ({ color, labelFormat, max }) => {
  const [value, setValue] = useState(100);

  return (
    <div className='w-full h-1/6'>
      <div className='h-3/4 w-full shadow-lg rounded-full relative'>
        <div
          className={`bg-${color} h-full ${
            value !== max ? 'rounded-l-full' : 'rounded-full'
          }`}
          style={{ width: `${Math.abs((value / max) * 100)}%` }}
        >
          <div className='w-full h-full absolute font-heading font-medium text-md flex justify-center items-center'>
            {labelFormat !== '%' ? `${value}/${max}` : `${value} %`}
          </div>
        </div>
      </div>
      <div className='w-full font-heading font-thin lg:text-base xl:text-lg text-sm text-center mt-3'>
        Amount of images
      </div>
    </div>
  );
};
