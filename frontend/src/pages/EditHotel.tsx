import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById } from "../services/api-client";
import { HotelType } from "../../../backend/src/shared/types";

export default function EditHotel() {
  const { hotelId } = useParams();

  const { data: hotelData } = useQuery({
    queryKey: ["fetchMyHotelById"],
    queryFn: () => fetchMyHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  const { data } = hotelData as HotelType;

  console.log(data);

  return (
    <>
      <div className="">hotel</div>
    </>
  );
}
