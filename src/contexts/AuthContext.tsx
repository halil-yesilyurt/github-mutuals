import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, githubProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, GithubAuthProvider } from 'firebase/auth';
import type { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  githubAccessToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [githubAccessToken, setGithubAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    return unsubscribe;
  }, []);

  // Load access token from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem('githubAccessToken');
    if (token) {
      setGithubAccessToken(token);
    }
  }, []);

  const login = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || null;
    setGithubAccessToken(accessToken);
    if (accessToken) {
      localStorage.setItem('githubAccessToken', accessToken);
    }
  };

  const logout = async () => {
    setGithubAccessToken(null);
    localStorage.removeItem('githubAccessToken');
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, githubAccessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};