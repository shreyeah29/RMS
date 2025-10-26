import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { authOptions } from '@/lib/auth';
import { User, Mail, Phone, Briefcase, Calendar, Building, MapPin, DollarSign, Hash } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Mock data - Replace with actual data from database
  const employeeData = {
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    designation: 'Senior Developer',
    joiningDate: '2022-01-15',
    category: 'White Collar',
    manager: 'Sarah Williams',
    officeLocation: 'New York Office',
    employmentType: 'Full-time',
    salary: '₹80,000/month',
    reportingManager: 'Sarah Williams - HR Manager',
    workEmail: session.user.email,
    personalEmail: 'john.doe@personal.com',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal and company information
          </p>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Update your personal contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="employeeId" className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Employee ID
                  </Label>
                  <Input id="employeeId" value={session.user.employeeId} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input id="name" value={session.user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Work Email
                  </Label>
                  <Input id="email" type="email" value={employeeData.workEmail} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input id="phone" type="tel" value={employeeData.phone} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="personalEmail">Personal Email</Label>
                  <Input id="personalEmail" type="email" value={employeeData.personalEmail} />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Employment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Employment Information
            </CardTitle>
            <CardDescription>
              Your role, department, and company details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Department
                  </Label>
                  <Input id="department" value={employeeData.department} disabled />
                  <p className="text-xs text-muted-foreground">Contact HR to change department</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Designation
                  </Label>
                  <Input id="designation" value={employeeData.designation} disabled />
                  <p className="text-xs text-muted-foreground">Contact HR to change designation</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Joining Date
                  </Label>
                  <Input id="joiningDate" type="date" value={employeeData.joiningDate} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Employee Category</Label>
                  <div className="flex items-center gap-2">
                    <Input id="category" value={employeeData.category} disabled />
                    <Badge variant={employeeData.category === 'White Collar' ? 'default' : 'secondary'}>
                      {employeeData.category}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">Employment Type</Label>
                  <Input id="employmentType" value={employeeData.employmentType} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="officeLocation" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Office Location
                  </Label>
                  <Input id="officeLocation" value={employeeData.officeLocation} disabled />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="manager">Reporting Manager</Label>
                  <Input id="manager" value={employeeData.reportingManager} disabled />
                  <p className="text-xs text-muted-foreground">Your direct supervisor</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Additional Information
            </CardTitle>
            <CardDescription>
              Compensation and other details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="salary" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Compensation
                  </Label>
                  <Input id="salary" value={employeeData.salary} disabled />
                  <p className="text-xs text-muted-foreground">Contact HR for salary-related queries</p>
                </div>
                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <div>
                    <Badge variant="success" className="mt-2">Active</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Your account is active</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Manage your password and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters with uppercase, lowercase, and numbers
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit" variant="destructive">Change Password</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

