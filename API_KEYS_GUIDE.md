# Scira - API Keys & Environment Variables Setup Guide

This document lists all required API keys for Scira's features and how to obtain them.

## 🎯 Quick Setup Priority

### Essential (Required for Basic Operation)
1. **Database** - PostgreSQL database
2. **Authentication** - Better Auth setup
3. **Redis** - For caching and rate limiting
4. **AI Models** - At least one AI provider

### Recommended (For Full Features)
- Web search capabilities
- Email notifications
- Additional AI models

---

## 📝 Complete API Keys List

### 1. AI Model Providers

#### xAI (Grok)
```env
XAI_API_KEY=xai-***
```
- **Get it from:** https://x.ai/api
- **Used for:** Grok AI model, X/Twitter search
- **Free tier:** Available
- **Documentation:** https://docs.x.ai/

#### OpenAI (GPT-4, GPT-4o)
```env
OPENAI_API_KEY=sk-***
```
- **Get it from:** https://platform.openai.com/api-keys
- **Used for:** GPT-4, GPT-4o, GPT-4o mini models
- **Free tier:** $5 credit for new accounts
- **Documentation:** https://platform.openai.com/docs

#### Anthropic (Claude)
```env
ANTHROPIC_API_KEY=sk-ant-***
```
- **Get it from:** https://console.anthropic.com/
- **Used for:** Claude 3.5 Sonnet, Claude models
- **Free tier:** Available with limits
- **Documentation:** https://docs.anthropic.com/

#### Google Gemini
```env
GOOGLE_GENERATIVE_AI_API_KEY=AIza***
```
- **Get it from:** https://makersuite.google.com/app/apikey
- **Used for:** Gemini Pro, Gemini Flash models
- **Free tier:** Generous free tier available
- **Documentation:** https://ai.google.dev/docs

#### Groq
```env
GROQ_API_KEY=gsk_***
```
- **Get it from:** https://console.groq.com/keys
- **Used for:** Fast inference with Llama, Mixtral models
- **Free tier:** Very generous free tier
- **Documentation:** https://console.groq.com/docs

---

### 2. Search & Information APIs

#### Exa AI (Primary Search)
```env
EXA_API_KEY=***
```
- **Get it from:** https://exa.ai/
- **Used for:** Web search, academic search, URL retrieval, YouTube search
- **Free tier:** 1,000 searches/month
- **Pricing:** $10/month for more
- **Documentation:** https://docs.exa.ai/

#### Tavily AI
```env
TAVILY_API_KEY=tvly-***
```
- **Get it from:** https://tavily.com/
- **Used for:** Reddit search, news search
- **Free tier:** 1,000 requests/month
- **Documentation:** https://docs.tavily.com/

#### Valyu API
```env
VALYU_API_KEY=***
```
- **Get it from:** https://valyu.ai/
- **Used for:** Advanced search features
- **Documentation:** https://docs.valyu.ai/

#### Firecrawl
```env
FIRECRAWL_API_KEY=fc-***
```
- **Get it from:** https://firecrawl.dev/
- **Used for:** Web scraping and content extraction
- **Free tier:** 500 credits/month
- **Documentation:** https://docs.firecrawl.dev/

#### Parallel API
```env
PARALLEL_API_KEY=***
```
- **Get it from:** Contact for access
- **Used for:** Parallel processing features
- **Documentation:** TBD

---

### 3. Media & Entertainment

#### TMDB (The Movie Database)
```env
TMDB_API_KEY=***
```
- **Get it from:** https://www.themoviedb.org/settings/api
- **Used for:** Movie & TV show information, trending content
- **Free tier:** Completely free
- **Documentation:** https://developers.themoviedb.org/3

#### YouTube Data
```env
YT_ENDPOINT=*** (YouTube Data API endpoint)
```
- **Setup:** Configure YouTube Data API access
- **Used for:** YouTube video search and captions
- **Free tier:** Part of Exa AI integration
- **Documentation:** https://developers.google.com/youtube/v3

