import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/api-client';

export default function Booking() {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['fetchCurrentUser'],
    queryFn: fetchCurrentUser,
  });

  if (isLoading) return <>Loading...</>;
  console.log(currentUser);

  return <div>Booking</div>;
}
