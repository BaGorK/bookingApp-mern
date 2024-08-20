import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-options-config';
import { HotelFormDataType } from './ManageHotelForm';

export default function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormDataType>();
  const typeWatch = watch('type');

  return (
    <div>
      <h2 className='text-2xl font-bold mb-3'>Type</h2>
      <div className='grid grid-cols-5 gap-2'>
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? 'cursor-pointer bg-blue-400 text-sm rounded-full px-4 py-2 transition duration-150  font-semibold'
                : 'cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold  transition duration-150  '
            }
          >
            <input
              type='radio'
              value={type}
              className='hidden'
              {...register('type', { required: 'this field is required' })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className='text-red-700 text-sm font-normal'>
          {errors.type.message}
        </span>
      )}
    </div>
  );
}
