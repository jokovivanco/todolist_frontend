import { authAxios } from '@/apis/axios';
import { UserContext } from '@/context/userContext';
import { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';

const useAuthAxios = () => {
  const { refresh, user, setUser } = useContext(UserContext);

  useEffect(() => {
    const requestInterceptor = authAxios.interceptors.request.use(
      (config) => {
        if (!config.headers['authorization']) {
          config.headers['authorization'] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = authAxios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error?.config) {
          const prevRequest = error.config;
          if (error?.response?.status === 401) {
            const userWithAccessToken = await refresh();

            if (userWithAccessToken) {
              setUser(userWithAccessToken);

              prevRequest.headers['authorization'] =
                `Bearer ${userWithAccessToken.accessToken}`;
              return authAxios(prevRequest);
            }
          }
          return Promise.reject(error);
        }
      },
    );

    return () => {
      authAxios.interceptors.request.eject(requestInterceptor);
      authAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh, user, setUser]);

  return authAxios;
};
export default useAuthAxios;
