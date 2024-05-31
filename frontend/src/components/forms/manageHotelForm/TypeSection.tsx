import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../../config/hotel-options-config";
import { HotelFormDataType } from "./ManageHotelForm";

export default function TypeSection() {
  const { register, watch } = useFormContext<HotelFormDataType>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "this field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
