import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Claim from '@/models/Claim';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query: any = {};
    
    // Filter by employee role
    if (session.user.role === 'employee') {
      query.employeeId = (session.user as any).employeeId;
    }

    // Filter by status if provided
    if (status && status !== 'All') {
      query.status = status;
    }

    const claims = await Claim.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, claims }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

