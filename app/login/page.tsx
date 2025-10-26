'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building2 } from 'lucide-react';

type UserType = 'employee' | 'admin';

export default function LoginPage() {
  const [userType, setUserType] = useState<UserType>('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Reimbursement Management System
          </CardTitle>
          <CardDescription className="text-center">
            Choose your account type to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setUserType('employee')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                userType === 'employee'
                  ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <User className="h-5 w-5" />
              Employee Login
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-all ${
                userType === 'admin'
                  ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Building2 className="h-5 w-5" />
              Admin / HR Login
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {userType === 'employee' ? 'Employee Email' : 'Admin Email'}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={userType === 'employee' ? 'employee@company.com' : 'admin@company.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={loading}
            >
              {loading ? 'Signing in...' : userType === 'employee' ? 'Sign In as Employee' : 'Sign In as Admin'}
            </Button>
          </form>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              {userType === 'employee' ? '👤 Employee Access' : '🏢 Admin Access'}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {userType === 'employee'
                ? 'Access your personal dashboard to submit claims, track reimbursements, and view your expense history.'
                : 'Access the admin dashboard to manage employees, review claims, view analytics, and handle approvals.'}
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="border-t pt-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
              <span className="font-medium">Demo Credentials:</span> admin@company.com / Admin@1234
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

