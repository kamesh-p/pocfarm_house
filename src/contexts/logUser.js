import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUserName, setLoggedInUserName] = useState("");

  return (
    <AuthContext.Provider value={{ loggedInUserName, setLoggedInUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
