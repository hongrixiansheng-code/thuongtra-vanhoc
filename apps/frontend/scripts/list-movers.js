const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const program = await prisma.program.findUnique({
    where: { code: 'en-movers' }
  });

  const lessons = await prisma.lesson.findMany({
    where: { programId: program.id },
    orderBy: { orderIndex: 'asc' },
    include: {
      _count: {
        select: { contents: true }
      }
    }
  });

  console.log("=== MOVERS LESSONS ===");
  lessons.forEach(l => {
    console.log(`Bài ${l.orderIndex}: ${l.title} - Contents: ${l._count.contents}`);
  });
}

main().then(() => prisma.$disconnect());
