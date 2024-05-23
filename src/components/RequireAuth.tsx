import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ReactNode } from 'react';
import { UserType } from '@/types';
import Loading from './Loading';
// import useAuth from '@/hooks/useAuth';

interface RequireAuthProps {
  element: string | ReactNode;
  user: UserType | Record<string, never>;
}

const RequireAuth = ({ user, element }: RequireAuthProps) => {
  if (!user?.username) {
    return <Loading />;
  }

  return (
    <>
      <Navbar element={element} />
      <Outlet />
    </>
  );
};
export default RequireAuth;
