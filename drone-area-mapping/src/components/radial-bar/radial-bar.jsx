import Icon from '@material-tailwind/react/Icon';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './radial-bar.css';

export const RadialBar = ({ value, name, type = '%', min = 0, max = 100 }) => {
  const getBarColor = () => {
    if (type === '%') {
      // Red
      if (value >= 0 && value <= 33) return '#F15454';
      // Yellow
      else if (value > 33 && value < 66) return '#FFE664';
      // Green
      else return '#0AFF6C';
    } else {
      const oneThird = max / 3;

      if (value > oneThird * 2) return '#F15454';
      else if (value > oneThird && value <= oneThird * 2) return '#FFE664';
      else return '#0AFF6C';
    }
  };

  return (
    <div>
      <CircularProgressbarWithChildren
        value={value}
        background={false}
        minValue={min}
        maxValue={max}
        styles={buildStyles({
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,
          // Colors
          textSize: 16,
          pathColor: `${getBarColor()}`,
          textColor: 'white',
          trailColor: 'transparent',
          backgroundColor: 'white',
        })}
      >
        <div className='flex flex-row items-center space-x-2'>
          <Icon name={name} size='6xl' />
          <p className='font-heading text-2xl'>
            {type === '%' ? `${value}%` : `${value}/${max} GB`}
          </p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
