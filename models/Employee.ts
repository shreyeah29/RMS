import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEmployee extends Document {
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  joiningDate: Date;
  category: string; // White Collar / Blue Collar
  eligibleCriteria: string;
  role: 'admin' | 'employee';
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema = new Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  category: { type: String, required: true, enum: ['White Collar', 'Blue Collar'] },
  eligibleCriteria: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  password: { type: String, required: true },
}, {
  timestamps: true
});

const Employee: Model<IEmployee> = mongoose.models.Employee || mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;

