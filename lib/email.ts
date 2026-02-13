import { Resend } from 'resend';
import { serverEnv } from '@/env/server';
import SearchCompletedEmail from '@/components/emails/lookout-completed';
import NewLoginEmail from '@/components/emails/new-login';
import WelcomeEmail from '@/components/emails/welcome';

export const resend = serverEnv.RESEND_API_KEY ? new Resend(serverEnv.RESEND_API_KEY) : null;

if (!resend) {
  console.warn('⚠️⚠️⚠️ RESEND_API_KEY not configured! Email notifications will NOT be sent. ⚠️⚠️⚠️');
} else {
  console.log('✅ Resend email service initialized successfully');
}

interface SendLookoutCompletionEmailParams {
  to: string;
  chatTitle: string;
  assistantResponse: string;
  chatId: string;
}

export async function sendLookoutCompletionEmail({
  to,
  chatTitle,
  assistantResponse,
  chatId,
}: SendLookoutCompletionEmailParams) {
  if (!resend) {
    console.warn('⚠️ RESEND_API_KEY not configured. Email not sent.');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }
  
  try {
    const data = await resend.emails.send({
      from: 'AJ STUDIOZ <noreply@ajstudioz.co.in>',
      to: [to],
      subject: `Lookout Complete: ${chatTitle}`,
      react: SearchCompletedEmail({
        chatTitle,
        assistantResponse,
        chatId,
      }),
    });

    console.log('✅ Lookout completion email sent successfully:', data.data?.id);
    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error('❌ Failed to send lookout completion email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

interface SendNewLoginEmailParams {
  to: string;
  userName: string;
  loginTime: string;
  ipAddress: string;
  location: string;
  browser: string;
}

export async function sendNewLoginEmail({
  to,
  userName,
  loginTime,
  ipAddress,
  location,
  browser,
}: SendNewLoginEmailParams) {
  if (!resend) {
    console.warn('⚠️ RESEND_API_KEY not configured. Email not sent.');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }
  
  try {
    const data = await resend.emails.send({
      from: 'AJ STUDIOZ Security <security@ajstudioz.co.in>',
      to: [to],
      subject: "We've noticed a new login",
      react: NewLoginEmail({
        userName,
        loginTime,
        ipAddress,
        location,
        browser,
      }),
    });

    console.log('✅ New login email sent successfully:', data.data?.id);
    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error('❌ Failed to send new login email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

interface SendWelcomeEmailParams {
  to: string;
  userName: string;
}

export async function sendWelcomeEmail({ to, userName }: SendWelcomeEmailParams) {
  if (!resend) {
    console.warn('⚠️ RESEND_API_KEY not configured. Email not sent.');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }
  
  try {
    const data = await resend.emails.send({
      from: 'AJ STUDIOZ <welcome@ajstudioz.co.in>',
      to: [to],
      subject: 'Welcome to AJ STUDIOZ!',
      react: WelcomeEmail({
        userName,
      }),
    });

    console.log('✅ Welcome email sent successfully:', data.data?.id);
    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sends a magic link sign-in email
 */
export async function sendMagicLinkEmail(email: string, url: string) {
  if (!resend) {
    console.warn('⚠️ RESEND_API_KEY not configured. Magic link email not sent.');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  try {
    const data = await resend.emails.send({
      from: 'AJ STUDIOZ <noreply@ajstudioz.co.in>',
      to: [email],
      subject: 'Sign in to AJ STUDIOZ',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 40px auto;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px 30px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                color: white;
                font-size: 28px;
                font-weight: 600;
              }
              .content {
                padding: 40px 30px;
              }
              .content p {
                margin: 0 0 20px;
                color: #555;
              }
              .button {
                display: inline-block;
                padding: 14px 32px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white !important;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                text-align: center;
                margin: 20px 0;
              }
              .button:hover {
                opacity: 0.9;
              }
              .footer {
                padding: 30px;
                text-align: center;
                color: #999;
                font-size: 12px;
                border-top: 1px solid #eee;
              }
              .link {
                color: #667eea;
                word-break: break-all;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Sign in to AJ STUDIOZ</h1>
              </div>
              <div class="content">
                <p>Hello!</p>
                <p>You requested to sign in to your AJ STUDIOZ account. Click the button below to continue:</p>
                <div style="text-align: center;">
                  <a href="${url}" class="button">Sign In to AJ STUDIOZ</a>
                </div>
                <p>Or copy and paste this link into your browser:</p>
                <p><a href="${url}" class="link">${url}</a></p>
                <p>This link will expire in 15 minutes for security reasons.</p>
                <p style="margin-top: 30px; font-size: 14px; color: #999;">
                  If you didn't request this email, you can safely ignore it.
                </p>
              </div>
              <div class="footer">
                <p>&copy; ${new Date().getFullYear()} AJ STUDIOZ. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log('✅ Magic link email sent successfully:', data.data?.id);
    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error('❌ Failed to send magic link email:', error);
    throw error;
  }
}
