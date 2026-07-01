# Documentation Index

Welcome to the Chai Reader documentation! This folder contains all guides and references for the project.

## Quick Links

### 📖 Getting Started
- [DEVELOPMENT.md](./DEVELOPMENT.md) - How to set up and run locally
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Understanding the folder organization

### 🏗️ Architecture & Design
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design and Capacitor-ready structure
- [API_DESIGN.md](./API_DESIGN.md) - API abstractions and patterns

### 📱 Mobile Development
- [MOBILE_SETUP.md](./MOBILE_SETUP.md) - Setting up Capacitor for Android/iOS
- [CAPACITOR_MIGRATION.md](./CAPACITOR_MIGRATION.md) - Step-by-step migration checklist

### 🔧 Technical Guides
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute to the project
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploying to production

## Documentation Structure

```
docs/
├── README.md (this file)          # Documentation index
├── PROJECT_STRUCTURE.md           # Folder organization & conventions
├── DEVELOPMENT.md                 # Local development guide
├── ARCHITECTURE.md                # System design & decisions
├── API_DESIGN.md                  # API patterns & abstractions
├── MOBILE_SETUP.md                # Mobile development setup
├── CAPACITOR_MIGRATION.md         # Migration to native apps
├── CONTRIBUTING.md                # Contribution guidelines
└── DEPLOYMENT.md                  # Production deployment
```

## Key Technologies

- **Frontend**: Next.js 16, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4
- **Mobile**: Capacitor (optional, when needed)
- **Icons**: Lucide React
- **Development**: ESLint, Node.js 18+

## Common Tasks

### 👨‍💻 I want to...

- **Set up locally** → See [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Understand the code** → See [ARCHITECTURE.md](./ARCHITECTURE.md) & [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Add a new feature** → See [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Deploy to production** → See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Build for mobile** → See [MOBILE_SETUP.md](./MOBILE_SETUP.md)
- **Migrate to Capacitor** → See [CAPACITOR_MIGRATION.md](./CAPACITOR_MIGRATION.md)

## Quick Reference

### Installation
```bash
npm install
cp .env.example .env.local
```

### Running
```bash
npm run dev              # Development
npm run build            # Production build
npm run lint             # Code linting
```

### Directory Structure
```
app/                     # Next.js app directory
├── lib/               # Utilities & hooks
├── components/        # UI components
├── context/           # Global state
├── data/              # Static data
└── author/            # Routes

docs/                   # This folder
public/                # Static assets
```

### Key Files
- `.env.example` - Environment variables template
- `capacitor.config.json` - Mobile app configuration
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

## Important Principles

### ✅ DO's
- Use abstraction layers for platform-specific code
- Write mobile-first responsive design
- Use environment variables for configuration
- Write TypeScript with proper types
- Keep components small and reusable

### ❌ DON'Ts
- Don't hardcode URLs or API endpoints
- Don't use browser-only APIs directly
- Don't commit `.env.local` or secrets
- Don't ignore TypeScript errors
- Don't skip mobile testing

## Useful Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Code quality
npm run lint

# Mobile (when available)
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
```

## FAQ

**Q: Where do I add a new page?**
A: Create a directory in `app/` with `page.tsx`

**Q: How do I store user data?**
A: Use `useStorage()` hook from `app/lib/hooks.ts`

**Q: How do I call an API?**
A: Use `apiCall()` function from `app/lib/api.ts`

**Q: Is this mobile-ready?**
A: Yes! Architecture supports Capacitor. See MOBILE_SETUP.md

**Q: How do I deploy?**
A: See DEPLOYMENT.md for detailed instructions

## Getting Help

1. **Check the docs first** - Start with the relevant document
2. **Search existing code** - Similar patterns may already exist
3. **Check TypeScript errors** - Types often indicate the issue
4. **Browser console** - JavaScript errors appear here
5. **Lint errors** - Run `npm run lint` to check code quality

## Version Information

- **Framework**: Next.js 16.2.9
- **React**: 19.2.4
- **TypeScript**: 5
- **Tailwind**: 4
- **Node**: 18+ required

## Last Updated

2026-07-02

---

For questions or improvements, refer to the specific documentation files or contribute via pull request!
