/**
 * RAG Setup Script
 *
 * This script:
 * 1. Uploads PDFs from cfatrainingmaterial to Supabase Storage
 * 2. Extracts text and creates chunks
 * 3. Generates embeddings using OpenAI
 * 4. Stores embeddings in Pinecone for retrieval
 *
 * Run: npx tsx scripts/setup-rag.ts
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const STORAGE_BUCKET = 'cfa-training-materials';

// Initialize clients
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Topic folder mapping
const TOPIC_FOLDER_MAP: Record<string, string> = {
  'ethical-professional-standards': 'Ethical and professional Standards',
  'quantitative-methods': 'Quantitative Methods',
  'economics': 'Economics',
  'financial-statement-analysis': 'Financial Statement Analysis',
  'corporate-issuers': 'Corporate Issuers',
  'equity-investments': 'Equity Investments',
  'fixed-income': 'Fixed Income',
  'derivatives': 'Derivatives',
  'alternative-investments': 'Alternative Investments',
  'portfolio-management': 'Portfolio Management'
};

interface PDFMetadata {
  topicId: string;
  topicName: string;
  fileName: string;
  filePath: string;
}

/**
 * Step 1: Create Supabase Storage bucket if it doesn't exist
 */
async function createStorageBucket() {
  console.log('\n📦 Creating Supabase Storage bucket...');

  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === STORAGE_BUCKET);

  if (!bucketExists) {
    const { error } = await supabase.storage.createBucket(STORAGE_BUCKET, {
      public: false,
      fileSizeLimit: 52428800, // 50MB
    });

    if (error) {
      console.error('Error creating bucket:', error);
      throw error;
    }
    console.log('✅ Bucket created successfully');
  } else {
    console.log('✅ Bucket already exists');
  }
}

/**
 * Step 2: Get all PDF files from cfatrainingmaterial folder
 */
function getAllPDFs(): PDFMetadata[] {
  console.log('\n📄 Scanning for PDF files...');

  const pdfs: PDFMetadata[] = [];
  const materialPath = path.join(process.cwd(), 'cfatrainingmaterial');

  for (const [topicId, folderName] of Object.entries(TOPIC_FOLDER_MAP)) {
    const topicPath = path.join(materialPath, folderName);

    if (!fs.existsSync(topicPath)) {
      console.log(`⚠️  Folder not found: ${folderName}`);
      continue;
    }

    const files = fs.readdirSync(topicPath);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    for (const fileName of pdfFiles) {
      pdfs.push({
        topicId,
        topicName: folderName,
        fileName,
        filePath: path.join(topicPath, fileName)
      });
    }
  }

  console.log(`✅ Found ${pdfs.length} PDF files`);
  return pdfs;
}

/**
 * Step 3: Upload PDFs to Supabase Storage
 */
async function uploadPDFsToStorage(pdfs: PDFMetadata[]) {
  console.log('\n☁️  Uploading PDFs to Supabase Storage...');

  let uploaded = 0;
  let skipped = 0;

  for (const pdf of pdfs) {
    const storagePath = `${pdf.topicId}/${pdf.fileName}`;

    // Check if file already exists
    const { data: existingFile } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(pdf.topicId, { search: pdf.fileName });

    if (existingFile && existingFile.length > 0) {
      console.log(`⏭️  Skipping (already exists): ${storagePath}`);
      skipped++;
      continue;
    }

    // Upload file
    const fileBuffer = fs.readFileSync(pdf.filePath);
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (error) {
      console.error(`❌ Error uploading ${storagePath}:`, error);
      continue;
    }

    console.log(`✅ Uploaded: ${storagePath}`);
    uploaded++;
  }

  console.log(`\n📊 Upload complete: ${uploaded} uploaded, ${skipped} skipped`);
}

/**
 * Step 4: Extract text from PDFs and create chunks
 */
