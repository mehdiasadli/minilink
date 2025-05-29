'use client';

import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface RedirectClientProps {
  url: string;
}

export function RedirectClient({ url }: RedirectClientProps) {
  useEffect(() => {
    // Redirect after a short delay to show the loading state
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 1500);

    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4'>
      <div className='w-full max-w-md space-y-8'>
        {/* Header */}
        <div className='text-center space-y-2'>
          <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
            minilink
          </h1>
          <p className='text-muted-foreground text-sm'>Redirecting you...</p>
        </div>

        {/* Redirect Card */}
        <Card className='p-6 backdrop-blur-sm bg-card/50 border-border/50 space-y-4'>
          <div className='text-center space-y-4'>
            {/* Loading indicator */}
            <div className='flex justify-center'>
              <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
            </div>

            <div className='space-y-2'>
              <p className='text-sm font-medium'>Taking you to:</p>
              <p className='text-xs text-muted-foreground break-all bg-muted/50 p-3 rounded-md'>{url}</p>
            </div>

            {/* Manual redirect options */}
            <div className='flex flex-col sm:flex-row gap-2 pt-4 border-t'>
              <Button asChild variant='outline' className='flex-1'>
                <a
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center justify-center space-x-2'
                >
                  <ExternalLink className='h-4 w-4' />
                  <span>Open Link</span>
                </a>
              </Button>

              <Button asChild variant='ghost' className='flex-1'>
                <Link href='/' className='flex items-center justify-center space-x-2'>
                  <ArrowLeft className='h-4 w-4' />
                  <span>Go Back</span>
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
