'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { toast } from 'sonner';

export function AuthErrorHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const error = searchParams?.get('error');

  useEffect(() => {
    if (error) {
      // Map error codes to user-friendly messages
      const errorMessages: Record<string, string> = {
        invalid_code: 'Authentication failed. Please try signing in again.',
        access_denied: 'You cancelled the sign-in process.',
        server_error: 'Server error occurred. Please try again later.',
      };

      const message = errorMessages[error] || 'Authentication error occurred.';
      
      // Only show error if user is not authenticated
      if (!session) {
        toast.error(message);
      }

      // Clean up URL by removing error parameter
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      url.searchParams.delete('error_description');
      router.replace(url.pathname + url.search);
    }
  }, [error, session, router]);

  return null;
}
