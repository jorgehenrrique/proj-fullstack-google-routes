import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-md'>
      <div className='container mx-auto flex justify-between items-center py-3 px-4'>
        <h1 className='text-2xl font-bold'>Ride App</h1>
        <nav className='space-x-4'>
          <Button variant='outline' asChild>
            <Link to='/'>Solicitar Corrida</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link to='/ride-history'>Histórico</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
