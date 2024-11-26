import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { rideService } from '../../services/api';
import { toast } from '../../hooks/use-toast';
import { Ride, RideHistoryResponse } from '../../types/ride';

export function RideHistory() {
  const [customerId, setCustomerId] = useState('');
  const [driverId, setDriverId] = useState<number | undefined>(undefined);
  const [rides, setRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchRides() {
    if (!customerId) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um ID de usuário',
        variant: 'destructive',
      });
      return;
    }
    console.log(customerId);
    console.log(driverId);

    setIsLoading(true);
    try {
      const result: RideHistoryResponse = await rideService.getRides(
        customerId,
        driverId
      );
      setRides(result.rides);
      console.log(result.rides);
      console.log(result);
    } catch (error) {
      toast({
        title: 'Erro',
        description: `Não foi possível buscar as corridas: ${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='container mx-auto flex flex-col space-y-4 h-full'>
      <div className='w-full mx-auto flex space-x-2'>
        <Input
          placeholder='ID do Usuário'
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <Select
          value={driverId?.toString()}
          onValueChange={(value) =>
            setDriverId(value ? Number(value) : undefined)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Motorista' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='0'>Todos</SelectItem>
            {Array.from(new Set(rides.map((ride) => ride.driver.id))).map(
              (driverId) => {
                const driver = rides.find(
                  (ride) => ride.driver.id === driverId
                )?.driver;
                return driver ? (
                  <SelectItem key={driver.id} value={driver.id.toString()}>
                    {driver.name}
                  </SelectItem>
                ) : null;
              }
            )}
          </SelectContent>
        </Select>
        <Button onClick={fetchRides} disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar Corridas'}
        </Button>
      </div>

      <div className='space-y-4 pb-8'>
        {rides.map((ride, index) => (
          <Card key={ride.id + index}>
            <CardHeader>
              <CardTitle>Corrida #{ride.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Data: {new Date(ride.date).toLocaleString()}</p>
              <strong>Motorista: {ride.driver.name}</strong>
              <p>Origem: {ride.origin}</p>
              <p>Destino: {ride.destination}</p>
              <p>Distância: {ride.distance.toFixed(2)} km</p>
              <p>Duração: {ride.duration}</p>
              <p>Valor: R$ {ride.value.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
