# Vercel Environment Variables Setup

## Add These EXACT Values:

### 1. NEXTAUTH_SECRET
```
Key: NEXTAUTH_SECRET
Value: QDKXKN8eDyE430YGkZzFP25CFhJegAczMEvIMjmicNY=
```

### 2. MONGODB_URI (FULL CONNECTION STRING)
```
Key: MONGODB_URI
Value: mongodb+srv://shreyas:YhomGyKabkudyR29@rms.0c2oszr.mongodb.net/reimbursement_db?retryWrites=true&w=majority
```

### 3. CLOUDINARY (Add these when you have credentials)
```
Key: CLOUDINARY_CLOUD_NAME
Value: [from Cloudinary dashboard]

Key: CLOUDINARY_API_KEY
Value: [from Cloudinary dashboard]

Key: CLOUDINARY_API_SECRET
Value: [from Cloudinary dashboard]
```

## ⚠️ Important:
- **Enter the FULL value** - not a reference like `@mongodb_uri`
- **Paste the entire connection string** including username, password, and database name
- Don't use Secret references unless you've created them separately

## How to Fix Current Error:
1. Click on the `MONGODB_URI` variable
2. Replace the value with the FULL connection string shown above
3. Click "Deploy"

