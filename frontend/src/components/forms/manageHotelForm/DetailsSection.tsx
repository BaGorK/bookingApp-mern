import { useFormContext } from "react-hook-form";
import { HotelFormDataType } from "./ManageHotelForm";

export default function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-3xl font-bold mb-3">Add Hotel</div>

      <label htmlFor="name" className="text-gray-700 flex-1 text-sm font-bold ">
        Name
        <input
          type="text"
          id="name"
          defaultValue="test hotel"
          {...register("name", { required: "this field is required" })}
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.name && (
          <p className="text-red-700 text-sm font-normal">
            {errors.name.message}
          </p>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 flex-1 text-sm font-bold ">
          City
          <input
            type="text"
            defaultValue="test city"
            {...register("city", { required: "this field is required" })}
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.city && (
            <p className="text-red-700 text-sm font-normal">
              {errors.city.message}
            </p>
          )}
        </label>
        <label className="text-gray-700 flex-1 text-sm font-bold ">
          Country
          <input
            type="text"
            defaultValue="Ethiopia"
            {...register("country", { required: "this field is required" })}
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.country && (
            <p className="text-red-700 text-sm font-normal">
              {errors.country.message}
            </p>
          )}
        </label>
      </div>
      <label className="text-gray-700 flex-1 text-sm font-bold ">
        Description
        <textarea
          defaultValue="some text"
          rows={10}
          {...register("description", { required: "this field is required" })}
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.description && (
          <p className="text-red-700 text-sm font-normal">
            {errors.description.message}
          </p>
        )}
      </label>
      <label className="text-gray-700 max-w-[50%] text-sm font-bold ">
        Price Per Night
        <input
          type="number"
          min={1}
          defaultValue={1}
          {...register("pricePerNight", { required: "this field is required" })}
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.pricePerNight && (
          <p className="text-red-700 text-sm font-normal">
            {errors.pricePerNight.message}
          </p>
        )}
      </label>

      <label className="text-gray-700 max-w-[50%] text-sm font-bold ">
        Star Rating
        <select
          {...register("starRating", { required: "This field is required" })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <p className="text-red-700 text-sm font-normal">
            {errors.starRating.message}
          </p>
        )}
      </label>
    </div>
  );
}
