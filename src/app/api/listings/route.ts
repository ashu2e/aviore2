import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const listings = await prisma.listing.findMany({ 
    include: { user: true }, 
    orderBy: { created_at: 'desc' } 
  });
  return NextResponse.json(listings);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== 'seller') return NextResponse.json({ error: 'Unauthorized seller' }, { status: 401 });

  try {
    const { title, description, price, type, category, img, upi_id } = await request.json();
    
    const listing = await prisma.listing.create({
      data: { 
        title, 
        description, 
        price: Number(price), 
        type, 
        category, 
        upi_id,
        img: img || '💼', 
        user: { connect: { id: session.id } }
      }
    });

    return NextResponse.json(listing);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
