import { test, expect } from "@playwright/test";

const POSTHOG_URL = "https://eu.posthog.com";
const DECIDE_ENDPOINT = "/decide/";
const EVENT_ENDPOINT = "/e/";

test.skip("posthog initialization", async ({ page }) => {
  let isPostHogInit = false;

  await page.route(`**/*`, async (route, request) => {
    // Continue the request and get the response
    route.continue();

    if (
      route.request().method() === "POST" &&
      route.request().url().includes(`${POSTHOG_URL}${DECIDE_ENDPOINT}`)
    ) {
      isPostHogInit = true;
    }
  });
  await page.goto("/");

  const reg = new RegExp(`${POSTHOG_URL}${DECIDE_ENDPOINT}*`);
  const res = await page.waitForResponse(reg);
  const data = await res.json();

  expect(data.featureFlags).toEqual({ "welcome-msg": true });
  expect(data.analytics).toEqual({
    endpoint: "/i/v0/e/",
  });
  expect(isPostHogInit).toBe(true);
});

test.skip("posthog identify", async ({ page }) => {
  let isPostHogEventCalled = false;

  await page.route(`**/*`, async (route, request) => {
    // Continue the request and get the response
    route.continue();

    if (
      route.request().method() === "POST" &&
      route.request().url().includes(`${POSTHOG_URL}${EVENT_ENDPOINT}`)
    ) {
      isPostHogEventCalled = true;
    }
  });

  // Perform the actions that should trigger the posthog.capture call
  await page.goto("/");

  const reg2 = new RegExp(`${POSTHOG_URL}${EVENT_ENDPOINT}*`);

  const res = await page.waitForResponse(reg2);
  const data = await res.json();

  // Assert that posthog.capture was called
  expect(data.status).toBe(1);
  expect(isPostHogEventCalled).toBe(true);
});
