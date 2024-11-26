import {
  RideConfirmation,
  RideEstimate,
  RideHistoryResponse,
  RideRequest,
} from '../types/ride';

const API_BASE_URL = 'http://localhost:8080/ride';

export const rideService = {
  async estimateRide(data: RideRequest): Promise<RideEstimate> {
    try {
      const response = await fetch(`${API_BASE_URL}/estimate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error_description || 'Erro ao estimar corrida'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na estimativa de corrida:', error);
      throw error;
    }
  },

  async confirmRide(data: RideConfirmation): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/confirm`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error_description || 'Erro ao confirmar corrida'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na confirmação de corrida:', error);
      throw error;
    }
  },

  async getRides(
    customerId: string,
    driverId?: number
  ): Promise<RideHistoryResponse> {
    try {
      const url = new URL(`${API_BASE_URL}/${customerId}`);
      if (driverId) {
        url.searchParams.append('driver_id', driverId.toString());
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error_description || 'Erro ao buscar corridas'
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar corridas:', error);
      throw error;
    }
  },
};
