import { hotelTypes } from '../config/hotel-options-config';

type Props = {
  selectedHotelTypes: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function HotelTypesFilter({
  onChange,
  selectedHotelTypes,
}: Props) {
  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>Hotel Type</h4>
      {hotelTypes.map((HotelType) => (
        <label className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={HotelType}
            checked={selectedHotelTypes.includes(HotelType)}
            onChange={onChange}
          />
          <span>{HotelType}</span>
        </label>
      ))}
    </div>
  );
}
