type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

export default function PriceFilter({ selectedPrice, onChange }: Props) {
  return (
    <div>
      <h4 className='text-md font-semibold mb-2'>
        <select
          value={selectedPrice}
          onChange={(e) =>
            onChange(e.target.value ? parseInt(e.target.value) : undefined)
          }
          className='p-2 border rounded-md w-full'
        >
          <option value=''>Select Max Price</option>
          {[50, 100, 200, 300, 500].map((price) => (
            <option key={price} value={price}>
              ${price}
            </option>
          ))}
        </select>
      </h4>
    </div>
  );
}
