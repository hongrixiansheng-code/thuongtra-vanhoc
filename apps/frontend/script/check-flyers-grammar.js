const {PrismaClient} = require('../packages/database/index'); 
const prisma = new PrismaClient(); 
async function main() { 
  const c = await prisma.lessonContent.findFirst({
    where: {
      contentType: 'GRAMMAR', 
      lesson: { program: { code: 'en-flyers' } } 
    }
  }); 
  console.log(c.content); 
} 
main().finally(() => prisma.$disconnect());
