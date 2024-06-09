// import { HotelType } from '../../../backend/src/shared/types';
import { RegisterFormDataType } from '../pages/Register';
import { SignInFormDataType } from '../pages/SignIn';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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
