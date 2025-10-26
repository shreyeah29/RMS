import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export default function PolicyPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Company Policy</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and download company reimbursement policy
          </p>
        </div>

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

