// import { HotelType } from '../../../backend/src/shared/types';
import {
  HotelSearchResponse,
  UserType,
} from '../../../backend/src/shared/types';
import { RegisterFormDataType } from '../pages/Register';
import { SignInFormDataType } from '../pages/SignIn';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchCurrentUser = async (): Promise<UserType> => {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Error fetching user');
  }

  const data = await res.json();

  return data;
};

export const register = async (formData: RegisterFormDataType) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }
};

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/validate-token`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Token invalid');
  }
  const data = await res.json();

  return data;
};

export const signIn = async (formData: SignInFormDataType) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    credentials: 'include',
    method: 'post',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/myHotels`, {
    method: 'post',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!res.ok) throw new Error('Failed to add hotel');

  const data = await res.json();

  return data;
};

export const fetchMyHotels = async () => {
  const res = await fetch(`${API_BASE_URL}/api/v1/myHotels`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Error fetching hotels');
  }

  const data = await res.json();

  return data;
};

export const fetchMyHotelById = async (hotelId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/myHotels/${hotelId}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Error fetching Hotels');
  }
  const data = await res.json();
  return data;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/myHotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'put',
      credentials: 'include',
      body: hotelFormData,
    }
  );

  if (!res.ok) throw new Error('Failed to update hotel');

  const data = await res.json();

  return data;
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (searchParams: SearchParams) => {
  const queryParams = new URLSearchParams();

  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount || '');
  queryParams.append('childCount', searchParams.childCount || '');
  queryParams.append('page', searchParams.page || '');

  queryParams.append('maxPrice', searchParams.maxPrice || '');
  queryParams.append('sortOption', searchParams.sortOption || '');

  searchParams.facilities?.forEach((facility) =>
    queryParams.append('facilities', facility)
  );

  searchParams.types?.forEach((type) => queryParams.append('types', type));
  searchParams.stars?.forEach((star) => queryParams.append('stars', star));

  const res = await fetch(
    `${API_BASE_URL}/api/v1/hotels/search?${queryParams.toString()}`
  );

  const data = await res.json();

  return data as HotelSearchResponse;
};

export const fetchHotelById = async (hotelId: string) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/hotels/${hotelId}`);

  if (!res.ok) {
    throw new Error('Error fetching Hotel');
  }

  const data = await res.json();

  return data;
};
