import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import ManageHotelForm from '../components/forms/manageHotelForm/ManageHotelForm';
import * as apiClient from '../services/api-client';

export default function AddHotel() {
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      toast.success('Hotel save successfully');
    },
    onError: () => {
      toast.error('Error saving a hotel');
    },
  });

  const handleSaveHotel = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm isPending={isPending} onSaveHotel={handleSaveHotel} />
  );
}
