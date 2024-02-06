import {Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import HomePage from './pages/HomePage';
import Header from './components/layuot/Header';
import {Toaster} from 'react-hot-toast';
import AdminPrivateRoute from "./PrivateRoute/AdminPrivateRoute.jsx";
import CategoryListPage from "./pages/Category/CategoryListPage.jsx";
import CategoryCreatePage from "./pages/Category/CategoryCreatePage.jsx";

export default function App() {
    return (
        <div className=' '>
            <Toaster/>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/shop' element={<ShopPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>

                <Route path='/categories' element={
                    <AdminPrivateRoute>
                        <CategoryListPage/>
                    </AdminPrivateRoute>
                }/>

                <Route path='/categories/create' element={
                    <AdminPrivateRoute>
                        <CategoryCreatePage/>
                    </AdminPrivateRoute>
                }/>
            </Routes>
        </div>
    );
}
