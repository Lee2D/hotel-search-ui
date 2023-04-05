import { Hotel } from '../interfaces/Interfaces';

interface HotelSearchParams {
  numGuests: number;
  city: string;
  minPrice: number;
  maxPrice: number;
}

export async function fetchCities(): Promise<string[]> {
  const response = await fetch('http://localhost:8080/api/hotels/cities');
  const data = await response.json();
  return data;
}

export async function fetchHotels(params: HotelSearchParams): Promise<Hotel[]> {
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  };

  const response = await fetch('http://localhost:8080/api/hotels/search', requestOptions);
  const data = await response.json();
  return data;
}
