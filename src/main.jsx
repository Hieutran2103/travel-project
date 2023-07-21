import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DarkMode from "./context/darkModeContext.jsx";
import Auth from "./context/AuthContext.jsx";
import Search from "./context/Search&Notification.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkMode>
      <Auth>
        <Search>
          <App />
        </Search>
      </Auth>
    </DarkMode>
  </React.StrictMode>
);
