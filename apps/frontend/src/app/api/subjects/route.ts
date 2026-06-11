import { NextResponse } from 'next/server';
import { getAllSubjectsWithPrograms } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const subjects = await getAllSubjectsWithPrograms();
    return NextResponse.json(subjects);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
