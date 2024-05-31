import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormDataType = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  //   imageUrls: string[];
  adultCount: number;
  childCount: number;
};

function ManageHotelForm() {
  const formMethods = useForm<HotelFormDataType>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formData: HotelFormDataType) => {
    // create new form data object and call our api
    console.log(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-500 text-xl"
          >
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
