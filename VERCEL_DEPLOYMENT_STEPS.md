# 🚀 Deploy to Vercel - Step by Step Guide

## ✅ GitHub Push Complete!

Your code is now live at: **https://github.com/shreyeah29/RMS**

## 🎯 Next Steps: Deploy on Vercel

### Step 1: Go to Vercel
1. Visit: https://vercel.com/signup
2. Sign up with your **GitHub account** (one-click login)
3. Click "Import Project"

### Step 2: Import Your Repository
1. You'll see your GitHub repositories
2. Find **"shreyeah29/RMS"** and click **"Import"**
3. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

**Add these environment variables in Vercel dashboard:**

#### 1. MongoDB URI
```
Name: MONGODB_URI
Value: [Your MongoDB Atlas connection string]
```

#### 2. NextAuth URL
```
Name: NEXTAUTH_URL
Value: [Will be your Vercel URL after deployment]
```
**Note:** Initially use: `https://rms-xxxxx.vercel.app` (Vercel will show this)

#### 3. NextAuth Secret (I've generated this for you!)
```
Name: NEXTAUTH_SECRET
Value: QDKXKN8eDyE430YGkZzFP25CFhJegAczMEvIMjmicNY=
```

#### 4. Cloudinary Configuration
```
Name: CLOUDINARY_CLOUD_NAME
Value: [Your Cloudinary cloud name]

Name: CLOUDINARY_API_KEY
Value: [Your Cloudinary API key]

Name: CLOUDINARY_API_SECRET
Value: [Your Cloudinary secret]
```

### Step 4: Deploy
1. Click **"Deploy"** button
2. Wait 2-5 minutes for build
3. Your app will be live! 🎉

## 📝 Provide Me With These Credentials

I need you to provide:

### 1. MongoDB Atlas
**How to get it:**
- Go to https://cloud.mongodb.com
- Sign in or create free account
- Create a new cluster (free tier)
- Go to "Database Access" → Add user → Get password
- Go to "Network Access" → Add IP Address: 0.0.0.0/0 (allows all IPs)
- Go to "Clusters" → Connect → Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your actual password

**Connection string format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/reimbursement_db?retryWrites=true&w=majority
```

### 2. Cloudinary
**How to get it:**
- Go to https://cloudinary.com/users/register_free
- Sign up for free account
- Go to Dashboard
- Copy:
  - Cloud Name
  - API Key  
  - API Secret

### 3. Vercel URL (After Deployment)
- Vercel will show your deployment URL
- It will be like: `rms-xxxxx.vercel.app`

## 🔐 Once You Provide Credentials

I'll help you:
1. Add environment variables to Vercel
2. Update NEXTAUTH_URL with actual deployment URL
3. Test the deployment
4. Create admin user in production database

## 🎯 Quick Checklist

- [ ] Push to GitHub ✅ **DONE**
- [ ] Create Vercel account
- [ ] Import repository
- [ ] Provide MongoDB credentials
- [ ] Provide Cloudinary credentials
- [ ] Deploy on Vercel
- [ ] Create admin user

---

**NEXTAUTH_SECRET Generated:** ✅ `QDKXKN8eDyE430YGkZzFP25CFhJegAczMEvIMjmicNY=`

Share your credentials when ready! 🚀

