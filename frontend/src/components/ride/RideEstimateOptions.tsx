import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { rideService } from '../../services/api';
import { toast } from '../../hooks/use-toast';
import { Driver, RideEstimate, RideRequest } from '../../types/ride';

export function RideEstimateOptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mapUrl, setMapUrl] = useState('');

  const { estimate, requestData } =
    location.state ||
    ({} as {
      estimate: RideEstimate;
      requestData: RideRequest;
    });

  const generateStaticMapUrl = useCallback(() => {
    // Construir URL do mapa estático do Google
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log(apiKey); // TODO: remover

    // Coordenadas de origem e destino
    const origin = `${estimate.origin.latitude},${estimate.origin.longitude}`;
    const destination = `${estimate.destination.latitude},${estimate.destination.longitude}`;

    const url = new URL(baseUrl);
    url.searchParams.set('key', apiKey!);
    url.searchParams.set('size', '600x300'); // Tamanho do mapa
    url.searchParams.set('maptype', 'roadmap');

    // Marcadores para origem e destino
    url.searchParams.set('markers', `color:green|label:A|${origin}`);
    url.searchParams.set('markers', `color:red|label:B|${destination}`);

    // Adicionar caminho da rota
    const path = estimate.routeResponse?.routes[0]?.overview_polyline?.points;
    if (path) {
      url.searchParams.set('path', `color:0x0000ff|weight:5|enc:${path}`);
    }

    setMapUrl(url.toString());
  }, [estimate]);

  useEffect(() => {
    if (estimate) generateStaticMapUrl();

    if (!location.state) navigate('/');
  }, [estimate, generateStaticMapUrl, location.state, navigate]);

  async function confirmRide(driverOption: Driver) {
    setIsLoading(true);
    try {
      const confirmData = {
        ...requestData,
        distance: estimate.distance,
        duration: estimate.duration,
        driver: {
          id: driverOption.id,
          name: driverOption.name,
        },
        value: driverOption.value,
      };

      await rideService.confirmRide(confirmData);
      navigate('/ride-history');
    } catch (error) {
      toast({
        title: 'Erro',
        description: `Não foi possível confirmar a corrida: ${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='container mx-auto space-y-4 flex flex-col items-center space-x-2'>
      <h2 className='text-2xl font-bold text-center'>Opções de Motoristas</h2>

      {mapUrl && (
        <div className='w-full max-w-2xl mb-6'>
          <img
            src={mapUrl}
            alt='Rota da Viagem'
            className='w-full h-auto rounded-lg shadow-md'
          />
          <div className='mt-2 text-justify'>
            <p>Distância: {estimate.distance.toFixed(2)} km</p>
            <p>Duração estimada: {estimate.duration}</p>
          </div>
        </div>
      )}

      <div className='space-y-4 pb-8 w-full max-w-2xl'>
        {estimate?.options?.map((option: Driver) => (
          <Card key={option.id} className='w-full'>
            <CardHeader>
              <CardTitle>{option.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Veículo: {option.vehicle}</p>
              <p>Descrição: {option.description}</p>
              {option.review && (
                <>
                  <p>
                    Avaliação: {option.review[0].rating.toFixed(1) || 'N/A'}
                  </p>
                  <p>Comentário: {option.review[0].comment || 'N/A'}</p>
                </>
              )}
              <p>Valor: R$ {option.value.toFixed(2)}</p>
              <div className='flex space-x-2'>
                <Button
                  onClick={() => confirmRide(option)}
                  disabled={isLoading}
                  className='w-full mt-4'
                >
                  {isLoading ? 'Confirmando...' : 'Escolher'}
                </Button>
                <Button
                  variant='outline'
                  className='w-full mt-4'
                  onClick={() => navigate('/')}
                >
                  Voltar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
