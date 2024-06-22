type Props = {
  selectedStars: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StarRatingFilter({ selectedStars, onChange }: Props) {
  return (
    <div className='border-b border-slate-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>Property Rating</h4>
      {['5', '4', '3', '2', '1'].map((star) => (
        <label className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
}
