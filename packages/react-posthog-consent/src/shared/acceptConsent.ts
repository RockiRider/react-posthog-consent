import { ConsentConfig, PostHog } from "./types";
import { getCookiePrefix } from "./utils/getCookiePrefix";
import { configureCookies } from "./configureCookies";

export const acceptConsent = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  posthog?.opt_in_capturing({
    cookie_expiration: config.cookie_expiration,
    capture_event_name: config.opt_in_name,
    capture_properties: config.capture_event_properties,
  });
  const cookies = configureCookies(config);
  cookies.set(`${getCookiePrefix(config.cookiePrefix)}_consent`, {
    status: true,
    timestamp: Date.now(),
  });
  if (config.enable_session_recording) {
    posthog?.startSessionRecording();
  }
};
