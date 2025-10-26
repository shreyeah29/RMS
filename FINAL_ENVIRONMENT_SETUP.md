# Final Environment Variables Setup for Vercel

## ✅ Fixed Issue:
The `vercel.json` file was referencing secrets (like `@mongodb_uri`) that don't exist. I've removed that section so Vercel will use your environment variables from the dashboard.

## 📋 Environment Variables to Add in Vercel Dashboard:

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Click **"Add Environment Variable"**

### Add These Variables:

**1. NEXTAUTH_SECRET**
```
Key: NEXTAUTH_SECRET
Value: QDKXKN8eDyE430YGkZzFP25CFhJegAczMEvIMjmicNY=
Environment: Production (✓)
```

**2. MONGODB_URI**
```
Key: MONGODB_URI
Value: mongodb+srv://shreyas:YhomGyKabkudyR29@rms.0c2oszr.mongodb.net/reimbursement_db?retryWrites=true&w=majority
Environment: Production (✓)
```

## 🚀 Now Try Creating Deployment Again:

1. Go back to **Deployments** tab
2. Click **"..."** → **"Create Deployment"**
3. Enter commit: `17db7cb`
4. Click **"Create Deployment"**
5. ✅ Should work now!

## What We Fixed:
- ❌ Before: vercel.json was trying to reference secrets like `@mongodb_uri`
- ✅ Now: Vercel will use environment variables from dashboard settings

