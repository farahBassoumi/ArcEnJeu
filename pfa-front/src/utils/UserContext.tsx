import React, { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  isLoggedIn: boolean;
  contextLogin: (userId: string) => void;
  contextLogout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const contextLogin = (userId: string) => {
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

  const contextLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, contextLogin, contextLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
