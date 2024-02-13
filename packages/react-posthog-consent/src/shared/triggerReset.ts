import { ConsentConfig, PostHog } from "./types";
import { checkHasConsent } from "./checkHasConsent";

export const triggerReset = (
  posthog: PostHog | null,
  config: ConsentConfig
) => {
  posthog?.reset();
  if (checkHasConsent(config)) {
    posthog?.opt_in_capturing({
      cookie_expiration: config.cookie_expiration, //TODO: Fix this to days remaining
      capture_event_name: config.opt_in_name,
      capture_properties: config.capture_event_properties,
    });
  }
};
