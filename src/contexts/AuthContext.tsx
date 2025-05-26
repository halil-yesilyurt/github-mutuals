import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, getAdditionalUserInfo } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth, githubProvider } from '../firebase';
import type { AuthUser } from '../types';

interface AuthContextType {
  currentUser: AuthUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function login() {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const additionalInfo = getAdditionalUserInfo(result);
      
      // Get the GitHub access token
      const token = (result as any).user?.accessToken || 
                   (additionalInfo as any)?.credential?.accessToken;
      
      if (token) {
        setAccessToken(token);
        localStorage.setItem('github_access_token', token);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      setAccessToken(null);
      localStorage.removeItem('github_access_token');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  function convertFirebaseUser(user: User): AuthUser {
    return {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      accessToken: accessToken || undefined
    };
  }

  useEffect(() => {
    // Check for stored access token
    const storedToken = localStorage.getItem('github_access_token');
    if (storedToken) {
      setAccessToken(storedToken);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(convertFirebaseUser(user));
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [accessToken]);

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    loading,
    accessToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 