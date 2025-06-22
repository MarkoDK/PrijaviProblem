import { useEffect, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  const handleCancelClick = () => {
    setShowInstall(false);
  };

  // Show the install prompt only on mobile or tablet devices
  if (!showInstall || (!isMobile && !isTablet)) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9998,
        }}
        onClick={handleCancelClick}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          textAlign: "center",
          zIndex: 9999,
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          maxHeight: "30vh",
          overflow: "auto",
        }}
      >
        <span>Install Građanski Glas on your device for a better experience.</span>
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={handleInstallClick}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#fff",
              color: "#007bff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "0.5rem",
            }}
          >
            Install
          </button>
          <button
            onClick={handleCancelClick}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ccc",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Otkazi
          </button>
        </div>
      </div>
    </>
  );
};

export default InstallPrompt;
