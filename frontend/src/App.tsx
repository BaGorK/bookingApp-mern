import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<span>Home page</span>}>
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
