# Contributing Guide

Thank you for your interest in contributing to Chai Reader! This document outlines how to contribute to the project.

## Code of Conduct

- Be respectful and inclusive
- Follow the existing code style
- Write clean, readable code
- Test your changes
- Document your changes

## Getting Started

### 1. Set Up Your Environment

```bash
# Clone repository
git clone <repo-url>
cd chai-reader

# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local
```

### 2. Create a Branch

```bash
# Update main branch
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
# or bugfix/issue-description
```

### 3. Make Your Changes

Follow the guidelines below and keep commits focused and atomic.

### 4. Test Your Changes

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Manual testing
npm run dev
```

### 5. Commit & Push

```bash
# Stage your changes
git add .

# Commit with clear message
git commit -m "feat: Add author details page navigation"
# or "fix: Fix storage persistence bug"

# Push to your fork
git push origin feature/your-feature-name
```

### 6. Create Pull Request

- Describe what you changed and why
- Reference any related issues
- Wait for code review

## Project Structure

Before adding code, familiarize yourself with:
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Folder organization
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Design decisions
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development workflows

## Code Style Guide

### TypeScript

```typescript
// ✅ Good: Proper types
interface Author {
  id: string;
  name: string;
  books: string[];
}

// ❌ Bad: Using any
interface Author {
  id: any;
  name: any;
}
```

### Components

```typescript
// ✅ Good: Clear component with types
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className="px-4 py-2">
      {children}
    </button>
  );
}

// ❌ Bad: No types, unclear props
export default function Button(props) {
  return <button onClick={props.func}>{props.text}</button>;
}
```

### React Hooks

```typescript
// ✅ Good: Proper hook usage
const [state, setState] = useState<string>("");

useEffect(() => {
  // Side effect
}, [dependency]);

// ❌ Bad: Missing dependencies
useEffect(() => {
  setState(someValue); // someValue not in dependencies!
});
```

### File Naming

- Components: `PascalCase` → `Famousauthors.tsx`
- Utils/Hooks: `camelCase` → `useStorage.ts`
- Types: `camelCase` → `author.ts`
- Constants: `UPPER_SNAKE_CASE` → `NAV_ITEMS`

### Exports

```typescript
// ✅ Good: Named exports
export interface User { ... }
export function getUserById(id: string) { ... }

// For default components only
export default function HomePage() { ... }
```

## Adding Features

### Adding a New Page

1. Create directory: `app/feature-name/`
2. Add `page.tsx` with route handler
3. Add to navigation if needed
4. Create components in same directory

```typescript
// app/example/page.tsx
export default function ExamplePage() {
  return <div>Example</div>;
}
```

### Adding a New Component

1. Create in `app/components/`
2. Mark as client if interactive: `"use client"`
3. Export as default
4. Define TypeScript interface for props

```typescript
// app/components/NewComponent.tsx
"use client";

interface Props {
  title: string;
}

export default function NewComponent({ title }: Props) {
  return <div>{title}</div>;
}
```

### Adding a Utility Function

1. Create in `app/lib/utils/` or relevant folder
2. Export as named function
3. Add JSDoc comments

```typescript
// app/lib/utils/format.ts

/**
 * Format date to readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}
```

### Adding a Hook

1. Create in `app/lib/hooks.ts` or feature folder
2. Prefix with `use`
3. Document parameters and return value

```typescript
/**
 * Fetch data from API with loading state
 * @param url - API endpoint
 * @returns { data, loading, error }
 */
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Hook logic...

  return { data, loading, error };
}
```

## Mobile-Friendly Development

### Remember These Principles

1. **No browser-only APIs** - Use abstractions
   - ❌ `localStorage` → ✅ `getStorage()`
   - ❌ `fetch()` → ✅ `apiCall()`

2. **Responsive design** - Always test mobile
   - Use Tailwind breakpoints
   - Test on actual mobile devices
   - Thumb-friendly touch targets (48px+)

3. **Async operations** - Everything might be slow
   - Add loading states
   - Handle timeouts
   - Implement error recovery

4. **No performance-critical logic in UI thread**
   - Defer heavy calculations
   - Use Web Workers if needed

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code restructure
- `test:` - Tests
- `chore:` - Build/dependencies

### Examples

```
feat(author): Add author details page

- Create dynamic route /author/[slug]
- Display author bio and books
- Add responsive design

Closes #123

fix(storage): Fix storage initialization on mobile

Implement proper Promise handling in storage abstraction

refactor(components): Extract common styles to utilities
```

## Pull Request Process

### Before Submitting

1. ✅ Tests pass: `npm run build`
2. ✅ No lint errors: `npm run lint`
3. ✅ Works locally: `npm run dev`
4. ✅ Mobile-friendly: Test on mobile viewport
5. ✅ Updated docs if needed

### PR Description Template

```markdown
## Description
Brief explanation of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation

## How to Test
Steps to verify the changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Mobile-friendly verified
```

## Code Review Expectations

- Be open to feedback
- Ask questions if unclear
- Suggest improvements constructively
- Test changes locally before approving

## Common Issues & Solutions

### ESLint Errors

```bash
# Fix automatically
npm run lint -- --fix

# Check specific file
npm run lint app/lib/api.ts
```

### Build Failures

```bash
# Clear cache
rm -rf .next node_modules

# Reinstall
npm install

# Rebuild
npm run build
```

### TypeScript Errors

- Check error message carefully
- Verify type definitions
- Use `any` only as last resort
- Add `@ts-ignore` with comment if necessary

### Path Issues

Use absolute imports from `@/`:
```typescript
// Good
import { api } from "@/app/lib/api";

// Avoid
import { api } from "../../../lib/api";
```

## Performance Tips

1. **Minimize bundle size**
   - Use tree-shaking
   - Lazy load components
   - Remove unused code

2. **Optimize images**
   - Use Next.js `Image` component
   - Compress before uploading
   - Provide responsive sizes

3. **Code splitting**
   - Dynamic imports for large components
   - Route-based splitting (automatic)

4. **Monitoring**
   - Check bundle size: `npm run build && ls -lah .next`
   - Test on slow networks
   - Use DevTools performance tab

## Documentation Guidelines

### Comments

```typescript
// ✅ Good: Explains why, not what
// API calls fail due to CORS, so we retry
const data = await apiCall(endpoint);

// ❌ Bad: Obvious from code
// Get the data
const data = await apiCall(endpoint);
```

### JSDoc for Public Functions

```typescript
/**
 * Fetch author by slug
 * @param slug - Author's URL slug
 * @returns Author object or undefined
 * @throws ApiError if request fails
 */
export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  // ...
}
```

### README Updates

If adding major features, update relevant docs:
- [DEVELOPMENT.md](./DEVELOPMENT.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

## Questions?

- Check existing documentation
- Search GitHub issues/discussions
- Ask in pull request
- Review similar code patterns

## Recognition

Contributors are recognized in:
- Commit history
- Pull request credits
- Project README

Thank you for contributing! 🙏
