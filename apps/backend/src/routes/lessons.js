const express = require('express');
const { prisma } = require('database');
const { verifyToken } = require('../middleware/auth');
const { checkPremiumStatus } = require('../middleware/premium');
const router = express.Router();

router.get('/subjects', async (req, res) => {
  try {
    const data = await prisma.subject.findMany();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});

router.get('/programs/:subjectId', async (req, res) => {
  try {
    const data = await prisma.program.findMany({ where: { subjectId: req.params.subjectId } });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

router.get('/lessons/:programId', async (req, res) => {
  try {
    const data = await prisma.lesson.findMany({ 
      where: { programId: req.params.programId },
      orderBy: { orderIndex: 'asc' }
    });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

router.get('/content/:lessonId', verifyToken, async (req, res) => {
  try {
    const lesson = await prisma.lesson.findUnique({ where: { id: req.params.lessonId } });
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    if (lesson.isPremium && req.user.subscriptionStatus !== 'PREMIUM') {
      return res.status(403).json({ error: 'Premium subscription required to access this lesson content' });
    }

    const contents = await prisma.lessonContent.findMany({ where: { lessonId: req.params.lessonId } });
    
    // Parse the JSON string from SQLite back to object
    const parsedContents = contents.map(c => ({
      ...c,
      content: JSON.parse(c.content)
    }));

    res.json({ data: parsedContents.length > 0 ? parsedContents : { data: 'No content available yet.' } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lesson content' });
  }
});

router.get('/premium-materials', verifyToken, checkPremiumStatus, (req, res) => {
  res.json({ data: 'This is an exclusive premium material dashboard.' });
});

module.exports = router;
