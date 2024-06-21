import { useQuery } from '@tanstack/react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../services/api-client';
import { useState } from 'react';

export default function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data, isLoading } = useQuery({
    queryKey: ['searchHotels', searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });

  console.log(isLoading, data);

  return <div>Search page</div>;
}
