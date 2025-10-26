'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, User, Mail, Phone, Lock, Hash, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('employee');
  
  const [employeeForm, setEmployeeForm] = useState({
    step: 1,
    employeeId: '',
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [companyForm, setCompanyForm] = useState({
    companyId: '',
    companyName: '',
    gstin: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    adminPassword: '',
    confirmPassword: '',
  });

  const handleEmployeeRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call for employee registration
    alert('Employee registration functionality will be implemented soon!');
  };

  const handleCompanyRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call for company registration
    alert('Company registration functionality will be implemented soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to RMS</h1>
          <p className="text-gray-600 dark:text-gray-400">Create your account to get started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Register as an Employee or Company Admin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="employee">
                  <User className="h-4 w-4 mr-2" />
                  Employee Registration
                </TabsTrigger>
                <TabsTrigger value="company">
                  <Building2 className="h-4 w-4 mr-2" />
                  Company Registration
                </TabsTrigger>
              </TabsList>

              {/* Employee Registration */}
              <TabsContent value="employee" className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Step {employeeForm.step} of 2:</strong> {employeeForm.step === 1 ? 'Verify your employee ID and company' : 'Complete your personal details'}
                  </p>
                </div>

                {employeeForm.step === 1 ? (
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId" className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        Employee ID
                      </Label>
                      <Input
                        id="employeeId"
                        placeholder="Enter your employee ID (e.g., EMP001)"
                        value={employeeForm.employeeId}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, employeeId: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Your employee ID provided by HR
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Enter your company name"
                        value={employeeForm.companyName}
                        onChange={(e) => setEmployeeForm({ ...employeeForm, companyName: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Search for your company name
                      </p>
                    </div>

                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => setEmployeeForm({ ...employeeForm, step: 2 })}
                      disabled={!employeeForm.employeeId || !employeeForm.companyName}
                    >
                      Verify & Continue
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleEmployeeRegister} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={employeeForm.fullName}
                          onChange={(e) => setEmployeeForm({ ...employeeForm, fullName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@company.com"
                          value={employeeForm.email}
                          onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1234567890"
                          value={employeeForm.phone}
                          onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Password
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a secure password"
                          value={employeeForm.password}
                          onChange={(e) => setEmployeeForm({ ...employeeForm, password: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={employeeForm.confirmPassword}
                          onChange={(e) => setEmployeeForm({ ...employeeForm, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setEmployeeForm({ ...employeeForm, step: 1 })}
                      >
                        Back
                      </Button>
                      <Button type="submit" className="w-full">
                        Create Employee Account
                      </Button>
                    </div>
                  </form>
                )}
              </TabsContent>

              {/* Company Registration */}
              <TabsContent value="company" className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    Register your company and create your admin account
                  </p>
                </div>

                <form onSubmit={handleCompanyRegister} className="space-y-6">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Company Information
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyId" className="flex items-center gap-2">
                          <Hash className="h-4 w-4" />
                          Company ID
                        </Label>
                        <Input
                          id="companyId"
                          placeholder="COMP001"
                          value={companyForm.companyId}
                          onChange={(e) => setCompanyForm({ ...companyForm, companyId: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Company Name
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="Your Company Name"
                          value={companyForm.companyName}
                          onChange={(e) => setCompanyForm({ ...companyForm, companyName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gstin" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          GSTIN
                        </Label>
                        <Input
                          id="gstin"
                          placeholder="29ABCDE1234F1Z5"
                          value={companyForm.gstin}
                          onChange={(e) => setCompanyForm({ ...companyForm, gstin: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input
                          id="pincode"
                          placeholder="123456"
                          value={companyForm.pincode}
                          onChange={(e) => setCompanyForm({ ...companyForm, pincode: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address" className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Address
                        </Label>
                        <Input
                          id="address"
                          placeholder="Street address"
                          value={companyForm.address}
                          onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="City"
                          value={companyForm.city}
                          onChange={(e) => setCompanyForm({ ...companyForm, city: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="State"
                          value={companyForm.state}
                          onChange={(e) => setCompanyForm({ ...companyForm, state: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Admin Account */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Admin Account
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="adminName">Admin Full Name</Label>
                        <Input
                          id="adminName"
                          placeholder="Admin Name"
                          value={companyForm.adminName}
                          onChange={(e) => setCompanyForm({ ...companyForm, adminName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="adminEmail" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Admin Email
                        </Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          placeholder="admin@company.com"
                          value={companyForm.adminEmail}
                          onChange={(e) => setCompanyForm({ ...companyForm, adminEmail: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="adminPhone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Admin Phone
                        </Label>
                        <Input
                          id="adminPhone"
                          type="tel"
                          placeholder="+1234567890"
                          value={companyForm.adminPhone}
                          onChange={(e) => setCompanyForm({ ...companyForm, adminPhone: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="adminPassword" className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Admin Password
                        </Label>
                        <Input
                          id="adminPassword"
                          type="password"
                          placeholder="Create admin password"
                          value={companyForm.adminPassword}
                          onChange={(e) => setCompanyForm({ ...companyForm, adminPassword: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm admin password"
                          value={companyForm.confirmPassword}
                          onChange={(e) => setCompanyForm({ ...companyForm, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Company Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

