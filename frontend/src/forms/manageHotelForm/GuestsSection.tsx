import { useFormContext } from 'react-hook-form';
import { HotelFormDataType } from './ManageHotelForm';

export default function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Guests</h2>
      <div className='grid grid-cols-2 gap-5 p-6 bg-gray-300'>
        <label className='text-gray-700 text-sm font-semibold '>
          Adults
          <input
            type='number'
            min={1}
            defaultValue={2}
            className='border rounded w-full py-2 px-3 font-normal'
            {...register('adultCount', {
              required: 'This field is required',
            })}
          />
          {errors.adultCount && (
            <span className='text-red-700 text-sm font-normal'>
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label className='text-gray-700 text-sm font-semibold '>
          Children
          <input
            type='number'
            min={0}
            defaultValue={3}
            className='border rounded w-full py-2 px-3 font-normal'
            {...register('childCount', {
              required: 'This field is required',
            })}
          />
          {errors.childCount && (
            <span className='text-red-700 text-sm font-normal'>
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}
