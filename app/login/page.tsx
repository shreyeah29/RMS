'use client';

import { signIn } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedLoginLeft } from '@/components/login/AnimatedLoginLeft';
import { User, Building2, Mail, Lock } from 'lucide-react';

type UserType = 'employee' | 'company';

function LoginForm() {
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
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Animated Left Side */}
      <AnimatedLoginLeft />

      {/* Login Form Right Side */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              {userType === 'employee' ? (
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
                  <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              ) : (
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {userType === 'employee' ? 'Employee Sign In' : 'Company Sign In'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {userType === 'employee' 
                ? 'Access your personal dashboard' 
                : 'Access your company admin dashboard'}
            </p>
          </div>

          {/* Demo Credentials Info */}
          {userType === 'company' && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                <span className="font-semibold">Demo:</span> admin@company.com / Admin@1234
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                <Mail className="h-4 w-4 inline mr-2" />
                {userType === 'employee' ? 'Employee Email' : 'Company Email'}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={userType === 'employee' ? 'employee@company.com' : 'company@company.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                <Lock className="h-4 w-4 inline mr-2" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <a href="/register" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                  Create an account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
        <Card className="w-full max-w-lg shadow-xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Reimbursement Management System
            </CardTitle>
            <CardDescription className="text-center">
              Loading...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

