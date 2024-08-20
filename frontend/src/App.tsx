import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { useAppContext } from './contexts/AppContext';
import AddHotel from './pages/AddHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Home from './pages/Home';

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
