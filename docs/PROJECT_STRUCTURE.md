# Project Structure Guide

## Overview
This is the Chai Reader - a Capacitor-ready Next.js application for book discovery and author information.

## Folder Structure

```
chai-reader/
├── app/                                # Next.js app directory
│   ├── lib/                           # Utility libraries and helpers
│   │   ├── types/                     # TypeScript type definitions
│   │   ├── utils/                     # Utility functions
│   │   ├── api.ts                     # API communication abstraction
│   │   ├── platform.ts                # Platform detection (web/mobile)
│   │   ├── storage.ts                 # Storage abstraction
│   │   ├── hooks.ts                   # React hooks for features
│   │   └── examples/                  # Example implementations
│   ├── context/                       # React Context providers
│   │   └── AppContext.tsx             # Global app state
│   ├── components/                    # Reusable UI components
│   │   ├── AppShell.tsx              # Main app layout
│   │   ├── Header.tsx                # Top navigation
│   │   ├── Sidebar.tsx               # Side navigation
│   │   ├── Footer.tsx                # Footer
│   │   ├── MainContent.tsx           # Home page content
│   │   ├── Famousauthors.tsx         # Authors section
│   │   └── [other components]/       # Other feature components
│   ├── data/                          # Static data and models
│   │   └── authors.ts                # Author data
│   ├── author/                        # Feature-based routes
│   │   └── [slug]/                   # Dynamic author details page
│   │       └── page.tsx
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
│
├── public/                            # Static assets
│   ├── images/                        # Image assets
│   └── favicon.ico
│
├── docs/                              # Documentation
│   ├── ARCHITECTURE.md               # Architecture overview
│   ├── MOBILE_SETUP.md               # Mobile development guide
│   ├── CAPACITOR_MIGRATION.md        # Migration checklist
│   └── PROJECT_STRUCTURE.md          # This file
│
├── Config files (root level)
│   ├── next.config.ts                # Next.js configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── postcss.config.mjs            # PostCSS configuration
│   ├── eslint.config.mjs             # ESLint configuration
│   ├── capacitor.config.json         # Capacitor configuration
│   ├── .env.example                  # Environment variables template
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Dependencies and scripts
│   └── package-lock.json             # Locked dependency versions
│
└── Hidden/Auto files
    ├── .next/                        # Next.js build output
    ├── node_modules/                 # npm packages
    ├── .git/                         # Git history
    └── .capacitorignore              # Capacitor ignore rules
```

## File Organization Principles

### 1. **Feature-Based Structure**
- Routes are organized by feature (`/author`, `/book`, etc.)
- Each feature has its own directory with related components
- Shared utilities go in `lib/`

### 2. **Separation of Concerns**
- **lib/**: Reusable utilities, hooks, and helpers
- **context/**: Global state management
- **components/**: UI components (reusable across pages)
- **data/**: Static data, types, and models
- **routes/**: Page-specific layouts and logic

### 3. **Mobile-First Architecture**
- Platform-agnostic code in `lib/`
- Abstraction layers for storage, API, and platform detection
- No direct browser API access (use abstractions)

## Key Directories Explained

### `/app/lib/`
Contains all utility functions and hooks:
- `api.ts` - HTTP requests with retry logic
- `platform.ts` - Platform detection (web/mobile)
- `storage.ts` - Storage abstraction
- `hooks.ts` - React hooks for UI

### `/app/components/`
Reusable UI components:
- Layout components: AppShell, Header, Sidebar, Footer
- Feature components: Famousauthors, Academics, etc.
- All components are "use client" marked

### `/app/data/`
Static data and models:
- `authors.ts` - Author data with type definitions
- Future: books.ts, reviews.ts, etc.

### `/docs/`
Project documentation:
- Architecture decisions
- Setup and deployment guides
- Mobile development instructions

## Adding New Features

### To add a new page:
```
app/
  ├── features/          # New
  │   └── book-details/
  │       ├── page.tsx          # Route
  │       └── components/        # Feature-specific components
  └── components/
```

### To add a new utility:
```
app/lib/
  ├── utils/             # Utility functions
  │   └── book-utils.ts  # New
  └── hooks.ts           # Or React hooks
```

### To add new types:
```
app/lib/types/
  └── book.ts            # New type definition
```

## Naming Conventions

- **Components**: PascalCase (e.g., `Famousauthors.tsx`)
- **Utils/Hooks**: camelCase (e.g., `api.ts`, `hooks.ts`)
- **Routes**: kebab-case (e.g., `/author/[slug]`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `NAV_ITEMS`)

## Dependencies Organization

```
package.json
├── dependencies           # Runtime dependencies
│   ├── next              # Framework
│   ├── react             # UI library
│   ├── lucide-react      # Icons
│   └── @capacitor/*      # Mobile support (optional)
└── devDependencies       # Dev tools
    ├── typescript        # Type checking
    ├── tailwindcss       # Styling
    ├── eslint            # Linting
    └── @types/*          # TypeScript definitions
```

## Build Output

After `npm run build`:
```
.next/
├── server/               # Server-side code
├── static/               # Static assets
└── out/                  # Static export (for mobile)
```

For Capacitor mobile builds, output goes to `out/` folder.

## Environment Variables

- `.env.example` - Template (commit to git)
- `.env.local` - Local development (git ignored)
- `.env.production` - Production settings (deploy with app)

## Performance Considerations

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (automatic with Next.js)
- Component lazy loading for below-fold content

### Image Optimization
- All images in `/public/images/`
- Use Next.js `Image` component
- Optimize for mobile (responsive sizes)

### Bundle Size
- Target: < 5MB (for Capacitor mobile)
- Tree-shaking: Remove unused code
- Minification: Automatic in production

## Development Workflow

```bash
# Install dependencies
npm install

# Development
npm run dev              # Start dev server

# Building
npm run build            # Production build
npm run lint             # Lint code

# Mobile (future)
npx cap sync            # Sync web assets
npx cap open android    # Open Android IDE
npx cap open ios        # Open iOS IDE
```

## Common Tasks

### Add a new author data
Edit `app/data/authors.ts` - no migration needed

### Create new API endpoint
- Abstract in `app/lib/api.ts`
- Use `apiCall()` function
- Works on web and mobile

### Add platform-specific UI
```typescript
const { isNative } = usePlatform();
return isNative ? <MobileUI /> : <WebUI />;
```

### Store user preferences
```typescript
const { value, setValue } = useStorage("key", "default");
```

## Git Workflow

```
.gitignore includes:
- node_modules/        # Dependencies
- .next/               # Build output
- .env.local           # Local config
- android/, ios/       # Native builds (when added)
```

## Next Steps

1. ✅ Web app complete and functional
2. ⏳ When ready for mobile:
   - `npm install @capacitor/core`
   - `npx cap init`
   - `npx cap add android ios`
3. 📦 Deploy to App Stores

---

**Version**: 1.0  
**Last Updated**: 2026-07-02  
**Framework**: Next.js 16.2.9, React 19.2.4, TypeScript 5
