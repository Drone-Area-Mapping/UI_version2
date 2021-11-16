import { motion } from "framer-motion";
import { BigButton } from "../components/big-button";
import { pageTransition } from "../helper/animations";
import DroneAerialViewImage from "../assets/images/landscape-1.png";
import DroneAerialViewImage2 from "../assets/images/landscape-2.png";

const handleClick = () => window.electron.doThing();

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full h-5/6 flex items-center justify-center"
    >
      <motion.div
        initial={{ x: 20 }}
        animate={{ x: 0 }}
        exit={{ x: 20 }}
        className="w-5/6 h-full flex flex-row justify-between items-center"
      >
        {/* Title Left */}
        <div className="w-1/3 flex flex-col justify-between h-5/6">
          <p className="text-2xl lg:text-3xl xl:text-4xl font-title">
            Drone Area Mapping <br />
            <span className="xl:text-2xl lg:text-lg text-base opacity-80 font-text font-light">
              Capture images during flight, and <br /> map them!
            </span>
          </p>
          <div className="w-2/3 h-1/6 pt-3 pb-3 flex items-center">
            <BigButton name="Get Started!" callBack={handleClick} />
          </div>
          {/* Image Bottom */}
          <div className="w-full">
            <motion.img
              className="object-contain rounded-3xl shadow-xl"
              src={DroneAerialViewImage2}
              alt=""
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </div>
        {/* Image Right */}
        <div className="w-2/3 h-5/6 flex flex-col items-end space-y-10">
          <motion.img
            className="object-contain rounded-3xl shadow-xl w-2/3"
            src={DroneAerialViewImage}
            alt=""
            whileHover={{ scale: 1.05 }}
          />
          <p className="w-2/3 font-text xl:text-2xl lg:text-lg text-base opacity-80">
            This software automatically maps the captured images using G.A.V.S.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
