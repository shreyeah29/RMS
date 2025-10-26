# Deployment Guide - RMS

## Deploying to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- MongoDB Atlas account
- Cloudinary account

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - RMS"
git branch -M main
git remote add origin https://github.com/yourusername/rms.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

In Vercel dashboard, add these environment variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reimbursement_db
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-production-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live!

## Deploying to Other Platforms

### Railway

1. Create Railway account
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Add environment variables
5. Deploy!

### Render

1. Create Render account
2. Click "New Web Service"
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. Add environment variables
6. Deploy!

### Self-Hosted (VPS)

#### On Ubuntu/Debian:

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/yourusername/rms.git
cd rms

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name rms -- start
pm2 save
pm2 startup
```

## Environment-Specific Configurations

### Development
```env
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
```

### Staging
```env
NODE_ENV=production
NEXTAUTH_URL=https://staging.yourdomain.com
```

### Production
```env
NODE_ENV=production
NEXTAUTH_URL=https://yourdomain.com
```

## Database Setup (MongoDB Atlas)

### For Production:

1. **Create Database User:**
   - Go to MongoDB Atlas
   - Security → Database Access
   - Add new user
   - Use strong password

2. **Configure Network Access:**
   - Security → Network Access
   - Add IP: `0.0.0.0/0` (Vercel servers)
   - Or specific Vercel IPs

3. **Get Connection String:**
   - Clusters → Connect
   - Copy connection string
   - Add password: `mongodb+srv://user:password@cluster.mongodb.net/dbname`

4. **Create Initial Data:**
   - Run setup script: `npm run setup:admin`
   - Or manually create admin user

## Post-Deployment Checklist

- ✅ Environment variables configured
- ✅ Database connection working
- ✅ Admin user created
- ✅ HTTPS enabled (automatic on Vercel)
- ✅ Domain configured (optional)
- ✅ Test login functionality
- ✅ Test file upload
- ✅ Test claim submission
- ✅ Test admin features
- ✅ Monitor error logs

## SSL/HTTPS

### Vercel
- Automatic SSL certificate
- HTTPS by default
- Certificate auto-renewal

### Custom Domain
1. Add domain in Vercel dashboard
2. Configure DNS records:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `cname.vercel-dns.com`
3. Wait for propagation (5-30 minutes)

## Monitoring & Logs

### Vercel Logs
- Access in Vercel dashboard
- Real-time logs
- Function logs
- Build logs

### Error Tracking
- Add Sentry for production error tracking:
```bash
npm install @sentry/nextjs
```

### Analytics
- Add Google Analytics
- Vercel Analytics (built-in)
- Custom event tracking

## Performance Optimization

### Before Deployment:
```bash
# Build and test locally
npm run build
npm start

# Check bundle size
npm run build -- --analyze
```

### Optimizations Applied:
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Server components
- ✅ Edge caching
- ✅ Minified assets

## Security Checklist

- ✅ Environment variables in platform dashboard
- ✅ Never commit `.env.local`
- ✅ Use strong `NEXTAUTH_SECRET`
- ✅ Enable MongoDB IP whitelisting
- ✅ Use HTTPS (automatic on Vercel)
- ✅ Regular dependency updates
- ✅ Monitor security advisories

## Cost Estimation

### Vercel (Free Tier)
- ✅ Free for personal projects
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- **Upgrade:** $20/month for team features

### MongoDB Atlas (Free Tier)
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ Free forever
- **Upgrade:** $9/month for dedicated cluster

### Cloudinary (Free Tier)
- ✅ 25GB storage
- ✅ 25GB bandwidth/month
- ✅ Unlimited transformations
- **Upgrade:** $99/month for higher limits

**Total Monthly Cost:** $0 (with free tiers)

## Scaling Considerations

### As You Grow:

1. **Database:**
   - Upgrade MongoDB Atlas plan
   - Add read replicas
   - Implement connection pooling

2. **CDN:**
   - Vercel Edge Network (automatic)
   - Cloudinary CDN for files
   - Image optimization

3. **Caching:**
   - Implement Redis for sessions
   - Add database query caching
   - Use Vercel's edge caching

4. **Monitoring:**
   - Add error tracking (Sentry)
   - Set up uptime monitoring
   - Database performance monitoring

## Rollback Procedures

### If Deployment Fails:

**Vercel:**
1. Go to Deployments
2. Find last working deployment
3. Click "Promote to Production"
4. Investigate build errors

### If Data Issues:
1. Restore database backup
2. Review audit logs
3. Check environment variables

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Next.js Docs:** https://nextjs.org/docs
- **Project README:** `README.md`

---

## Quick Deploy Commands

```bash
# Local testing
npm run dev

# Production build
npm run build
npm start

# Create admin user
npm run setup:admin

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

**Your app will be live in minutes!** 🚀