async function extractAndChunkPDFs(pdfs: PDFMetadata[]): Promise<any[]> {
  console.log('\n📝 Extracting text from PDFs...');

  // Lazy load pdfjs-dist
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const chunks: any[] = [];

  for (const pdf of pdfs) {
    console.log(`Processing: ${pdf.fileName}`);

    try {
      const dataBuffer = fs.readFileSync(pdf.filePath);
      const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
      const pdfDocument = await loadingTask.promise;

      let text = '';
      for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(' ');
        text += pageText + '\n';
      }

      // Split into chunks of ~1000 characters with overlap
      const chunkSize = 1000;
      const overlap = 200;

      for (let i = 0; i < text.length; i += chunkSize - overlap) {
        const chunk = text.slice(i, i + chunkSize);

        if (chunk.trim().length < 100) continue; // Skip very short chunks

        chunks.push({
          text: chunk,
          metadata: {
            topicId: pdf.topicId,
            topicName: pdf.topicName,
            fileName: pdf.fileName,
            chunkIndex: Math.floor(i / (chunkSize - overlap)),
            source: 'cfa-training-material'
          }
        });
      }
    } catch (error) {
      console.error(`Error processing ${pdf.fileName}:`, error);
    }
  }

  console.log(`✅ Created ${chunks.length} text chunks`);
  return chunks;
}

/**
 * Step 5: Generate embeddings and store in Pinecone
 */
async function createEmbeddingsAndStore(chunks: any[]) {
  console.log('\n🧠 Generating embeddings and storing in Pinecone...');

  const indexName = 'cfa-materials';

  // Check if index exists, create if not
  const indexes = await pinecone.listIndexes();
  const indexExists = indexes.indexes?.some(idx => idx.name === indexName);

  if (!indexExists) {
    console.log('Creating Pinecone index...');
    await pinecone.createIndex({
      name: indexName,
      dimension: 1536, // OpenAI ada-002 embedding dimension
      metric: 'cosine',
      spec: {
        serverless: {
          cloud: 'aws',
          region: 'us-east-1'
        }
      }
    });
    console.log('✅ Index created');

    // Wait for index to be ready
    console.log('Waiting for index to initialize...');
    await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds
  }

  const index = pinecone.index(indexName);

  // Process in batches
  const batchSize = 50;
  let processed = 0;

  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);

    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(chunks.length / batchSize)}...`);

    // Generate embeddings for batch
    const embeddings = await Promise.all(
      batch.map(async (chunk) => {
        const response = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: chunk.text
        });
        return response.data[0].embedding;
      })
    );

    // Prepare vectors for Pinecone
    const vectors = batch.map((chunk, idx) => ({
      id: `chunk-${Date.now()}-${i + idx}`,
      values: embeddings[idx],
      metadata: {
        text: chunk.text,
        ...chunk.metadata
      }
    }));

    // Upsert to Pinecone
    await index.upsert(vectors);
    processed += batch.length;

    console.log(`✅ Processed ${processed}/${chunks.length} chunks`);

    // Rate limiting - wait a bit between batches
    if (i + batchSize < chunks.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('✅ All embeddings created and stored in Pinecone');
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting RAG Setup...\n');
  console.log('This will:');
  console.log('1. Create Supabase Storage bucket');
  console.log('2. Upload PDFs from cfatrainingmaterial folder');
  console.log('3. Extract and chunk text content');
  console.log('4. Generate embeddings using OpenAI');
  console.log('5. Store in Pinecone for fast retrieval\n');

  try {
    // Step 1: Create storage bucket
    await createStorageBucket();

    // Step 2: Get all PDFs
    const pdfs = getAllPDFs();

    if (pdfs.length === 0) {
      console.error('❌ No PDF files found!');
      process.exit(1);
    }

    // Step 3: Upload to Supabase Storage
    await uploadPDFsToStorage(pdfs);

    // Step 4: Extract and chunk text
    const chunks = await extractAndChunkPDFs(pdfs);

    // Step 5: Create embeddings and store
    await createEmbeddingsAndStore(chunks);

    console.log('\n✅ RAG Setup Complete!');
    console.log('\nYour CFA training materials are now:');
    console.log('- Stored in Supabase Storage');
    console.log('- Indexed in Pinecone for semantic search');
    console.log('- Ready for RAG-based question generation');

  } catch (error) {
    console.error('\n❌ Error during setup:', error);
    process.exit(1);
  }
}

// Run the script
main();
