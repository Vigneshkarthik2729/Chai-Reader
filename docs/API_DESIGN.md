# API Design Patterns

This document outlines how to design and implement APIs in a way that works seamlessly across web and mobile platforms.

## Overview

The Chai Reader uses an abstraction-based approach to API communication. This ensures the same code works on web browsers and native mobile apps (via Capacitor).

## API Layer (`app/lib/api.ts`)

### Core Features

1. **Automatic Retries** - Retries failed requests with exponential backoff
2. **Timeout Handling** - Configurable request timeouts
3. **Error Classification** - Different error types for different scenarios
4. **Platform-Agnostic** - Works on web and mobile

### Making API Calls

```typescript
import { apiCall } from "@/app/lib/api";

// Simple GET request
const users = await apiCall<User[]>("/users");

// GET with query parameters
const user = await apiCall<User>("/users/123");

// POST request
const newUser = await apiCall<User>("/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "John" }),
});

// With custom timeout
const data = await apiCall<Data>("/slow-endpoint", {
  timeout: 60000, // 60 seconds
});
```

## Error Handling

### Error Types

```typescript
import { ApiError, ApiErrorType } from "@/app/lib/api";

try {
  const data = await apiCall("/endpoint");
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.type) {
      case ApiErrorType.NETWORK:
        console.error("No internet connection");
        break;
      case ApiErrorType.TIMEOUT:
        console.error("Request timed out");
        break;
      case ApiErrorType.SERVER:
        console.error(`Server error: ${error.statusCode}`);
        break;
      case ApiErrorType.CLIENT:
        console.error(`Invalid request: ${error.statusCode}`);
        break;
      case ApiErrorType.UNKNOWN:
        console.error("Unknown error");
        break;
    }
  }
}
```

## Configuration

### Environment Variables

```env
# API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Request timeout in milliseconds
NEXT_PUBLIC_API_TIMEOUT=30000

# Number of retry attempts
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3

# Delay between retries in milliseconds
NEXT_PUBLIC_API_RETRY_DELAY=1000
```

### Getting Current Config

```typescript
import { getApiConfig } from "@/app/lib/api";

const config = getApiConfig();
console.log(config.baseUrl);
console.log(config.timeout);
```

## Retry Logic

### How Retries Work

1. First request fails
2. Wait for `retryDelay` milliseconds
3. Retry with exponential backoff (delay × 2^attempt)
4. Up to `retryAttempts` total attempts
5. If all fail, throw error

### Example Timeline
```
Attempt 1: 0ms         → FAIL
Attempt 2: 1000ms     → FAIL (wait 1s)
Attempt 3: 3000ms     → FAIL (wait 2s)
Attempt 4: 7000ms     → SUCCESS or FAIL
```

## Best Practices

### 1. Use Proper Types

```typescript
// Define your data type
interface Book {
  id: string;
  title: string;
  author: string;
}

// Use it in API calls
const book = await apiCall<Book>("/books/1");
```

### 2. Handle All Error Cases

```typescript
try {
  const data = await apiCall("/endpoint");
} catch (error) {
  if (error instanceof ApiError) {
    // Handle specific error
    showUserFriendlyMessage(error);
  } else {
    // Handle unexpected error
    logError(error);
  }
}
```

### 3. Use Loading States

```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchData = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await apiCall("/data");
    // Process data
  } catch (err) {
    setError(err instanceof ApiError ? err.message : "Unknown error");
  } finally {
    setLoading(false);
  }
};
```

### 4. Implement Caching (Optional)

```typescript
const cache = new Map<string, any>();

async function cachedApiCall<T>(endpoint: string): Promise<T> {
  if (cache.has(endpoint)) {
    return cache.get(endpoint);
  }
  const data = await apiCall<T>(endpoint);
  cache.set(endpoint, data);
  return data;
}
```

### 5. Implement Offline Support (Future)

```typescript
import { isOnline } from "@/app/lib/platform";

async function offlineAwareCall<T>(
  endpoint: string,
  options: RequestInit
): Promise<T> {
  const online = await isOnline();
  
  if (!online) {
    // Try to get from cache
    const cached = localStorage.getItem(`cache:${endpoint}`);
    if (cached) {
      return JSON.parse(cached);
    }
    throw new Error("No internet and no cached data");
  }

  const data = await apiCall<T>(endpoint, options);
  // Cache the result
  localStorage.setItem(`cache:${endpoint}`, JSON.stringify(data));
  return data;
}
```

## API Response Format

### Recommended Format

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format"
  }
}
```

## Headers & Authentication

### Setting Custom Headers

```typescript
const data = await apiCall("/protected", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "X-Custom-Header": "value"
  }
});
```

### Token Management

```typescript
// Store token
const storage = await getStorage();
await storage.setItem("auth_token", token);

// Retrieve token
const token = await storage.getItem("auth_token");

// Use in requests
const data = await apiCall("/protected", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
});
```

## Testing API Integration

### Mock API for Development

```typescript
// In development, you might want to mock responses
const mockApiCall = async <T,>(endpoint: string): Promise<T> => {
  // Return mock data
  return mockData as T;
};

// Use in tests
const data = await mockApiCall<User>("/users/1");
```

### Testing Error Scenarios

```typescript
// Simulate timeout
const testTimeout = () => {
  try {
    await apiCall("/endpoint", { timeout: 1 });
  } catch (error) {
    console.assert(error.type === ApiErrorType.TIMEOUT);
  }
};

// Simulate network error
const testNetworkError = () => {
  // Use offline mode or mock fetch
};
```

## Platform-Specific Considerations

### Web (Next.js)
- Uses standard `fetch` API
- Full browser security features
- CORS enabled for cross-origin requests

### Mobile (Capacitor)
- Uses native HTTP plugin
- Better error handling for network issues
- No CORS restrictions (native code)
- Better offline support

### Same Code Works Everywhere

```typescript
// This code works identically on web and mobile
const data = await apiCall<Book>("/books/1");

// Platform automatically adapts:
// - Web: uses browser fetch()
// - Mobile: uses native HTTP plugin
// - Error handling works the same
```

## Rate Limiting & Throttling

### Simple Request Throttling

```typescript
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second

async function throttledApiCall<T>(
  endpoint: string
): Promise<T> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve =>
      setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest)
    );
  }

  lastRequestTime = Date.now();
  return apiCall<T>(endpoint);
}
```

## Examples

### Fetching Author Data

```typescript
import { apiCall } from "@/app/lib/api";

interface Author {
  id: string;
  name: string;
  bio: string;
}

// Fetch single author
const author = await apiCall<Author>("/authors/jk-rowling");

// Fetch multiple authors
const authors = await apiCall<Author[]>("/authors");
```

### Creating/Updating Data

```typescript
// Create new book
const newBook = await apiCall<Book>("/books", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "New Book",
    author: "Author Name"
  })
});

// Update existing book
const updated = await apiCall<Book>("/books/123", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Updated Title"
  })
});
```

## Monitoring & Logging

### API Call Monitoring

```typescript
const apiCallWithLogging = async <T,>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const start = Date.now();
  
  try {
    const data = await apiCall<T>(endpoint, options);
    const duration = Date.now() - start;
    console.log(`✅ ${endpoint} - ${duration}ms`);
    return data;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`❌ ${endpoint} - ${duration}ms - ${error}`);
    throw error;
  }
};
```

---

**Remember**: Keep API logic in the abstraction layer, not scattered across components. This makes mobile migration seamless!
