import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useGlobalContextAuth = () => useContext(AuthContext);

const Auth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const logout = () => {
    setCurrentUser(false);
  };

  //Nhét vào button của Login
  const login = () => {
    setCurrentUser({
      id: 1,
      name: "Dương Văn Cải",
      profilePic:
        "https://images.unsplash.com/photo-1640951613773-54706e06851d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
      email: "hieudzai@gmail.com",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default Auth;
