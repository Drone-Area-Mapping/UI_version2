import { motion } from 'framer-motion';
import { pageTransition } from '../helper/animations';
import { BigBox } from '../components/big-box';
import { SmallButton } from '../components/small-button';
import { RangeSlider } from '../components/range-slider/range-slider';
import { ProgressBar } from '../components/progressbar';
import { RadialBar } from '../components/radial-bar/radial-bar';
import { sendCommand } from '../helper/api';
import { useState, useEffect, useCallback } from 'react';
import { channels } from '../shared/constants';
import { ReactComponent as NoConnection } from '../assets/svg/noConnection.svg';
import { ClosingAlert } from '@material-tailwind/react';

const { ipcRenderer } = require('electron');

const CaptureImages = () => {
  const [state, setState] = useState({
    start: JSON.parse(
      localStorage.getItem('isCapturing') || false
    ),
    battery:
      JSON.parse(localStorage.getItem('battery')) || 100,
    storage:
      JSON.parse(localStorage.getItem('storage')) || 0,
    isActive:
      JSON.parse(localStorage.getItem('connected')) ||
      false,
  });

  const [alert, setAlert] = useState(true);
  const [disable, setDisable] = useState(
    JSON.parse(localStorage.getItem('disabled')) || false
  );

  const handleStart = () => {
    localStorage.setItem('isCapturing', true);
    setState(oldState => ({
      ...oldState,
      start: true,
    }));
    sendCommand('telemetry', 'capture', 'TURN_SW_ON');
  };

  const handleStop = useCallback(() => {
    localStorage.setItem('isCapturing', false);
    setState(oldState => ({
      ...oldState,
      start: false,
    }));
    sendCommand('telemetry', 'capture', 'TURN_SW_OFF');
  }, []);

  const handleChange = arr => {
    localStorage.setItem('battery', arr[0]);
    localStorage.setItem(
      'storage',
      parseInt(arr[1]) / 1000
    );
    localStorage.setItem('connected', true);
    setState(oldState => ({
      ...oldState,
      isActive: true,
      battery: arr[0],
      storage: parseInt(arr[1]) / 1000,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const isActive = JSON.parse(
        localStorage.getItem('connected')
      );

      if (isActive) {
        localStorage.setItem('connected', false);
        localStorage.setItem('disabled', false);
        setDisable(false);
        setState(oldState => ({
          ...oldState,
          isActive: false,
        }));
      } else {
        handleStop();
        localStorage.setItem('disabled', true);
        setDisable(true);
      }
    }, 5000);
    // Listen for the event
    ipcRenderer.on(
      channels.telemetry.GET_DATA,
      (event, arg) => {
        try {
          if (arg.search('STATUS') !== -1) {
            const arr = arg.split(/\s+/);
            arr.shift();
            handleChange(arr);
          }
        } catch (err) {
          console.log(
            `Could not parse data 😢 from value ${arg}`
          );
        }
      }
    );
    // Clean the listener after the component is dismounted
    return () => {
      ipcRenderer.removeAllListeners();
      clearInterval(interval);
    };
  }, [handleStop]);

  return (
    <>
      {!disable ? (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
          className="w-full h-5/6 flex items-center justify-center"
        >
          <div className="w-5/6 h-full flex flex-row justify-between items-center">
            <BigBox title="Images">
              <div className="flex flex-col h-full justify-between mt-10">
                <div className="flex flex-row space-x-4 h-1/6">
                  <SmallButton
                    name="Start"
                    hover="hover:bg-startBtn"
                    borderColor="border-startBtn"
                    callBack={() => handleStart()}
                    disabled={state.start}
                  />
                  <SmallButton
                    name="Stop"
                    hover="hover:bg-stopBtn"
                    borderColor="border-stopBtn"
                    callBack={() => {
                      if (state.start) handleStop();
                    }}
                  />
                </div>
                <div className="w-full space-y-4 flex flex-col items-center">
                  <RangeSlider />
                  <p className="w-2/3 self-center text-center font-heading font-thin lg:text-base xl:text-lg text-sm">
                    Capture Interval (images per metre)
                  </p>
                </div>
                <ProgressBar
                  max={300}
                  value={250}
                  text="Amount of images"
                  isProgress={false}
                />
              </div>
            </BigBox>
            <div className="flex flex-row space-x-20">
              <RadialBar
                value={state.battery}
                name="battery_charging_full"
              />
              <RadialBar
                value={state.storage}
                max={20}
                name="sd_storage"
                type="sd"
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {alert && (
            <motion.div
              initial={{
                opacity: 1,
              }}
              animate={{
                y: 0,
                opacity: 0,
                transition: {
                  duration: 5.0,
                },
              }}
              onAnimationComplete={() => setAlert(false)}
              className="w-full fixed px-2 py-2 z-10 top-0"
            >
              <ClosingAlert color="red">
                Please check the connection with the drone,
                and check if the drone telemetry is working
              </ClosingAlert>
            </motion.div>
          )}
          <div className="w-full h-5/6 flex flex-col items-center justify-center opacity-70">
            <NoConnection />
            <p className="font-heading font-semibold text-3xl lg:text-4xl text-center">
              No connection with the drone
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default CaptureImages;
