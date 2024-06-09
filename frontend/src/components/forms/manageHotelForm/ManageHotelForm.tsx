import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import { HotelType } from '../../../../../backend/src/shared/types';

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
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type props = {
  isPending: boolean;
  hotel?: HotelType;
  onSaveHotel: (hotelFormData: FormData) => void;
};

function ManageHotelForm({ isPending, onSaveHotel, hotel }: props) {
  const formMethods = useForm<HotelFormDataType>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormDataType) => {
    const formData = new FormData();

    if (hotel) {
      formData.append('hotelId', hotel._id);
    }

    formData.append('name', formDataJson.name);
    formData.append('city', formDataJson.city);
    formData.append('country', formDataJson.country);
    formData.append('description', formDataJson.description);
    formData.append('type', formDataJson.type);
    formData.append('pricePerNight', formDataJson.pricePerNight.toString());
    formData.append('starRating', formDataJson.starRating.toString());
    formData.append('adultCount', formDataJson.adultCount.toString());
    formData.append('childCount', formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, i) => {
        formData.append(`imageUrls[${i}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSaveHotel(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className='flex flex-col gap-10'>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className='flex justify-end'>
          <button
            type='submit'
            disabled={isPending}
            className='bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500 disabled:bg-blue-300 text-xl'
          >
            {isPending ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
