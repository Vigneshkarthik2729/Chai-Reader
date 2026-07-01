/**
 * Platform detection utilities for Capacitor support
 */

export interface PlatformInfo {
  isNative: boolean;
  isWeb: boolean;
  platform: "android" | "ios" | "web" | "electron" | "unknown";
  isCapacitor: boolean;
}

let platformInfo: PlatformInfo | null = null;

/**
 * Detect the current platform
 */
export async function detectPlatform(): Promise<PlatformInfo> {
  if (platformInfo) {
    return platformInfo;
  }

  try {
    // Dynamically import Capacitor (optional dependency)
    // This allows the app to work without Capacitor installed
    // @ts-ignore - Capacitor is optional, only available when mobile build is used
    const { Capacitor } = await import("@capacitor/core");
    
    if (Capacitor && typeof Capacitor.getPlatform === "function") {
      const platform = Capacitor.getPlatform();
      const isNative = platform !== "web";

      platformInfo = {
        isCapacitor: true,
        isNative,
        isWeb: platform === "web",
        platform: (platform as any) || "unknown",
      };
    } else {
      throw new Error("Capacitor not available");
    }
  } catch (e) {
    // Capacitor not available, running as web app
    platformInfo = {
      isCapacitor: false,
      isNative: false,
      isWeb: true,
      platform: "web",
    };
  }

  return platformInfo;
}

/**
 * Get platform info (cached)
 */
export async function getPlatformInfo(): Promise<PlatformInfo> {
  if (!platformInfo) {
    await detectPlatform();
  }
  return platformInfo!;
}

/**
 * Check if running as native app
 */
export async function isNativeApp(): Promise<boolean> {
  const info = await getPlatformInfo();
  return info.isNative;
}

/**
 * Check if running on Android
 */
export async function isAndroid(): Promise<boolean> {
  const info = await getPlatformInfo();
  return info.platform === "android";
}

/**
 * Check if running on iOS
 */
export async function isIOS(): Promise<boolean> {
  const info = await getPlatformInfo();
  return info.platform === "ios";
}

/**
 * Check if Capacitor is available
 */
export async function hasCapacitor(): Promise<boolean> {
  const info = await getPlatformInfo();
  return info.isCapacitor;
}
