import { RegisterFormDataType } from '../pages/Register';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
