import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/index.css";
import { ConsentProvider } from "react-posthog-consent/vite";
import CookieBanner from "./CookieBanner.tsx";

const COOKIE_PREFIX = "example_vite";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConsentProvider
      cookieBanner={<CookieBanner />}
      config={{
        cookiePrefix: COOKIE_PREFIX,
        opt_in_name: "Opt In",
        cookie_expiration: 30,
        secure_cookie: true,
      }}
    >
      <App />
    </ConsentProvider>
  </React.StrictMode>
);
