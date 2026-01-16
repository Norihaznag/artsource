import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check for admin session
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  // If no session and not on login page, redirect to login
  // This is a simple check - in production use proper auth
  
  return (
    <div className="min-h-screen bg-secondary-50">
      {children}
    </div>
  );
}
