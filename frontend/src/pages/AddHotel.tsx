import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../components/forms/manageHotelForm/ManageHotelForm";
import * as apiClient from "../services/api-client";
import toast from "react-hot-toast";

export default function AddHotel() {
  const { mutate, isLoading } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: () => {
      toast.success("Hotel save successfully");
    },
    onError: () => {
      toast.error("Error saving a hotel");
    },
  });

  const handleSaveHotel = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm isLoading={isLoading} onSaveHotel={handleSaveHotel} />
  );
}
