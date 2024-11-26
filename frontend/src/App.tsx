import { Outlet } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className='containe mx-auto border-b h-screen'>
      <Header />
      <Outlet /> {/* Renderiza as rotas filhas */}
      <Toaster />
    </div>
  );
}

export default App;
