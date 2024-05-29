import { useForm } from 'react-hook-form';

export type SignInFormDataType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    formState: { errors },
  } = useForm<SignInFormDataType>();

  return (
    <div className='flex flex-col gap-5'>
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
      <span>
        <button
          type='submit'
          //   disabled={status === 'pending'}
          className='bg-blue-600 text-white  px-3 py-2 rounded font-bold hover:bg-blue-500 text-xl'
        >
          Sign In
        </button>
      </span>
    </div>
  );
}
