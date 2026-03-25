import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { buyerId, listingId, message } = await request.json();

    const confirmation = await prisma.purchaseConfirmation.create({
      data: {
        buyerId,
        listingId,
        message,
        status: 'confirmed'
      }
    });

    return NextResponse.json(confirmation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to confirm purchase' }, { status: 500 });
  }
}
