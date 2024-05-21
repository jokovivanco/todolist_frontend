import { useToast } from '@/components/ui/use-toast';
import { LoginType, RegisterType, UserType } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { createContext, useState, ReactNode } from 'react';
import axios from '../apis/axios';
import { jwtDecode } from 'jwt-decode';

function toUserResponse(response: AxiosResponse): UserType {
  return response.data.data as UserType;
}

export type AuthContextType = {
  user: UserType | Record<string, never>;
  setUser: React.Dispatch<
    React.SetStateAction<UserType | Record<string, never>>
  >;
  login: ({ username, password }: LoginType) => Promise<UserType | undefined>;
  register: ({
    username,
    name,
    password,
  }: RegisterType) => Promise<UserType | undefined>;
  refresh: () => Promise<UserType | undefined>;
};

export const UserContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [user, setUser] = useState<UserType | Record<string, never>>({});

  const login = async ({ username, password }: LoginType) => {
    try {
      const response = await axios(`/api/users/login`, {
        method: 'POST',
        data: { username, password },
        withCredentials: true,
      });

      const user = toUserResponse(response);
      user.accessToken = response.headers['authorization'].split(' ')[1];
      setUser(user);

      toast({
        title: 'Login success',
      });

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data?.errors,
          variant: 'destructive',
        });
      }
    }
  };

  const register = async ({ username, name, password }: RegisterType) => {
    try {
      const response = await axios(`/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        data: { username, name, password },
      });

      toast({
        title: 'Your account created successfully',
      });

      return toUserResponse(response);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data?.errors,
          variant: 'destructive',
        });
      }
    }
  };

  const refresh = async () => {
    try {
      const response = await axios('/api/users/refresh', {
        method: 'GET',
        withCredentials: true,
      });

      const newAccessToken = response.headers['authorization'].split(' ')[1];
      const decoded = jwtDecode(newAccessToken) as UserType;

      return {
        username: decoded.username,
        name: decoded.name,
        accessToken: newAccessToken,
      };
    } catch (error) {
      console.log(error);
      // if (error instanceof AxiosError) {
      //   toast({
      //     title: error.response?.data?.errors,
      //     variant: 'destructive',
      //   });
      // }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        register,
        refresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
