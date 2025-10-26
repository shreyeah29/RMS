const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://shreyas:YhomGyKabkudyR29@rms.0c2oszr.mongodb.net/reimbursement_db?retryWrites=true&w=majority';

async function createEmployee() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const Employee = mongoose.model('Employee', new mongoose.Schema({
      employeeId: String,
      name: String,
      email: String,
      phone: String,
      designation: String,
      department: String,
      joiningDate: Date,
      category: String,
      eligibleCriteria: String,
      role: String,
      password: String,
    }, { timestamps: true }));

    const hashedPassword = await bcrypt.hash('Employee@1234', 10);
    
    const employee = await Employee.create({
      employeeId: 'EMP-001',
      name: 'Test Employee',
      email: 'employee@company.com',
      phone: '+1234567890',
      designation: 'Software Engineer',
      department: 'Engineering',
      joiningDate: new Date(),
      category: 'White Collar',
      eligibleCriteria: 'All categories',
      role: 'employee',
      password: hashedPassword,
    });

    console.log('✅ Employee user created successfully!');
    console.log('Email: employee@company.com');
    console.log('Password: Employee@1234');
    console.log('');
    console.log('Now you have:');
    console.log('  1. Admin: admin@company.com / Admin@1234');
    console.log('  2. Employee: employee@company.com / Employee@1234');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createEmployee();

