import { NextResponse } from 'next/server';
import evaluateAll from './test';

export async function middleware(request) {
  // get current path
  const pathname = request.nextUrl.pathname;
  // launch test when requesting '/test'  
  if (pathname === '/test') {
    const results = evaluateAll(10);
    return NextResponse.json(results, { status: 200 });
  }
  // continue rendering
  return NextResponse.next({});
}
