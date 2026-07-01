# Development Guide

## Getting Started

### Prerequisites
- Node.js v18 or higher
- npm v10 or higher

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd chai-reader

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Running Locally

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Common Development Tasks

### View Author Details

The author details page is available at `/author/[slug]` where slug is the author's slug (e.g., `jk-rowling`, `chetan-bhagat`).

```
http://localhost:3000/author/jk-rowling
http://localhost:3000/author/chetan-bhagat
http://localhost:3000/author/arundhati-roy
http://localhost:3000/author/ashwin
```

### Add a New Author

Edit `app/data/authors.ts`:

1. Import author image: `import AuthorName from "@/public/images/AuthorX.png"`
2. Add to `AUTHORS` array with proper structure
3. Include slug for URL routing

### Create New Component

1. Create file in `app/components/NewComponent.tsx`
2. Add "use client" directive if interactive
3. Export as default
4. Use in pages or other components

### Add New Route

1. Create directory: `app/feature-name/`
2. Add `page.tsx` for route handler
3. Create layout file if needed
4. Add navigation link

## API Integration

### Making API Calls

Use the abstraction layer in `app/lib/api.ts`:

```typescript
import { apiCall } from "@/app/lib/api";

// In a component
const data = await apiCall<DataType>("/endpoint");
```

### Features
- Automatic retries (3 attempts by default)
- Timeout handling (30s default)
- Network error detection
- Works on web and mobile

### Configuration

In `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3
```

## State Management

### Global State

Use `AppContext` for platform detection:

```typescript
import { useAppContext } from "@/app/context/AppContext";

const { platformInfo, isInitialized } = useAppContext();
```

### Component State

Use React hooks:

```typescript
import { useState } from "react";

const [state, setState] = useState("initial");
```

### Persistent Storage

Use storage hook (works on web and mobile):

```typescript
import { useStorage } from "@/app/lib/hooks";

const { value, setValue, loading } = useStorage("key", "default");
```

## Styling

### Tailwind CSS

All styling uses Tailwind CSS. Classes are applied directly in components:

```tsx
<div className="p-4 bg-[#FBF8F3] rounded-lg hover:shadow-lg">
  Content
</div>
```

### Responsive Design

Use breakpoints for mobile-first design:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

```tsx
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

### Theme Colors

Primary colors (from design):
- Text: `#2B2118`
- Accent: `#8B6F47`
- Background: `#FBF8F3`
- Light: `#EFE7D4`

## Testing

### Linting

```bash
npm run lint
```

### Build Verification

```bash
npm run build
```

### Manual Testing

1. Test on desktop browser (Chrome, Firefox, Safari)
2. Test mobile viewport (F12 → Toggle device toolbar)
3. Test different screen sizes
4. Test navigation and interactions

## Performance

### Check Bundle Size

```bash
npm run build
ls -lah .next/
```

### Optimize Performance

1. Use dynamic imports for heavy components
2. Lazy load images
3. Remove unused dependencies
4. Enable compression in next.config.ts

### Browser DevTools

- Chrome: F12 → Performance tab
- Firefox: Shift+F2 → :profiler
- Lighthouse: DevTools → Lighthouse tab

## Debugging

### Browser Console

Errors and warnings appear in browser DevTools console.

### React DevTools

Install React DevTools browser extension for component inspection.

### Platform Detection

Check current platform:

```typescript
const { platform, isNative } = await getPlatformInfo();
console.log(`Running on: ${platform}`);
```

### Storage Access

Check stored data:

```javascript
// In browser console
localStorage.getItem('your-key')
localStorage.clear() // Clear all
```

## Code Quality

### Type Safety

```typescript
// Define types
interface User {
  id: string;
  name: string;
}

// Use in functions
function getUser(id: string): User | undefined {
  // ...
}
```

### Best Practices

1. **Use named exports** for components
2. **Avoid `any` type** - use proper types
3. **Error handling** - wrap async operations
4. **Comments** - for complex logic
5. **Constants** - extract magic strings/numbers

## Deployment

### Web Deployment

Options:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect GitHub repository
- **Self-hosted**: `npm run build && npm start`

### Mobile Deployment

Ready for future Capacitor integration:

1. Build web assets: `npm run build`
2. Initialize Capacitor
3. Build for iOS/Android
4. Deploy to App Stores

(See MOBILE_SETUP.md for details)

## Troubleshooting

### Port Already in Use

```bash
# Change port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Import Path Issues

Use absolute imports from root:
```typescript
// Good
import { api } from "@/app/lib/api";

// Avoid
import { api } from "../../../lib/api";
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Getting Help

1. Check existing documentation in `/docs/`
2. Review similar components
3. Check browser console for errors
4. Review `.next/build.log` for build issues

---

**Happy coding!** 🚀
