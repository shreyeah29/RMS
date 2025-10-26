'use client';

import { X, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CSVUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CSVUploadModal({ isOpen, onClose, onUpload }: CSVUploadModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Bulk Upload Employees</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CSV Format</CardTitle>
              <CardDescription>Upload a CSV file with employee data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">CSV Columns (in order):</p>
                <ol className="text-sm space-y-1 text-muted-foreground">
                  <li>1. Employee ID (e.g., EMP001)</li>
                  <li>2. Full Name</li>
                  <li>3. Email Address</li>
                  <li>4. Department</li>
                  <li>5. Designation</li>
                  <li>6. Category (White Collar / Blue Collar)</li>
                  <li>7. Status (Active / Inactive)</li>
                </ol>
              </div>

              <div className="flex items-center gap-4">
                <Button asChild>
                  <label htmlFor="csv-file" className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Choose CSV File
                  </label>
                </Button>
                <input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={onUpload}
                  className="hidden"
                />
                <Button variant="outline" asChild>
                  <a
                    href="data:text/csv;charset=utf-8,EMP%20ID%2CName%2CEmail%2CDepartment%2CDesignation%2CCategory%2CStatus%0AEMP007%2CAlice%20Johnson%2Calice.johnson@company.com%2CEngineering%2CDot%20NET%20Developer%2CWhite%20Collar%2CActive%0AEMP008%2CJames%20Wilson%2Cjames.wilson@company.com%2CFinance%2CTax%20Consultant%2CWhite%20Collar%2CActive"
                    download="employee_template.csv"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </a>
                </Button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> CSV file should have headers. First row will be skipped.
                  Maximum 100 employees per upload.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

