# Deployment Troubleshooting

## Issue: No Deployments Showing in Vercel

### Possible Causes:
1. GitHub integration not properly connected
2. Deployment failed silently
3. Filters hiding deployments
4. Project needs manual deployment trigger

### Solution Steps:

**Step 1: Verify GitHub Connection**
1. Go to Vercel project **Settings**
2. Click **Git** in the left sidebar
3. Verify it shows: `shreyeah29/RMS`
4. If not connected, click "Connect Git Repository"

**Step 2: Manually Trigger Deployment**
1. In Vercel project **Settings**
2. Scroll to **Deploy Hooks**
3. Or go to **Deployments** tab → Click "..." → "Redeploy"
4. Select the latest commit

**Step 3: Check Build Output**
1. If deployment appears but fails:
2. Click on the failed deployment
3. Open "Build Logs"
4. Check for errors

**Step 4: Verify Environment Variables**
1. Go to **Settings** → **Environment Variables**
2. Make sure:
   - Production environment is selected
   - Both variables are visible:
     - NEXTAUTH_SECRET
     - MONGODB_URI

**Step 5: Alternative - Deploy via Vercel CLI**
If web interface isn't working, use CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

### Quick Fix: Create New Project
If nothing works:
1. Go to Vercel dashboard
2. Click "Add New Project"
3. Re-import `shreyeah29/RMS`
4. This time it should trigger deployment

