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

#### Option A: Manual Testing (Recommended)
Use the test endpoint to manually trigger emails:
1. **Check Configuration:**
   ```
   https://your-domain.vercel.app/api/email-diagnostics
   ```
   This will show:
   - Whether API key is configured
   - Current environment settings
   - Email domains being used

2. **Send Test Welcome Email:**
   ```
   https://your-domain.vercel.app/api/test-email?type=welcome&email=your@email.com&name=YourName
   ```

3. **Send Test Login Email:**
   ```
   https://your-domain.vercel.app/api/test-email?type=login&email=your@email.com&name=YourName
   ```

4. **Send Test Lookout Email:**
   ```
   https://your-domain.vercel.app/api/test-email?type=lookout&email=your@email.com&name=YourName
   ```

#### Option B: Trigger via User Actions
1. Creating a new account (triggers welcome email)
2. Signing in (triggers login notification email)
3. Completing a lookout search (triggers completion email)

#### Option C: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Navigate to the "Functions" tab
4. Look for auth-related function logs
5. Check for these messages:
   - `✅ Resend email service initialized`
   - `🎯 SignUp event triggered`
   - `✅ Email sent successfully!`

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

---

## 🔍 Advanced Debugging: Same API Key Works in Other Project

If emails work in **AJ-STUDIOZ-CHAT** but not in **Scira** with the same API key:

### Step 1: Verify Environment Variable is Set
```bash
# Check via diagnostics endpoint
curl https://your-scira-domain.vercel.app/api/email-diagnostics
```

Look for:
- `apiKeyConfigured: true`
- `apiKeyPrefix: "re_..."` (should match your key)
- `apiKeyLength: 46` (or similar)

### Step 2: Verify the API Key in Vercel
1. Go to Vercel Dashboard → scira project → Settings → Environment Variables
2. Find `RESEND_API_KEY`
3. Check it matches exactly with the working project (no extra spaces, no quotes)
4. Make sure it's enabled for **all environments** (Production, Preview, Development)
5. After any changes, **redeploy** the project

### Step 3: Test Email Sending Directly
```bash
# Test welcome email
curl "https://your-scira-domain.vercel.app/api/test-email?type=welcome&email=your@email.com&name=Test"

# Expected response:
{
  "success": true,
  "message": "welcome email sent successfully!",
  "emailId": "...",
  "recipient": "your@email.com"
}
```

If you get an error, check the error message carefully.

### Step 4: Compare Auth Event Hooks
Check if auth events are actually being triggered:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → scira → Deployments
   - Click latest deployment → Functions tab
   - Look for logs containing:
     - `🎯 SignUp event triggered for: [email]`
     - `✅ Welcome email sent successfully!`
     - `🎯 SignIn event triggered for: [email]`

