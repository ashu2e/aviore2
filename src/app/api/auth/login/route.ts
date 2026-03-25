import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { comparePasswords, signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const isValid = await comparePasswords(password, user.password_hash);
    if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = await signToken({ id: user.id, email: user.email, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set('aviore_token', token, { httpOnly: true, path: '/' });

    return NextResponse.json({ id: user.id, name: user.name, role: user.role });
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
}
