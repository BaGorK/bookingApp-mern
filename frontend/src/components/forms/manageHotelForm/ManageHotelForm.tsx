import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";

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

  return (
    <FormProvider {...formMethods}>
      <form>
        <DetailsSection />
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
