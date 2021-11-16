import { motion } from "framer-motion";
import { pageTransition } from "../helper/animations";
import { BigBox } from "../components/big-box";
import { SmallButton } from "../components/small-button";
import { BigButton } from "../components/big-button";
import { LongBigBox } from "../components/Long-big-box";
import { LongSmallBox } from "../components/Long-Small-box";
import { ProgressBar } from "../components/progressbar";
const ImageProcessing = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full h-5/6 flex items-center justify-center"
    >
      {/* Parent Div */}
      <div className="w-5/6 h-full flex flex-row justify-between items-center">
        {/*left box*/}
        <BigBox title="Processing">
          <div className="flex flex-col h-full justify-evenly">
            <div className="flex flex-row space-x-4 h-1/6">
              <SmallButton
                name="Start"
                hover="hover:bg-startBtn"
                borderColor="border-startBtn"
              />
              <SmallButton
                name="Stop"
                hover="hover:bg-stopBtn"
                borderColor="border-stopBtn"
              />
            </div>
            <div className="flex flex-col h-1/6 space-y-4 justify-evenly">
              <BigButton name="Export" />
            </div>
            <ProgressBar
              color="#159AFB"
              labelFormat="%"
              max={100}
              value={50}
              text="Progress"
            />
          </div>
        </BigBox>

        <div className="w-8/12 h-4/5 flex flex-col justify-evenly space-y-4">
          {/*small box top*/}
          <div className="h-1/4">
            <LongSmallBox title="Import file path" text="file_download" />
          </div>

          {/*Right long big box middle*/}
          <div className="h-1/2">
            <LongBigBox title="Layers to stich" text="extension" />
          </div>

          {/*small box bottom*/}
          <div className="h-1/4">
            <LongSmallBox title="Export file path" text="file_upload" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageProcessing;
