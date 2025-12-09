# RAG System Setup Instructions

This document explains how to set up the RAG (Retrieval Augmented Generation) system for generating CFA Level 1 questions from your training materials.

## What is RAG?

RAG combines:
- **Retrieval**: Finding relevant content from your PDF training materials
- **Generation**: Using AI to create accurate questions based on that content

This ensures questions are:
- ✅ Based on actual CFA training materials
- ✅ Factually accurate
- ✅ Relevant to specific topics and subtopics
- ✅ Cover 2025 learning objectives

## Prerequisites

You need these API keys:

1. **Supabase Service Role Key**
   - Go to: https://supabase.com/dashboard → Your Project → Settings → API
   - Copy the `service_role` key

2. **Pinecone API Key**
   - Sign up at: https://www.pinecone.io/
   - Create a free account
   - Get your API key from the dashboard

3. **OpenAI API Key**
   - Go to: https://platform.openai.com/api-keys
   - Create a new API key
   - This is for embeddings (text-embedding-ada-002)

4. **Gemini API Key**
   - Already set up (for question generation)

## Environment Variables

Add these to your `.env.local` file:

```bash
# Supabase (already set)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Pinecone (NEW)
PINECONE_API_KEY=your_pinecone_api_key

# OpenAI (for embeddings)
OPENAI_API_KEY=your_openai_api_key

# Gemini (already set)
GEMINI_API_KEY=your_gemini_api_key
```

## Add to Vercel

Add the same environment variables to Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PINECONE_API_KEY`
   - `OPENAI_API_KEY`
3. Select all environments (Production, Preview, Development)
4. Save

## Setup Process

### Step 1: Install Dependencies

Already done! You have:
- ✅ `@pinecone-database/pinecone`
- ✅ `@google/generative-ai`
- ✅ `openai`
- ✅ `pdf-parse`
- ✅ `tsx`

### Step 2: Run the RAG Setup Script

This script will:
1. Create a Supabase Storage bucket for PDFs
2. Upload all PDFs from `cfatrainingmaterial/` folder
3. Extract text and create chunks
4. Generate embeddings using OpenAI
5. Store embeddings in Pinecone

Run:
```bash
npx tsx scripts/setup-rag.ts
```

**Note:** This will take 15-30 minutes depending on:
- Number of PDF files (you have ~37MB)
- OpenAI API rate limits
- Pinecone index creation time

### Step 3: Test the System

After setup completes, test the API:

```bash
curl http://localhost:3000/api/admin/generate-rag-question
```

You should see:
```json
{
  "message": "RAG-Based Question Generator API",
  "rag_configured": true
}
```

## Using RAG in the Admin Dashboard

Once set up, you can:

1. **Go to Admin Dashboard** → AI Generator tab
2. **Select topic and difficulty**
3. **Click "Generate with RAG"**
4. Questions will be generated based on your actual training materials!

## How It Works

```
1. User selects: "Ethical and Professional Standards" → "intermediate"

2. RAG System:
   ↓
   Query Pinecone for relevant content about ethics
   ↓
   Retrieve top 3 most relevant text chunks from PDFs
   ↓
   Pass context to Gemini 1.5 Pro
   ↓
   Generate question based ONLY on retrieved content
   ↓
   Return accurate, material-based question

3. Result: High-quality question with source references
```

## API Endpoints

### Generate RAG Question

**POST** `/api/admin/generate-rag-question`

```json
{
  "topic_area": "Ethical and Professional Standards",
  "difficulty": "intermediate",
  "subtopic": "Code of Ethics",
  "count": 1,
  "save_to_database": true
}
```

Response:
```json
{
  "questions": [{
    "question_text": "...",
    "option_a": "...",
    "option_b": "...",
    "option_c": "...",
    "correct_answer": "A",
    "explanation": "...",
    "source_material": "CFA Training Materials (RAG)"
  }],
  "saved": true,
  "saved_count": 1
}
```

## Costs

Approximate costs for setup:

- **Pinecone**: Free tier (100K vectors) - $0
- **OpenAI Embeddings**: ~$0.01 per 1000 chunks - ~$1-5 for full setup
- **Gemini Generation**: ~$0.01 per 1000 tokens - minimal per question

**Total setup cost**: ~$5-10 one-time
**Ongoing cost**: ~$0.01-0.05 per question generated

## Troubleshooting

### "PINECONE_API_KEY not set"
- Add the API key to `.env.local`
- Restart your dev server

### "No relevant content found"
- RAG setup might not be complete
- Check Pinecone dashboard for index "cfa-materials"

### "Training material folder not found"
- This error is expected on Vercel (PDFs aren't deployed)
- Run setup script locally first
- PDFs will be stored in Supabase Storage

### Setup script fails
- Check all API keys are correct
- Ensure `cfatrainingmaterial/` folder exists locally
- Check Pinecone quota (free tier limits)

## Benefits

✅ **Accurate**: Questions based on actual training materials
✅ **Relevant**: Uses semantic search to find related content
✅ **Scalable**: Works on Vercel (no local PDFs needed)
✅ **Fast**: Sub-second question generation
✅ **Cost-effective**: ~$0.01 per question

## Next Steps

1. Add API keys to `.env.local`
2. Run `npx tsx scripts/setup-rag.ts`
3. Wait for setup to complete
4. Deploy to Vercel
5. Test in admin dashboard
6. Generate high-quality CFA questions!

---

**Questions?** Check the console output during setup for detailed progress.
