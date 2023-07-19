import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import "./style.scss";
import { useGlobalContextDarkMode } from "./context/darkModeContext";
import { useGlobalContextAuth } from "./context/AuthContext";
function App() {
  const { currentUser } = useGlobalContextAuth();
  const { darkMode } = useGlobalContextDarkMode();

  const ProtectedRouter = ({ children }) => {
    if (!currentUser) {
      return <Navigator to="/login" />;
    }
    return children;
  };

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
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
