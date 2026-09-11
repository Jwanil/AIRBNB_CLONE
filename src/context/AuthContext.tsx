'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, authApi } from '@/lib/api';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const refreshUser = useCallback(async () => {
    try {
      const res = await authApi.me();
      if (res.success && res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const openAuthModal = useCallback((mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await authApi.login({ email, password });
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        setIsAuthModalOpen(false);
        toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);
        return { success: true };
      } else {
        const errorMsg = res.error?.message || 'Invalid email or password';
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await authApi.register({ name, email, password });
      if (res.success && res.data?.user) {
        setUser(res.data.user);
        setIsAuthModalOpen(false);
        toast.success(`Welcome to Airbnb, ${res.data.user.name.split(' ')[0]}!`);
        return { success: true };
      } else {
        const errorMsg = res.error?.message || 'Registration failed';
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err: any) {
      const msg = err.message || 'Registration failed';
      toast.error(msg);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      toast.success('Logged out successfully');
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
