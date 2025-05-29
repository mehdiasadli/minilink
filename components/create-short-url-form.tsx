'use client';

import { useFormState } from 'react-dom';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Result from './result';
import { createShortUrlAction } from '@/lib/actions';

const initialState = {
  error: null,
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

          {/* description */}
          <p className='text-xs text-muted-foreground'>
            Enter the URL either with or without <code>http://</code>
          </p>

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
