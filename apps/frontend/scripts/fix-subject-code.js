const { PrismaClient } = require('../../../packages/database/index');
const p = new PrismaClient();

p.subject.update({ where: { code: 'ZH' }, data: { code: 'zh' } })
  .then(r => console.log('Fixed:', r.code, r.name))
  .finally(() => p.$disconnect());
