const { prisma } = require('database');

async function main() {
  await prisma.lessonContent.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.program.deleteMany();
  await prisma.subject.deleteMany();

  const eng = await prisma.subject.create({
    data: { name: 'Tiếng Anh', code: 'EN' }
  });
  const cn = await prisma.subject.create({
    data: { name: 'Tiếng Trung', code: 'CN' }
  });

  const hsk1 = await prisma.program.create({
    data: {
      name: 'HSK 1',
      level: 1,
      subjectId: cn.id
    }
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Bài 1: Xin chào',
      orderIndex: 1,
      isPremium: false,
      programId: hsk1.id
    }
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Bài 2: Cảm ơn (Premium)',
      orderIndex: 2,
      isPremium: true,
      programId: hsk1.id
    }
  });

  await prisma.lessonContent.create({
    data: {
      lessonId: lesson1.id,
      contentType: 'THEORY',
      content: JSON.stringify({ text: 'Nǐ hǎo (你好) có nghĩa là Xin chào.' })
    }
  });

  await prisma.lessonContent.create({
    data: {
      lessonId: lesson2.id,
      contentType: 'THEORY',
      content: JSON.stringify({ text: 'Xièxiè (谢谢) có nghĩa là Cảm ơn.' })
    }
  });

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
