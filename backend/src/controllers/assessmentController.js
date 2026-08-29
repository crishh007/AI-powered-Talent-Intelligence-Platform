const prisma = require("../lib/prisma");

// CREATE - Create a new MCQ test
const createTest = async (req, res) => {
  try {
    const { title, questions } = req.body;

    const test = await prisma.test.create({
      data: { title, questions },
    });

    res.status(201).json({ success: true, data: test });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ - Get a test (answers hidden)
const getTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await prisma.test.findUnique({ where: { id } });

    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    const safeQuestions = test.questions.map((q) => ({
      question: q.question,
      options: q.options,
    }));

    res.status(200).json({
      success: true,
      data: { id: test.id, title: test.title, questions: safeQuestions },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE - Submit answers, auto-score, and notify
const submitTest = async (req, res) => {
  try {
    const { studentId } = req.user;
    const { id } = req.params;
    const { answers } = req.body;

    const test = await prisma.test.findUnique({ where: { id } });

    if (!test) {
      return res.status(404).json({ success: false, message: "Test not found" });
    }

    let score = 0;
    test.questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) score++;
    });

    const result = await prisma.result.create({
      data: {
        testId: test.id,
        studentId,
        score,
        total: test.questions.length,
      },
    });

    await prisma.notification.create({
      data: {
        studentId,
        message: `Your test result is ready: ${score}/${test.questions.length}`,
      },
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTest,
  getTest,
  submitTest,
};