---

### 4. Location & Weather

#### OpenWeather
```env
OPENWEATHER_API_KEY=***
```
- **Get it from:** https://openweathermap.org/api
- **Used for:** Weather information and forecasts
- **Free tier:** 1,000 calls/day
- **Documentation:** https://openweathermap.org/api

#### Google Maps API
```env
GOOGLE_MAPS_API_KEY=AIza***
```
- **Get it from:** https://console.cloud.google.com/apis/credentials
- **Used for:** Maps, geocoding, nearby places search
- **Free tier:** $200/month credit
- **Documentation:** https://developers.google.com/maps

#### Amadeus (Flight Tracking)
```env
AMADEUS_API_KEY=***
AMADEUS_API_SECRET=***
```
- **Get it from:** https://developers.amadeus.com/
- **Used for:** Flight tracking and aviation data
- **Free tier:** Limited free tier available
- **Documentation:** https://developers.amadeus.com/self-service

---

### 5. Database & Infrastructure

#### PostgreSQL Database
```env
DATABASE_URL=postgresql://user:password@host:port/database
```
- **Options:**
  - **Vercel Postgres:** https://vercel.com/storage/postgres
  - **Supabase:** https://supabase.com/
  - **Neon:** https://neon.tech/
  - **Railway:** https://railway.app/
- **Used for:** User data, chat history, subscriptions
- **Free tier:** Available on all platforms

#### Upstash Redis
```env
REDIS_URL=redis://***
UPSTASH_REDIS_REST_URL=https://***
UPSTASH_REDIS_REST_TOKEN=***
```
- **Get it from:** https://upstash.com/
- **Used for:** Caching, rate limiting, session storage
- **Free tier:** 10,000 requests/day
- **Documentation:** https://docs.upstash.com/redis

#### Vercel Blob Storage
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_***
```
- **Get it from:** Vercel Dashboard → Storage → Blob
- **Used for:** File uploads and storage
- **Free tier:** 1 GB included
- **Documentation:** https://vercel.com/docs/storage/vercel-blob

#### QStash (Cron Jobs)
```env
QSTASH_TOKEN=***
CRON_SECRET=*** (your own secret)
```
- **Get it from:** https://upstash.com/qstash
- **Used for:** Scheduled tasks and webhooks
- **Free tier:** Available
- **Documentation:** https://upstash.com/docs/qstash

---

### 6. Authentication

#### Better Auth
```env
BETTER_AUTH_SECRET=*** (generate a random 32+ character string)
BETTER_AUTH_URL=https://your-domain.com (production URL)
```
- **Generate secret:** `openssl rand -base64 32`
- **Used for:** User authentication and sessions
- **Documentation:** https://www.better-auth.com/docs

#### GitHub OAuth
```env
GITHUB_CLIENT_ID=***
GITHUB_CLIENT_SECRET=***
```
- **Get it from:** https://github.com/settings/developers
- **Used for:** GitHub login
- **Free tier:** Free
- **Setup:** Create OAuth App → Set callback URL to `https://yourdomain.com/api/auth/github/callback`

#### Google OAuth
```env
GOOGLE_CLIENT_ID=***.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-***
```
- **Get it from:** https://console.cloud.google.com/apis/credentials
- **Used for:** Google login
- **Free tier:** Free
- **Setup:** Create OAuth 2.0 Client → Add authorized redirect URI

#### Twitter/X OAuth
```env
TWITTER_CLIENT_ID=***
TWITTER_CLIENT_SECRET=***
```
- **Get it from:** https://developer.twitter.com/en/portal/dashboard
- **Used for:** X/Twitter login
- **Free tier:** Basic tier includes OAuth
- **Setup:** Create OAuth 2.0 app

---

### 7. Additional Services

