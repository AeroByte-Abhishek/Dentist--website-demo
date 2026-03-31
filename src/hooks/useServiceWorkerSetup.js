import { useEffect } from 'react';

export const useServiceWorkerSetup = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js')
      .catch(() => {
        // REMOVE AFTER BACKEND INTEGRATION: add robust telemetry/reporting.
      });
  }, []);
};
