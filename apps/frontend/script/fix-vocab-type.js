const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.lessonContent.updateMany({
    where: { contentType: 'VOCABULARY' },
    data: { contentType: 'THEORY' }
  });
  console.log(`Updated ${result.count} records from VOCABULARY to THEORY.`);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
