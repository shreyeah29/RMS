'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, Briefcase, Calendar, Building, Hash, CheckCircle } from 'lucide-react';

interface Employee {
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  joiningDate: string;
  category: string;
  eligibleCriteria: string;
  role: string;
}

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch employee data - TODO: Replace with actual API call
    fetchEmployee();
  }, []);

  const fetchEmployee = () => {
    // Dummy data for now
    const dummyEmployee: Employee = {
      employeeId: 'EMP001',
      name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      designation: 'Senior Developer',
      department: 'Engineering',
      joiningDate: '2022-01-15',
      category: 'White Collar',
      eligibleCriteria: 'All categories - Travel, Food, Medical, Equipment, Lodging',
      role: 'employee',
    };
    setEmployee(dummyEmployee);
    setLoading(false);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p>Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!employee) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <p>Employee not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/dashboard/admin/employees')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Employees
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Employee Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed employee information and eligibility
            </p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        {/* Employee Basic Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Employee personal and contact details</CardDescription>
              </div>
              <Badge variant={employee.role === 'admin' ? 'destructive' : 'default'}>
                {employee.role.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employeeId" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Employee ID
                </Label>
                <Input id="employeeId" value={employee.employeeId} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input id="name" value={employee.name} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input id="email" type="email" value={employee.email} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input id="phone" type="tel" value={employee.phone} disabled={!isEditing} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
            <CardDescription>Department, designation, and employment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Department
                </Label>
                <Input id="department" value={employee.department} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="designation" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Designation
                </Label>
                <Input id="designation" value={employee.designation} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joiningDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joining Date
                </Label>
                <Input id="joiningDate" type="date" value={employee.joiningDate} disabled={!isEditing} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category
                </Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={employee.category}
                  disabled={!isEditing}
                >
                  <option value="White Collar">White Collar</option>
                  <option value="Blue Collar">Blue Collar</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Eligibility Criteria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Eligibility Criteria
            </CardTitle>
            <CardDescription>Reimbursement categories this employee is eligible for</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="eligibleCriteria">Eligible Categories</Label>
              <textarea
                id="eligibleCriteria"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={employee.eligibleCriteria}
                disabled={!isEditing}
              />
              <p className="text-xs text-muted-foreground">
                Specify which reimbursement categories this employee can claim
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Reimbursement Claims - Detailed Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Reimbursement Details</CardTitle>
                <CardDescription>Complete reimbursement history with eligibility status</CardDescription>
              </div>
              <Badge variant="success">
                ✓ Eligible for Reimbursement
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left text-sm font-medium">Invoice No.</th>
                    <th className="py-3 text-left text-sm font-medium">Category</th>
                    <th className="py-3 text-left text-sm font-medium">Amount</th>
                    <th className="py-3 text-left text-sm font-medium">Date of Claim</th>
                    <th className="py-3 text-left text-sm font-medium">Date of Reimbursement</th>
                    <th className="py-3 text-left text-sm font-medium">Status</th>
                    <th className="py-3 text-left text-sm font-medium">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Claim 1 */}
                  <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 text-sm font-medium">INV-2024-001</td>
                    <td className="py-3 text-sm">Travel</td>
                    <td className="py-3 text-sm">₹1,500</td>
                    <td className="py-3 text-sm">Jan 15, 2024</td>
                    <td className="py-3 text-sm">Jan 18, 2024</td>
                    <td className="py-3">
                      <Badge variant="success">Approved</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="success">✓ Eligible</Badge>
                    </td>
                  </tr>
                  
                  {/* Claim 2 */}
                  <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 text-sm font-medium">INV-2024-002</td>
                    <td className="py-3 text-sm">Food & Dining</td>
                    <td className="py-3 text-sm">₹850</td>
                    <td className="py-3 text-sm">Jan 20, 2024</td>
                    <td className="py-3 text-sm text-muted-foreground">-</td>
                    <td className="py-3">
                      <Badge variant="warning">Pending</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="success">✓ Eligible</Badge>
                    </td>
                  </tr>
                  
                  {/* Claim 3 */}
                  <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 text-sm font-medium">INV-2024-003</td>
                    <td className="py-3 text-sm">Medical</td>
                    <td className="py-3 text-sm">₹2,300</td>
                    <td className="py-3 text-sm">Feb 5, 2024</td>
                    <td className="py-3 text-sm">Feb 8, 2024</td>
                    <td className="py-3">
                      <Badge variant="success">Approved</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="success">✓ Eligible</Badge>
                    </td>
                  </tr>
                  
                  {/* Claim 4 */}
                  <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 text-sm font-medium">INV-2024-004</td>
                    <td className="py-3 text-sm">Equipment</td>
                    <td className="py-3 text-sm">₹5,000</td>
                    <td className="py-3 text-sm">Feb 12, 2024</td>
                    <td className="py-3 text-sm">Feb 15, 2024</td>
                    <td className="py-3">
                      <Badge variant="success">Approved</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="success">✓ Eligible</Badge>
                    </td>
                  </tr>
                  
                  {/* Claim 5 */}
                  <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 text-sm font-medium">INV-2024-005</td>
                    <td className="py-3 text-sm">Lodging</td>
                    <td className="py-3 text-sm">₹3,200</td>
                    <td className="py-3 text-sm">Mar 10, 2024</td>
                    <td className="py-3 text-sm text-muted-foreground">-</td>
                    <td className="py-3">
                      <Badge variant="warning">Pending</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="success">✓ Eligible</Badge>
                    </td>
                  </tr>
                  
                  {/* Claim 6 */}
                  <tr className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                    <td className="py-3 text-sm font-medium">INV-2024-006</td>
                    <td className="py-3 text-sm">Travel</td>
                    <td className="py-3 text-sm">₹2,100</td>
                    <td className="py-3 text-sm">Mar 22, 2024</td>
                    <td className="py-3 text-sm">Mar 25, 2024</td>
                    <td className="py-3">
                      <Badge variant="success">Approved</Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="success">✓ Eligible</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Date Range Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Reimbursement Period Summary</CardTitle>
            <CardDescription>Reimbursement activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Reimbursement Start Date</p>
                <p className="text-lg font-semibold">January 15, 2024</p>
                <p className="text-xs text-muted-foreground">First claim submitted</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Last Reimbursement Date</p>
                <p className="text-lg font-semibold">March 25, 2024</p>
                <p className="text-xs text-muted-foreground">Most recent approval</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Total Period</p>
                <p className="text-lg font-semibold">70 days</p>
                <p className="text-xs text-muted-foreground">Jan 15 - Mar 25, 2024</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Average Processing Time</p>
                <p className="text-lg font-semibold">3.2 days</p>
                <p className="text-xs text-muted-foreground">From claim to reimbursement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Total Claims</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">₹4,650</p>
                <p className="text-xs text-muted-foreground">Total Reimbursed</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

