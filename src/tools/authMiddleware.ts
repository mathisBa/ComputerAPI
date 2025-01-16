import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function authMiddleware(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  return NextResponse.next();
}