#### Daytona (Code Interpreter)
```env
DAYTONA_API_KEY=***
```
- **Get it from:** https://www.daytona.io/
- **Used for:** Python code execution sandbox
- **Free tier:** Available
- **Documentation:** https://www.daytona.io/docs

#### ElevenLabs (Text-to-Speech)
```env
ELEVENLABS_API_KEY=***
```
- **Get it from:** https://elevenlabs.io/app/settings/api-keys
- **Used for:** Voice synthesis features
- **Free tier:** 10,000 characters/month
- **Documentation:** https://docs.elevenlabs.io/

#### Smithery
```env
SMITHERY_API_KEY=***
```
- **Get it from:** Contact Smithery for access
- **Used for:** Advanced AI features
- **Documentation:** TBD

#### CoinGecko
```env
COINGECKO_API_KEY=***
```
- **Get it from:** https://www.coingecko.com/en/api
- **Used for:** Cryptocurrency data
- **Free tier:** Demo API available
- **Documentation:** https://www.coingecko.com/en/api/documentation

#### Supadata
```env
SUPADATA_API_KEY=***
```
- **Get it from:** Contact for access
- **Used for:** Data analytics features
- **Documentation:** TBD

#### Supermemory
```env
SUPERMEMORY_API_KEY=***
```
- **Get it from:** https://supermemory.ai/
- **Used for:** Memory and context management
- **Free tier:** Available
- **Documentation:** https://docs.supermemory.ai/

---

### 8. Email Notifications

#### Resend
```env
RESEND_API_KEY=re_***
```
- **Get it from:** https://resend.com/api-keys
- **Used for:** 
  - Welcome emails on signup
  - Login notifications
  - Lookout completion emails
- **Free tier:** 100 emails/day, 3,000 emails/month
- **Setup Steps:**
  1. Sign up at https://resend.com
  2. Verify your domain (add DNS records)
  3. Create API key
  4. Add to Vercel environment variables
- **Email domains configured:**
  - `welcome@ajstudioz.co.in` - Welcome emails
  - `security@ajstudioz.co.in` - Login notifications
  - `noreply@ajstudioz.co.in` - General notifications
- **Documentation:** https://resend.com/docs

**⚠️ Important for Emails:**
- Domain must be verified in Resend dashboard
- DNS records (SPF, DKIM) must be added to your domain
- Without verification, emails only go to verified recipients
- Check Resend logs if emails aren't being delivered

---

### 9. Payment Processing (Optional)

#### DodoPayments
```env
DODO_PAYMENTS_API_KEY=***
DODO_PAYMENTS_WEBHOOK_SECRET=***
NEXT_PUBLIC_PREMIUM_TIER=***
NEXT_PUBLIC_PREMIUM_SLUG=***
```
- **Get it from:** https://dodopayments.com/
- **Used for:** Subscription payments
- **Documentation:** https://docs.dodopayments.com/

#### Polar (Alternative)
```env
POLAR_ACCESS_TOKEN=***
POLAR_WEBHOOK_SECRET=***
```
- **Get it from:** https://polar.sh/
- **Used for:** Alternative payment processing
- **Documentation:** https://docs.polar.sh/

---

## 🚀 Quick Start Setup

### 1. Clone and Install
```bash
git clone https://github.com/kamesh14151/scira.git
cd scira/scira
pnpm install
```

### 2. Create Environment File
```bash
# Copy the example file
cp .env.example .env.local

# Or create new file
touch .env.local
```

