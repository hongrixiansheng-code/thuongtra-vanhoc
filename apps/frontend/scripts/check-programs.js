const { PrismaClient } = require('../../packages/database');
const p = new PrismaClient();
p.program.findMany({
  select: { code: true, name: true, subject: { select: { code: true } } }
}).then(r => console.log(JSON.stringify(r, null, 2))).finally(() => p.$disconnect());
