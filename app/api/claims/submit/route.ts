import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Claim from '@/models/Claim';
import AuditLog from '@/models/AuditLog';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { category, amount, invoiceNumber, dateOfClaim, claimedFor, remarks, attachments } = body;

    await connectDB();

    // Generate unique claim ID
    const count = await Claim.countDocuments();
    const claimId = `C${String(count + 1).padStart(4, '0')}`;

    const claim = await Claim.create({
      claimId,
      employeeId: (session.user as any).employeeId,
      category,
      amount,
      invoiceNumber,
      dateOfClaim: new Date(dateOfClaim),
      claimedFor,
      remarks,
      attachments: attachments || [],
      status: 'Pending',
    });

    // Create audit log
    await AuditLog.create({
      userId: (session.user as any).id,
      action: 'CREATE_CLAIM',
      entityType: 'Claim',
      entityId: String(claim._id),
      role: session.user.role,
      details: { claimId, category, amount },
    });

    return NextResponse.json({ success: true, claim }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

