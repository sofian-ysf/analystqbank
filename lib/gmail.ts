import { OAuth2Client } from 'google-auth-library';
import { createAdminClient } from './supabase';
import crypto from 'crypto';

const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose'
];

// Lazy-load singleton pattern for OAuth2 client
let oauth2Client: OAuth2Client | null = null;

function getOAuth2Client(): OAuth2Client {
  if (!oauth2Client) {
    const clientId = process.env.GMAIL_CLIENT_ID;
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const redirectUri = process.env.GMAIL_REDIRECT_URI || 'https://your-domain.com/api/auth/gmail/callback';

    if (!clientId || !clientSecret) {
      throw new Error('Gmail OAuth credentials not configured');
    }

    oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
  }
  return oauth2Client;
}

// Get the OAuth authorization URL
export function getGmailAuthUrl(state?: string): string {
  const client = getOAuth2Client();
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: GMAIL_SCOPES,
    prompt: 'consent',
    state
  });
}

// Encrypt token using AES-256-GCM
function encryptToken(token: string): string {
  const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-change-in-production', 'utf-8').slice(0, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag();

  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

// Decrypt token
function decryptToken(encryptedData: string): string {
  const key = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-change-in-production', 'utf-8').slice(0, 32);
  const parts = encryptedData.split(':');

  if (parts.length !== 3) {
    throw new Error('Invalid encrypted token format');
  }

  const iv = Buffer.from(parts[0], 'hex');
  const authTag = Buffer.from(parts[1], 'hex');
  const encrypted = parts[2];

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Store Gmail tokens in admin_settings
export async function storeGmailTokens(tokens: {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
}): Promise<void> {
  const supabase = createAdminClient();

  const encryptedRefreshToken = encryptToken(tokens.refresh_token);

  await supabase.from('admin_settings').upsert({
    key: 'gmail_refresh_token',
    value: JSON.stringify({
      encrypted: encryptedRefreshToken,
      expiry_date: tokens.expiry_date
    }),
    updated_at: new Date().toISOString()
  });
}

// Get stored Gmail tokens
async function getGmailTokens(): Promise<{
  access_token: string;
  refresh_token: string;
  expiry_date: number;
} | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('admin_settings')
    .select('value')
    .eq('key', 'gmail_refresh_token')
    .single();

  if (error || !data) {
    return null;
  }

  try {
    const parsed = JSON.parse(data.value);
    const decryptedRefreshToken = decryptToken(parsed.encrypted);

    return {
      access_token: '',
      refresh_token: decryptedRefreshToken,
      expiry_date: parsed.expiry_date
    };
  } catch (err) {
    console.error('Failed to decrypt Gmail tokens:', err);
    return null;
  }
}

// Check if Gmail is connected
export async function isGmailConnected(): Promise<boolean> {
  const tokens = await getGmailTokens();
  return tokens !== null;
}

// Get authenticated Gmail client
export async function getGmailClient(): Promise<OAuth2Client | null> {
  const tokens = await getGmailTokens();
  if (!tokens) {
    return null;
  }

  const client = getOAuth2Client();
  client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expiry_date: tokens.expiry_date
  });

  return client;
}

// Handle OAuth callback and store tokens
export async function handleGmailCallback(code: string): Promise<boolean> {
  const client = getOAuth2Client();

  try {
    const { tokens } = await client.getToken(code);

    if (!tokens.refresh_token) {
      console.error('No refresh token received');
      return false;
    }

    await storeGmailTokens({
      access_token: tokens.access_token!,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date!
    });

    return true;
  } catch (err) {
    console.error('Failed to exchange code for tokens:', err);
    return false;
  }
}

// Gmail interface types
export interface GmailMessage {
  id: string;
  threadId: string;
  subject: string;
  snippet: string;
  from: string;
  to: string;
  date: string;
  body?: string;
}

export interface GmailThread {
  id: string;
  subject: string;
  snippet: string;
  messages: GmailMessage[];
  lastMessageDate: string;
}

// Fetch email threads
export async function fetchEmailThreads(userEmail: string, maxResults = 20): Promise<GmailThread[]> {
  const client = await getGmailClient();
  if (!client) {
    throw new Error('Gmail not connected');
  }

  const googleapis = await import('googleapis');
  const gmail = googleapis.google.gmail({ version: 'v1', auth: client });

  // Search for emails between admin and user
  const query = `from:me to:${userEmail} OR from:${userEmail}`;

  const response = await gmail.users.threads.list({
    userId: 'me',
    q: query,
    maxResults
  });

  const threads = response.data.threads || [];

  const detailedThreads: GmailThread[] = [];

  for (const thread of threads) {
    if (!thread.id) continue;

    const threadData = await gmail.users.threads.get({
      userId: 'me',
      id: thread.id,
      fields: 'messages(id,threadId,payload/headers,snippet,internalDate)'
    });

    const messages = threadData.data.messages || [];
    const parsedMessages: GmailMessage[] = [];

    for (const message of messages) {
      const headers = message.payload?.headers || [];
      const getHeader = (name: string) =>
        headers.find(h => h.name?.toLowerCase() === name.toLowerCase())?.value || '';

      const subject = getHeader('Subject');
      const from = getHeader('From');
      const to = getHeader('To');
      const date = getHeader('Date');

      // Get email body
      let body = '';
      const parts = message.payload?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.body?.data) {
            body = Buffer.from(part.body.data, 'base64').toString('utf-8');
            break;
          }
        }
      } else if (message.payload?.body?.data) {
        body = Buffer.from(message.payload.body.data, 'base64').toString('utf-8');
      }

      parsedMessages.push({
        id: message.id || '',
        threadId: message.threadId || '',
        subject,
        snippet: message.snippet || '',
        from,
        to,
        date: new Date(parseInt(message.internalDate || '0')).toISOString(),
        body
      });
    }

    if (parsedMessages.length > 0) {
      detailedThreads.push({
        id: thread.id,
        subject: parsedMessages[0].subject,
        snippet: parsedMessages[0].snippet,
        messages: parsedMessages,
        lastMessageDate: parsedMessages[parsedMessages.length - 1].date
      });
    }
  }

  return detailedThreads;
}

// Send email via Gmail
export async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const client = await getGmailClient();
  if (!client) {
    return { success: false, error: 'Gmail not connected' };
  }

  const googleapis = await import('googleapis');
  const gmailClient = googleapis.google.gmail({ version: 'v1', auth: client });

  // Construct email
  const email = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    '',
    body
  ].join('\n');

  const encodedMessage = Buffer.from(email)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  try {
    const response = await gmailClient.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage
      }
    });

    return {
      success: true,
      messageId: response.data.id
    };
  } catch (err: any) {
    console.error('Failed to send email:', err);
    return {
      success: false,
      error: err.message || 'Failed to send email'
    };
  }
}