'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type UserType = 'employee' | 'company';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeFromURL = searchParams.get('type');
  
  const [userType, setUserType] = useState<UserType>(
    typeFromURL === 'company' ? 'company' : 'employee'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeFromURL === 'company') {
      setUserType('company');
    } else if (typeFromURL === 'employee') {
      setUserType('employee');
    }
  }, [typeFromURL]);

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
          {/* Back to Home Link */}
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              {userType === 'employee' ? (
                <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              ) : (
                <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              )}
            </div>
          </div>

          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {userType === 'employee' ? 'Employee Sign In' : 'Company Sign In'}
          </CardTitle>
          <CardDescription className="text-center">
            {userType === 'employee' 
              ? 'Access your personal dashboard' 
              : 'Access your company admin dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {userType === 'employee' ? 'Employee Email' : 'Company Email'}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={userType === 'employee' ? 'employee@company.com' : 'company@company.com'}
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              {userType === 'employee' ? '👤 Employee Access' : '🏢 Company Access'}
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {userType === 'employee'
                ? 'Access your personal dashboard to submit claims, track reimbursements, and view your expense history.'
                : 'Access the admin dashboard to manage employees, review claims, view analytics, and handle approvals.'}
            </p>
          </div>

          {/* Demo Credentials */}
          {userType === 'company' && (
            <div className="border-t pt-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                <span className="font-medium">Demo Credentials:</span> admin@company.com / Admin@1234
              </p>
            </div>
          )}

          {/* Register Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:underline dark:text-blue-400 font-medium">
                Create an account
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

