import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { rideService } from '../../services/api';
import { toast } from '../../hooks/use-toast';
import { RideRequest } from '../../types/ride';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  customer_id: z.string().min(1, 'ID do usuário é obrigatório'),
  origin: z.string().min(1, 'Endereço de origem é obrigatório'),
  destination: z.string().min(1, 'Endereço de destino é obrigatório'),
});

export function RideRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: '',
      origin: '',
      destination: '',
    },
  });

  async function onSubmit(values: RideRequest) {
    setIsLoading(true);
    try {
      const estimate = await rideService.estimateRide(values);
      navigate('/ride-options', {
        state: {
          estimate,
          requestData: values,
        },
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: `Não foi possível estimar a corrida: ${error}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='container space-y-4 max-w-md mx-auto h-full flex flex-col justify-center'
      >
        <FormField
          control={form.control}
          name='customer_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID do Usuário</FormLabel>
              <FormControl>
                <Input placeholder='Digite seu ID' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='origin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço de Origem</FormLabel>
              <FormControl>
                <Input placeholder='Rua, número, cidade' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='destination'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço de Destino</FormLabel>
              <FormControl>
                <Input placeholder='Rua, número, cidade' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full'
          disabled={isLoading || !form.formState.isValid}
        >
          {isLoading ? 'Estimando...' : 'Estimar Corrida'}
        </Button>
      </form>
    </Form>
  );
}
