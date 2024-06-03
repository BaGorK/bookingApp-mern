import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById } from "../services/api-client";
import { HotelType } from "../../../backend/src/shared/types";
import ManageHotelForm from "../components/forms/manageHotelForm/ManageHotelForm";

export default function EditHotel() {
  const { hotelId = "" } = useParams();

  const { data = {} } = useQuery({
    queryKey: ["fetchMyHotelById"],
    queryFn: () => fetchMyHotelById(hotelId),
  });

  const { data: hotelData } = data as { data?: HotelType };

  return (
    <>
      <ManageHotelForm hotel={hotelData} />
    </>
  );
}
