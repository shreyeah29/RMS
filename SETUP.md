# Setup Guide - Reimbursement Management System

This guide will help you set up and run the RMS application locally.

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account OR local MongoDB installation
- Cloudinary account (for file uploads)
- Git installed

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd rms

# Install dependencies
npm install
```

## Step 2: Environment Configuration

Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reimbursement_db

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Getting Your Configuration:

1. **MongoDB URI**: 
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get your connection string
   - Replace `<password>` with your database password

2. **NEXTAUTH_SECRET**: 
   - Generate a random secret: `openssl rand -base64 32`
   - Or use any secure random string generator

3. **Cloudinary**:
   - Sign up at [Cloudinary](https://cloudinary.com)
   - Get your credentials from the dashboard

## Step 3: Create Admin User

Run the setup script to create the initial admin user:

```bash
npx ts-node scripts/setup-admin.ts
```

This will create an admin user with:
- **Email:** admin@company.com
- **Password:** Admin@1234

⚠️ **Important:** Change this password after first login!

## Step 4: Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Visit `http://localhost:3000` in your browser.

## Step 5: Login

1. Go to `http://localhost:3000`
2. You'll be redirected to the login page
3. Use the admin credentials created in Step 3

## Creating Test Employees

You can create test employee accounts through the admin dashboard or by adding them directly to MongoDB.

### Test Employee Credentials (to be created):
- Email: employee@company.com
- Password: (set through admin dashboard)
- Role: employee

## Troubleshooting

### Database Connection Issues
- Verify your MongoDB URI is correct
- Check your network connection
- Ensure your IP is whitelisted in MongoDB Atlas

### Authentication Issues
- Verify `NEXTAUTH_URL` matches your app URL
- Check that `NEXTAUTH_SECRET` is set and consistent

### File Upload Issues
- Verify Cloudinary credentials are correct
- Check file size limits
- Ensure CORS is configured properly

## Production Deployment

For production deployment on Vercel:

1. Push your code to GitHub
2. Import the project on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production:
- `MONGODB_URI`: Your production MongoDB URI
- `NEXTAUTH_URL`: Your production URL (e.g., https://yourdomain.com)
- `NEXTAUTH_SECRET`: Generate a new secret for production
- `CLOUDINARY_*`: Your Cloudinary credentials

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [ShadCN UI Documentation](https://ui.shadcn.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [NextAuth.js Documentation](https://next-auth.js.org)

## Support

For issues or questions, please contact the development team.

