import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Claim from '@/models/Claim';
import AuditLog from '@/models/AuditLog';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { status, remarks } = body;

    await connectDB();

    const claim = await Claim.findOne({ claimId: params.id });
    
    if (!claim) {
      return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
    }

    claim.status = status;
    if (remarks) {
      claim.remarks = remarks;
    }
    if (status === 'Approved') {
      claim.dateOfReimbursement = new Date();
    }

    await claim.save();

    // Create audit log
    await AuditLog.create({
      userId: (session.user as any).id,
      action: `UPDATE_CLAIM_${status.toUpperCase()}`,
      entityType: 'Claim',
      entityId: claim._id.toString(),
      role: session.user.role,
      details: { claimId: params.id, status, remarks },
    });

    return NextResponse.json({ success: true, claim }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

