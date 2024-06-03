import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMyHotelById } from "../services/api-client";
import { HotelType } from "../../../backend/src/shared/types";

export default function EditHotel() {
  const { hotelId = "" } = useParams();

  const { data } = useQuery({
    queryKey: ["fetchMyHotelById"],
    queryFn: () => fetchMyHotelById(hotelId),
  });

  const { data: HotelData } = data as { data?: HotelType };

  console.log(HotelData);

  return (
    <>
      <div className="">hotel</div>
    </>
  );
}
