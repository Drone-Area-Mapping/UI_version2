import AvansLogo from '../assets/images/avans-logo.png';
import RanLogo from '../assets/images/ran-logo.png';
import Icon from '@material-tailwind/react/Icon';
import { Link, useLocation } from 'react-router-dom';

const GetIndex = () => {
  const location = useLocation();
  const locationStr = location.pathname.slice(1);

  if (locationStr === 'image-processing') return 2;
  else if (locationStr === 'capture-images') return 3;
  else return 1;
};

const NavItem = ({ name }) => {
  return (
    <div>
      <Icon name={name} size='5xl' color='white' />
    </div>
  );
};

export const NavBar = () => {
  return (
    <div className='w-full h-32 bg-background shadow-xl flex flex-row items-center justify-between pr-4 pl-4'>
      <img className='h-1/2 object-contain' src={AvansLogo} alt='' />
      <div className='flex flex-row space-x-20 h-full items-center justify-center w-1/3'>
        <Link
          className={`h-full w-1/5 justify-center flex items-center ${
            GetIndex() === 1
              ? 'border-b-2 border-blue-300'
              : 'opacity-50 border-b-2 border-transparent'
          }`}
          to='/'
        >
          <NavItem name='home' />
        </Link>
        <Link
          className={`h-full w-1/5 justify-center flex items-center ${
            GetIndex() === 2
              ? 'border-b-2 border-blue-300'
              : 'opacity-50 border-b-2 border-transparent'
          }`}
          to='/image-processing'
        >
          <NavItem name='broken_image' />
        </Link>
        <Link
          className={`h-full w-1/5 justify-center flex items-center ${
            GetIndex() === 3
              ? 'border-b-2 border-blue-300'
              : 'opacity-50 border-b-2 border-transparent'
          }`}
          to='/capture-images'
        >
          <NavItem name='linked_camera' />
        </Link>
      </div>
      <img className='h-1/2 object-contain' src={RanLogo} alt='' />
    </div>
  );
};