### 3. Essential Keys (Minimum to Run)
Add these to `.env.local`:
```env
# Database
DATABASE_URL=your_postgres_url

# Auth
BETTER_AUTH_SECRET=generate_32_char_random_string
BETTER_AUTH_URL=http://localhost:3000

# Redis
REDIS_URL=your_redis_url
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# At least one AI model
OPENAI_API_KEY=your_openai_key
# OR
ANTHROPIC_API_KEY=your_anthropic_key
# OR
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key

# Search
EXA_API_KEY=your_exa_key

# OAuth (at least one)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email (for notifications)
RESEND_API_KEY=your_resend_key

# Other required keys
DAYTONA_API_KEY=your_daytona_key
ELEVENLABS_API_KEY=your_elevenlabs_key
TAVILY_API_KEY=your_tavily_key
VALYU_API_KEY=your_valyu_key
TMDB_API_KEY=your_tmdb_key
YT_ENDPOINT=your_yt_endpoint
FIRECRAWL_API_KEY=your_firecrawl_key
PARALLEL_API_KEY=your_parallel_key
OPENWEATHER_API_KEY=your_openweather_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
AMADEUS_API_KEY=your_amadeus_key
AMADEUS_API_SECRET=your_amadeus_secret
CRON_SECRET=your_cron_secret
BLOB_READ_WRITE_TOKEN=your_blob_token
SMITHERY_API_KEY=your_smithery_key
COINGECKO_API_KEY=your_coingecko_key
SUPADATA_API_KEY=your_supadata_key
QSTASH_TOKEN=your_qstash_token
SUPERMEMORY_API_KEY=your_supermemory_key
```

### 4. Run Development Server
```bash
pnpm dev
```

### 5. Deploy to Vercel
```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel Dashboard
# Settings → Environment Variables → Add all keys
```

---

## 🔧 Troubleshooting

### Emails Not Working?
1. Check Resend API key is set in Vercel environment variables
2. Verify domain in Resend dashboard (add DNS records)
3. Check Vercel function logs for error messages
4. Look for these console logs:
   - `✅ Resend email service initialized` - Service is working
   - `🎯 SignUp event triggered` - Events are firing
   - `✅ Email sent successfully!` - Email was sent
5. Check Resend dashboard for delivery status

### Database Connection Issues?
- Verify DATABASE_URL format
- Check database is accessible from Vercel
- Ensure SSL mode is correct for your provider

### Authentication Not Working?
- Verify BETTER_AUTH_SECRET is set
- Check OAuth callback URLs match your domain
- Ensure OAuth apps are configured correctly

### Missing API Keys?
- Check Vercel environment variables are deployed
- Restart Vercel deployment after adding keys
- Use `vercel env pull` to sync locally

---

## 📊 Cost Estimation (Monthly)

### Free Tier Setup (~$0/month)
- Vercel Hobby: Free
- Supabase/Neon DB: Free tier
- Upstash Redis: Free tier
- AI Models: Use free tiers
- Most APIs: Free tiers available

### Professional Setup (~$50-100/month)
- Vercel Pro: $20/month
- Database: $10-25/month
- OpenAI: $20-50/month (usage-based)
- Exa AI: $10/month
- Other APIs: Mostly free

### Production Scale (~$200+/month)
- Vercel Team/Enterprise
- Dedicated database
- Higher API limits
- Premium support

---

## 📚 Additional Resources

- **Main Documentation:** [Coming Soon]
- **API Documentation:** [Coming Soon]
- **Community Discord:** [Coming Soon]
- **GitHub Issues:** https://github.com/kamesh14151/scira/issues
- **Contributing Guide:** [CONTRIBUTING.md]

---

## ⚡ Pro Tips

1. **Start with free tiers** for all services to test
2. **Use Groq** for fast, free AI inference
3. **Enable billing alerts** on all paid services
4. **Monitor API usage** through provider dashboards
5. **Cache aggressively** to reduce API calls
6. **Use environment-specific keys** (dev/prod)

---

## 🔒 Security Best Practices

1. **Never commit API keys** to git
2. **Use .env.local** for local development
3. **Rotate keys** periodically
4. **Use different keys** for dev/prod
5. **Monitor API usage** for suspicious activity
6. **Set up rate limiting** for all APIs
7. **Use secrets management** (Vercel's is great)

---

## 📞 Support

If you need help setting up:
1. Check this guide first
2. Search GitHub Issues
3. Ask in Discussions
4. Contact via email

---

**Happy Building! 🚀**
