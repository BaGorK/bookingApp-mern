import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout>Home page</Layout>} />
        <Route path='/search' element={<Layout>search page</Layout>} />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
