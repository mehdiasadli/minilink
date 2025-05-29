import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateShortCode, isValidUrl } from '@/lib/utils';
import { shortenUrlSchema } from '@/lib/schemas';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { getClientIP, rateLimit } from '@/lib/rate-limit';

export type SuccessResponse = {
  shortUrl: string;
  shortCode: string;
  originalUrl: string;
};

export type ErrorResponse = {
  error: string;
};

export async function POST(request: NextRequest) {
  console.log('POST /shorten REQUEST HAS STARTED...');

  try {
    console.log('Rate limit check...');

    const clientIP = await getClientIP();
    const allowed = await rateLimit(clientIP, 20);

    console.log('Client IP:', clientIP);

    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    console.log('Rate limit check completed...');

    const body = await request.json();

    console.log('URL validation...');
    const data = shortenUrlSchema.parse(body);

    if (!isValidUrl(data.url)) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    console.log('URL validation completed...', data.url);
    console.log('Existing link check...');

    const existingLink = await prisma.link.findFirst({
      where: { originalUrl: data.url },
    });

    console.log('Existing link check completed...', existingLink);

    if (existingLink) {
      return NextResponse.json({
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${existingLink.shortCode}`,
        shortCode: existingLink.shortCode,
        originalUrl: existingLink.originalUrl,
      });
    }

    const shortCode = await generateUniqueShortCode();

    console.log('Generating unique short code...', shortCode);

    const newLink = await prisma.link.create({
      data: {
        shortCode,
        originalUrl: data.url,
      },
    });

    const result = {
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newLink.shortCode}`,
      shortCode: newLink.shortCode,
      originalUrl: newLink.originalUrl,
    };

    console.log('Result:', result);

    return NextResponse.json(result);
  } catch (e) {
    console.error('Error shortening URL:', e);

    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors[0].message }, { status: 400 });
    }

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return NextResponse.json({ error: 'URL already exists' }, { status: 400 });
      }
    }

    if (e instanceof Error && e.message === '0') {
      return NextResponse.json({ error: 'Failed to generate unique short code' }, { status: 500 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateUniqueShortCode(maxAttempts = 10): Promise<string> {
  for (let i = 0; i < maxAttempts; i++) {
    const shortCode = generateShortCode();

    const existingLink = await prisma.link.findUnique({
      where: { shortCode },
    });

    if (!existingLink) {
      return shortCode;
    }
  }

  throw new Error('0');
}
