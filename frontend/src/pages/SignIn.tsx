import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as apiClient from '../services/api-client';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type SignInFormDataType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormDataType>();

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: () => {
      toast.success('Login successful');
      queryClient.invalidateQueries({
        queryKey: ['validateToken'],
      });
      navigate(location.state?.from?.pathname || '/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleOnSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={handleOnSubmit} className='flex flex-col gap-5'>
      <h2 className='text-3xl font-bold'>Sign In</h2>

      <label
        htmlFor='email'
        className='text-gray-700 flex-1 text-sm font-bold '
      >
        email
        <input
          type='email'
          id='email'
          defaultValue='test@test.com'
          {...register('email', { required: 'this field is required' })}
          className='border rounded w-full py-1 px-2 font-normal'
        />
        {errors.email && (
          <p className='text-red-700 text-sm font-normal'>
            {errors.email.message}
          </p>
        )}
      </label>
      <label
        htmlFor='password'
        className='text-gray-700 flex-1 text-sm font-bold '
      >
        password
        <input
          type='password'
          id='password'
          defaultValue='test1234'
          {...register('password', {
            required: 'this field is required',
            minLength: {
              value: 6,
              message: 'password must be at least 6 characters',
            },
          })}
          className='border rounded w-full py-1 px-2 font-normal'
        />{' '}
        {errors.password && (
          <p className='text-red-700 text-sm font-normal'>
            {errors.password.message}
          </p>
        )}
      </label>
      <span className='flex  flex-col justify-start gap-3'>
        <button
          type='submit'
          disabled={isPending}
          className='bg-blue-600 text-white  px-3 py-2 rounded font-bold hover:bg-blue-500 text-xl'
        >
          {isPending ? 'Signing In ...' : 'Sign In'}
        </button>
        <span className='text-sm'>
          Not Registered?{' '}
          <Link to='/register' className='text-blue-600 underline'>
            Create an account here
          </Link>
        </span>
      </span>
    </form>
  );
}
