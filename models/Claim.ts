import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IClaim extends Document {
  claimId: string;
  employeeId: string;
  category: string;
  amount: number;
  invoiceNumber: string;
  dateOfClaim: Date;
  dateOfReimbursement: Date | null;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Suspicious';
  remarks: string;
  claimedFor: 'Self' | 'Other';
  attachments: string[]; // Cloudinary URLs
  createdAt: Date;
  updatedAt: Date;
}

const ClaimSchema: Schema = new Schema({
  claimId: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  invoiceNumber: { type: String, required: true },
  dateOfClaim: { type: Date, required: true },
  dateOfReimbursement: { type: Date, default: null },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected', 'Suspicious'], 
    default: 'Pending' 
  },
  remarks: { type: String, default: '' },
  claimedFor: { type: String, enum: ['Self', 'Other'], default: 'Self' },
  attachments: [{ type: String }],
}, {
  timestamps: true
});

const Claim: Model<IClaim> = mongoose.models.Claim || mongoose.model<IClaim>('Claim', ClaimSchema);

export default Claim;

