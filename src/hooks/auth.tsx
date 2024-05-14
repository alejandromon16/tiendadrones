'use client'
import { useState, useEffect } from "react";

// Define interfaces for the hook's return values
interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
}

interface AuthActions {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: UserRole | null) => void;
}

type UserRole = 'provider' | 'admin';

// Combined interface for ease of use in components
interface UseAuth extends AuthState, AuthActions {}

// Custom hook to manage user authentication and role
export function useAuth(): UseAuth {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole | null>(null);

  // Load the authentication status and role from localStorage when the component mounts
  useEffect(() => {
    const savedAuth = window.sessionStorage.getItem("isAuthenticated");
    const savedRole = window.sessionStorage.getItem("role");
    setIsAuthenticated(savedAuth === 'true');
    setRole(savedRole as UserRole | null);
  }, []);

  // Save the authentication status and role to localStorage whenever they change
  useEffect(() => {
    window.sessionStorage.setItem("isAuthenticated", isAuthenticated.toString());
    if (role) {
      window.sessionStorage.setItem("role", role);
      window.sessionStorage.setItem("isAuthenticated", "true")
    }
  }, [isAuthenticated, role]);

  return { isAuthenticated, setIsAuthenticated, role, setRole };
}
