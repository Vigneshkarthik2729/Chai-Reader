/**
 * React hooks for Capacitor and native features
 */

import { useEffect, useState } from "react";
import { getStorage } from "./storage";
import { isNativeApp, getPlatformInfo } from "./platform";

/**
 * Hook to check if app is running natively
 */
export function useIsNativeApp() {
  const [isNative, setIsNative] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isNativeApp()
      .then(setIsNative)
      .finally(() => setLoading(false));
  }, []);

  return { isNative, loading };
}

/**
 * Hook for platform-specific operations
 */
export function usePlatform() {
  const [platform, setPlatform] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlatformInfo()
      .then((info) => setPlatform(info.platform))
      .finally(() => setLoading(false));
  }, []);

  return { platform, loading };
}

/**
 * Hook for persistent storage (works on web and mobile)
 */
export function useStorage(key: string, initialValue?: string) {
  const [value, setValue] = useState<string | null>(initialValue || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStorage()
      .then((storage) => storage.getItem(key))
      .then(setValue)
      .finally(() => setLoading(false));
  }, [key]);

  const updateValue = async (newValue: string | null) => {
    const storage = await getStorage();

    if (newValue === null) {
      await storage.removeItem(key);
      setValue(null);
    } else {
      await storage.setItem(key, newValue);
      setValue(newValue);
    }
  };

  return { value, setValue: updateValue, loading };
}

/**
 * Hook for safe navigation that works on mobile
 */
export function useSafeNavigation() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    isNativeApp().then(setIsNative);
  }, []);

  const navigate = (path: string) => {
    if (isNative) {
      // For native, use Capacitor Router or window.location
      window.location.hash = path;
    } else {
      // For web, use next/router
      window.location.pathname = path;
    }
  };

  return navigate;
}
