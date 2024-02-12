import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { vitePostHog } from "vite-plugin-posthog";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME

  return defineConfig({
    plugins: [
      react(),
      vitePostHog({
        apiKey: process.env.VITE_POSTHOG_KEY,
        hostUrl: "https://eu.posthog.com",
        isCheckingForDevMode: false,
        config: {
          autocapture: false,
          disable_session_recording: true,
          opt_out_capturing_by_default: true,
        },
      }),
    ],
  });
};
