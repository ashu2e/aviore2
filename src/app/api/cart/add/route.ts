import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { listingId, quantity = 1 } = await request.json();

  const item = await prisma.cartItem.upsert({
    where: { userId_listingId: { userId: session.id, listingId } },
    update: { quantity: { increment: quantity } },
    create: { userId: session.id, listingId, quantity }
  });

  return NextResponse.json(item);
}
