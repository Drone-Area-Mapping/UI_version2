import { NavBar } from './components/navbar';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Home, ImageProcessing, CaptureImages } from './routes/index';

const App = () => {
  const location = useLocation();

  return (
    <div className='w-screen h-screen bg-background'>
      <NavBar />
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/image-processing' element={<ImageProcessing />} />
        <Route path='/capture-images' element={<CaptureImages />} />
      </Routes>
    </div>
  );
};

export default App;