2. **If no logs appear**, the events aren't firing:
   - Verify `better-auth` package (not `better-auth/minimal`)
   - Check [lib/auth.ts](lib/auth.ts#L1) imports `from 'better-auth'`
   - Verify events are defined in auth configuration

### Step 5: Compare Package Versions
Check if there's a version mismatch:

**In AJ-STUDIOZ-CHAT:**
```bash
cd TOMO_CHAT
grep '"better-auth"' package.json
grep '"resend"' package.json
grep '"@react-email' package.json
```

**In Scira:**
```bash
cd scira/scira
grep '"better-auth"' package.json
grep '"resend"' package.json
grep '"@react-email' package.json
```

Ensure versions match or are compatible.

### Step 6: Test from Development
```bash
cd scira/scira

# Make sure env variables are loaded
echo $RESEND_API_KEY

# Run dev server
pnpm dev

# Try signing up/logging in
# Check terminal for logs
```

### Step 7: Check Resend Dashboard
1. Go to https://resend.com/logs
2. Filter by:
   - Date: Today
   - From: `@ajstudioz.co.in`
3. Check if there are **any** recent sends from scira
4. If you see sends failing, click to see error details

### Common Issues Found:

#### Issue 1: Environment Variable Not Deployed
**Symptom:** Diagnostics shows `apiKeyConfigured: false` even after setting
**Solution:**
1. Delete the environment variable in Vercel
2. Re-add it
3. Trigger a new deployment (push to repo or redeploy in Vercel)

#### Issue 2: Wrong Better-Auth Package
**Symptom:** No event logs in Vercel functions
**Solution:**
1. Check `lib/auth.ts` has: `import { betterAuth } from 'better-auth';` (NOT `'better-auth/minimal'`)
2. Update import if needed
3. Commit and push

#### Issue 3: Missing Event Hooks
**Symptom:** No "event triggered" logs in Vercel
**Solution:**
Verify [lib/auth.ts](lib/auth.ts) has this structure:
```typescript
export const auth = betterAuth({
  // ... other config
  emailAndPassword: {
    enabled: true,
  },
  events: {
    signUp: {
      after: async (ctx) => {
        console.log('🎯 SignUp event triggered for:', ctx.user.email);
        // email sending logic
      }
    },
    signIn: {
      after: async (ctx) => {
        console.log('🎯 SignIn event triggered for:', ctx.user.email);
        // email sending logic  
      }
    }
  }
});
```

#### Issue 4: Rate Limiting
**Symptom:** First email works, subsequent ones don't
**Solution:** 
- Check Resend dashboard for rate limit errors
- Free tier: 100 emails/day, 3,000/month
- Upgrade if needed

#### Issue 5: Different Deployment Region
**Symptom:** Works locally but not in production
**Solution:**
- Check if scira is deployed to a different region than AJ-STUDIOZ-CHAT
- Some regions might have restrictions
- Verify Resend API is accessible from deployment region

### Step 8: Side-by-Side Comparison
Create a comparison checklist:

| Check | AJ-STUDIOZ-CHAT | Scira | Match? |
|-------|----------------|-------|--------|
| Resend API Key | `re_***` | `re_***` | ✓/✗ |
| Better-auth package | `better-auth` | `better-auth` or `better-auth/minimal`? | ✓/✗ |
| Events defined | Yes | Yes | ✓/✗ |
| Domain verified | Yes | Yes | ✓/✗ |
| DNS records | Set | Set | ✓/✗ |
| Vercel env variables | Set | Set? | ✓/✗ |

---

## 📧 Quick Test Commands

```bash
# 1. Check diagnostics
curl https://scira-jade-one.vercel.app/api/email-diagnostics

# 2. Send test welcome email
curl "https://scira-jade-one.vercel.app/api/test-email?type=welcome&email=test@example.com&name=Test"

# 3. Send test login email  
curl "https://scira-jade-one.vercel.app/api/test-email?type=login&email=test@example.com&name=Test"

# 4. Check Vercel logs
# Visit: https://vercel.com/kamesh14151s-projects/scira-jade-one/deployments
```

---

## ✅ Final Verification Checklist

Before reaching out for help, verify:

- [ ] API key is correct (copy-paste from Resend dashboard)
- [ ] API key is set in Vercel (all environments)
- [ ] Domain is verified in Resend dashboard  
- [ ] DNS records (SPF, DKIM) are added
- [ ] Using `better-auth` (not `better-auth/minimal`)
- [ ] Events are defined in `lib/auth.ts`
- [ ] Latest code is deployed to Vercel
- [ ] Test endpoint returns success
- [ ] Diagnostics endpoint shows configured key
- [ ] Checked Vercel function logs for errors
- [ ] Checked Resend logs for delivery issues

If ALL checkboxes are ticked and emails still don't work, there may be a platform-specific issue. Check:
1. Vercel function logs for detailed errors
2. Resend dashboard logs for API errors
3. GitHub Actions/deployment logs for build issues

---

**Need more help?** 
- Check Vercel logs: https://vercel.com/kamesh14151s-projects/scira-jade-one
- Check Resend logs: https://resend.com/logs
- Compare with working project: TOMO_CHAT
