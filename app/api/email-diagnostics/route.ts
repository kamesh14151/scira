import { NextRequest, NextResponse } from 'next/server';
import { serverEnv } from '@/env/server';

// Diagnostic endpoint to check configuration
// Access via: /api/email-diagnostics
export async function GET(request: NextRequest) {
  try {
    const diagnostics = {
      resend: {
        apiKeyConfigured: !!serverEnv.RESEND_API_KEY,
        apiKeyPrefix: serverEnv.RESEND_API_KEY ? serverEnv.RESEND_API_KEY.substring(0, 6) + '...' : 'NOT SET',
        apiKeyLength: serverEnv.RESEND_API_KEY ? serverEnv.RESEND_API_KEY.length : 0,
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        vercel: !!process.env.VERCEL,
        vercelEnv: process.env.VERCEL_ENV || 'not set',
      },
      emailDomains: {
        welcome: 'welcome@ajstudioz.co.in',
        security: 'security@ajstudioz.co.in',
        noreply: 'noreply@ajstudioz.co.in',
      },
      timestamp: new Date().toISOString(),
    };

    console.log('📊 Email Diagnostics:', JSON.stringify(diagnostics, null, 2));

    return NextResponse.json(diagnostics);
  } catch (error) {
    console.error('❌ Diagnostics error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate diagnostics',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
