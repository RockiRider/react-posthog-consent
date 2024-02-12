import { useConsent } from "react-posthog-consent/core";

const CookieBanner = () => {
  const { handleAcceptConsent, handleRejectConsent } = useConsent();

  return (
    <div
      style={{ backgroundColor: "white", padding: 10 }}
      data-testid="consent_banner"
    >
      <button onClick={handleAcceptConsent} data-testid="consent_accept_btn">
        Accept
      </button>
      <button onClick={handleRejectConsent} data-testid="consent_reject_btn">
        Reject
      </button>
    </div>
  );
};

export default CookieBanner;
