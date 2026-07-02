import { NextResponse } from 'next/server';
import { getDefaultProgramCode } from '@/lib/getProgressIds';

export const dynamic = 'force-dynamic';

// Dùng bởi Navigation.tsx (client component) để lấy đúng chương trình mặc định của user
// (lớp đang active > chương trình học gần nhất > hsk1) khi URL chưa có ?level=,
// thay vì Navigation tự hardcode 'hsk1' khi build link điều hướng.
export async function GET() {
  const level = await getDefaultProgramCode();
  return NextResponse.json({ level });
}
