# Capacitor Migration Checklist

This document provides a step-by-step guide to migrate the Chai Reader app to Capacitor for native Android and iOS builds.

## Phase 1: Pre-Migration (Current State ✅)

- [x] Architecture is platform-agnostic
- [x] Storage abstraction layer implemented
- [x] Platform detection system in place
- [x] API abstraction layer implemented
- [x] Environment configuration ready
- [x] Responsive design finalized
- [x] capacitor.config.json created
- [x] Documentation prepared

## Phase 2: Development Preparation

### 2.1 Environment Setup

- [ ] Install Android Studio (for Android development)
- [ ] Install Xcode (for iOS development - macOS only)
- [ ] Install Capacitor CLI: `npm install -g @capacitor/cli`
- [ ] Update Node.js to v18+

### 2.2 Project Updates

```bash
# Install Capacitor dependencies
npm install @capacitor/core @capacitor/cli

# Install optional plugins as needed
npm install @capacitor/storage
npm install @capacitor/camera
npm install @capacitor/device
npm install @capacitor/app
```

**Checklist:**
- [ ] Capacitor packages installed
- [ ] package.json updated
- [ ] node_modules regenerated

### 2.3 Build Configuration

- [ ] Run `npm run build` successfully
- [ ] Verify output in `out/` directory
- [ ] Test web build locally with `npm start`

**Verification:**
```bash
npm run build
ls -lah out/  # Should contain HTML, CSS, JS files
```

## Phase 3: Capacitor Initialization

### 3.1 Initialize Capacitor Project

```bash
# Initialize Capacitor (usually done once)
npx cap init

# When prompted:
# - App name: Chai Reader
# - App package ID: com.chaiReader.app
# - Web assets folder: out
```

**Checklist:**
- [ ] Capacitor initialized
- [ ] `capacitor.config.json` configured
- [ ] `package.json` updated with capacitor scripts

### 3.2 Add Platforms

```bash
# Add Android
npx cap add android

# Add iOS (macOS only)
npx cap add ios
```

**Checklist:**
- [ ] Android platform added
- [ ] iOS platform added (if on macOS)
- [ ] `android/` directory created
- [ ] `ios/` directory created

## Phase 4: Development Setup

### 4.1 Android Setup

```bash
# Sync web assets to Android
npx cap sync android

# Open in Android Studio
npx cap open android
```

In Android Studio:
- [ ] Select target device or emulator
- [ ] Click "Run" (green play button)
- [ ] App launches on device/emulator

### 4.2 iOS Setup (macOS only)

```bash
# Sync web assets to iOS
npx cap sync ios

# Open in Xcode
npx cap open ios
```

In Xcode:
- [ ] Select target device or simulator
- [ ] Click "Play" button to build & run
- [ ] App launches in simulator

### 4.3 Code Signing (for App Store)

**Android:**
- [ ] Create keystore: `keytool -genkey -v -keystore ...`
- [ ] Configure signing in `build.gradle`
- [ ] Set release build type

**iOS:**
- [ ] Create App ID in Apple Developer
- [ ] Create provisioning profile
- [ ] Configure signing in Xcode
- [ ] Set team ID and bundle ID

**Checklist:**
- [ ] Signing certificate acquired
- [ ] Configured in respective platform settings
- [ ] Test signed build locally

## Phase 5: Feature Implementation

### 5.1 Test Core Features

- [ ] App loads correctly
- [ ] Navigation works
- [ ] Author details page loads
- [ ] Books display properly
- [ ] Storage persists data

### 5.2 Add Native Features (Optional)

#### Camera Integration
```typescript
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export async function takeAuthorPhoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
  });
  return image.webPath;
}
```

- [ ] Camera feature tested
- [ ] Permissions configured in native settings

#### Device Information
```typescript
import { Device } from "@capacitor/device";

export async function getDeviceInfo() {
  const info = await Device.getInfo();
  console.log(`Device: ${info.manufacturer} ${info.model}`);
  return info;
}
```

- [ ] Device info accessible
- [ ] Platform-specific logic works

#### App Lifecycle
```typescript
import { App } from "@capacitor/app";

App.addListener("backButton", () => {
  // Handle back button on Android
});

App.addListener("pause", () => {
  // App is paused
});

App.addListener("resume", () => {
  // App resumed
});
```

- [ ] Lifecycle events handled
- [ ] Back button works on Android

### 5.3 Testing on Real Devices

- [ ] Test on physical Android device via USB
- [ ] Test on physical iOS device via Lightning cable
- [ ] Test camera permissions
- [ ] Test storage permissions
- [ ] Test network connectivity

**Test Checklist:**
- [ ] App launches successfully
- [ ] All features functional
- [ ] No crashes or errors
- [ ] Performance acceptable
- [ ] Battery usage reasonable

## Phase 6: Optimization

### 6.1 Performance

