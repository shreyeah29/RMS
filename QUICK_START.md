# Quick Start Guide - RMS

## 🎯 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
Create `.env.local` file in the root directory and add:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reimbursement_db
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-secret-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Step 3: Create Admin User
```bash
npm run setup:admin
```

This creates:
- **Email:** admin@company.com  
- **Password:** Admin@1234

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Access the Application
- Open: http://localhost:3000
- Login with admin credentials above

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────┐
│         Frontend (Next.js)          │
│  ┌──────────────┬─────────────────┐ │
│  │  Employee    │     Admin      │ │
│  │   Portal     │    Dashboard    │ │
│  └──────┬───────┴────────┬─────────┘ │
└─────────┼─────────────────┼─────────┘
          │                 │
          ↓                 ↓
┌─────────────────────────────────────┐
│         API Routes (Next.js)        │
│  /api/auth, /api/claims, etc.       │
└───────────┬─────────────────────────┘
            │
            ↓
┌─────────────────────────────────────┐
│         MongoDB Database             │
│  - Employees                        │
│  - Claims                           │
│  - Policies                         │
│  - AuditLogs                        │
└─────────────────────────────────────┘
```

## 📱 User Workflows

### Employee Workflow
1. **Login** → `/login`
2. **Dashboard** → View claim statistics
3. **Submit Claim** → Upload receipts, fill details
4. **Track Status** → Check pending/approved claims
5. **View Policy** → Download company policy

### Admin Workflow
1. **Login** → Admin credentials
2. **Dashboard** → View analytics and KPIs
3. **Review Claims** → Approve/reject pending claims
4. **Manage Employees** → Add/edit employee profiles
5. **View Analytics** → Monthly trends, category breakdown
6. **Audit Logs** → Track all system actions

## 🔐 Default Login Credentials

**Admin:**
- Email: `admin@company.com`
- Password: `Admin@1234`

⚠️ **Change this password immediately after first login!**

## 🛠️ Tech Stack Quick Reference

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| MongoDB | Database |
| NextAuth.js | Authentication |
| ShadCN UI | UI components |
| Tailwind CSS | Styling |
| Recharts | Data visualization |
| Cloudinary | File storage |
| bcryptjs | Password hashing |

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run setup:admin  # Create admin user
```

## 🌐 Pages Overview

### Public
- `/` → Redirects to login
- `/login` → Login page

### Employee (require auth)
- `/dashboard` → Main dashboard
- `/dashboard/profile` → Profile management
- `/dashboard/claims/submit` → Submit new claim
- `/dashboard/claims` → View all claims
- `/dashboard/policy` → View company policy

### Admin (require auth + admin role)
- `/dashboard/admin/employees` → Employee management
- `/dashboard/admin/claims` → All claims review
- `/dashboard/admin/analytics` → Analytics dashboard

## 🎨 Design System

**Colors:**
- Primary: Slate gray (professional)
- Accent: Blue
- Success: Green
- Warning: Yellow
- Destructive: Red

**Components:**
- Cards with subtle shadows
- Rounded corners (0.5rem default)
- Consistent spacing
- Dark mode support

## 🐛 Troubleshooting

**Database connection error:**
- Check MongoDB URI in `.env.local`
- Ensure IP is whitelisted in MongoDB Atlas
- Verify network connection

**Authentication issues:**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your app URL
- Clear browser cookies and try again

**File upload failing:**
- Verify Cloudinary credentials
- Check file size limits (<10MB)
- Ensure file type is allowed (PDF, JPG, PNG)

**Setup script error:**
- Make sure `.env.local` exists
- Verify MongoDB URI is correct
- Check internet connection

## 📞 Need Help?

1. Check `README.md` for full documentation
2. Review `SETUP.md` for detailed setup
3. See `PROJECT_SUMMARY.md` for implementation details

## ✨ Features Checklist

- ✅ User authentication (NextAuth.js)
- ✅ Role-based access control
- ✅ Claim submission with file upload
- ✅ Admin approval workflow
- ✅ Analytics dashboard (Recharts)
- ✅ Employee management
- ✅ Audit logging
- ✅ Policy document management
- ✅ Dark mode toggle
- ✅ Responsive design
- ✅ Professional UI (ShadCN)

---

**Ready to use!** 🚀

