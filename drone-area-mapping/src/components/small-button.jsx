import { motion } from "framer-motion";

export const SmallButton = ({ name, hover, borderColor, callBack }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={`w-1/2 h-full max-h-20 focus:outline-none rounded-full border-2 ${borderColor} ${hover} shadow-lg text-xl text-heading font-light`}
      onClick={() => callBack()}
    >
      {name}
    </motion.button>
  );
};
