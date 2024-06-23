import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/api-client';
import BookingForm from '../components/forms/BookingForm/BookingForm';

export default function Booking() {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['fetchCurrentUser'],
    queryFn: fetchCurrentUser,
  });

  if (isLoading) return <>Loading...</>;

  return (
    <div className='grid md:grid-cols-[1fr_2fr]'>
      <div className='bg-green-200'>Booking Details page</div>
      <BookingForm currentUser={currentUser} />
    </div>
  );
}
