import { useQuery } from '@tanstack/react-query';
import { fetchHotels } from '../services/api-client';
import LatestDestinationCard from '../components/LatestDestinationCard';
import Spinner from '../components/Spinner';

function Home() {
  const { data: hotels, isLoading } = useQuery({
    queryKey: ['fetchQuery'],
    queryFn: fetchHotels,
  });

  if (isLoading) return <Spinner />;

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className='space-y-3'>
      <h2 className='text-3xl font-bold'>Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className='grid gap-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div className='grid md:grid-cols-3 gap-4'>
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
