import Icon from '@material-tailwind/react/Icon';

export const BigBox = ({ title, children }) => {
  return (
    <div className='h-4/5 w-1/4 bg-box shadow-xl rounded-2xl p-8'>
      {/* Title */}
      <div className='flex flex-row space-x-4 items-center'>
        <Icon name='perm_media' size='4xl' color='white' />
        <p className='font-title text-2xl lg:text-3xl xl:text-4xl font-normal'>
          {title}
        </p>
      </div>
      <div className='h-2/3 w-full'>{children}</div>
    </div>
  );
};