```bash
# Analyze bundle size
npm run build
webpack-bundle-analyzer out/

# Profile performance
# Use Chrome DevTools on Android via chrome://inspect
# Use Safari DevTools on iOS
```

- [ ] Bundle size < 5MB
- [ ] First contentful paint < 2s
- [ ] Time to interactive < 3s
- [ ] No memory leaks detected

### 6.2 Security

- [ ] API endpoints use HTTPS
- [ ] Sensitive data not hardcoded
- [ ] Permissions minimized
- [ ] User data encrypted at rest
- [ ] Secure storage for sensitive data

### 6.3 Accessibility

- [ ] Touch targets >= 48x48 dp (Android) / 44x44 pt (iOS)
- [ ] Color contrast ratio >= 4.5:1
- [ ] Screen reader support tested
- [ ] Keyboard navigation works

## Phase 7: App Store Preparation

### Android

```bash
# Generate signed APK/AAB
# In Android Studio: Build → Build Bundle(s) / Build APK

# For Google Play Store, generate AAB (Android App Bundle)
```

**Checklist:**
- [ ] App icon created (512x512)
- [ ] Screenshots prepared (5+ images)
- [ ] Description written
- [ ] Privacy policy created
- [ ] Signed AAB generated
- [ ] Tested on multiple devices

### iOS

```bash
# Generate signed app
# In Xcode: Product → Archive

# Upload to App Store
# Use Xcode → Organizer or Transporter
```

**Checklist:**
- [ ] App icon created (1024x1024)
- [ ] Screenshots prepared (2-5 per device)
- [ ] Description written
- [ ] Privacy policy created
- [ ] Build signed and archived
- [ ] TestFlight beta tested

## Phase 8: Release

### 8.1 Android Release

```bash
# In Google Play Console:
# 1. Create new app
# 2. Upload AAB
# 3. Set release notes
# 4. Review content rating
# 5. Submit for review
```

- [ ] Submitted to Google Play Store
- [ ] Approved (typically 2-4 hours)
- [ ] Released to all users or staged rollout

### 8.2 iOS Release

```bash
# In App Store Connect:
# 1. Create new app version
# 2. Upload build from Transporter
# 3. Set release notes
# 4. Set pricing and availability
# 5. Submit for review
```

- [ ] Submitted to App Store
- [ ] Approved (typically 24-48 hours)
- [ ] Released to all users

### 8.3 Post-Release

- [ ] Monitor crash reports
- [ ] Respond to user reviews
- [ ] Fix critical bugs
- [ ] Plan next version

## Phase 9: Continuous Updates

### Update Process

```bash
# After code changes:
npm run build
npx cap sync  # or specific: npx cap sync android ios

# For Android
npx cap open android
# Build & test in Android Studio

# For iOS (macOS only)
npx cap open ios
# Build & test in Xcode
```

**Each Release:**
- [ ] Code reviewed
- [ ] Features tested on devices
- [ ] Performance verified
- [ ] Screenshots updated
- [ ] Release notes written
- [ ] Version number bumped
- [ ] Built and signed
- [ ] Submitted to stores

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| webDir not found | Ensure `npm run build` succeeds and check `capacitor.config.json` |
| Build fails | Delete `android/` or `ios/` and run `npx cap add` again |
| App crashes on startup | Check console with Chrome DevTools (Android) or Xcode (iOS) |
| API calls fail | Verify CORS headers and that API is accessible from mobile network |
| Storage doesn't work | Check that `@capacitor/storage` is installed and imported |
| Permissions denied | Verify permissions in `AndroidManifest.xml` and `Info.plist` |

### Debug Tools

```bash
# Android debugging
chrome://inspect

# iOS debugging
# Safari → Develop → [Device] → select your app

# View native logs
npx cap run android  # Shows logcat
npx cap run ios      # Shows Xcode logs
```

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Android Plugins](https://capacitorjs.com/docs/plugins/ecosystem)
- [Capacitor iOS Plugins](https://capacitorjs.com/docs/plugins/ecosystem)
- [Android Development](https://developer.android.com)
- [iOS Development](https://developer.apple.com)
- [Google Play Store Guidelines](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)

## Support & Maintenance

### Version Management

Keep these updated:
- Node.js: Latest LTS
- npm: `npm install -g npm@latest`
- Capacitor: `npm update @capacitor/*`
- Android SDK: Latest stable
- Xcode: Latest stable

### Backup

Before major updates:
```bash
git commit -am "Pre-update backup"
git tag v1.0.0-pre-update
```

## Timeline Estimate

| Phase | Estimated Time |
|-------|-----------------|
| Phase 1-2 | 1-2 days |
| Phase 3-4 | 1-2 days |
| Phase 5 | 3-5 days |
| Phase 6-7 | 3-5 days |
| Phase 8 | 1 day |
| Phase 9 (ongoing) | Varies |
| **Total First Release** | **2-3 weeks** |

---

**Status:** Ready for Capacitor integration whenever needed! Follow this checklist phase by phase when you're ready to launch on mobile platforms.
