import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import { useAppContext } from './contexts/AppContext';
import {
  AddHotel,
  Booking,
  Detail,
  EditHotel,
  Home,
  MyBookings,
  MyHotels,
  Register,
  Search,
  SignIn,
} from './pages';

export default function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/search' element={<Search />} />
          <Route path='/detail/:hotelId' element={<Detail />} />
          {isLoggedIn && (
            <>
              <Route path='/hotel/:hotelId/booking' element={<Booking />} />
              <Route path='/add-hotel' element={<AddHotel />} />{' '}
              <Route path='/my-hotels' element={<MyHotels />} />
              <Route path='/edit-hotels/:hotelId' element={<EditHotel />} />
              <Route path='/my-bookings' element={<MyBookings />} />
            </>
          )}
        </Route>
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
