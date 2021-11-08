import AvansLogo from '../assets/images/avans-logo.png';
import RanLogo from '../assets/images/ran-logo.png';

export const NavBar = () => {
  return (
    <div className='w-full h-32 bg-background shadow-xl flex flex-row items-center justify-between pr-4 pl-4'>
      <img className='h-1/2 object-contain' src={AvansLogo} alt='' />
      <div>
        <ul>
          <li>home</li>
          <li>ddd</li>
          <li>ddd</li>
        </ul>
      </div>
      <img className='h-1/2 object-contain' src={RanLogo} alt='' />
    </div>
  );
};
