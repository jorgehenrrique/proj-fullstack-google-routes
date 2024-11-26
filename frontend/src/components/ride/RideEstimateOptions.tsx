import { useState } from 'react';
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

  const { estimate, requestData } =
    location.state ||
    ({} as {
      estimate: RideEstimate;
      requestData: RideRequest;
    });

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
      <div className='space-y-4 pb-8'>
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
              <p>Distância: {estimate.distance.toFixed(2)} km</p>
              <p>Duração: {estimate.duration}</p>
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
