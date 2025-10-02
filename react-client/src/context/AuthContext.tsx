import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isLoggedIn: () => boolean;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isLoggedIn = () => !!accessToken;
  const clearAuth = () => setAccessToken(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, isLoggedIn, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};