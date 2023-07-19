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
        "https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.15752-9/333777571_873881007235574_6229213634839464353_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=-vCR427BOdkAX-p-jA9&_nc_ht=scontent.fsgn2-8.fna&oh=03_AdSp0tPk6yip7E_PS95KmB1gWy1cawYuipIVldtj6EE9vA&oe=64DD9BF7",
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
