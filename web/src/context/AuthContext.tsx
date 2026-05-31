import { createContext, useContext, useEffect, useState } from 'react';
import { api, setToken } from '../api/client';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken'));

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);
  };

  useEffect(() => {
    setToken(accessToken);
    if (!accessToken) {
      return;
    }
    api.get('/api/users/me').then((res) => setUser(res.data.user)).catch(() => logout());
  }, [accessToken]);

  const login = async (email: string, password: string) => {
    const res = await api.post('/api/auth/login', { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
  };

  const register = async (fullName: string, email: string, password: string) => {
    await api.post('/api/auth/register', { fullName, email, password });
    await login(email, password);
  };

  return <AuthContext.Provider value={{ user, accessToken, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
