import { useEffect, useState } from 'react';

const getUser = () => {
  const user = localStorage.getItem('session');

  if (user) {
    return JSON.parse(atob(user));
  }

  return null;
};

const useLocalStorage = () => {
  const [user, setUser] = useState<User | null>(getUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('session', btoa(JSON.stringify(user)));
    }
  }, [user]);

  const logoutUser = () => {
    localStorage.removeItem('session');
    setUser(null);
  };

  return {
    user,
    setUser,
    logoutUser,
  };
};

export default useLocalStorage;