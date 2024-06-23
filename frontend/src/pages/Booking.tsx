import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser, fetchHotelById } from '../services/api-client';
import BookingForm from '../components/forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Booking() {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numOfNight, setNumOfNight] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumOfNight(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel, isLoading: isLoadingHotel } = useQuery({
    queryKey: ['fetchHotelById', hotelId as string],
    queryFn: () => fetchHotelById(hotelId as string),
  });

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery({
    queryKey: ['fetchCurrentUser'],
    queryFn: fetchCurrentUser,
  });

  if (isLoadingCurrentUser || isLoadingHotel) return <>Loading...</>;

  return (
    <div className='grid md:grid-cols-[1fr_2fr]'>
      <div className='bg-green-200'>Booking Details page</div>
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
}
