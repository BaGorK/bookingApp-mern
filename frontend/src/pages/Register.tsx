import { useForm } from 'react-hook-form';

type RegisterFormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormDataType>();
  console.log(errors);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label
          htmlFor='firstName'
          className='text-gray-700 text-sm font-bold flex-1'
        >
          First Name
          <input
            type='text'
            id='firstName'
            defaultValue='edmealem'
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('firstName', { required: 'this field is required' })}
          />
          {errors.firstName && (
            <p className='text-red-700 text-sm font-normal '>
              {errors.firstName.message}
            </p>
          )}
        </label>
        <label
          htmlFor='lastName'
          className='text-gray-700 flex-1 text-sm font-bold '
        >
          last Name
          <input
            type='text'
            id='lastName'
            defaultValue='kassahun'
            {...register('lastName', { required: 'this field is required' })}
            className='border rounded w-full py-1 px-2 font-normal'
          />
          {errors.lastName && (
            <p className='text-red-700 text-sm font-normal'>
              {errors.lastName.message}
            </p>
          )}
        </label>
      </div>
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
      <label
        htmlFor='confirmPassword'
        className='text-gray-700 flex-1 text-sm font-bold '
      >
        confirm password
        <input
          type='password'
          id='confirmPassword'
          defaultValue='test1234'
          {...register('confirmPassword', {
            validate: (val) => {
              if (!val) {
                return 'This field is required';
              } else if (watch('password') !== val) {
                return 'Your passwords do not match';
              }
            },
          })}
          className='border rounded w-full py-1 px-2 font-normal'
        />
        {errors.confirmPassword && (
          <p className='text-red-700 text-sm font-normal'>
            {errors.confirmPassword.message}
          </p>
        )}
      </label>
      <span>
        <button
          type='submit'
          className='bg-blue-600 text-white  px-3 py-2 rounded font-bold hover:bg-blue-500 text-xl'
        >
          Create Account
        </button>
      </span>
    </form>
  );
}
