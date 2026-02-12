import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/admin/server';

export default async function AdminPage() {
  await requireAdmin();
  
  // Redirect to users list page
  redirect('/admin/users');
}
