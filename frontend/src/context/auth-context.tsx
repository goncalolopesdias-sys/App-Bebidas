import { login as apiLogin, register as apiRegister } from '@/api';
import React, { createContext, useCallback, useState } from 'react';

export interface User {
  id: string;
  nome: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  registar: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, senha: string) => {
    setIsLoading(true);
    try {
      const data = await apiLogin(email, senha);
      setUser(data.usuario);
      setToken(data.token);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registar = useCallback(async (nome: string, email: string, senha: string) => {
    setIsLoading(true);
    try {
      const data = await apiRegister(nome, email, senha);
      setUser(data.usuario);
      setToken(data.token);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, registar, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}