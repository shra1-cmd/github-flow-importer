import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';

interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const response = await ApiService.login(email, password);
      
      if (response.access_token && response.user_id) {
        // Create user object from backend response
        const user = {
          id: response.user_id,
          email: email, // We know the email from the form
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access_token', response.access_token);
        return {};
      } else {
        return { error: 'Invalid response from server' };
      }
    } catch (error: any) {
      return { error: error.message || 'Login failed' };
    }
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  };

  const value = {
    user,
    signIn,
    signOut,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};