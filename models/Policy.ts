import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPolicy extends Document {
  title: string;
  fileUrl: string;
  uploadedAt: Date;
}

const PolicySchema: Schema = new Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const Policy: Model<IPolicy> = mongoose.models.Policy || mongoose.model<IPolicy>('Policy', PolicySchema);

export default Policy;

