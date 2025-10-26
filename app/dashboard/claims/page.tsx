import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search, Eye } from 'lucide-react';

// Mock data - replace with actual data fetching
const mockClaims = [
  {
    id: 'C001',
    category: 'Travel',
    amount: 1500,
    invoiceNumber: 'INV-2024-001',
    dateOfClaim: '2024-10-20',
    status: 'Approved',
    dateOfReimbursement: '2024-10-22',
  },
  {
    id: 'C002',
    category: 'Food & Dining',
    amount: 850,
    invoiceNumber: 'INV-2024-002',
    dateOfClaim: '2024-10-18',
    status: 'Pending',
    dateOfReimbursement: null,
  },
  {
    id: 'C003',
    category: 'Medical',
    amount: 2300,
    invoiceNumber: 'INV-2024-003',
    dateOfClaim: '2024-10-15',
    status: 'Approved',
    dateOfReimbursement: '2024-10-18',
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Rejected':
      return 'destructive';
    case 'Suspicious':
      return 'destructive';
    default:
      return 'default';
  }
};

export default function ClaimsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Claims</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and track your reimbursement claims
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Claims History</CardTitle>
                <CardDescription>All your submitted claims</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="w-64 pl-9"
                  />
                </div>
                <select className="flex h-10 rounded-md border border-input bg-background px-3 text-sm">
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
                    <th className="py-3 text-left text-sm font-medium text-muted-foreground">
                      Claim ID
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-muted-foreground">
                      Category
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="py-3 text-left text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockClaims.map((claim) => (
                    <tr key={claim.id} className="border-b">
                      <td className="py-3 text-sm font-medium">{claim.id}</td>
                      <td className="py-3 text-sm">{claim.category}</td>
                      <td className="py-3 text-sm">₹{claim.amount.toLocaleString()}</td>
                      <td className="py-3 text-sm">{new Date(claim.dateOfClaim).toLocaleDateString()}</td>
                      <td className="py-3">
                        <Badge variant={getStatusBadgeVariant(claim.status) as any}>
                          {claim.status}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
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

