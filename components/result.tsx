import { ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { CopyButton } from './copy-button';
import { Button } from './ui/button';

interface ResultProps {
  shortUrl: string;
  originalUrl: string;
}

export default function Result({ shortUrl, originalUrl }: ResultProps) {
  return (
    <div className='space-y-6'>
      {/* Success indicator */}
      <div className='flex items-center justify-center space-x-2 text-green-600'>
        <CheckCircle2 className='h-5 w-5' />
        <span className='text-sm font-medium'>URL shortened successfully!</span>
      </div>

      {/* Result card */}
      <Card className='p-6 space-y-6 border-green-100 bg-green-50/30'>
        {/* Short URL */}
        <div className='space-y-3'>
          <div className='text-center'>
            <p className='text-sm font-medium text-foreground mb-2'>Your short URL</p>
            <div className='flex items-center space-x-2 p-4 bg-background rounded-lg border-2 border-dashed border-green-200'>
              <code className='flex-1 text-center font-mono text-sm text-green-700 break-all'>{shortUrl}</code>
              <CopyButton text={shortUrl} />
            </div>
          </div>
        </div>

        {/* Original URL preview */}
        <div className='text-center'>
          <p className='text-xs text-muted-foreground mb-1'>Original URL</p>
          <a
            href={originalUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-muted-foreground/80 break-all px-2 hover:underline'
          >
            {originalUrl}
          </a>
        </div>

        {/* Action buttons */}
        <div className='flex flex-col sm:flex-row gap-2'>
          <Button asChild variant='outline' className='flex-1 h-9'>
            <a
              href={shortUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center space-x-2'
            >
              <ExternalLink className='h-4 w-4' />
              <span>Test Link</span>
            </a>
          </Button>

          <Button onClick={() => window.location.reload()} variant='ghost' className='flex-1 h-9'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Shorten Another
          </Button>
        </div>
      </Card>
    </div>
  );
}
