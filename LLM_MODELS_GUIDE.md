# 🤖 Complete LLM Models Guide - AJ Chat

This comprehensive guide documents all available language models in the AJ Chat project, organized by provider with their features, requirements, and API keys.

---

## 📋 Table of Contents

- [Quick Reference](#quick-reference)
- [Provider Overview](#provider-overview)
- [Models by Provider](#models-by-provider)
  - [xAI (Grok) Models](#xai-grok-models)
  - [OpenAI (GPT) Models](#openai-gpt-models)
  - [Alibaba (Qwen) Models](#alibaba-qwen-models)
  - [DeepSeek Models](#deepseek-models)
  - [Google (Gemini) Models](#google-gemini-models)
  - [Anthropic (Claude) Models](#anthropic-claude-models)
  - [Mistral AI Models](#mistral-ai-models)
  - [Cohere Models](#cohere-models)
  - [Zhipu AI (GLM) Models](#zhipu-ai-glm-models)
  - [MoonShot AI (Kimi) Models](#moonshot-ai-kimi-models)
  - [Minimax Models](#minimax-models)
  - [Other Models](#other-models)
- [Model Categories](#model-categories)
- [Features Legend](#features-legend)
- [Setup Instructions](#setup-instructions)

---

## 🎯 Quick Reference

### Essential API Keys

| Provider | Environment Variable | Get Key From | Free Tier |
|----------|---------------------|--------------|-----------|
| **xAI** | `XAI_API_KEY` | https://x.ai/api | ✅ Yes |
| **OpenAI** | `OPENAI_API_KEY` | https://platform.openai.com/api-keys | ✅ $5 credit |
| **Anthropic** | `ANTHROPIC_API_KEY` | https://console.anthropic.com/ | ✅ Yes |
| **Google** | `GOOGLE_GENERATIVE_AI_API_KEY` | https://makersuite.google.com/app/apikey | ✅ Yes |
| **Groq** | `GROQ_API_KEY` | https://console.groq.com/keys | ✅ Yes |
| **Mistral** | `MISTRAL_API_KEY` | https://console.mistral.ai/ | ✅ Yes |
| **Cohere** | `COHERE_API_KEY` | https://dashboard.cohere.com/ | ✅ Yes |
| **HuggingFace** | `HF_TOKEN` | https://huggingface.co/settings/tokens | ✅ Yes |
| **Novita** | `NOVITA_API_KEY` | https://novita.ai/ | ✅ Yes |
| **Baseten** | `BASETEN_API_KEY` | https://baseten.co/ | ✅ Trial |
| **Anannas** | `ANANNAS_API_KEY` | https://anannas.ai/ | ✅ Yes |

---

## 🏢 Provider Overview

### Total Statistics

- **Total Models:** 104
- **Providers:** 11
- **Free Models:** 23
- **Pro Models:** 81
- **Vision-Capable:** 49
- **Reasoning Models:** 45
- **PDF Support:** 42

---

## 📚 Models by Provider

### xAI (Grok) Models

**API Key Required:** `XAI_API_KEY`  
**Documentation:** https://docs.x.ai/  
**Base URL:** `https://us-east-1.api.x.ai/v1` (US) | `https://eu-west-1.api.x.ai/v1` (EU)

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-grok-3-mini` | Grok 3 Mini | Free | ❌ | ✅ | ❌ | 16,000 | Small, Fast |
| `scira-grok-3` | Grok 3 | Free | ❌ | ❌ | ✅ | 16,000 | Smart, Auth Required |
| `scira-grok-4` | Grok 4 | Pro | ✅ | ✅ | ✅ | 16,000 | Most Intelligent |
| `scira-default` | Grok 4.1 Fast | Free | ✅ | ❌ | ❌ | 30,000 | 🆕 Default, Extreme, Fast |
| `scira-grok4.1-fast-thinking` | Grok 4.1 Fast Thinking | Free | ✅ | ✅ | ❌ | 30,000 | 🆕 Reasoning, Extreme, Fast |
| `scira-grok-4-fast` | Grok 4 Fast | Free | ✅ | ❌ | ❌ | 30,000 | 🆕 Extreme, Fast |
| `scira-grok-4-fast-think` | Grok 4 Fast Thinking | Free | ✅ | ✅ | ❌ | 30,000 | 🆕 Reasoning, Extreme, Fast |
| `scira-code` | Grok Code | Free | ❌ | ✅ | ✅ | 16,000 | Advanced Coding |
| `scira-follow-up` | Grok Follow-up (EU) | Internal | ✅ | ❌ | ❌ | 30,000 | EU Region |

**Total xAI Models:** 9

---

### OpenAI (GPT) Models

**API Key Required:** `OPENAI_API_KEY`  
**Documentation:** https://platform.openai.com/docs  
**Base URL:** Built into SDK

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-gpt-oss-20` | GPT OSS 20B | Free | ❌ | ❌ | ❌ | 16,000 | Open Source, Fast |
| `scira-gpt-oss-120` | GPT OSS 120B | Pro | ❌ | ❌ | ✅ | 16,000 | Advanced OSS, Fast |
| `scira-gpt5-nano` | GPT 5 Nano | Pro | ✅ | ❌ | ✅ | 16,000 | 📄 Extreme, Fast, PDF |
| `scira-gpt-4.1-nano` | GPT 4.1 Nano | Free | ✅ | ❌ | ❌ | 16,000 | 📄 Extreme, Fast, PDF |
| `scira-gpt-4.1-mini` | GPT 4.1 Mini | Pro | ✅ | ❌ | ✅ | 16,000 | 📄 Extreme, Fast, PDF |
| `scira-gpt-4.1` | GPT 4.1 | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, PDF |
| `scira-gpt-5.1` | GPT 5.1 Instant | Pro | ✅ | ❌ | ✅ | 16,000 | 🆕 📄 Extreme, PDF |
| `scira-gpt-5.1-thinking` | GPT 5.1 Thinking | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, Reasoning, PDF |
| `scira-gpt-5.2` | GPT 5.2 Instant | Pro | ✅ | ❌ | ✅ | 16,000 | 🆕 📄 Extreme, PDF |
| `scira-gpt-5.2-thinking` | GPT 5.2 Thinking | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, Reasoning, PDF |
| `scira-gpt5-mini` | GPT 5 Mini | Pro | ✅ | ❌ | ✅ | 16,000 | 🆕 📄 Extreme, PDF |
| `scira-gpt5` | GPT 5 | Pro | ✅ | ❌ | ✅ | 16,000 | 🆕 📄 Extreme, Flagship, PDF |
| `scira-gpt5-medium` | GPT 5 Medium | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, Reasoning, PDF |
| `scira-o3` | o3 | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Advanced Reasoning, PDF |
| `scira-o4-mini` | o4 mini | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Mini Reasoning, PDF |
| `scira-gpt-5.1-codex` | GPT 5.1 Codex | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, Coding, PDF |
| `scira-gpt-5.1-codex-mini` | GPT 5.1 Codex Mini | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, Coding, PDF |
| `scira-gpt-5.1-codex-max` | GPT 5.1 Codex Max | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, Coding, PDF |
| `scira-gpt5-codex` | GPT 5 Codex | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Extreme, Coding, PDF |

**Total OpenAI Models:** 19

---

### Alibaba (Qwen) Models

**API Keys Required:**
- `GROQ_API_KEY` (via Groq)
- `HF_TOKEN` (via HuggingFace)
- `NOVITA_API_KEY` (via Novita)
- `BASETEN_API_KEY` (via Baseten)

**Gateway Models:** Some use AI gateway routing

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-qwen-4b` | Qwen 3 4B | Free | ❌ | ❌ | ❌ | 16,000 | Small, Fast |
| `scira-qwen-4b-thinking` | Qwen 3 4B Thinking | Free | ❌ | ✅ | ❌ | 16,000 | Small Reasoning |
| `scira-qwen-32b` | Qwen 3 32B | Free | ❌ | ❌ | ❌ | 40,960 | Base, Fast |
| `scira-qwen-32b-thinking` | Qwen 3 32B Thinking | Free | ❌ | ✅ | ❌ | 40,960 | Base Reasoning, Fast |
| `scira-qwen-30` | Qwen 3 30B A3B | Pro | ❌ | ❌ | ✅ | 100,000 | Large Context |
| `scira-qwen-30-think` | Qwen 3 30B A3B Thinking | Pro | ❌ | ✅ | ✅ | 100,000 | Large Context Reasoning |
| `scira-qwen-3-next` | Qwen 3 Next 80B A3B Instruct | Pro | ❌ | ❌ | ✅ | 100,000 | 🆕 Advanced, Fast |
| `scira-qwen-3-next-think` | Qwen 3 Next 80B A3B Thinking | Pro | ❌ | ✅ | ✅ | 100,000 | 🆕 Advanced Reasoning |
| `scira-qwen-235` | Qwen 3 235B A22B | Pro | ❌ | ❌ | ✅ | 100,000 | Massive Model |
| `scira-qwen-235-think` | Qwen 3 235B A22B Thinking | Pro | ❌ | ✅ | ✅ | 100,000 | Massive Reasoning |
| `scira-qwen-3-max` | Qwen 3 Max | Pro | ❌ | ❌ | ✅ | 10,000 | 🆕 Max Performance |
| `scira-qwen-3-max-preview` | Qwen 3 Max Preview | Pro | ❌ | ❌ | ✅ | 10,000 | 🆕 Preview Version |
| `scira-qwen-coder-small` | Qwen 3 Coder 30B A3B | Pro | ❌ | ❌ | ✅ | 10,000 | 🆕 Coding |
| `scira-qwen-coder` | Qwen 3 Coder | Pro | ❌ | ❌ | ✅ | 130,000 | Advanced Coding, Fast |
| `scira-qwen-coder-plus` | Qwen 3 Coder Plus | Pro | ❌ | ❌ | ✅ | 130,000 | Extreme Coding |
| `scira-qwen-3-vl-30b` | Qwen 3 VL 30B | Pro | ✅ | ❌ | ✅ | 130,000 | Vision, Fast |
| `scira-qwen-3-vl-30b-thinking` | Qwen 3 VL 30B Thinking | Pro | ✅ | ✅ | ✅ | 130,000 | 🆕 Vision Reasoning, Fast |
| `scira-qwen-3-vl` | Qwen 3 VL 235B A22B | Pro | ✅ | ✅ | ✅ | 10,000 | 🆕 Vision Reasoning |
| `scira-qwen-3-vl-thinking` | Qwen 3 VL 235B A22B Thinking | Pro | ✅ | ✅ | ✅ | 10,000 | 🆕 Vision Reasoning |

**Total Qwen Models:** 19

---

### DeepSeek Models

**API Keys Required:**
- `BASETEN_API_KEY`
- `NOVITA_API_KEY`

**Gateway Models:** Some use AI gateway routing

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-deepseek-v3` | DeepSeek v3 | Pro | ❌ | ❌ | ✅ | 16,000 | 🆕 Previous Version |
| `scira-deepseek-v3.1-terminus` | DeepSeek v3.1 Terminus | Pro | ❌ | ❌ | ✅ | 16,000 | 🆕 Advanced |
| `scira-deepseek-chat` | DeepSeek v3.2 | Pro | ❌ | ❌ | ✅ | 16,000 | 🆕 Latest Chat |
| `scira-deepseek-chat-think` | DeepSeek v3.2 Thinking | Pro | ❌ | ✅ | ✅ | 16,000 | 🆕 Latest Reasoning |
| `scira-deepseek-chat-exp` | DeepSeek v3.2 Exp | Pro | ❌ | ❌ | ✅ | 16,000 | 🆕 Experimental |
| `scira-deepseek-chat-think-exp` | DeepSeek v3.2 Exp Thinking | Pro | ❌ | ✅ | ✅ | 16,000 | 🆕 Experimental Reasoning |
| `scira-deepseek-r1` | DeepSeek R1 | Pro | ❌ | ✅ | ✅ | 16,000 | 🆕 Advanced Reasoning |
| `scira-deepseek-r1-0528` | DeepSeek R1 0528 | Pro | ❌ | ✅ | ✅ | 16,000 | 🆕 Advanced Reasoning |

**Total DeepSeek Models:** 8

---

### Google (Gemini) Models

**API Key Required:** `GOOGLE_GENERATIVE_AI_API_KEY`  
**Documentation:** https://ai.google.dev/docs  
**Get Key:** https://makersuite.google.com/app/apikey

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-google-lite` | Gemini 2.5 Flash Lite | Free | ✅ | ❌ | ❌ | 10,000 | 🆕 📄 Extreme, Small, PDF |
| `scira-google` | Gemini 2.5 Flash | Pro | ✅ | ❌ | ✅ | 10,000 | 🆕 📄 Extreme, Advanced, PDF |
| `scira-google-think` | Gemini 2.5 Flash Thinking | Pro | ✅ | ✅ | ✅ | 10,000 | 🆕 📄 Extreme, Reasoning, PDF |
| `scira-google-pro` | Gemini 2.5 Pro | Pro | ✅ | ✅ | ✅ | 10,000 | 🆕 📄 Extreme, Advanced, PDF |
| `scira-google-pro-think` | Gemini 2.5 Pro Thinking | Pro | ✅ | ✅ | ✅ | 10,000 | 🆕 📄 Extreme, Reasoning, PDF |
| `scira-gemini-3-flash` | Gemini 3 Flash | Pro | ✅ | ❌ | ✅ | 10,000 | 🆕 📄 Extreme, SOTA, PDF |
| `scira-gemini-3-flash-think` | Gemini 3 Flash Thinking | Pro | ✅ | ✅ | ✅ | 10,000 | 🆕 📄 Extreme, SOTA Reasoning, PDF |
| `scira-gemini-3-pro` | Gemini 3 Pro | Pro | ✅ | ❌ | ✅ | 10,000 | 🆕 📄 Extreme, Latest SOTA, PDF |
| `scira-name` | Gemini 2.5 Flash Lite Preview | Internal | ✅ | ❌ | ❌ | 10,000 | Name Generation |

**Total Google Models:** 9

---

### Anthropic (Claude) Models

**API Key Required:** `ANTHROPIC_API_KEY`  
**Documentation:** https://docs.anthropic.com/  
**Get Key:** https://console.anthropic.com/

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-haiku` | Claude 3.5 Haiku | Pro | ❌ | ❌ | ✅ | 8,000 | Via Anannas |
| `scira-anthropic-small` | Claude Haiku 4.5 | Pro | ✅ | ❌ | ✅ | 8,000 | 🆕 📄 Fast, Efficient, PDF |
| `scira-anthropic` | Claude Sonnet 4.5 | Pro | ✅ | ❌ | ✅ | 8,000 | 📄 Latest, Greatest, PDF |
| `scira-anthropic-think` | Claude Sonnet 4.5 Thinking | Pro | ✅ | ✅ | ✅ | 8,000 | 📄 Latest Reasoning, PDF |
| `scira-anthropic-opus` | Claude 4.5 Opus | Pro | ✅ | ❌ | ✅ | 8,000 | 🆕 📄 Latest, Greatest, PDF |
| `scira-anthropic-opus-think` | Claude 4.5 Opus Thinking | Pro | ✅ | ✅ | ✅ | 8,000 | 🆕 📄 Latest Reasoning, PDF |

**Total Anthropic Models:** 6

---

### Mistral AI Models

**API Key Required:** `MISTRAL_API_KEY`  
**Documentation:** https://docs.mistral.ai/  
**Get Key:** https://console.mistral.ai/

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-ministral-3b` | Ministral 3 3B | Free | ✅ | ❌ | ❌ | 16,000 | 🆕 📄 Mini Multi-modal, PDF |
| `scira-ministral-8b` | Ministral 3 8B | Free | ✅ | ❌ | ❌ | 16,000 | 🆕 📄 Mini Multi-modal, PDF |
| `scira-ministral-14b` | Ministral 3 14B | Pro | ✅ | ❌ | ✅ | 16,000 | 🆕 📄 Mini Multi-modal, PDF |
| `scira-devstral` | Devstral 2 | Free | ❌ | ❌ | ❌ | 16,000 | 🆕 📄 Coding, PDF |
| `scira-devstral-small` | Devstral Small 2 | Free | ❌ | ❌ | ❌ | 16,000 | 🆕 📄 Small Coding, PDF |
| `scira-mistral-large` | Mistral Large 3 | Pro | ✅ | ❌ | ✅ | 16,000 | 🆕 📄 Latest Large, PDF |
| `scira-mistral-medium` | Mistral Medium | Pro | ✅ | ❌ | ✅ | 16,000 | 🆕 📄 Medium Multi-modal, PDF |
| `scira-magistral-small` | Magistral Small | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Small Reasoning, PDF |
| `scira-magistral-medium` | Magistral Medium | Pro | ✅ | ✅ | ✅ | 16,000 | 🆕 📄 Medium Reasoning, PDF |

**Total Mistral Models:** 9

---

### Cohere Models

**API Key Required:** `COHERE_API_KEY`  
**Documentation:** https://docs.cohere.com/  
**Get Key:** https://dashboard.cohere.com/

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-cmd-a` | Command A | Pro | ❌ | ❌ | ✅ | 16,000 | 🆕 Advanced Command |
| `scira-cmd-a-think` | Command A Thinking | Pro | ❌ | ✅ | ✅ | 16,000 | 🆕 Advanced Reasoning |

**Total Cohere Models:** 2

---

### Zhipu AI (GLM) Models

**API Keys Required:**
- `NOVITA_API_KEY`
- `HF_TOKEN` (via HuggingFace)
- `BASETEN_API_KEY`

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-glm-air` | GLM 4.5 Air | Pro | ❌ | ❌ | ✅ | 130,000 | Efficient, Large Context |
| `scira-glm` | GLM 4.5 | Pro | ❌ | ❌ | ✅ | 13,000 | Previous Advanced |
| `scira-glm-4.6` | GLM 4.6 | Pro | ❌ | ❌ | ✅ | 20,000 | 🆕 Advanced, Fast |
| `scira-glm-4.6v-flash` | GLM 4.6V Flash | Free | ✅ | ✅ | ❌ | 20,000 | 🆕 Fast Vision Reasoning |
| `scira-glm-4.6v` | GLM 4.6V | Pro | ✅ | ✅ | ✅ | 20,000 | 🆕 Advanced Vision Reasoning |
| `scira-glm-4.7` | GLM 4.7 | Pro | ❌ | ✅ | ✅ | 20,000 | 🆕 Latest Advanced, Fast |

**Total GLM Models:** 6

---

### MoonShot AI (Kimi) Models

**API Keys Required:**
- `BASETEN_API_KEY`
- `GROQ_API_KEY`

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-enhance` | Kimi K2 Instruct | Internal | ❌ | ❌ | ❌ | 10,000 | Enhancement Model |
| `scira-kimi-k2-v2` | Kimi K2 Latest | Pro | ❌ | ❌ | ✅ | 10,000 | Advanced Base, Fast |
| `scira-kimi-k2-v2-thinking` | Kimi K2 Thinking | Pro | ❌ | ✅ | ✅ | 10,000 | 🆕 Advanced Reasoning, Fast |

**Total Kimi Models:** 3

---

### Minimax Models

**API Keys Required:**
- `NOVITA_API_KEY`

**Gateway Models:** Some use AI gateway routing

| Model ID | Label | Category | Vision | Reasoning | Pro | Max Tokens | Features |
|----------|-------|----------|--------|-----------|-----|------------|----------|
| `scira-minimax` | Minimax M1 80K | Pro | ❌ | ✅ | ✅ | 10,000 | 🆕 Advanced Reasoning |
| `scira-minimax-m2` | Minimax M2 | Pro | ❌ | ✅ | ✅ | 10,000 | 🆕 Advanced Reasoning |
| `scira-minimax-m2.1` | Minimax M2.1 | Pro | ❌ | ✅ | ✅ | 10,000 | 🆕 Latest Advanced Reasoning |
| `scira-minimax-m2.1-lightning` | Minimax M2.1 Lightning | Pro | ❌ | ✅ | ✅ | 10,000 | 🆕 Fast Advanced Reasoning |

**Total Minimax Models:** 4

---

### Other Models

| Model ID | Label | Category | Vision | Reasoning | Provider | API Key | Features |
|----------|-------|----------|--------|-----------|----------|---------|----------|
| `scira-kat-coder` | KAT-Coder-Pro V1 | Pro | ❌ | ❌ | Kwaipilot | `NOVITA_API_KEY` | 🆕 Advanced Coding |
| `scira-trinity-mini` | Trinity Mini | Pro | ❌ | ✅ | Arcee AI | Gateway | 🆕 Small Reasoning |
| `scira-mimo-v2-flash` | Mimo V2 Flash | Pro | ❌ | ❌ | Xiaomi | `NOVITA_API_KEY` | 🆕 Fast Model |
| `scira-nova-2-lite` | Nova 2 Lite | Pro | ❌ | ❌ | Amazon | Gateway | 🆕 Latest Small |
| `scira-v0-10` | Vercel v0 1.0 | Pro | ✅ | ❌ | Vercel | Gateway | 🆕 v0 Design |
| `scira-v0-15` | Vercel v0 1.5 | Pro | ✅ | ❌ | Vercel | Gateway | 🆕 v0 Design Latest |

**Total Other Models:** 6

---

## 📊 Model Categories

### Free Models (23 Total)
Models accessible without Pro subscription:
- Grok 3 Mini, Grok 4.1 Fast series
- Qwen 3 4B, 32B series
- GPT OSS 20B, GPT 4.1 Nano
- Gemini 2.5 Flash Lite
- Ministral 3B, 8B
- Devstral 2, Devstral Small 2
- GLM 4.6V Flash

### Pro Models (81 Total)
Require Pro subscription:
- All GPT-5 series
- All Claude 4.5 series
- All DeepSeek models
- Most Qwen advanced models
- All Gemini Pro models
- Large Mistral models
- All reasoning models (except free tier)

### Vision-Capable Models (49 Total)
Support image input:
- All Grok 4+ models
- All GPT 4.1+ models
- All Gemini models
- All Claude 4.5+ models
- Mistral Large, Ministral series
- Qwen VL series
- GLM 4.6V series
- Vercel v0 models

### Reasoning Models (45 Total)
Advanced thinking/reasoning:
- Grok 4.1 Fast Thinking, Grok 4 Fast Thinking
- All GPT-5 Thinking, o3, o4-mini
- All Claude Thinking variants
- DeepSeek R1, v3.2 Thinking
- Qwen Thinking variants
- Minimax M2+ series
- Magistral series

### PDF Support (42 Total)
Can process PDF documents:
- All Gemini models
- All Claude models
- All GPT models (except OSS)
- All Mistral models

---

## 🎨 Features Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Supported |
| ❌ | Not Supported |
| 🆕 | New Model |
| 📄 | PDF Support |
| ⚡ | Fast Model |
| 🔒 | Pro Required |
| 🆓 | Free Tier |

---

## 🔧 Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
# Essential Providers
XAI_API_KEY=xai-***
OPENAI_API_KEY=sk-***
ANTHROPIC_API_KEY=sk-ant-***
GOOGLE_GENERATIVE_AI_API_KEY=AIza***
GROQ_API_KEY=gsk_***

# Additional Providers
MISTRAL_API_KEY=***
COHERE_API_KEY=***
HF_TOKEN=hf_***
NOVITA_API_KEY=***
BASETEN_API_KEY=***
ANANNAS_API_KEY=***
```

### 2. Provider Configuration

The models are configured in `ai/providers.ts` with:
- Custom provider definitions
- Middleware for reasoning extraction
- Regional endpoints (US/EU for xAI)
- Gateway routing for some models

### 3. Model Selection

Models are available in the dropdown menu categorized by:
- **Free:** No subscription required
- **Pro:** Requires Pro subscription

### 4. Regional Restrictions

Some models are restricted in certain regions:
- **Restricted Regions:** CN, KP, RU
- **Affected Models:** OpenAI, Anthropic models
- **Filter Function:** `getFilteredModels(countryCode)`

---

## 📈 Usage Examples

### Basic Model Usage

```typescript
import { scira } from '@/ai/providers';

// Use default model
const model = scira('scira-default');

// Use specific model
const grokModel = scira('scira-grok-4.1-fast-thinking');
const claudeModel = scira('scira-anthropic');
const geminiModel = scira('scira-google-pro');
```

### Check Model Capabilities

```typescript
import { 
  hasVisionSupport, 
  hasReasoningSupport, 
  requiresProSubscription,
  getMaxOutputTokens 
} from '@/ai/providers';

const modelId = 'scira-grok-4.1-fast-thinking';

console.log('Vision:', hasVisionSupport(modelId));        // true
console.log('Reasoning:', hasReasoningSupport(modelId));  // true
console.log('Pro Required:', requiresProSubscription(modelId)); // false
console.log('Max Tokens:', getMaxOutputTokens(modelId));  // 30000
```

### Access Control

```typescript
import { canUseModel } from '@/ai/providers';

const result = canUseModel(modelId, user, isProUser);

if (!result.canUse) {
  console.log('Reason:', result.reason);
  // 'authentication_required' or 'pro_subscription_required'
}
```

---

## 🔒 Model Access Rules

### Authentication Required
All models except a few free-tier models require user authentication.

### Pro Subscription Required
81 models require active Pro subscription:
- GPT-5 series
- Claude 4.5 series
- Most advanced Qwen models
- DeepSeek models
- Gemini Pro models
- Large Mistral models

### Free Unlimited
No models currently have unlimited free usage.

---

## 💡 Recommendations

### For Chat
- **Free:** Grok 4.1 Fast (`scira-default`)
- **Pro:** Claude Sonnet 4.5 (`scira-anthropic`)
- **Reasoning:** GPT 5.1 Thinking (`scira-gpt-5.1-thinking`)

### For Coding
- **Free:** Devstral 2 (`scira-devstral`)
- **Pro:** GPT 5.1 Codex Max (`scira-gpt-5.1-codex-max`)
- **Large:** Qwen 3 Coder Plus (`scira-qwen-coder-plus`)

### For Vision Tasks
- **Free:** Gemini 2.5 Flash Lite (`scira-google-lite`)
- **Pro:** Claude Opus 4.5 (`scira-anthropic-opus`)
- **Fast:** Grok 4.1 Fast (`scira-default`)

### For Reasoning
- **Free:** Grok 4.1 Fast Thinking (`scira-grok4.1-fast-thinking`)
- **Pro:** DeepSeek R1 (`scira-deepseek-r1`)
- **Advanced:** Claude Opus 4.5 Thinking (`scira-anthropic-opus-think`)

### For PDF Processing
- **Free:** Gemini 2.5 Flash Lite (`scira-google-lite`)
- **Pro:** Claude Sonnet 4.5 (`scira-anthropic`)
- **Fast:** GPT 4.1 Nano (`scira-gpt-4.1-nano`)

---

## 🎯 Model Comparison

### Speed Comparison (Fastest to Slowest)

1. **Extreme Fast:** Grok 4.1 Fast series, GPT 4.1 Nano
2. **Very Fast:** Qwen 32B, Groq models, GLM 4.6/4.7
3. **Fast:** Most mid-tier models
4. **Standard:** Large reasoning models

### Intelligence Comparison (Most Capable)

1. **Tier 1:** GPT 5.2, Claude Opus 4.5, Gemini 3 Pro
2. **Tier 2:** Grok 4, DeepSeek R1, Qwen 235B
3. **Tier 3:** GPT 5, Claude Sonnet 4.5, Gemini 2.5 Pro
4. **Tier 4:** Mid-range models (GPT 4.1, Mistral Large)

### Context Window Comparison

| Range | Models |
|-------|--------|
| 130,000+ tokens | Qwen Coder, GLM Air, Qwen VL 30B |
| 100,000+ tokens | Qwen 235B, Qwen 3 Next |
| 40,000+ tokens | Qwen 32B |
| 30,000 tokens | Grok 4.1 Fast series |
| 16,000-20,000 tokens | Most models |
| 8,000-10,000 tokens | Claude series, Gemini series |

---

## 📞 Support & Documentation

### Provider Documentation
- **xAI:** https://docs.x.ai/
- **OpenAI:** https://platform.openai.com/docs
- **Anthropic:** https://docs.anthropic.com/
- **Google:** https://ai.google.dev/docs
- **Mistral:** https://docs.mistral.ai/
- **Cohere:** https://docs.cohere.com/

### API Key Help
See [API_KEYS_GUIDE.md](./API_KEYS_GUIDE.md) for detailed setup instructions.

### Rate Limits
Each provider has different rate limits. Check provider documentation for details.

### Cost Estimation
Most providers offer free tiers. Monitor usage through provider dashboards.

---

**Last Updated:** 2025-05-XX  
**Total Models:** 104  
**Providers:** 11

---

*This guide is auto-generated from `ai/providers.ts`. For the most up-to-date model definitions, always refer to the source code.*
