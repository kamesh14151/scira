import { createAuthClient } from 'better-auth/react';
import { dodopaymentsClient } from '@dodopayments/better-auth';
import { polarClient } from '@polar-sh/better-auth';
import { lastLoginMethodClient } from 'better-auth/client/plugins';

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use window.location.origin in production
    if (process.env.NODE_ENV === 'production') {
      return window.location.origin;
    }
    return 'http://localhost:3000';
  }
  // Server-side fallback
  return process.env.NEXT_PUBLIC_APP_URL || 'https://chat.ajcompany.me';
};

export const betterauthClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [dodopaymentsClient()],
});

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [polarClient(), lastLoginMethodClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
