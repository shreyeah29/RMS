import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { DollarSign, FileText, Clock, CheckCircle, User, History, BookOpen, Users, FileCheck, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // This is a placeholder - in production, you'd fetch real data
  const stats = {
    totalClaims: 12,
    totalAmount: 45000,
    pendingClaims: 5,
    approvedClaims: 7,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your reimbursement management system
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Claims
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClaims}</div>
              <p className="text-xs text-muted-foreground">
                All time claims
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Amount
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{stats.totalAmount.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total reimbursed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingClaims}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedClaims}</div>
              <p className="text-xs text-muted-foreground">
                Approved claims
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your recent reimbursement claims
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent activity. Submit your first claim to get started.
            </p>
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Access</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {session?.user?.role === 'employee' ? (
              <>
                <Link href="/dashboard/claims/submit">
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Submit Claim</h3>
                        <p className="text-sm text-muted-foreground">File a new reimbursement request</p>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Link href="/dashboard/claims">
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <History className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">My Claims</h3>
                        <p className="text-sm text-muted-foreground">View claim history</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard/admin/employees">
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Manage Employees</h3>
                        <p className="text-sm text-muted-foreground">Add, edit, or view employees</p>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Link href="/dashboard/admin/claims">
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                        <FileCheck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">All Claims</h3>
                        <p className="text-sm text-muted-foreground">Review and approve claims</p>
                      </div>
                    </div>
                  </Card>
                </Link>
                <Link href="/dashboard/admin/analytics">
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Analytics</h3>
                        <p className="text-sm text-muted-foreground">View spending insights</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </>
            )}
            <Link href="/dashboard/profile">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Profile</h3>
                    <p className="text-sm text-muted-foreground">Manage your profile</p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/dashboard/policy">
              <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Policy</h3>
                    <p className="text-sm text-muted-foreground">View company policies</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

