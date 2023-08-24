import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useGlobalContextAuth = () => useContext(AuthContext);

const Auth = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(
    Boolean(localStorage.getItem("access_token"))
    // Boolean(JSON.parse(localStorage.getItem("refresh_token")))
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ setCurrentUser, currentUser, setAuthenticate, authenticate}}>
      {children}
    </AuthContext.Provider>
  );
};
export default Auth;
