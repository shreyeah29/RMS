import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAuditLog extends Document {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: Date;
  role: string;
  details?: any;
}

const AuditLogSchema: Schema = new Schema({
  userId: { type: String, required: true },
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  role: { type: String, required: true },
  details: { type: Schema.Types.Mixed },
}, {
  timestamps: true
});

const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLog;

