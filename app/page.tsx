import CreateShortUrlForm from '@/components/create-short-url-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'minilink - Fast URL Shortener | Shorten Links Instantly',
  description:
    'Transform long URLs into short, shareable links in seconds. Fast, secure, and simple URL shortening service with click tracking and analytics.',
};

export default function HomePage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* Header */}
        <div className='text-center space-y-2'>
          <h1 className='text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            minilink.
          </h1>
          <h2 className='text-muted-foreground text-sm font-medium'>Shorten your URLs instantly</h2>
        </div>

        {/* Form */}
        <CreateShortUrlForm />

        {/* Footer */}
        <div className='text-center'>
          <p className='text-xs text-muted-foreground/60'>Fast • Secure • Simple</p>
        </div>
      </div>
    </div>
  );
}
