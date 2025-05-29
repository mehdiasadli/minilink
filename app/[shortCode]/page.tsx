// app/[shortCode]/page.tsx
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

interface RedirectPageProps {
  params: Promise<{
    shortCode: string;
  }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortCode } = await params;

  const link = await prisma.link.findUnique({
    where: { shortCode },
  });

  if (!link) {
    notFound();
  }

  // Increment click count (fire and forget)
  prisma.link
    .update({
      where: { shortCode },
      data: { clickCount: { increment: 1 } },
    })
    .catch(() => {}); // Silently handle errors

  // This will throw NEXT_REDIRECT which is expected behavior
  redirect(link.originalUrl);
}
