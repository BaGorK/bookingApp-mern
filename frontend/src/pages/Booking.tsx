import { useQuery } from '@tanstack/react-query';
import {
  createPaymentIntent,
  fetchCurrentUser,
  fetchHotelById,
} from '../services/api-client';
import BookingForm from '../components/forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';

export default function Booking() {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numOfNights, setNumOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumOfNights(Math.ceil(nights));
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

  const { data: paymentIntentData, isLoading: isLoadingPaymentIntent } =
    useQuery({
      queryKey: ['createPaymentIntent'],
      queryFn: () => {
        if (numOfNights === 0) return;
        return createPaymentIntent(hotelId as string, numOfNights.toString());
      },
    });

  if (isLoadingCurrentUser || isLoadingHotel || isLoadingPaymentIntent)
    return <>Loading...</>;

  return (
    <div className='grid md:grid-cols-[1fr_2fr]'>
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
}
