const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

async function main() {
  const d = await prisma.lessonContent.findFirst({
    where: { contentType: 'DIALOGUE', lesson: { program: { code: 'en-pet' } } }
  });
  console.log(JSON.stringify(JSON.parse(d.content), null, 2));
}

main().finally(() => prisma.$disconnect());
