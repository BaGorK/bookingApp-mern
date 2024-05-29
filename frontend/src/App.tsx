import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout>Home page</Layout>} />
        <Route path='/search' element={<Layout>search page</Layout>} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
