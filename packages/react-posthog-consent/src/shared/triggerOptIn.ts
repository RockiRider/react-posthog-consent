import { ConsentConfig, PostHog } from "./types";

export const triggerOptIn = (
  posthog: PostHog | null,
  config: ConsentConfig,
  expirationDate?: Date
) => {
  if (expirationDate) {
    const daysLeft = Math.ceil(
      (expirationDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    posthog?.opt_in_capturing({
      cookie_expiration: daysLeft,
      capture_event_name: `Automatic ${config.opt_in_name}`,
      capture_properties: config.capture_event_properties,
    });
    if (config.enable_session_recording) {
      posthog?.startSessionRecording();
    }
  }
};
