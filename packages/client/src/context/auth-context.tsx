import { Box, Code, Spinner } from '@chakra-ui/react';
import { getToken } from 'api/auth';
import { useAsync } from 'hooks/useAsync';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { client } from 'utils/client';
import * as auth from '../api/auth';

interface IAuthContext {
  user?: User | null;
  isAuthenticated: boolean;
  logOut: () => Promise<void>;
  logIn: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
}

interface User {
  _id: string;
  username: string;
  token: string;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  logOut: () => Promise.resolve(),
  logIn: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

const AuthProvider: React.FC = (props) => {
  const { data: user, isLoading, run, setData, isIdle, isError, error } = useAsync();

  useEffect(() => {
    const handleUnauthenticated = client.instance.interceptors.response.use(
      function (res) {
        return res;
      },
      function (err) {
        if (err.response.status === 401) {
          setData(null);
        }
        return Promise.reject(err);
      },
    );

    if (!user) {
      run(getToken());
    }

    return () => {
      client.instance.interceptors.response.eject(handleUnauthenticated);
    };
  }, []);

  const logOut = useCallback(async () => {
    try {
      await auth.logOut(user.token);
      setData(null);
    } catch (err) {
      //
    }
  }, [user]);

  const logIn = useCallback(
    async (username: string, password: string) => {
      const res = await auth.login(username, password);
      setData({
        username,
        token: res.token,
        _id: res._id,
      });
    },
    [user],
  );

  const register = useCallback(
    async (username: string, password: string) => {
      const res = await auth.register(username, password);

      setData({
        username,
        token: res.token,
        _id: res._id,
      });
    },
    [user],
  );

  if (isLoading || isIdle) {
    return (
      <Box d='flex' h='100vh' w='full' alignItems='center' justifyContent='center'>
        <Spinner />
      </Box>
    );
  }

  if (isError && error?.response.status !== 401) {
    return (
      <Box d='flex' h='100vh' w='full' alignItems='center' justifyContent='center' flexDir='column'>
        <Box mb='5'>Oh crap, We have a problem.</Box>
        <Code>{JSON.stringify(error, null, 2)}</Code>
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user: user, isAuthenticated: !!user, logOut, logIn, register }}
      {...props}
    />
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export function useClient() {
  const { user } = useAuth();
  return useCallback(
    function clientCallback<T>(endpoint: string, config?: any) {
      return client<T>(endpoint, { ...config, token: user?.token });
    },
    [user],
  );
}

export default AuthProvider;
