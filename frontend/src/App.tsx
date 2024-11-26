import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className='min-h-screen flex flex-col mx-auto h-screen'>
      <Header />
      <main className='flex-grow pt-20'>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}

export default App;
