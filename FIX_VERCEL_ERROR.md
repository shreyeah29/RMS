# Fix Vercel Environment Variable Error

## The Problem:
The error "Environment Variable 'MONGODB_URI' references Secret 'mongodb_uri', which does not exist" occurs because Vercel thinks you're trying to reference a secret instead of entering the value directly.

## Solution - Complete Step by Step:

### Step 1: Delete the Broken MONGODB_URI
1. Find the `MONGODB_URI` row in Environment Variables
2. Click the **trash/delete icon** (🗑️) to remove it
3. Confirm deletion

### Step 2: Add MONGODB_URI Fresh
1. Click **"+ Add More"** button in Environment Variables
2. A new row will appear
3. Enter:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://shreyas:YhomGyKabkudyR29@rms.0c2oszr.mongodb.net/reimbursement_db?retryWrites=true&w=majority`
4. Press Enter or click outside the field

### Step 3: Your Environment Variables Should Now Look Like:

```
NEXTAUTH_SECRET = QDKXKN8eDyE430YGkZzFP25CFhJegAczMEvIMjmicNY=
MONGODB_URI = mongodb+srv://shreyas:YhomGyKabkudyR29@rms.0c2oszr.mongodb.net/reimbursement_db?retryWrites=true&w=majority
```

### Step 4: Click Deploy
The error should be gone now!

## ⚠️ Important Notes:
- The value should be the FULL connection string, starting with `mongodb+srv://`
- Don't use the `@` symbol to reference secrets
- Make sure the entire value is pasted in one line
- No spaces before or after the value

## Alternative: If Above Doesn't Work
Try clearing the Environment Variables field completely and re-adding both variables:

1. Remove BOTH NEXTAUTH_SECRET and MONGODB_URI
2. Add them back one by one:
   - First add NEXTAUTH_SECRET
   - Then add MONGODB_URI with the full connection string
3. Click Deploy

