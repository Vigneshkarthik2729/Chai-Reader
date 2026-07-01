# Architecture Guide: Capacitor-Ready Next.js App

## Overview

This application is architected to be **Capacitor-ready**, meaning it can be packaged as native Android and iOS apps in the future without major architectural changes. The design follows platform-agnostic principles.

## Project Structure

```
app/
├── lib/                      # Core libraries and utilities
│   ├── api.ts               # API abstraction layer
│   ├── platform.ts          # Platform detection utilities
│   ├── storage.ts           # Storage abstraction (web/mobile)
│   └── hooks.ts             # React hooks for mobile features
├── context/
│   └── AppContext.tsx       # Global app state & initialization
├── components/              # Reusable UI components
├── data/                    # Data models and constants
├── author/                  # Feature-based routes
└── layout.tsx              # Root layout

public/
├── images/                 # Static assets
└── index.html             # For SPA mode (if needed)

capacitor.config.json      # Capacitor configuration
.env.example              # Environment variables template
```

## Key Design Decisions

### 1. **Platform Abstraction Layer**

The app detects its runtime environment and adapts accordingly:

- **Web**: Traditional Next.js running in browser
- **Mobile**: Packaged with Capacitor for Android/iOS
- **Electron**: Desktop via Capacitor's electron support

```typescript
// Automatically detects platform
const { platform, isNative } = await getPlatformInfo();
```

### 2. **Storage Abstraction**

Storage operations work on both web and mobile without code changes:

```typescript
// Works on web with localStorage, mobile with Capacitor Storage
const storage = await getStorage();
await storage.setItem("key", "value");
```

### 3. **API Layer**

Centralized API communication with:

- Automatic retry logic with exponential backoff
- Timeout handling
- Network error detection
- Works with both traditional APIs and Capacitor native plugins

```typescript
const data = await apiCall<UserType>("/users/profile");
```

### 4. **Responsive Design**

All components use Tailwind CSS with mobile-first responsive design:

- Mobile breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Touch-friendly components (larger tap targets for mobile)
- No horizontal scroll on mobile (if possible)

### 5. **Environment Configuration**

Configuration is environment-aware:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
```

## Migration Path to Capacitor

### Phase 1: Current Setup (Web)

✅ Current state - works as Next.js web app

### Phase 2: Prepare for Mobile (No Breaking Changes)

1. Already done! Architecture supports:
   - Platform detection
   - Storage abstraction
   - API abstraction
   - Environment configuration

### Phase 3: Add Capacitor (Simple Integration)

```bash
# Initialize Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init

# Build for mobile
npm run build
npx cap sync

# Open native IDE
npx cap open android
npx cap open ios
```

### Phase 4: Add Native Features (As Needed)

```typescript
// Add native features without breaking web
import { Camera } from "@capacitor/camera";

export async function takePhoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });
  return image.webPath;
}
```

## Important Guidelines

### ✅ DO's:

1. **Use abstraction layers** - Never directly use platform APIs
2. **Responsive design** - Always test on mobile viewports
3. **Async operations** - All storage/platform operations are async
4. **Configuration** - Use environment variables, not hardcoded values
5. **Feature detection** - Check platform capabilities before using APIs

### ❌ DON'Ts:

1. **Avoid browser-only APIs** directly - use abstraction
   - ❌ `localStorage` directly → ✅ use `getStorage()`
   - ❌ `window.location` for navigation → ✅ use next/link or custom navigation

2. **No server-side only code in shared components**
   - Use "use client" for client-side components
   - Keep server logic in API routes or server components

3. **No absolute URLs for internal routes**
   - ❌ `href="https://example.com/author/slug"`
   - ✅ `href="/author/slug"`

4. **No performance-critical code in layout/global context**
   - Keep re-renders minimal in AppContext

5. **Avoid large build sizes**
   - Tree-shake unused code
   - Use dynamic imports for heavy libraries

## Adding Capacitor Dependencies

When ready to go mobile, update package.json:

```bash
npm install \
  @capacitor/core \
  @capacitor/cli \
  @capacitor/storage \
  @capacitor/camera \
  @capacitor/device \
  @capacitor/app
```

The abstraction layer will automatically use these when available.

## Environment-Specific Builds

### For Web
```bash
npm run build
npm start
```

### For Mobile (After Capacitor Setup)
```bash
npm run build
npx cap sync
npx cap open android  # or ios
```

## Testing Across Platforms

### Web Testing
```bash
npm run dev
# Visit http://localhost:3000
```

### Mobile Simulation (Browser DevTools)
1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Select device preset
4. Test responsive behavior

### Native Testing
- Android: Use Android Studio emulator
- iOS: Use Xcode simulator

## Performance Considerations

1. **Bundle Size** - Keep under 5MB for mobile
2. **Network** - Assume slower connections, implement offline mode
3. **Storage** - Capacitor Storage has limits (~5MB), plan accordingly
4. **Memory** - Mobile has less RAM, avoid large data structures
5. **CPU** - Avoid heavy computations in UI thread

## Security

1. **API Credentials** - Use `.env.local` (never in `.env.example`)
2. **Storage** - Don't store sensitive data in plain text
3. **HTTPS** - Always use HTTPS in production
4. **CORS** - Configure properly for mobile apps
5. **Content Security Policy** - Set restrictive CSP headers

## Troubleshooting

### App doesn't load after Capacitor packaging
- Check `webDir` in `capacitor.config.json` points to build output
- Verify API endpoints are accessible from mobile
- Check browser console in native app (use Chrome DevTools for Android)

### Storage not persisting
- On iOS, ensure NSUserActivityContinuationEnabled is set
- On Android, check app permissions
- Use `getStorage()` instead of direct localStorage

### Network errors in production
- Check CORS headers on API server
- Verify SSL certificates
- Test with both `http://` and `https://` URLs

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Mobile](https://tailwindcss.com/docs/responsive-design)

## Next Steps

1. **Create .env.local** - Copy from .env.example, add your API URL
2. **Test the app** - Verify all features work on mobile viewport
3. **Set up CI/CD** - Automate builds for web and mobile
4. **Plan native features** - Document which native APIs you'll need
5. **Monitor performance** - Track app metrics on both platforms
