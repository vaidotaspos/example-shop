import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NewItemPage from './pages/NewItemPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import HomePage from './pages/HomePage';
import Header from './components/layuot/Header';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className=' '>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </div>
  );
}
