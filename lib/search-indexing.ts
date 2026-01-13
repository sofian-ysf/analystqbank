/**
 * Search Engine Indexing APIs
 * Automatically submit new URLs to Google and Bing for faster indexing
 */

// Google Indexing API
export async function submitToGoogle(url: string): Promise<{ success: boolean; message: string }> {
  try {
    const credentials = process.env.GOOGLE_INDEXING_CREDENTIALS
    if (!credentials) {
      console.log('[Indexing] Google credentials not configured, skipping')
      return { success: false, message: 'Google credentials not configured' }
    }

    const parsedCredentials = JSON.parse(credentials)

    // Get access token using service account
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: await createGoogleJWT(parsedCredentials)
      })
    })

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text()
      console.error('[Indexing] Google token error:', error)
      return { success: false, message: 'Failed to get Google access token' }
    }

    const { access_token } = await tokenResponse.json()

    // Submit URL for indexing
    const indexResponse = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED'
      })
    })

    if (!indexResponse.ok) {
      const error = await indexResponse.text()
      console.error('[Indexing] Google indexing error:', error)
      return { success: false, message: `Google indexing failed: ${error}` }
    }

    console.log(`[Indexing] Successfully submitted to Google: ${url}`)
    return { success: true, message: 'Submitted to Google' }

  } catch (error) {
    console.error('[Indexing] Google error:', error)
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Create JWT for Google service account authentication
async function createGoogleJWT(credentials: { client_email: string; private_key: string }): Promise<string> {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  }

  const encoder = new TextEncoder()
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  const signatureInput = `${headerB64}.${payloadB64}`

  // Import the private key and sign
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(credentials.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    encoder.encode(signatureInput)
  )

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  return `${signatureInput}.${signatureB64}`
}

// Convert PEM to ArrayBuffer
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\n/g, '')
  const binary = atob(b64)
  const buffer = new ArrayBuffer(binary.length)
  const view = new Uint8Array(buffer)
  for (let i = 0; i < binary.length; i++) {
    view[i] = binary.charCodeAt(i)
  }
  return buffer
}

// Bing URL Submission API
export async function submitToBing(url: string): Promise<{ success: boolean; message: string }> {
  try {
    const apiKey = process.env.BING_WEBMASTER_API_KEY
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.analysttrainer.com'

    if (!apiKey) {
      console.log('[Indexing] Bing API key not configured, skipping')
      return { success: false, message: 'Bing API key not configured' }
    }

    const response = await fetch(
      `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrl?apikey=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteUrl: siteUrl,
          url: url
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('[Indexing] Bing error:', error)
      return { success: false, message: `Bing submission failed: ${error}` }
    }

    console.log(`[Indexing] Successfully submitted to Bing: ${url}`)
    return { success: true, message: 'Submitted to Bing' }

  } catch (error) {
    console.error('[Indexing] Bing error:', error)
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Submit to IndexNow (used by Bing, Yandex, and others)
export async function submitToIndexNow(url: string): Promise<{ success: boolean; message: string }> {
  try {
    const apiKey = process.env.INDEXNOW_API_KEY
    const host = 'www.analysttrainer.com'

    if (!apiKey) {
      console.log('[Indexing] IndexNow API key not configured, skipping')
      return { success: false, message: 'IndexNow API key not configured' }
    }

    const response = await fetch(
      `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${apiKey}`,
      { method: 'GET' }
    )

    // IndexNow returns 200 for success, 202 for accepted
    if (response.status === 200 || response.status === 202) {
      console.log(`[Indexing] Successfully submitted to IndexNow: ${url}`)
      return { success: true, message: 'Submitted to IndexNow (Bing, Yandex, etc.)' }
    }

    const error = await response.text()
    console.error('[Indexing] IndexNow error:', error)
    return { success: false, message: `IndexNow submission failed: ${response.status}` }

  } catch (error) {
    console.error('[Indexing] IndexNow error:', error)
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// Submit URL to all search engines
export async function submitToSearchEngines(url: string): Promise<{
  google: { success: boolean; message: string };
  bing: { success: boolean; message: string };
  indexNow: { success: boolean; message: string };
}> {
  console.log(`[Indexing] Submitting URL to search engines: ${url}`)

  const [google, bing, indexNow] = await Promise.all([
    submitToGoogle(url),
    submitToBing(url),
    submitToIndexNow(url)
  ])

  return { google, bing, indexNow }
}
