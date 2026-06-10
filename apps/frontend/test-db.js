const { PrismaClient } = require('database');
const path = require('path');

async function main() {
  const dbPath = path.join(process.cwd(), '../../packages/database/prisma/dev.db');
  console.log("DB Path:", dbPath);
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`
      }
    }
  });
  
  const programs = await prisma.program.findMany({
    include: { lessons: true }
  });
  console.log(JSON.stringify(programs, null, 2));
}

main().catch(console.error);
