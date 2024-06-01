import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../services/api-client";

export default function MyHotels() {
  const { data: hotelData, isLoading } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold py-2 px-3 rounded hover:bg-blue-500"
        >
          Add Hotels
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div></div>
        ))}
      </div>
    </div>
  );
}
