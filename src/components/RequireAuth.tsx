import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ReactNode } from 'react';
// import useAuth from '@/hooks/useAuth';

interface RequireAuthProps {
  element: string | ReactNode;
}

const RequireAuth = ({ element }: RequireAuthProps) => {
  return (
    <>
      <Navbar element={element} />
      <Outlet />
    </>
  );
};
export default RequireAuth;
