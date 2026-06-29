import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Khác với getAllSubjectsWithPrograms (chỉ lấy chương trình isAvailable=true, dùng cho trang chủ),
// route này trả về TẤT CẢ chương trình (kể cả đang khóa) để dropdown chọn chương trình hiển thị đủ,
// kèm icon khóa + thông báo "đang phát triển" khi click.
export async function GET() {
  try {
    const subjects = await prisma.subject.findMany({
      include: {
        programs: {
          orderBy: { level: 'asc' },
          select: { id: true, code: true, name: true, level: true, isAvailable: true },
        },
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(subjects);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
