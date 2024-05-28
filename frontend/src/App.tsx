import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          Home page
        </Route>
        <Route path='/search' element={<span>search page</span>}>
          Home page
        </Route>
        <Route path='/*' element={<Navigate to='/' />}>
          Home page
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
