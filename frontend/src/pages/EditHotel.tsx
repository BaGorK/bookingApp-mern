import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../services/api-client';
import { HotelType } from '../../../backend/src/shared/types';
import ManageHotelForm from '../components/forms/manageHotelForm/ManageHotelForm';

export default function EditHotel() {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data = {} } = useQuery({
    queryKey: ['fetchMyHotelById', hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId as string),
  });

  const { data: hotelData } = data as { data?: HotelType };

  return (
    <>
      <ManageHotelForm hotel={hotelData} />
    </>
  );
}
