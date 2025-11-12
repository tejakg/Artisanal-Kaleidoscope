'use client';

import { AuthProvider } from '@/components/admin/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
}
