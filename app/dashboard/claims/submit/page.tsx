'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Upload } from 'lucide-react';

const claimCategories = [
  'Travel',
  'Food & Dining',
  'Medical',
  'Equipment',
  'Lodging',
  'Internet & Communication',
  'Miscellaneous'
];

export default function SubmitClaimPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    invoiceNumber: '',
    dateOfClaim: '',
    remarks: '',
    claimedFor: 'Self',
    files: [] as File[],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // TODO: Implement API call to submit claim
    setTimeout(() => {
      alert('Claim submitted successfully!');
      setSubmitting(false);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: Array.from(e.target.files),
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Submit Claim</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Submit a new reimbursement claim
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Claim Details</CardTitle>
            <CardDescription>
              Fill in the details of your reimbursement claim
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select category</option>
                    {claimCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                  <Input
                    id="invoiceNumber"
                    placeholder="INV-2024-001"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfClaim">Date of Claim *</Label>
                  <Input
                    id="dateOfClaim"
                    type="date"
                    value={formData.dateOfClaim}
                    onChange={(e) => setFormData({ ...formData, dateOfClaim: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="claimedFor">Claimed For *</Label>
                  <select
                    id="claimedFor"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.claimedFor}
                    onChange={(e) => setFormData({ ...formData, claimedFor: e.target.value })}
                  >
                    <option value="Self">Self</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Additional notes..."
                  rows={3}
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="files">Upload Receipts/Bills (PDF, JPG, PNG) *</Label>
                <div className="mt-2">
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed p-4 hover:bg-accent">
                    <Upload className="h-5 w-5" />
                    <span className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {formData.files.length > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formData.files.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Claim'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

