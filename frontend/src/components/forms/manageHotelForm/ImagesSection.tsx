import { useFormContext } from "react-hook-form";
import { HotelFormDataType } from "./ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0)
                return "At least one image should be added";

              if (totalLength > 6)
                return "Total number of image cannot be more than 6";

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-700 text-sm font-normal">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
