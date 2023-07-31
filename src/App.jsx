import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import "./style.scss";
import { useGlobalContextDarkMode } from "./context/darkModeContext";
import { useGlobalContextAuth } from "./context/AuthContext";
import Vacation from "./pages/vacation/Vacation";
import Setting from "./pages/setting/Setting";
import SettingPass from "./pages/setting/settingPass";
function App() {
  const { currentUser } = useGlobalContextAuth();
  const { darkMode } = useGlobalContextDarkMode();

  const ProtectedRouter = ({ children }) => {
    if (!currentUser) {
      return <Navigator to="/login" />;
    }
    return children;
  };

  const LayoutHome = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 7 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 10 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRouter>
          <LayoutHome />
        </ProtectedRouter>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRouter>
          <Layout />
        </ProtectedRouter>
      ),
      children: [
        {
          path: "/vacation/:id",
          element: <Vacation />,
        },

        {
          path: "/setting/account",
          element: <Setting />,
        },
        {
          path: "/setting/password",
          element: <SettingPass />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
