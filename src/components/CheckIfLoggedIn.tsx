import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const CheckIfLoggedIn = () => {
  const { user } = useAuth();

  return user?.username ? <Navigate to="/" /> : <Outlet />;
};
export default CheckIfLoggedIn;
