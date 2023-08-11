import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DarkMode from "./context/darkModeContext.jsx";
import Auth from "./context/AuthContext.jsx";
import Search from "./context/Search&Notification.jsx";

import global_en from "./translations/en/global.json";
import global_vi from "./translations/vi/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    vi: {
      global: global_vi,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkMode>
      <Auth>
        <Search>
          <I18nextProvider i18n={i18next}>
            <QueryClientProvider client={queryClient}>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </I18nextProvider>
        </Search>
      </Auth>
    </DarkMode>
  </React.StrictMode>
);
