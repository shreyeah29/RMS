'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Upload } from 'lucide-react';

// Mock data
const mockEmployees = [
  {
    id: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    designation: 'Senior Developer',
    category: 'White Collar',
    status: 'Active',
  },
  {
    id: 'EMP002',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    department: 'HR',
    designation: 'HR Manager',
    category: 'White Collar',
    status: 'Active',
  },
];

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employee Management</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage employee profiles and eligibility
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload (CSV)
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employees</CardTitle>
                <CardDescription>Manage all company employees</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left text-sm font-medium">Employee ID</th>
                    <th className="py-3 text-left text-sm font-medium">Name</th>
                    <th className="py-3 text-left text-sm font-medium">Email</th>
                    <th className="py-3 text-left text-sm font-medium">Department</th>
                    <th className="py-3 text-left text-sm font-medium">Designation</th>
                    <th className="py-3 text-left text-sm font-medium">Category</th>
                    <th className="py-3 text-left text-sm font-medium">Status</th>
                    <th className="py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="py-3 text-sm font-medium">{employee.id}</td>
                      <td className="py-3 text-sm">{employee.name}</td>
                      <td className="py-3 text-sm">{employee.email}</td>
                      <td className="py-3 text-sm">{employee.department}</td>
                      <td className="py-3 text-sm">{employee.designation}</td>
                      <td className="py-3 text-sm">
                        <Badge>{employee.category}</Badge>
                      </td>
                      <td className="py-3">
                        <Badge variant="success">{employee.status}</Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
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

