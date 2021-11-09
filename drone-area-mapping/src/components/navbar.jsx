import AvansLogo from '../assets/images/avans-logo.png';
import RanLogo from '../assets/images/ran-logo.png';
import Icon from '@material-tailwind/react/Icon';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const GetIndex = () => {
  const location = useLocation();
  const locationStr = location.pathname.slice(1);

  if (locationStr === 'image-processing') return 2;
  else if (locationStr === 'capture-images') return 3;
  else return 1;
};

const NavIcon = ({ id, name }) => {
  return (
    <motion.div whileHover={GetIndex() !== id ? { y: -10 } : { y: 0 }}>
      <Icon name={name} size='5xl' color='white' />
    </motion.div>
  );
};

const NavLink = ({ id, route, name }) => {
  return (
    <Link
      className={`relative h-full w-1/5 justify-center flex items-center ${
        GetIndex() !== id && 'opacity-50 hover:opacity-100'
      }`}
      to={route}
    >
      <NavIcon id={id} name={name} />
      {GetIndex() === id && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className='absolute bottom-0 h-1 bg-blue-300 w-full'
        ></motion.div>
      )}
    </Link>
  );
};

export const NavBar = () => {
  return (
    <div className='w-full h-1/6 bg-background shadow-xl flex flex-row items-center justify-between pr-4 pl-4'>
      <img className='h-1/2 object-contain' src={AvansLogo} alt='' />
      <div className='flex flex-row space-x-20 h-full items-center justify-center w-1/3'>
        <NavLink id={1} route='/' name='home' />
        <NavLink id={2} route='/image-processing' name='broken_image' />
        <NavLink id={3} route='/capture-images' name='linked_camera' />
      </div>
      <img className='h-1/2 object-contain' src={RanLogo} alt='' />
    </div>
  );
};
