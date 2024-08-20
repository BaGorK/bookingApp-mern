import { useQuery } from '@tanstack/react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../services/api-client';
import { useState } from 'react';
import SearchResultCard from '../components/SearchResultsCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypesFilter from '../components/HotelTypesFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';
import Spinner from '../components/Spinner';

export default function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined
  );
  const [sortOption, setSortOption] = useState<string>('');

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
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

  const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = e.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      e.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((type) => type !== hotelType)
    );
  };

  const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const facility = e.target.value;

    setSelectedFacilities((preFacilities) =>
      e.target.checked
        ? [...preFacilities, facility]
        : preFacilities.filter((f) => f !== facility)
    );
  };

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
          <HotelTypesFilter
            onChange={handleHotelTypeChange}
            selectedHotelTypes={selectedHotelTypes}
          />
          <FacilitiesFilter
            onChange={handleFacilitiesChange}
            selectedFacilities={selectedFacilities}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className='flex flex-col gap-5'>
          <div className='flex justify-between items-center'>
            <Spinner />
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-5'>
          <div className='flex justify-between items-center'>
            <span className='text-xl font-bold'>
              {hotelsDate?.pagination.total} Hotels found
              {search.destination ? ` in ${search.destination}` : ''}
            </span>

            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className='p-2 border rounded-md'
            >
              <option value=''>Sort By</option>
              <option value='starRating'>Star Rating</option>
              <option value='pricePerNightAsc'>
                Price Per Night (low to high)
              </option>
              <option value='pricePerNightDesc'>
                Price Per Night (high to low)
              </option>
            </select>
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
      )}
    </div>
  );
}
