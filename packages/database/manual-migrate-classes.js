const { Client } = require('pg');
require('dotenv').config({ path: '.env' });
const client = new Client({ connectionString: process.env.DATABASE_URL });
const sql = [
  `CREATE TABLE IF NOT EXISTS "Class" (
    "id" TEXT PRIMARY KEY,
    "programId" TEXT NOT NULL REFERENCES "Program"("id"),
    "teacherId" TEXT NOT NULL REFERENCES "User"("id"),
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS "ClassEnrollment" (
    "id" TEXT PRIMARY KEY,
    "classId" TEXT NOT NULL REFERENCES "Class"("id") ON DELETE CASCADE,
    "studentId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
    "joinedAt" TIMESTAMP NOT NULL DEFAULT NOW()
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "ClassEnrollment_classId_studentId_key" ON "ClassEnrollment"("classId", "studentId")`
];
client.connect()
  .then(async () => {
    for (const q of sql) {
      await client.query(q).then(() => console.log('OK:', q.slice(0, 60))).catch(e => console.log('Skip:', e.message.slice(0, 80)));
    }
  })
  .finally(() => client.end());
