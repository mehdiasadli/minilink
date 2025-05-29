import { headers } from 'next/headers';

const rateLimitMap = new Map();

export async function rateLimit(identifier: string, limit = 10, window = 60_000) {
  const now = Date.now();
  const windowStart = now - window;

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, []);
  }

  const requests = rateLimitMap.get(identifier);

  const validRequests = requests.filter((time: number) => time > windowStart);

  if (validRequests.length >= limit) {
    return false;
  }

  validRequests.push(now);
  rateLimitMap.set(identifier, validRequests);

  return true;
}

export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  const forwarded = headersList.get('x-forwarded-for');
  const realIP = headersList.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}
