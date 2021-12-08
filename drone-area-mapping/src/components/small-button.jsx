import { motion } from 'framer-motion';

export const SmallButton = ({
  name,
  hover,
  borderColor,
  callBack,
  disabled,
}) => {
  return (
    <motion.button
      whileTap={() => {
        if (!disabled) return { scale: 0.9 };
      }}
      className={`w-1/2 h-full max-h-20 focus:outline-none rounded-full border-2 ${borderColor} ${
        disabled && 'bg-startBtn'
      } ${hover} shadow-lg text-xl text-heading font-light`}
      onClick={() => {
        if (!disabled) callBack();
      }}
    >
      {name}
    </motion.button>
  );
};
