import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RideRequestForm } from './components/ride/RideRequestForm.tsx';
import { RideEstimateOptions } from './components/ride/RideEstimateOptions.tsx';
import { RideHistory } from './components/ride/RideHistory.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Rota padrão
        element: <RideRequestForm />,
      },
      {
        path: 'ride-options',
        element: <RideEstimateOptions />,
      },
      {
        path: 'ride-history',
        element: <RideHistory />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
