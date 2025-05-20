'use client';

import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const SessionContext = createContext(null);

// Export the hook
export const useSession = () => useContext(SessionContext);

// Provider component
export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // null = not fetched, false = not logged in

  useEffect(() => {
    // On mount, check localStorage or make API call to validate session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(false); // not logged in
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(false);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
