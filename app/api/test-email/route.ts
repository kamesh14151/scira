import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail, sendNewLoginEmail, sendLookoutCompletionEmail } from '@/lib/email';

// Test endpoint to manually trigger email sends
// Access via: /api/test-email?type=welcome&email=test@example.com
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'welcome';
    const email = searchParams.get('email');
    const name = searchParams.get('name') || 'Test User';

    if (!email) {
      return NextResponse.json(
        { 
          error: 'Email parameter is required', 
          usage: '/api/test-email?type=welcome&email=test@example.com&name=Test' 
        },
        { status: 400 }
      );
    }

    console.log(`📧 Test email requested - Type: ${type}, Email: ${email}`);

    let result;
    
    switch (type) {
      case 'welcome':
        result = await sendWelcomeEmail(email, name);
        break;
        
      case 'login':
        result = await sendNewLoginEmail(
          email, 
          name,
          'Test Device',
          'Test Location',
          new Date().toISOString()
        );
        break;
        
      case 'lookout':
        result = await sendLookoutCompletionEmail(
          email,
          name,
          'Test Search Query',
          5,
          'https://scira.ai/search/test-id'
        );
        break;
        
      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `${type} email sent successfully!`,
        emailId: result.id,
        recipient: email,
        type: type
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
        type: type,
        recipient: email
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Test email error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
