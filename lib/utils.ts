import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a random short code
 *
 * @param length - The length of the short code
 * @returns The short code
 *
 * @example
 * generateShortCode(); // "a1b2c3"
 * generateShortCode(8); // "a1b2c3d4"
 */
export function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzZ0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';

/**
 * Encode a number to a base62 string
 *
 * @param num - The number
 * @returns The base62 string
 *
 * @example
 * encodeBase62(123); // "123"
 * encodeBase62(1234567890); // "1234567890"
 *
 */
export function encodeBase62(num: number) {
  if (num === 0) return '0';

  let result = '';
  while (num > 0) {
    result = BASE62_CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
}

/**
 * Decode a base62 string to a number
 *
 * @param str - The base62 string
 * @returns The number
 *
 * @example
 * decodeBase62('123'); // 123
 * decodeBase62('1234567890'); // 1234567890
 *
 */
export function decodeBase62(str: string) {
  let result = 0;

  for (let i = 0; i < str.length; i++) {
    result = result * 62 + BASE62_CHARS.indexOf(str[i]);
  }

  return result;
}

/**
 * Generate a short URL
 *
 * @param id - The ID of the link
 * @returns The short URL
 *
 * @example
 * generateShortUrl(123); // "123"
 * generateShortUrl(1234567890); // "1234567890"
 *
 */
export function generateShortUrl(id: number) {
  return encodeBase62(id);
}

/**
 * Check if a URL is valid
 *
 * @param url - The URL to check
 * @returns True if the URL is valid, false otherwise
 *
 * @example
 * isValidUrl('https://www.google.com'); // true
 * isValidUrl('http://www.google.com'); // true
 * isValidUrl('www.google.com'); // true
 * isValidUrl('https://www.google.com/'); // true
 * isValidUrl('text'); // false
 *
 */
export function isValidUrl(url: string) {
  try {
    new URL(normalizeUrl(url));
    return true;
  } catch (e) {
    console.error('Invalid URL:', url, '; Error:', e);
    return false;
  }
}

/**
 * Normalize a URL
 *
 * @param url - The URL to normalize
 * @returns The normalized URL
 *
 * @example
 * normalizeUrl('https://www.google.com'); // "https://www.google.com"
 * normalizeUrl('http://www.google.com'); // "https://www.google.com"
 * normalizeUrl('www.google.com'); // "https://www.google.com"
 * normalizeUrl('google'); // "https://google.com"
 *
 */
export function normalizeUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `https://${url}`;
}
