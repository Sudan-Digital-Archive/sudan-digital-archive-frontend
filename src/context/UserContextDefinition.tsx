import { createContext } from 'react';

export interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
