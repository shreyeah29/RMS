# Reimbursement Management System (RMS)

A professional, enterprise-grade SaaS web application for managing employee reimbursement claims, built with Next.js 14, TypeScript, MongoDB, and ShadCN UI.

## 🌟 Overview

The RMS is a comprehensive solution for managing employee reimbursement claims with dual user interfaces for employees and administrators. It features a modern, clean UI suitable for HR and finance departments in corporate environments.

## ✨ Key Features

### 👤 Employee Portal
- **Secure Authentication:** Role-based access with JWT sessions
- **Dashboard:** Overview of claims, statistics, and pending approvals
- **Claim Submission:** Upload receipts, invoices with multiple file support
- **Status Tracking:** Real-time tracking of claim status (Pending, Approved, Rejected, Suspicious)
- **Policy Access:** View and download company reimbursement policies
- **Analytics:** Personal expense breakdown by category

### 🏢 Admin/HR Dashboard
- **Comprehensive Dashboard:** Expense analytics with visual charts (Recharts)
- **Employee Management:** Add, edit, delete, bulk upload via CSV
- **Claims Review:** Approve, reject, or flag suspicious claims with remarks
- **Policy Management:** Upload and manage company policy PDFs
- **Audit Trail:** Complete logging of all admin actions
- **Export Functionality:** Export claims to Excel (SheetJS)
- **Advanced Filtering:** Filter by employee, status, category, date range

## 🛠️ Technology Stack

- **Frontend:**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - ShadCN UI components
  - Tailwind CSS for styling
  - Recharts for data visualization
  - Lucide React for icons

- **Backend:**
  - Next.js API Routes
  - MongoDB with Mongoose ORM
  - NextAuth.js for authentication
  - Cloudinary for file storage

- **Additional Tools:**
  - Zod for schema validation
  - bcryptjs for password hashing
  - SheetJS (XLSX) for export functionality

## 📦 Installation & Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

Quick start:
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your credentials

# Create admin user
npm run setup:admin

# Run development server
npm run dev
```

## 🎨 Design Features

- **Modern & Professional:** Clean, corporate-grade UI
- **Dark Mode:** Full dark mode support with toggle
- **Responsive Design:** Works beautifully on all screen sizes
- **Accessibility:** ARIA-compliant components
- **Smooth Animations:** Polished transitions and hover effects

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- Secure file upload validation
- CSRF protection via NextAuth

## 📊 Database Schema

**Employee Model:**
- employeeId, name, email, phone, designation, department
- joiningDate, category (White/Blue Collar)
- eligibleCriteria, role (admin/employee)
- Hashed password with timestamps

**Claim Model:**
- claimId, employeeId, category, amount
- invoiceNumber, dateOfClaim, dateOfReimbursement
- status (Pending/Approved/Rejected/Suspicious)
- remarks, claimedFor (Self/Other)
- attachments (Cloudinary URLs)

**Policy Model:**
- title, fileUrl, uploadedAt

**AuditLog Model:**
- userId, action, entityType, entityId
- timestamp, role, details

## 🚀 Deployment

Deploy to Vercel:

1. Connect your GitHub repository
2. Add environment variables
3. Deploy!

The app is production-ready with:
- Automatic HTTPS
- Edge network distribution
- Serverless functions
- MongoDB Atlas integration

## 📖 Usage Guide

### For Employees:
1. Login with your credentials
2. View dashboard with claim summary
3. Submit new claims with receipts
4. Track claim status
5. Download policy documents

### For Admins:
1. Login with admin credentials
2. View analytics dashboard
3. Manage employees
4. Review and approve/reject claims
5. Upload policies
6. View audit logs

## 🤝 Contributing

This is proprietary enterprise software. For modifications or enhancements, please contact the development team.

## 📄 License

Copyright © 2024 - Proprietary Enterprise Software

## 📞 Support

For technical support or questions:
- Email: support@company.com
- Documentation: [Internal Wiki]
- Issue Tracker: [Jira Board]

---

Built with ❤️ by the RMS Development Team
