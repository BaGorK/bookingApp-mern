import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>MernHolidays.com</Link>
        </span>
        <span className='flex space-x-2'>
          <Link
            to='/sign-in'
            className='flex items-center text-blue-600 font-bold px-3 transition duration-300 hover:bg-gray-300 hover:text-blue-700 bg-gray-100'
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}
