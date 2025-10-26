'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';
import { AddEmployeeModal } from '@/components/AddEmployeeModal';
import { CSVUploadModal } from '@/components/CSVUploadModal';

// Mock data with more dummy employees
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
  {
    id: 'EMP003',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Finance',
    designation: 'Financial Analyst',
    category: 'White Collar',
    status: 'Active',
  },
  {
    id: 'EMP004',
    name: 'Sarah Williams',
    email: 'sarah.williams@company.com',
    department: 'Engineering',
    designation: 'Junior Developer',
    category: 'White Collar',
    status: 'Active',
  },
  {
    id: 'EMP005',
    name: 'David Johnson',
    email: 'david.johnson@company.com',
    department: 'Marketing',
    designation: 'Marketing Manager',
    category: 'White Collar',
    status: 'Active',
  },
  {
    id: 'EMP006',
    name: 'Emily Brown',
    email: 'emily.brown@company.com',
    department: 'Sales',
    designation: 'Sales Representative',
    category: 'White Collar',
    status: 'Active',
  },
];

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(mockEmployees);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCSVModal, setShowCSVModal] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    designation: '',
    category: '',
    status: '',
  });
  const router = useRouter();

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filters.department || employee.department === filters.department;
    const matchesCategory = !filters.category || employee.category === filters.category;
    const matchesStatus = !filters.status || employee.status === filters.status;
    
    return matchesSearch && matchesDepartment && matchesCategory && matchesStatus;
  });

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());
      
      const newEmployees = lines.slice(1)
        .filter(line => line.trim())
        .map(line => {
          const values = line.split(',').map(v => v.trim());
          return {
            id: values[0] || `EMP${String(employees.length + 1).padStart(3, '0')}`,
            name: values[1] || 'Unknown',
            email: values[2] || '',
            department: values[3] || 'Unassigned',
            designation: values[4] || '',
            category: values[5] || 'White Collar',
            status: values[6] || 'Active',
          };
        });
      
      setEmployees([...employees, ...newEmployees]);
      setShowCSVModal(false);
      alert(`Successfully added ${newEmployees.length} employees!`);
    };
    reader.readAsText(file);
  };

  const departments = Array.from(new Set(employees.map(emp => emp.department)));
  const designations = Array.from(new Set(employees.map(emp => emp.designation)));
  const categories = Array.from(new Set(employees.map(emp => emp.category)));

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
            <Button variant="outline" onClick={() => setShowCSVModal(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload (CSV)
            </Button>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter employees by criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="space-y-2 flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFilters({ department: '', designation: '', category: '', status: '' })}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employees ({filteredEmployees.length})</CardTitle>
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
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-muted-foreground">
                        No employees found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                      <td className="py-3 text-sm font-medium cursor-pointer hover:text-blue-600" onClick={() => router.push(`/dashboard/admin/employees/${employee.id}`)}>
                        {employee.id}
                      </td>
                      <td className="py-3 text-sm cursor-pointer hover:text-blue-600" onClick={() => router.push(`/dashboard/admin/employees/${employee.id}`)}>
                        {employee.name}
                      </td>
                      <td className="py-3 text-sm">{employee.email}</td>
                      <td className="py-3 text-sm">{employee.department}</td>
                      <td className="py-3 text-sm">{employee.designation}</td>
                      <td className="py-3">
                        <Badge>{employee.category}</Badge>
                      </td>
                      <td className="py-3">
                        <Badge variant="success">{employee.status}</Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => router.push(`/dashboard/admin/employees/${employee.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
                                setEmployees(employees.filter(emp => emp.id !== employee.id));
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Employee Modal */}
        <AddEmployeeModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={(newEmployee) => {
            setEmployees([...employees, newEmployee]);
            setShowAddModal(false);
          }}
        />

        {/* CSV Upload Modal */}
        <CSVUploadModal
          isOpen={showCSVModal}
          onClose={() => setShowCSVModal(false)}
          onUpload={handleCSVUpload}
        />
      </div>
    </DashboardLayout>
  );
}

