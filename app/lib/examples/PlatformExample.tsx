/**
 * Example: Using platform detection in components
 */

"use client";

import { useAppContext } from "@/app/context/AppContext";
import { usePlatform, useIsNativeApp } from "@/app/lib/hooks";

export function PlatformInfoExample() {
  const { platformInfo, isInitialized } = useAppContext();
  const { platform, loading: platformLoading } = usePlatform();
  const { isNative, loading: nativeLoading } = useIsNativeApp();

  if (!isInitialized || platformLoading || nativeLoading) {
    return <div>Loading platform info...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="font-bold">Platform Information</h3>
      <p>Platform: {platform}</p>
      <p>Is Native App: {isNative ? "Yes" : "No"}</p>
      <p>Is Capacitor Available: {platformInfo?.isCapacitor ? "Yes" : "No"}</p>
      <p>Is Web: {platformInfo?.isWeb ? "Yes" : "No"}</p>

      {/* Platform-specific UI */}
      {isNative && (
        <div className="mt-4 p-2 bg-blue-100 rounded">
          <p>✅ Running as native app</p>
          <p>You can use native features here</p>
        </div>
      )}

      {!isNative && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <p>✅ Running as web app</p>
          <p>Full web browser capabilities</p>
        </div>
      )}
    </div>
  );
}
