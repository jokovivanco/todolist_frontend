import { UserContext } from '@/context/userContext';
import { useContext } from 'react';

const useAuth = () => {
  const auth = useContext(UserContext);

  return auth;
};
export default useAuth;
