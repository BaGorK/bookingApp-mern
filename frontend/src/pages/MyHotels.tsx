import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../services/api-client';
import { BsBuilding, BsMap } from 'react-icons/bs';
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi';
import { HotelType } from './../../../backend/src/shared/types';
import Spinner from '../components/Spinner';

export default function MyHotels() {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['fetchMyHotels'],
    queryFn: apiClient.fetchMyHotels,
  });

  const { data: hotelData } = data as { data: HotelType[] };

  return (
    <div className='space-y-5'>
      <span className='flex justify-between'>
        <h1 className='text-3xl font-bold'>My Hotels yyy</h1>
        <Link
          to='/add-hotel'
          className='flex bg-blue-600 text-white text-xl font-bold py-2 px-3 rounded hover:bg-blue-500'
        >
          Add Hotels
        </Link>
      </span>
      <div className='grid grid-cols-1 gap-8'>
        {isLoading ? (
          <Spinner />
        ) : hotelData.length === 0 ? (
          <span>You have no hotels yet. add your hotel</span>
        ) : (
          hotelData.map((hotel) => (
            <div
              key={hotel._id}
              className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'
            >
              <h2 className='text-2xl font-bold'>{hotel.name}</h2>
              <div className='whitespace-pre-line'>{hotel.description}</div>
              <div className='grid grid-cols-5 gap-2'>
                <div className='border border-slate-300 rounded-sm px-2 py-3 flex items-center'>
                  <BsMap className='mr-1  text-lg' />
                  {hotel.city}, {hotel.country}
                </div>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BsBuilding className='mr-1  text-lg' />
                  {hotel.type}
                </div>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BiMoney className='mr-1  text-lg' />£{hotel.pricePerNight}{' '}
                  per night
                </div>
                <div className='border border-slate-300 rounded-sm py-3 px-2 flex items-center'>
                  <BiHotel className='' />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className='border border-slate-300 rounded-sm p-3 flex items-center'>
                  <BiStar className='mr-1  text-lg' />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <span className='flex justify-end'>
                <Link
                  className='flex bg-blue-600 text-white text-xl font-bold py-2 px-3 rounded hover:bg-blue-500'
                  to={`/edit-hotels/${hotel._id}`}
                >
                  View Details
                </Link>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
