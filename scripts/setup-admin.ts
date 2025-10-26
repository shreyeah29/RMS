import { config } from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Employee from '../models/Employee.js';

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') });

async function createAdminUser() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || '';
    
    if (!MONGODB_URI) {
      console.error('Error: MONGODB_URI environment variable is not set!');
      console.error('Please add MONGODB_URI to your .env.local file.');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Employee.findOne({ email: 'admin@company.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin@1234', 10);
    
    const admin = await Employee.create({
      employeeId: 'EMP-ADMIN-001',
      name: 'Admin User',
      email: 'admin@company.com',
      phone: '+1234567890',
      designation: 'Administrator',
      department: 'IT',
      joiningDate: new Date(),
      category: 'White Collar',
      eligibleCriteria: 'All categories',
      role: 'admin',
      password: hashedPassword,
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@company.com');
    console.log('Password: Admin@1234');
    console.log('');
    console.log('⚠️  Please change the password after first login!');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

createAdminUser();

