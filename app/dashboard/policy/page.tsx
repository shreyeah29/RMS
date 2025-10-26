'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { FileText, Download, Upload } from 'lucide-react';
import { useState } from 'react';

export default function PolicyPage() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // TODO: Implement upload functionality
      alert('Upload functionality will be implemented');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Company Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and download company reimbursement policy
            </p>
          </div>
          {isAdmin && (
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Policy
            </Button>
          )}
        </div>

        {/* Admin Upload Section */}
        {isAdmin && (
          <Card>
            <CardHeader>
              <CardTitle>Upload New Policy</CardTitle>
              <CardDescription>
                Upload a new company policy document (PDF only)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="policy-file" className="text-sm font-medium">
                  Select PDF File
                </label>
                <Input
                  id="policy-file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </div>
              {file && (
                <p className="text-sm text-muted-foreground">
                  Selected: {file.name}
                </p>
              )}
              <Button onClick={handleUpload} disabled={!file}>
                Upload Policy Document
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Current Policies */}
        <Card>
          <CardHeader>
            <CardTitle>Reimbursement Policy</CardTitle>
            <CardDescription>
              Company guidelines for reimbursement claims
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Reimbursement Policy Document</h3>
                  <p className="text-sm text-muted-foreground">
                    Last updated: October 2024
                  </p>
                </div>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

