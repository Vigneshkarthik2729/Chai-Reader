# Mobile Development Setup Guide

## Quick Start: Running on Mobile

### Prerequisites
- Node.js 18+ and npm
- For Android: Android Studio + SDK
- For iOS: Xcode (macOS only)
- Capacitor CLI: `npm install -g @capacitor/cli`

## Current Status

✅ Web app is architecture-ready for Capacitor  
⏳ Capacitor integration available when needed

## When Ready to Build for Mobile

### Step 1: Add Capacitor

```bash
npm install @capacitor/core @capacitor/cli @capacitor/storage @capacitor/device @capacitor/app
```

### Step 2: Initialize Capacitor Project

```bash
npx cap init
# Follow prompts:
# - App name: Chai Reader
# - App package ID: com.chaiReader.app
# - Web assets folder: out
```

### Step 3: Build Web Assets

```bash
npm run build
```

### Step 4: Sync with Capacitor

```bash
npx cap sync
```

### Step 5: Open in Native IDE

#### Android (Windows/Mac/Linux)
```bash
npx cap open android
# Opens Android Studio with the project
# Build and run from Android Studio
```

#### iOS (Mac only)
```bash
npx cap open ios
# Opens Xcode with the project
# Build and run from Xcode
```

## Testing Before Mobile Build

### Mobile Viewport Testing
```bash
npm run dev
# Press Ctrl+Shift+M in Chrome DevTools
# Select iPhone/Android device
```

### Testing Platform Detection
Edit `app/page.tsx` temporarily:

```typescript
"use client";
import { usePlatform } from "@/app/lib/hooks";

export default function Home() {
  const { platform } = usePlatform();
  return <div>Platform: {platform}</div>;
}
```

## Storage Testing (Web)

The storage abstraction works on web via localStorage:

```typescript
// In your component
"use client";
import { useStorage } from "@/app/lib/hooks";

export function TestStorage() {
  const { value, setValue } = useStorage("test-key", "initial");

  return (
    <div>
      <p>Stored value: {value}</p>
      <button onClick={() => setValue("new-value")}>
        Update Storage
      </button>
    </div>
  );
}
```

## Environment Variables

### Development (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.chaiReader.com
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=false
```

### Build-time (not secret)
Use `NEXT_PUBLIC_*` prefix for variables that need to be available in browser

```bash
npm run dev  # Uses .env.local
npm run build  # Uses .env.production
```

## Debugging Mobile Apps

### Android (Chrome DevTools)
1. Connect Android device with USB
2. Enable USB Debugging on device
3. Run: `chrome://inspect`
4. Select your app and click "inspect"

### iOS (Safari)
1. Connect iPhone to Mac
2. Open Safari → Develop → [Device] → select your app
3. Safari DevTools will open

## Common Issues

### "webDir not found"
- Ensure `npm run build` succeeds first
- Check `capacitor.config.json` has correct `webDir: "out"`

### API calls fail on mobile
- Check CORS headers on your API
- Verify API URL is accessible from mobile network
- Use `NEXT_PUBLIC_API_URL` environment variable

### Storage not working
- On web: Check browser DevTools → Application → Local Storage
- On mobile: Capacitor Storage automatically handles platform differences

### Build too large
- Run: `npm run build && du -sh out/`
- Check for large dependencies in node_modules
- Use code splitting for routes

## Development Workflow

### Web Development
```bash
npm run dev
# http://localhost:3000
# Change code → Auto-reload
```

### Mobile Development
```bash
npm run build
npx cap sync
npx cap open android  # or ios
# Make code changes
npm run build && npx cap sync
# Reload app in IDE
```

## Production Deployment

### Web
```bash
npm run build
npm start
# or deploy `out/` folder to static host (Vercel, Netlify, etc.)
```

### Android
1. Generate keystore and signing key
2. Build in Android Studio → Build → Generate Signed Bundle/APK
3. Upload to Google Play Store

### iOS
1. Create Apple Developer account
2. Configure signing in Xcode
3. Archive in Xcode → Distribute App
4. Upload to App Store

## Performance Guidelines

| Metric | Target | How |
|--------|--------|-----|
| Bundle Size | < 5MB | Tree-shake, code split |
| FCP | < 2s | Optimize images, lazy load |
| TTI | < 3s | Minimize JS, defer parsing |
| Offline | Work | Implement service worker |

## Monitoring

### Error Tracking
Add Sentry or similar:
```bash
npm install @sentry/nextjs
```

### Analytics
```bash
npm install posthog-js
```

## Resources

- [Capacitor Android Docs](https://capacitorjs.com/docs/android)
- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)
- [Next.js Build Output](https://nextjs.org/docs/advanced-features/output-file-tracing)
- [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Ready to go mobile?** Follow the "Step 1-5" guide above when you're ready to build for Android/iOS!
