const {Client} = require('pg');
require('dotenv').config({path: '.env'});
const client = new Client({ connectionString: process.env.DATABASE_URL });
const sql = [
  'ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_userId_lessonId_key" UNIQUE ("userId", "lessonId")',
  'ALTER TABLE "UserProgress" ADD COLUMN IF NOT EXISTS "completedAt" TIMESTAMP',
  'ALTER TABLE "UserProgress" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()',
  'ALTER TABLE "UserProgress" ALTER COLUMN "score" SET DEFAULT 0'
];
client.connect()
  .then(async () => {
    for (const q of sql) {
      await client.query(q).then(() => console.log('OK:', q.slice(0,50))).catch(e => console.log('Skip:', e.message.slice(0,60)));
    }
  })
  .finally(() => client.end());
