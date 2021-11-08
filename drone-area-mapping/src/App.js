import { NavBar } from './components/navbar';
import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className='w-screen h-screen bg-background'>
      {open && <NavBar />}
      <button
        className='p-5 w-1/6 border border-purple-500 hover:bg-purple-400 text-white rounded-full'
        onClick={() => setOpen(!open)}
      >
        Click me!
      </button>
    </div>
  );
}

export default App;
