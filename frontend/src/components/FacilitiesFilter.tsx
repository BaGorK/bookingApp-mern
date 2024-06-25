import { hotelFacilities } from '../config/hotel-options-config';

type Props = {
  selectedFacilities: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FacilitiesFilter({
  onChange,
  selectedFacilities,
}: Props) {
  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>Hotel Type</h4>
      {hotelFacilities.map((facilities) => (
        <label key={facilities} className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={facilities}
            checked={selectedFacilities.includes(facilities)}
            onChange={onChange}
          />
          <span>{facilities}</span>
        </label>
      ))}
    </div>
  );
}
