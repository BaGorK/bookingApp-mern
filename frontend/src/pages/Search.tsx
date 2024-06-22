import { useQuery } from '@tanstack/react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../services/api-client';
import { useState } from 'react';
import SearchResultCard from '../components/SearchResultsCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';

export default function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
  };

  const { data: hotelsDate, isLoading } = useQuery({
    queryKey: ['searchHotels', searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = e.target.value;

    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  // if (isLoading || !hotelsDate) return <div>Loading...</div>;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-slate-300 p-5 h-fit sticky top-10 '>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-slate-300 pb-5'>
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
        </div>
      </div>

      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold'>
            {hotelsDate?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ''}
          </span>
        </div>
        {hotelsDate?.data.map((hotel) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelsDate?.pagination.page || 1}
            onPageChange={onPageChange}
            pages={hotelsDate?.pagination.pages || 1}
          />
        </div>
      </div>
    </div>
  );
}
