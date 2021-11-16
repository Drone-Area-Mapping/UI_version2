import { motion } from "framer-motion";

export const BigButton = ({ name, callBack }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className="w-full h-full max-h-20 focus:outline-none rounded-full border-2 border-blue-300 hover:bg-blue-300 shadow-lg text-xl text-heading font-light"
      onClick={() => {
        if (callBack !== undefined) callBack();
      }}
    >
      {name}
    </motion.button>
  );
};
