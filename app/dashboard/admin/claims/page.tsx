'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Mock data
const mockClaims = [
  {
    id: 'C001',
    employeeName: 'John Doe',
    category: 'Travel',
    amount: 1500,
    date: '2024-10-20',
    status: 'Pending',
    remarks: 'Travel expenses for client meeting',
  },
  {
    id: 'C002',
    employeeName: 'Jane Smith',
    category: 'Food & Dining',
    amount: 850,
    date: '2024-10-18',
    status: 'Pending',
    remarks: 'Team lunch',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Approved':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'Rejected':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'Suspicious':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    default:
      return null;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'destructive';
    case 'Suspicious':
      return 'warning';
    default:
      return 'default';
  }
};

export default function AdminClaimsPage() {
  const [statusFilter, setStatusFilter] = useState('All');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">All Claims</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and manage reimbursement claims
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pending Claims ({mockClaims.filter(c => c.status === 'Pending').length})</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="w-64 pl-9" />
                </div>
                <select
                  className="flex h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Suspicious</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left text-sm font-medium">Claim ID</th>
                    <th className="py-3 text-left text-sm font-medium">Employee</th>
                    <th className="py-3 text-left text-sm font-medium">Category</th>
                    <th className="py-3 text-left text-sm font-medium">Amount</th>
                    <th className="py-3 text-left text-sm font-medium">Date</th>
                    <th className="py-3 text-left text-sm font-medium">Status</th>
                    <th className="py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockClaims.map((claim) => (
                    <tr key={claim.id} className="border-b">
                      <td className="py-3 text-sm font-medium">{claim.id}</td>
                      <td className="py-3 text-sm">{claim.employeeName}</td>
                      <td className="py-3 text-sm">{claim.category}</td>
                      <td className="py-3 text-sm">₹{claim.amount.toLocaleString()}</td>
                      <td className="py-3 text-sm">{new Date(claim.date).toLocaleDateString()}</td>
                      <td className="py-3">
                        <Badge variant={getStatusVariant(claim.status) as any}>
                          {getStatusIcon(claim.status)}
                          <span className="ml-1">{claim.status}</span>
                        </Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          {claim.status === 'Pending' && (
                            <>
                              <Button variant="default" size="sm">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

