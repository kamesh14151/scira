# Email Setup Checklist for Scira

## ✅ Steps to Enable Email Notifications

### 1. **Resend Account Setup**
- [ ] Sign up at [resend.com](https://resend.com)
- [ ] Get your API key from the dashboard
- [ ] Copy the API key (starts with `re_`)

### 2. **Domain Verification in Resend**
- [ ] Go to Resend Dashboard → Domains
- [ ] Add your domain: `ajstudioz.co.in`
- [ ] Add the DNS records provided by Resend to your domain DNS:
  - SPF record
  - DKIM record
  - MX record (optional, for receiving)
- [ ] Wait for DNS propagation (5-60 minutes)
- [ ] Verify the domain in Resend dashboard

**Note:** Until the domain is verified, you can only send emails to verified recipients or use Resend's test email addresses.

### 3. **Vercel Environment Variable**
- [ ] Go to your Vercel project: https://vercel.com/kamesh14151s-projects/scira-jade-one
- [ ] Navigate to Settings → Environment Variables
- [ ] Add new variable:
  - **Name:** `RESEND_API_KEY`
  - **Value:** Your Resend API key (e.g., `re_123abc...`)
  - **Environments:** Production, Preview, Development (select all)
- [ ] Click "Save"
- [ ] Redeploy your application for changes to take effect

### 4. **Test Email Sending**
After setting up, test the emails by:
1. Creating a new account (triggers welcome email)
2. Signing in (triggers login notification email)
3. Check console logs in Vercel for any errors

### 5. **Troubleshooting**

#### Emails not being sent?
Check console logs for these messages:
- ✅ `Resend email service initialized successfully` - Service is configured
- ⚠️  `RESEND_API_KEY not configured!` - API key is missing
- ❌ `Failed to send email:` - Check the error message

#### Common Issues:
1. **"Email service not configured"**
   - RESEND_API_KEY environment variable is missing or empty
   - Solution: Add the API key to Vercel environment variables

2. **"Domain not verified"**
   - Your domain hasn't been verified in Resend
   - Solution: Complete domain verification in Resend dashboard

3. **Emails going to spam**
   - Domain is not properly configured with SPF/DKIM
   - Solution: Verify all DNS records are correctly added

4. **"API key invalid"**
   - The API key is incorrect or expired
   - Solution: Generate a new API key in Resend

### 6. **Current Email Types**

The following emails are automatically sent:

1. **Welcome Email** - Sent when users sign up
   - From: `AJ AI <welcome@ajstudioz.co.in>`
   - Subject: "Welcome to AJ AI!"

2. **Login Notification** - Sent when users log in
   - From: `AJ Security <security@ajstudioz.co.in>`
   - Subject: "We've noticed a new login"

3. **Lookout Completed** - Sent when daily lookout searches complete
   - From: `AJ AI <noreply@ajstudioz.co.in>`
   - Subject: "Lookout Complete: [Chat Title]"

### 7. **Monitoring**

Check Resend dashboard for:
- Email delivery status
- Bounce rates
- Spam complaints
- API usage

### 8. **Alternative: Test Mode**

If you can't verify the domain immediately:
- Use Resend's test mode
- Emails will only be sent to verified email addresses
- Add your email in Resend dashboard → Settings → Verified Senders
