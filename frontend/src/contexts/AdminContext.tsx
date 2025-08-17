import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '@/services/api';

interface AdminContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  logout: () => {},
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initial auth check
  useEffect(() => {
    try {
      const token = localStorage.getItem("admin_token");
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error reading token:", err);
    } finally {
      setLoading(false); // Always clear loading
    }
  }, []);

  // ✅ Fixed login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiClient.loginAdmin({ email, password });

      if (data && data.token) {
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    } finally {
      setLoading(false); // ✅ Reset loading after login attempt
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setLoading(false); // ✅ Reset loading after logout
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
