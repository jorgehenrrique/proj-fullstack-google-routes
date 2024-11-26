import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className='flex justify-between items-center mb-6 border-b p-2 bg-slate-900 text-white rounded-b-lg max-w-7xl mx-auto fixed top-0 left-0 right-0 w-full'>
      <h1 className='text-2xl font-bold'>Ride App</h1>
      <nav className='space-x-4 space-y-2'>
        <Button variant='outline' asChild>
          <Link to='/'>Solicitar Corrida</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link to='/ride-history'>Histórico</Link>
        </Button>
      </nav>
    </header>
  );
}
