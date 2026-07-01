/**
 * Storage abstraction layer for Capacitor compatibility
 * Works with both web localStorage and Capacitor Storage plugin
 */

let storageImpl: IStorage | null = null;

interface IStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * Web implementation using localStorage
 */
class WebStorage implements IStorage {
  async getItem(key: string): Promise<string | null> {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error("[WebStorage] getItem error:", e);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("[WebStorage] setItem error:", e);
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("[WebStorage] removeItem error:", e);
    }
  }

  async clear(): Promise<void> {
    try {
      localStorage.clear();
    } catch (e) {
      console.error("[WebStorage] clear error:", e);
    }
  }
}

/**
 * Capacitor implementation (loads dynamically if available)
 */
class CapacitorStorage implements IStorage {
  private storage: any = null;

  async init() {
    try {
      // @ts-ignore - Capacitor is optional, only available when mobile build is used
      const { Storage } = await import("@capacitor/storage");
      this.storage = Storage;
    } catch (e) {
      console.warn("[CapacitorStorage] Failed to load Capacitor Storage, falling back to localStorage");
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (!this.storage) return null;
    try {
      const { value } = await this.storage.get({ key });
      return value;
    } catch (e) {
      console.error("[CapacitorStorage] getItem error:", e);
      return null;
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    if (!this.storage) return;
    try {
      await this.storage.set({ key, value });
    } catch (e) {
      console.error("[CapacitorStorage] setItem error:", e);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (!this.storage) return;
    try {
      await this.storage.remove({ key });
    } catch (e) {
      console.error("[CapacitorStorage] removeItem error:", e);
    }
  }

  async clear(): Promise<void> {
    if (!this.storage) return;
    try {
      await this.storage.clear();
    } catch (e) {
      console.error("[CapacitorStorage] clear error:", e);
    }
  }
}

/**
 * Initialize the appropriate storage implementation
 */
async function initStorage(): Promise<IStorage> {
  if (storageImpl) {
    return storageImpl;
  }

  // Try Capacitor first (for mobile)
  const capacitorStorage = new CapacitorStorage();
  await capacitorStorage.init();
  if ((capacitorStorage as any).storage) {
    storageImpl = capacitorStorage;
    return storageImpl;
  }

  // Fall back to web storage
  storageImpl = new WebStorage();
  return storageImpl;
}

/**
 * Get the initialized storage instance
 */
async function getStorage(): Promise<IStorage> {
  if (!storageImpl) {
    await initStorage();
  }
  return storageImpl!;
}

export type { IStorage };
export { getStorage, initStorage };
