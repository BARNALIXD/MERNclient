import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {

  const [signInFormData, setSignInFormData] = useState
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}