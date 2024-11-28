import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log(
          choiceResult.outcome === "accepted"
            ? "User accepted the install"
            : "User dismissed the install"
        );
        setDeferredPrompt(null);
        setIsInstallable(false);
      });
    }
  };

  return (
    isInstallable && (
      <div className="install-prompt">
        <button onClick={handleInstallClick}>Install App</button>
      </div>
    )
  );
};

export default InstallPrompt;
