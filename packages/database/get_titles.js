const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const p = await prisma.program.findUnique({where:{code:'en-pet'}, include:{lessons:{orderBy:{orderIndex:'asc'}}}});
  console.log(JSON.stringify(p.lessons.map(l => l.orderIndex + ': ' + l.title).slice(0, 10), null, 2));
}
main().finally(() => prisma.$disconnect());
