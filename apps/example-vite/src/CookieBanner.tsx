import { useConsent } from "react-posthog-consent/vite";

const CookieBanner = () => {
  const { handleAcceptConsent, handleRejectConsent } = useConsent();

  return (
    <div style={{ backgroundColor: "white", padding: 10 }}>
      <button onClick={handleAcceptConsent}>Accept</button>
      <button onClick={handleRejectConsent}>Reject</button>
    </div>
  );
};

export default CookieBanner;
