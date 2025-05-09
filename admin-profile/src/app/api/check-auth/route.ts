import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAuthenticated = token === "sample-auth-token";
  
  return NextResponse.json(
    { isAuthenticated },
    { status: 200 }
  );
}