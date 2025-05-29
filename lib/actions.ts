'use server';

import { prisma } from '@/lib/prisma';
import { generateShortCode, isValidUrl, normalizeUrl } from '@/lib/utils';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

type State = {
  error: string | null;
  data?: {
    shortUrl: string;
    shortCode: string;
    originalUrl: string;
  };
};

export async function createShortUrlAction(_: State, formData: FormData): Promise<State> {
  const clientIP = await getClientIP();

  try {
    console.log('Server Action: URL shortening started', { clientIP });

    // Rate limiting
    const allowed = await rateLimit(clientIP, 20, 60000);
    if (!allowed) {
      console.log('Server Action: Rate limit exceeded', { clientIP });
      return { error: 'Too many requests. Please try again later.' };
    }

    const url = formData.get('url');
    console.log('Server Action: Processing URL', { url });

    if (!url) {
      return { error: 'URL is required' };
    }

    if (typeof url !== 'string') {
      return { error: 'URL must be a string' };
    }

    if (url.trim() === '') {
      return { error: 'URL cannot be empty' };
    }

    const normalizedUrl = normalizeUrl(url.trim());

    if (!isValidUrl(normalizedUrl)) {
      console.log('Server Action: Invalid URL', { url, normalizedUrl });
      return { error: 'Invalid URL format' };
    }

    // Check if URL already exists
    const existingLink = await prisma.link.findFirst({
      where: { originalUrl: normalizedUrl },
    });

    if (existingLink) {
      console.log('Server Action: Existing URL found', { shortCode: existingLink.shortCode });
      return {
        error: null,
        data: {
          shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${existingLink.shortCode}`,
          shortCode: existingLink.shortCode,
          originalUrl: existingLink.originalUrl,
        },
      };
    }

    // Generate unique short code
    const shortCode = await generateUniqueShortCode();

    // Create new link
    const newLink = await prisma.link.create({
      data: {
        shortCode,
        originalUrl: normalizedUrl,
      },
    });

    console.log('Server Action: New URL shortened', { shortCode: newLink.shortCode });

    return {
      error: null,
      data: {
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newLink.shortCode}`,
        shortCode: newLink.shortCode,
        originalUrl: newLink.originalUrl,
      },
    };
  } catch (error) {
    console.error('Server Action: Error shortening URL', error);
    return { error: 'Failed to shorten URL. Please try again.' };
  }
}

async function generateUniqueShortCode(maxAttempts: number = 5): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const shortCode = generateShortCode();

    const existingLink = await prisma.link.findUnique({
      where: { shortCode },
    });

    if (!existingLink) {
      return shortCode;
    }
  }

  throw new Error('Failed to generate unique short code after multiple attempts');
}
