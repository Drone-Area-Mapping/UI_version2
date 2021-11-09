import { motion } from "framer-motion";
import { pageTransition } from "../helper/animations";
import { BigBox } from "../components/big-box";
import { SmallButton } from "../components/small-button";

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
          <div>
            <SmallButton name="Start" color="startBtn" />
          </div>
          <div>
            <SmallButton name="Stop" color="stopBtn" />
          </div>
        </BigBox>
      </div>
    </motion.div>
  );
};

export default ImageProcessing;
