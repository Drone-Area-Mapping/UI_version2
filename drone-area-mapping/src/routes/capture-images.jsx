import { motion } from "framer-motion";
import { pageTransition } from "../helper/animations";
import { BigBox } from "../components/big-box";
import { SmallButton } from "../components/small-button";

const CaptureImages = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full h-5/6 flex items-center justify-center"
    >
      <div className="w-5/6 h-full flex flex-row justify-between items-center">
        {/* Left */}
        <BigBox title="Images">
          <div>
            <SmallButton name="Start" color="startBtn" />
          </div>
        </BigBox>
        {/* Right */}
        <div></div>
      </div>
    </motion.div>
  );
};

export default CaptureImages;
