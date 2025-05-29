'use client';

import { ErrorResponse } from '@/app/api/shorten/route';
import { SuccessResponse } from '@/app/api/shorten/route';
import { useFormState } from 'react-dom';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { normalizeUrl } from '@/lib/utils';
import Result from './result';

const initialState = {
  error: null,
};

async function createShortUrlAction(_: State, formData: FormData): Promise<State> {
  const url = formData.get('url');

  if (!url) {
    return { error: 'URL is required' };
  }

  if (typeof url !== 'string') {
    return { error: 'URL must be a string' };
  }

  if (url.trim() === '') {
    return { error: 'URL cannot be empty' };
  }

  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ url: normalizeUrl(url.trim()) }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = (await response.json()) as SuccessResponse | ErrorResponse;

    if (!response.ok) {
      return { error: 'error' in data ? data.error : 'Failed to shorten URL' };
    }

    if ('error' in data) {
      return { error: data.error };
    }

    return { error: null, data: { shortUrl: data.shortUrl, shortCode: data.shortCode, originalUrl: data.originalUrl } };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { error: 'Failed to shorten URL' };
  }
}

type State = {
  error: string | null;
  data?: {
    shortUrl: string;
    shortCode: string;
    originalUrl: string;
  };
};

export default function CreateShortUrlForm() {
  const [state, formAction, isPending] = useFormState(createShortUrlAction, initialState);

  if (state.data) {
    return <Result shortUrl={state.data.shortUrl} originalUrl={state.data.originalUrl} />;
  }

  return (
    <Card className='p-6 backdrop-blur-sm bg-card/50 border-border/50'>
      <form action={formAction} className='space-y-4'>
        <div className='space-y-3'>
          <Input
            name='url'
            placeholder='Enter the URL'
            className='h-12 text-center border-border/50 focus:border-primary/50 transition-colors'
            disabled={isPending}
            autoFocus
          />

          {state.error && <p className='text-sm text-destructive pb-2'>{state.error}</p>}
        </div>

        <Button type='submit' className='w-full h-12 font-medium' disabled={isPending}>
          {isPending ? (
            <div className='flex items-center space-x-2'>
              <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
              <span>Shortening...</span>
            </div>
          ) : (
            'Shorten URL'
          )}
        </Button>
      </form>
    </Card>
  );
}
