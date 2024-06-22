import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import * as apiClient from './../services/api-client';
import { AiFillStar } from 'react-icons/ai';

export default function Detail() {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery({
    queryKey: ['fetchHotelById'],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
  });

  if (isLoading) return <div>Loading...</div>;

  if (!hotel) return <></>;

  return (
    <div className='space-y-6'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar className='fill-yellow-400' key={i} />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {hotel.imageUrls.map((image: string) => (
          <div className='h-[300px]' key={image}>
            <img
              src={image}
              alt={hotel.name}
              className='rounded-md w-full h-full object-cover object-center'
            />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {hotel.facilities.map((facility: string) => (
          <div key={facility} className='border border-slate-300 rounded-sm p-3'>
            {facility}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
        <div className='whitespace-pre-line'>{hotel.description}</div>
        <div className='h-fit'>
          {/* <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          /> */}
        </div>
      </div>
    </div>
  );
}
