/**
 * Example: Using API abstraction
 */

"use client";

import { useState } from "react";
import { apiCall, ApiError, ApiErrorType } from "@/app/lib/api";

interface ExampleData {
  id: string;
  title: string;
  description: string;
}

export function ApiExample() {
  const [data, setData] = useState<ExampleData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // This will automatically retry on failure, handle timeouts, etc.
      const result = await apiCall<ExampleData>("/example-endpoint", {
        timeout: 15000, // Optional override timeout
      });
      setData(result);
    } catch (err) {
      if (err instanceof ApiError) {
        let errorMessage = `Error: ${err.message}`;
        switch (err.type) {
          case ApiErrorType.NETWORK:
            errorMessage = "Network error - check your connection";
            break;
          case ApiErrorType.TIMEOUT:
            errorMessage = "Request timeout - server took too long";
            break;
          case ApiErrorType.SERVER:
            errorMessage = `Server error (${err.statusCode})`;
            break;
          case ApiErrorType.CLIENT:
            errorMessage = `Invalid request (${err.statusCode})`;
            break;
        }
        setError(errorMessage);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold mb-4">API Example</h3>

      <button
        onClick={fetchData}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      {data && (
        <div className="mt-4 p-2 bg-green-100 rounded">
          <p className="font-bold">{data.title}</p>
          <p>{data.description}</p>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600">
        💡 Automatically retries on failure, handles timeouts, and works on both
        web and mobile
      </p>
    </div>
  );
}
