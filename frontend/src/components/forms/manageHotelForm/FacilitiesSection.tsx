import { useFormContext } from "react-hook-form";
import { HotelFormDataType } from "./ManageHotelForm";
import { hotelFacilities } from "../../../config/hotel-options-config";

export default function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label>
            <input type="checkbox" value={facility} />
            {facility}
          </label>
        ))}
      </div>
    </div>
  );
}
