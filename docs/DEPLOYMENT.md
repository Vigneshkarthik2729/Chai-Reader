# Deployment Guide

This guide covers deploying the Chai Reader application to production environments.

## Deployment Overview

### Platforms

1. **Web** - Deployed to hosting platform (Vercel, Netlify, etc.)
2. **Mobile** (Future) - Deployed to App Stores via Capacitor

### Pre-Deployment Checklist

- [ ] All tests pass: `npm run lint && npm run build`
- [ ] Environment variables configured
- [ ] No console errors in development
- [ ] Mobile viewport tested
- [ ] Performance acceptable
- [ ] Security reviewed
- [ ] Documentation updated

## Web Deployment

### Option 1: Vercel (Recommended)

Vercel is the creator of Next.js and offers seamless integration.

#### Setup

1. **Create Vercel Account**: https://vercel.com
2. **Import Project**:
   - Connect GitHub repository
   - Select `chai-reader` project
   - Click "Import"

3. **Configure Environment**:
   - Go to Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL`
   - Add any other required variables

4. **Deploy**:
   - Click "Deploy"
   - Automatically builds and deploys

#### Automatic Deployments

```
main branch → Production
develop branch → Preview
Pull Requests → Preview deployments
```

#### Commands

```bash
# Deploy from CLI
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel status
```

### Option 2: Netlify

Alternative static hosting platform.

#### Setup

1. **Create Netlify Account**: https://netlify.com
2. **Connect Repository**:
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose GitHub repository

3. **Configure Build**:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Add environment variables in Site settings

4. **Deploy**:
   - Push to main branch
   - Netlify automatically builds and deploys

### Option 3: Self-Hosted

Deploy to your own server.

#### Build

```bash
# Create production build
npm run build

# Build outputs to .next/
```

#### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .next .next
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
# Build Docker image
docker build -t chai-reader .

# Run container
docker run -p 3000:3000 chai-reader
```

#### Traditional Server

```bash
# Build
npm run build

# Install dependencies (production only)
npm ci --only=production

# Start server
npm start
```

Use PM2 or systemd for process management.

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.production.com
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_API_RETRY_ATTEMPTS=3

# App Configuration
NEXT_PUBLIC_APP_NAME=Chai Reader
NEXT_PUBLIC_APP_VERSION=1.0.0

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_OFFLINE_MODE=true
```

### Secrets (Never Commit)

Use platform-specific secret management:

**Vercel**:
- Settings → Environment Variables (marked as Secret)

**Netlify**:
- Site settings → Build & deploy → Environment

**Self-Hosted**:
- Environment variables on server
- Use `.env.local` (not committed)

## Build Optimization

### Reduce Bundle Size

```bash
# Check bundle size
npm run build
du -sh .next

# Analyze bundle
npm install --save-dev webpack-bundle-analyzer
```

### Image Optimization

```bash
# Compress images
npx imagemin public/images/*.png --out-dir=public/images
npx imagemin public/images/*.jpg --out-dir=public/images
```

### Code Splitting

Already handled by Next.js, but you can:

```typescript
// Dynamic imports for heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"));
```

## Performance Monitoring

### Core Web Vitals

Monitor in production:
- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **FID** (First Input Delay) - Target: < 100ms
- **CLS** (Cumulative Layout Shift) - Target: < 0.1

### Tools

1. **Vercel Analytics** (if using Vercel)
   - Automatic Web Vitals tracking
   - Dashboard at vercel.com

2. **Google Lighthouse**
   - Chrome DevTools → Lighthouse
   - Target score: 90+

3. **PageSpeed Insights**
   - https://pagespeed.web.dev
   - Analyze and get recommendations

4. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/nextjs
   ```

## Monitoring & Logging

### Application Monitoring

```bash
# Install monitoring
npm install --save @sentry/nextjs
npm install --save posthog-js
```

### Server Logs

**Vercel**:
- Dashboard → Project → Deployments → Logs

**Netlify**:
- Site → Deploys → deploy → Logs

**Self-Hosted**:
```bash
# PM2 logs
pm2 logs chai-reader

# System logs
journalctl -u chai-reader -f
```

## Rollback & Recovery

### Quick Rollback

**Vercel**:
1. Go to Deployments
2. Find previous working deployment
3. Click the three dots
4. Select "Promote to Production"

**Netlify**:
1. Go to Deploys
2. Select previous successful deploy
3. Click "Publish deploy"

**Self-Hosted**:
```bash
# Keep backup of previous build
git checkout previous-commit
npm run build
npm start
```

## SSL Certificates

### HTTPS Setup

**Vercel & Netlify**:
- Automatic SSL with Let's Encrypt
- No additional configuration needed

**Self-Hosted**:
```bash
# Using Let's Encrypt with Certbot
sudo certbot certonly --standalone -d yourdomain.com

# Configure in Nginx or Apache
# Point to certificate files
```

## DNS Configuration

### Domain Setup

1. **Update DNS Records**:
   ```
   CNAME   www.yourdomain.com   your-deployment.vercel.app
   A       yourdomain.com       <vercel-ip>
   ```

2. **Verify**:
   ```bash
   nslookup yourdomain.com
   ping yourdomain.com
   ```

## Pre-Launch Checklist

- [ ] Domain configured and pointing to deployment
- [ ] SSL certificate valid and green lock shows
- [ ] Environment variables set correctly
- [ ] API endpoints responding
- [ ] Database/backend accessible
- [ ] All pages load without errors
- [ ] Mobile responsive verified
- [ ] Performance acceptable
- [ ] Error tracking configured
- [ ] Backups configured
- [ ] Monitoring active
- [ ] Team notified of launch

## Post-Launch

### Day 1

- [ ] Monitor error logs
- [ ] Check Web Vitals
- [ ] Test critical user flows
- [ ] Verify API responses
- [ ] Monitor server resources

### Week 1

- [ ] Review analytics
- [ ] Collect user feedback
- [ ] Fix any issues found
- [ ] Optimize performance
- [ ] Update documentation

### Ongoing

- [ ] Monitor performance metrics
- [ ] Review error logs weekly
- [ ] Update dependencies monthly
- [ ] Security scanning
- [ ] Backup verification

## Troubleshooting

### Deployment Fails

```bash
# Check build locally
npm run build

# Clear cache
rm -rf .next
npm run build

# Check environment variables
# Make sure NEXT_PUBLIC_API_URL is set
```

### White Screen / 404

- Verify build output contains `out/` folder
- Check public directory exists
- Verify routes configured correctly

### Slow Performance

```bash
# Check bundle size
npm run build && du -sh .next

# Analyze
npm install webpack-bundle-analyzer
```

### Database Connection Failed

- Verify connection string in environment
- Check database is accessible from deployment
- Review database logs

### API Errors

- Check API URL in environment
- Verify CORS headers
- Test API endpoint separately
- Review API logs

## Security Best Practices

- [ ] No secrets in code (use environment variables)
- [ ] All endpoints use HTTPS
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Rate limiting enabled
- [ ] Security headers set
- [ ] Dependencies updated regularly
- [ ] Secrets rotated periodically

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Backup Strategy

- Code: Backed up in Git
- Database: Daily backups
- Assets: S3/CDN backup
- Secrets: Encrypted backup

---

For detailed platform-specific guides:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

**Deployment Status**: Ready for production! 🚀
