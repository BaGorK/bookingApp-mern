import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout>Home page</Layout>} />
        <Route path='/search' element={<Layout>search page</Layout>} />
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
