export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, pages, onPageChange }: Props) {
  const pageNumbers = Array.from({ length: pages }).map((_, i) => i + 1);

  return (
    <div className='flex justify-center'>
      <ul className='flex border border-slate-300'>
        {pageNumbers.map((num) => (
          <li
            key={num}
            className={`px-2 py-1 ${page === num ? 'bg-gray-200' : ''}`}
          >
            <button onClick={() => onPageChange(num)}>{num}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
