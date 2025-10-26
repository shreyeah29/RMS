import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, User, DollarSign, FileText, Shield, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      <div className="relative overflow-hidden">
        {/* Header */}
        <header className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">RMS</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Reimbursement Management
              <br />
              Made Simple
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Streamline your expense claims, track reimbursements, and manage your financial operations with enterprise-grade security.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Easy Claim Submission</h3>
              <p className="text-blue-100">
                Submit your reimbursement claims with receipts and invoices in just a few clicks.
              </p>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure & Reliable</h3>
              <p className="text-blue-100">
                Enterprise-grade security with encrypted data, secure file storage, and audit trails.
              </p>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Analytics</h3>
              <p className="text-blue-100">
                Track spending patterns, department budgets, and financial insights with detailed reports.
              </p>
            </Card>
          </div>

          {/* Sign In Options Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <Link href="/login?type=employee">
              <Card className="p-8 hover:shadow-2xl transition-all cursor-pointer border-2 hover:border-blue-300 bg-white/95 dark:bg-slate-900/95">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Employee Sign In</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Access your personal dashboard to submit claims, track reimbursements, and view your expense history.
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Sign in as Employee
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </Link>

            <Link href="/login?type=company">
              <Card className="p-8 hover:shadow-2xl transition-all cursor-pointer border-2 hover:border-blue-300 bg-white/95 dark:bg-slate-900/95">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Company Sign In</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Access the admin dashboard to manage employees, review claims, approve reimbursements, and view analytics.
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium">
                  Sign in as Company
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
