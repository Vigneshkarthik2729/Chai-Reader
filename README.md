# Chai Reader 

A modern, Capacitor-ready Next.js application for book discovery, author profiles, and literary exploration. Built with responsive design and structured for future mobile app packaging.

**[Complete Documentation](./docs/README.md)** | [Architecture](./docs/ARCHITECTURE.md) | [Mobile Setup](./docs/MOBILE_SETUP.md)

---

##  Setup Instructions

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v10 or higher
- **Git**: For version control
- **Operating System**: Windows, macOS, or Linux

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd chai-reader

# 2. Install dependencies
npm install

# 3. Create environment configuration
cp .env.example .env.local

# 4. Start development server
npm run dev

# 5. Open in browser
# Navigate to http://localhost:3000
```

### Verify Installation

```bash
# Should compile successfully
npm run build

# Should run linter without errors
npm run lint
```

---

## How to Run the Project

### Development Mode

```bash
npm run dev
```

- Starts dev server on `http://localhost:3000`
- Hot-reload enabled - changes auto-update in browser
- Full TypeScript checking
- Source maps for debugging

### Production Build

```bash
npm run build     # Create optimized build
npm start         # Serve production build locally
```

### Linting & Type Checking

```bash
npm run lint      # Check code quality and TypeScript types
```

### Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |

### File Structure for Development

```
chai-reader/
├── app/
│   ├── components/          # UI components (Famousauthors, Sidebar, etc.)
│   ├── lib/                 # Utilities (api, storage, platform detection)
│   ├── data/                # Static data (authors, books)
│   ├── context/             # Global state management
│   └── author/[slug]/       # Dynamic author detail pages
├── public/                  # Static images and assets
├── docs/                    # Complete documentation
└── Configuration files      # next.config.ts, package.json, etc.
```

---

## Assumptions Made

### 1. **Author Data is Static**
- Assumed author and book data comes from local `data/authors.ts` file
- Not initially pulled from external API (infrastructure prepared for future)
- Data structure: 4 authors × 5 books each

### 2. **Web-First Development**
- Primary target is web browsers
- Mobile via Capacitor is optional future phase
- Desktop/responsive web is the MVP

### 3. **Responsive Design Prior
- Mobile-first CSS approach with Tailwind breakpoints
- Assumption: users access from various devices (desktop, tablet, mobile)
- No assumptions about specific screen sizes

### 4. **User Authentication Not Required**
- Assumption: public book discovery app
- No login/signup flow in current version
- Wishlist stored locally in browser (future: server-side)

### 5. **Client-Side Routing Only**
- Using Next.js App Router (no separate backend routing service)
- Dynamic routes via `[slug]` pattern
- No server-side session management needed initially

### 6. **Single Deployment Target**
- Assumed Vercel as primary deployment (1-click setup)
- Node.js v18+ available in deployment environment
- Environment variables injected at build/runtime

### 7. **Graceful Degradation**
- Capacitor imports are optional (no native features required for web)
- Storage falls back to localStorage if Capacitor unavailable
- API calls have automatic retry logic

### 8. **TypeScript Strict Mode**
- Assumed all code must pass TypeScript strict type checking
- No `any` types allowed
- Improves maintainability and catches bugs early

---

## Libraries Used

### Core Framework
- **Next.js 16.2.9** - React framework with App Router, server/client components
- **React 19.2.4** - UI library with hooks
- **TypeScript 5** - Type safety for JavaScript

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
  - Responsive breakpoints: `sm:`, `lg:`, `xl:`
  - Dark mode support (prepared)
  - Custom colors & spacing
- **Lucide React** - Icon library (Heart, ChevronLeft, etc.)
- **next/image** - Optimized image component

### Routing & Navigation
- **next/navigation** - Client-side routing (useRouter, useParams)
- **next/link** - Optimized link component

### State Management
- **React Context API** - Global app state (platform info)
- **React Hooks** - Local component state (useState, useEffect, useCallback)

### Data & Storage
- **localStorage (Web)** - Browser persistent storage
- **@capacitor/storage** - Mobile storage (optional)

### Development Tools
- **ESLint** - Code quality checking
- **TypeScript** - Static type checking
- **Turbopack** - Fast bundler (built into Next.js 16)
- **PostCSS** - CSS processing

### Optional/Future
- **@capacitor/core** - Native mobile features (not included by default)
- **@capacitor/cli** - Capacitor command line (for mobile builds)

### No Heavy Dependencies!
- Project intentionally keeps dependencies minimal
- No Redux, no additional HTTP clients, no complex state management
- API abstraction layer built from scratch (retry logic, error handling)

---

## Trade-offs

### 1. **Static Data vs. Real API**
**Choice**: Static author data in `data/authors.ts`

**Trade-off**:
- Pro: No backend required, fast development, works offline
- Con: Data updates require code changes and rebuild
- Future: API abstraction layer ready for backend integration

