import { useForm } from 'react-hook-form';

type RegisterFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { register } = useForm<RegisterFormDataType>();

  return (
    <form className='flex flex-col gap-5'>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
    </form>
  );
}
