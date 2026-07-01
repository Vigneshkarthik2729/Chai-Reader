/**
 * API configuration and initialization
 * Supports both web and Capacitor environments
 */

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

let apiConfig: ApiConfig | null = null;

/**
 * Initialize API configuration based on environment
 */
export function initApiConfig(): ApiConfig {
  if (apiConfig) {
    return apiConfig;
  }

  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  // Use environment variables with fallbacks
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (isDevelopment ? "http://localhost:3000/api" : "https://api.example.com");

  apiConfig = {
    baseUrl,
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
    retryAttempts: parseInt(process.env.NEXT_PUBLIC_API_RETRY_ATTEMPTS || "3"),
    retryDelay: parseInt(process.env.NEXT_PUBLIC_API_RETRY_DELAY || "1000"),
  };

  return apiConfig;
}

/**
 * Get API configuration
 */
export function getApiConfig(): ApiConfig {
  if (!apiConfig) {
    initApiConfig();
  }
  return apiConfig!;
}

/**
 * API error types
 */
export enum ApiErrorType {
  NETWORK = "NETWORK",
  TIMEOUT = "TIMEOUT",
  SERVER = "SERVER",
  CLIENT = "CLIENT",
  UNKNOWN = "UNKNOWN",
}

/**
 * Custom API error class
 */
export class ApiError extends Error {
  constructor(
    public type: ApiErrorType,
    public statusCode?: number,
    message?: string
  ) {
    super(message || `API Error: ${type}`);
    this.name = "ApiError";
  }
}

/**
 * Retry logic with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  attempts: number,
  delay: number
): Promise<T> {
  let lastError: Error | null = null;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}

/**
 * Make API requests with error handling and retry logic
 */
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<T> {
  const config = getApiConfig();
  const url = `${config.baseUrl}${endpoint}`;
  const timeout = options.timeout || config.timeout;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await retryWithBackoff(
      async () => {
        const res = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!res.ok) {
          const error = new ApiError(
            res.status >= 500 ? ApiErrorType.SERVER : ApiErrorType.CLIENT,
            res.status,
            `HTTP ${res.status}: ${res.statusText}`
          );
          throw error;
        }

        return res;
      },
      config.retryAttempts,
      config.retryDelay
    );

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if ((error as any).name === "AbortError") {
      throw new ApiError(ApiErrorType.TIMEOUT, undefined, "Request timeout");
    }

    if (error instanceof TypeError) {
      throw new ApiError(
        ApiErrorType.NETWORK,
        undefined,
        "Network error: " + (error as Error).message
      );
    }

    throw new ApiError(ApiErrorType.UNKNOWN, undefined, String(error));
  } finally {
    clearTimeout(timeoutId);
  }
}
