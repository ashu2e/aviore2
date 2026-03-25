import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { name, email, password, role, upi_id } = await request.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Email exists' }, { status: 400 });

    const password_hash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password_hash, role, upi_id }
    });

    const token = await signToken({ id: user.id, email: user.email, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set('aviore_token', token, { httpOnly: true, path: '/' });

    return NextResponse.json({ id: user.id, name: user.name, role: user.role });
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
