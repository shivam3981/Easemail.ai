'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Add token expiration check
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser && !isTokenExpired(token)) {
      setUser(JSON.parse(storedUser));
    } else if (token && isTokenExpired(token)) {
      // Token expired, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login?error=session_expired');
    }
    setLoading(false);
  }, [router]);

  const login = async (token, userData) => {
    if (isTokenExpired(token)) {
      throw new Error('Invalid token');
    }
    localStorage.setItem('token', token);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
      router.push('/login');
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
      logout();
      return false;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        // Update token if a new one is provided
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        return true;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      logout();
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 