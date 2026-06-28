const {PrismaClient} = require('../packages/database/index');
const p = new PrismaClient();
p.lesson.findMany({
  where:{program:{code:{contains:'starters'}}},
  select:{id:true,title:true,orderIndex:true},
  orderBy:{orderIndex:'asc'},
  take:3
}).then(r=>console.log(JSON.stringify(r,null,2))).finally(()=>p.disconnect());