### 2. **Client-Side Storage vs. Backend**
**Choice**: Browser localStorage for wishlist

**Trade-off**:
- Pro: No server needed, works offline, faster
- Con: Data not synced across devices, lost if browser cache cleared
- Future: Easy to migrate to server-side with API layer

### 3. **No Authentication**
**Choice**: Public app without login

**Trade-off**:
- Pro: Simpler architecture, faster to build, accessible to all
- Con: Can't track user preferences across devices
- Future: Auth abstraction ready to add

### 4. **Minimal Dependencies**
**Choice**: Built custom API/storage abstractions instead of third-party libraries

**Trade-off**:
- Pro: Smaller bundle, fewer vulnerabilities, full control
- Con: Need to maintain custom code
- Pro: Easier to understand for new developers

### 5. **Capacitor Readiness vs. Complexity**
**Choice**: Platform abstraction layers added even for web-only MVP

**Trade-off**:
- Pro: Easy mobile expansion later, no architecture rework
- Con: Extra files/code for features not currently used
- Pro: Developers learn mobile-ready patterns from day 1

### 6. **Responsive CSS vs. Mobile App**
**Choice**: Responsive web only initially

**Trade-off**:
- Pro: Faster to launch, works everywhere
- Con: Not installable like app, no push notifications
- Future: Capacitor wrapper for app store distribution

### 7. **TypeScript Strict Mode**
**Choice**: All code passes strict TypeScript checking

**Trade-off**:
- Pro: Fewer runtime errors, better IDE support, self-documenting code
- Con: Slower initial development, more verbose types
- Pro: Pays off quickly with reduced debugging

---

## Improvements with More Time

### Short Term (1-2 weeks)
1. **Search & Filtering**
   - Add book search by title/author name
   - Filter by category (Fiction, Non-fiction, etc.)
   - Sort by rating, newest, popularity

2. **User Accounts** (if decided)
   - Authentication with email/social
   - Sync wishlist across devices
   - Reading history & recommendations

3. **Enhanced UI/UX**
   - Add book rating system
   - User reviews section
   - Share books on social media
   - Add to cart functionality

4. **Performance Optimization**
   - Image lazy loading & optimization
   - Bundle analysis & tree-shaking
   - Caching strategies
   - CDN optimization

### Medium Term (3-4 weeks)
5. **Real Backend Integration**
   - Connect to real book API
   - Dynamic book data from database
   - Admin dashboard for content management

6. **Mobile App (Capacitor)**
   - Build for Android & iOS
   - Native push notifications
   - Offline support
   - App store deployment

7. **Advanced Features**
   - Recommendation engine
   - Book club functionality
   - Author interviews/events
   - Reading challenges

8. **Analytics & Monitoring**
   - User behavior tracking
   - Error monitoring (Sentry)
   - Performance monitoring
   - A/B testing framework

### Long Term (2+ months)
9. **Backend Services**
   - Microservices architecture
   - Real-time notifications
   - Payment processing (book purchases)
   - Social features (comments, ratings)

10. **Advanced Mobile**
    - Offline reading (download books)
    - QR code scanning (ISBN lookup)
    - AR features (book previews)
    - Voice search

11. **Infrastructure**
    - CI/CD pipeline improvements
    - Automated testing (Jest, Playwright)
    - Load testing & scaling
    - Multi-region deployment

12. **Accessibility**
    - WCAG 2.1 AA compliance
    - Screen reader optimization
    - Keyboard navigation
    - Dark mode polish

### Code Quality Improvements
```typescript
// Testing
- Unit tests with Jest
- Integration tests with Playwright
- Component snapshot tests
- API mocking with MSW

// Documentation
- Storybook for component library
- API documentation auto-generated
- Architecture decision records (ADRs)
- Video tutorials

// Monitoring
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)
- User analytics (Segment/Mixpanel)
- Log aggregation (ELK stack)
```

### Developer Experience
- Pre-commit hooks (Husky + lint-staged)
- Better error messages
- Development tools dashboard
- Automated dependency updates
- Better debugging tools

---

## Current Status

**Complete**
- Author discovery & navigation
- Responsive author detail pages
- Dynamic routing with [slug]
- Capacitor-ready architecture
- Platform abstraction layers
- Comprehensive documentation

**In Progress**
- Browser testing & validation
- Performance optimization

**Not Started**
- Backend integration
- Mobile app packaging
- User authentication
- Advanced search

---

## Resources

- **Framework**: [Next.js Docs](https://nextjs.org/docs)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Mobile**: [Capacitor Docs](https://capacitorjs.com/docs)
- **Local Docs**: See [`/docs`](./docs/) folder for detailed guides

---

## Questions?

See [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) for troubleshooting and FAQs.

---

**Version**: 1.0.0 | **Node**: 18+ | **npm**: 10+ | **Last Updated**: 2026-07-02
