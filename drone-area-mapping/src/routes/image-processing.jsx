import { motion } from "framer-motion";
import { pageTransition } from "../helper/animations";
import { BigBox } from "../components/big-box";
import { SmallButton } from "../components/small-button";
import { BigButton } from "../components/big-button";

const ImageProcessing = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full h-5/6 flex items-center justify-center"
    >
      <div className="w-5/6 h-full flex flex-row justify-between items-center">
        {/*left box*/}
        <BigBox title="Processing">
          <div className="h-1/6 flex flex-row space-x-4 justify-between mt-20">
            <SmallButton name="Start" color="startBtn" />
            <SmallButton name="Stop" color="stopBtn" />
          </div>
          <div className="h-1/6 flex flex-row space-x-4 justify-between mt-10">
            <BigButton name="Export" />
          </div>
        </BigBox>
      </div>
    </motion.div>
  );
};

export default ImageProcessing;
