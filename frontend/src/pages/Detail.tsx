import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import * as apiClient from './../services/api-client';

export default function Detail() {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery({
    queryKey: ['fetchHotelById'],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(hotel);

  return <div>Detail</div>;
}
