import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { pageTransition } from '../helper/animations';
import { BigBox } from '../components/big-box';
import { SmallButton } from '../components/small-button';
// import { BigButton } from '../components/big-button';
// import { LongBigBox } from '../components/Long-big-box';
import { LongSmallBox } from '../components/Long-Small-box';
import { ProgressBar } from '../components/progressbar';
import { channels } from '../shared/constants';
import { sendCommand } from '../helper/api';
import ClosingAlert from '@material-tailwind/react/ClosingAlert';

const { ipcRenderer } = require('electron');

const ImageProcessing = () => {
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(false);
  const [start, setStart] = useState(
    JSON.parse(localStorage.getItem('isStarted')) || false
  );
  const [done, setDone] = useState(false);

  const handleStart = () => {
    const importPath =
      localStorage.getItem('importPath') || '';
    const exportPath =
      localStorage.getItem('exportPath') || '';

    if (importPath !== '' && exportPath !== '') {
      const value = {
        import: importPath,
        export: exportPath,
      };

      sendCommand('stitching', 'startProcessing', value);
      setStart(true);
      localStorage.setItem('isStarted', true);
    } else setAlert(true);
  };

  const handleStop = useCallback(() => {
    sendCommand('stitching', 'stopProcessing', true);
    localStorage.setItem('isStarted', false);
    setStart(false);
    handleProgress(0);
  }, []);

  const handleProgress = value => {
    setProgress(value);
    localStorage.setItem('stitchProgress', value);
  };

  useEffect(() => {
    // Listen for the event
    ipcRenderer.on(
      channels.stitching.GET_DATA,
      (event, arg) => {
        try {
          const data = JSON.parse(arg);

          if (data.name === 'stitchProgress') {
            if (data.value === 100) {
              handleStop();
              setDone(true);
            } else handleProgress(data.value);
          } else console.log(arg);
        } catch (err) {
          console.log(
            `Could not parse JSON data ???? from value ${arg}`
          );
        }
      }
    );
    // Clean the listener after the component is dismounted
    return () => ipcRenderer.removeAllListeners();
  }, [handleStop]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="w-full h-5/6 flex items-center justify-center"
    >
      {done && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
            transition: {
              duration: 5.0,
            },
          }}
          onAnimationComplete={() => setDone(false)}
          className="w-full absolute px-2 py-2 z-10 top-0"
        >
          <ClosingAlert color="lightGreen">
            Stitching progress sucessfully completed!
          </ClosingAlert>
        </motion.div>
      )}
      {alert && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
            transition: {
              duration: 5.0,
            },
          }}
          onAnimationComplete={() => setAlert(false)}
          className="w-full absolute px-2 py-2 z-10 top-0"
        >
          <ClosingAlert color="red">
            Please insert an import and export filepath!
          </ClosingAlert>
        </motion.div>
      )}
      <div className="w-5/6 h-full flex flex-row justify-between items-center">
        <BigBox title="Processing">
          <div className="h-full my-6 flex flex-col space-y-6">
            <div className="flex flex-row space-x-4 h-1/6">
              <SmallButton
                name="Start"
                hover="hover:bg-startBtn"
                borderColor="border-startBtn"
                callBack={() => handleStart()}
                disabled={start}
              />
              <SmallButton
                name="Stop"
                hover="hover:bg-stopBtn"
                borderColor="border-stopBtn"
                callBack={() => {
                  if (start) handleStop();
                }}
              />
            </div>
            {/* <div className='flex flex-col h-1/6 space-y-4 justify-evenly'>
              <BigButton
                name='Export'
                callBack={() => sendCommand('exportProcessing', true)}
              />
            </div> */}
            {start && (
              <ProgressBar
                color="#159AFB"
                labelFormat="%"
                max={100}
                value={progress}
                text="Progress"
              />
            )}
          </div>
        </BigBox>

        <div className="w-8/12 h-4/5 flex flex-col justify-evenly space-y-4">
          <div className="h-1/4">
            <LongSmallBox
              title="Import file path"
              text="file_download"
              eventType="import-directory"
              storageName="importPath"
            />
          </div>
          {/* <div className='h-1/2'>
            <LongBigBox title='Layers to stich' text='extension' />
          </div> */}
          <div className="h-1/4">
            <LongSmallBox
              title="Export file path"
              text="file_upload"
              eventType="export-directory"
              storageName="exportPath"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageProcessing;
