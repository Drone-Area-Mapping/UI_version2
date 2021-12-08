import { NavBar } from './components/navbar';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Home, ImageProcessing, CaptureImages } from './routes/index';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();

  return (
    <div className='w-screen h-screen bg-background overflow-x-hidden overflow-y-auto text-white min-w-5xl min-h-2xl relative'>
      <NavBar />
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/image-processing' element={<ImageProcessing />} />
          <Route path='/capture-images' element={<CaptureImages />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
