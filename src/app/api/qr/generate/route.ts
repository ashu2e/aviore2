import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { listingId, upi_id } = await request.json();

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=upi://pay?pa=${upi_id}`;
    
    // If listingId is provided, we save it (assuming local database mock or real)
    if (listingId) {
       await prisma.qrCode.create({
         data: {
           listingId,
           upi_id,
           qr_image_url: qrUrl
         }
       });
    }

    return NextResponse.json({ qr_image_url: qrUrl }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate QR' }, { status: 500 });
  }
}
