"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { detectPlatform, PlatformInfo } from "@/app/lib/platform";

interface AppContextValue {
  platformInfo: PlatformInfo | null;
  isInitialized: boolean;
}

const AppContext = createContext<AppContextValue>({
  platformInfo: null,
  isInitialized: false,
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize platform detection on app start
    detectPlatform().then((info) => {
      setPlatformInfo(info);
      setIsInitialized(true);

      // Log platform info in development
      if (process.env.NODE_ENV === "development") {
        console.log("[App] Platform detected:", info);
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ platformInfo, isInitialized }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
