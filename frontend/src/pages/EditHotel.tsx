import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../services/api-client';
import { HotelType } from '../../../backend/src/shared/types';
import ManageHotelForm from '../forms/manageHotelForm/ManageHotelForm';
import toast from 'react-hot-toast';

export default function EditHotel() {
  const { hotelId } = useParams<{ hotelId: string }>();

  const { data = {} } = useQuery({
    queryKey: ['fetchMyHotelById', hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId as string),
  });

  const { data: hotelData } = data as { data?: HotelType };

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () => {
      toast.success('Hotel updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <>
      <ManageHotelForm
        isPending={isPending}
        onSaveHotel={handleSave}
        hotel={hotelData}
      />
    </>
  );
}
