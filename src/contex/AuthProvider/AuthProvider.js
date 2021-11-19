import React, { createContext } from 'react';
import useFirebase from "../../hooks/useFirebase/useFirebase"

export const AuthContext = new createContext();

const AuthProvider = ({children}) => {
  const allAuths = useFirebase();
  return (
    <AuthContext.Provider value={allAuths}>
      {
        children
      }
    </AuthContext.Provider>
  );
};

export default AuthProvider;