import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from 'database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, score } = await req.json();
    if (!lessonId || score === undefined) {
      return NextResponse.json({ error: 'Missing lessonId or score' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const completed = score >= 40;

    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: { userId: user.id, lessonId }
      },
      update: {
        score: Math.max(score, 0),
        completed,
        completedAt: completed ? new Date() : undefined,
        lastReviewedAt: new Date()
      },
      create: {
        userId: user.id,
        lessonId,
        score,
        completed,
        completedAt: completed ? new Date() : undefined
      }
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const programCode = searchParams.get('programCode');

    const progress = await prisma.userProgress.findMany({
      where: {
        userId: user.id,
        ...(programCode ? {
          lesson: { program: { code: programCode } }
        } : {})
      },
      select: {
        lessonId: true,
        completed: true,
        score: true,
        completedAt: true
      }
    });

    return NextResponse.json({ progress });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
