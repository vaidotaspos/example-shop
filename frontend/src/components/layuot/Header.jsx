import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/AuthCtxProvider';

export default function Header() {
  const { isUserLoggedIn, logout, isUserAdmin } = useAuthContext();

  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className='bg-slate-300'>
      <header className='container flex justify-between items-center'>
        <Link className='text-2xl font-semibold py-4' to='/'>
          LogoShop
        </Link>
        <nav>
          <NavLink className={'px-4 py-2 hover:bg-slate-500 hover:text-white '} to={'/'}>
            Home
          </NavLink>
          <NavLink className={'px-4 py-2 hover:bg-slate-500 hover:text-white '} to={'/shop'}>
            Shop
          </NavLink>
          {!isUserLoggedIn && (
            <>
              <NavLink className={'px-4 py-2 hover:bg-slate-500 hover:text-white '} to={'/login'}>
                Login
              </NavLink>
              <NavLink
                className={'px-4 py-2 hover:bg-slate-500 hover:text-white '}
                to={'/register'}>
                Register
              </NavLink>
            </>
          )}
          {isUserLoggedIn && (
              <>
                {isUserAdmin && (
                    <>
                      <NavLink className={'px-4 py-2 hover:bg-slate-500 hover:text-white'} to={'/items'}>
                        Items
                      </NavLink>
                      <NavLink className={'px-4 py-2 hover:bg-slate-500 hover:text-white'} to={'/categories'}>
                        Categories
                      </NavLink>
                    </>

                )}
                <NavLink className={'px-4 py-2 hover:bg-slate-500 hover:text-white'} to={'/orders'}>Orders</NavLink>
                <button
                    onClick={handleLogout}
                    className={'px-4 py-2 hover:bg-slate-500 hover:text-white '}>
                  Logout
                </button>
              </>
          )}
        </nav>
      </header>
    </div>
  );
}
