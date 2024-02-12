import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/index.css";
import { ConsentProvider } from "react-posthog-consent/core";
import CookieBanner from "./CookieBanner.tsx";
import { PostHogProvider } from "posthog-js/react";
import { PostHogConfig } from "posthog-js";

const COOKIE_PREFIX = "example_core";

const OPTIONS: Partial<PostHogConfig> = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
  autocapture: false,
  disable_session_recording: true,
  opt_out_capturing_by_default: true,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostHogProvider apiKey={process.env.VITE_POSTHOG_KEY} options={OPTIONS}>
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
    </PostHogProvider>
  </React.StrictMode>
);
