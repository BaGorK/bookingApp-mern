import { RegisterFormDataType } from '../pages/Register';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormDataType) => {
  const res = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  console.log(data);
};
