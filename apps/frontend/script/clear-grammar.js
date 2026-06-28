const { PrismaClient } = require('../packages/database/index');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing all GRAMMAR content from lesson_contents table...');
  const deleted = await prisma.lessonContent.deleteMany({
    where: {
      contentType: 'GRAMMAR'
    }
  });
  console.log(`Deleted ${deleted.count} grammar records.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
