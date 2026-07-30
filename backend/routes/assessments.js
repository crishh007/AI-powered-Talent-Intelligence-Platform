const express = require('express');
const router = express.Router();
const { createNotification } = require('./notifications');

let tests = [];
let results = [];
let nextTestId = 1;
let nextResultId = 1;

router.post('/create', (req, res) => {
  const newTest = {
    id: nextTestId++,
    opportunityId: req.body.opportunityId,
    title: req.body.title,
    questions: req.body.questions
  };
  tests.push(newTest);
  res.status(201).json(newTest);
});

router.get('/:id', (req, res) => {
  const test = tests.find(t => t.id === parseInt(req.params.id));
  if (!test) return res.status(404).json({ error: 'Test not found' });

  const safeQuestions = test.questions.map(q => ({
    question: q.question,
    options: q.options
  }));

  res.json({ id: test.id, title: test.title, questions: safeQuestions });
});

router.post('/:id/submit', (req, res) => {
  const test = tests.find(t => t.id === parseInt(req.params.id));
  if (!test) return res.status(404).json({ error: 'Test not found' });

  const studentAnswers = req.body.answers;
  let score = 0;

  test.questions.forEach((q, i) => {
    if (q.correctAnswer === studentAnswers[i]) score++;
  });

  const result = {
    id: nextResultId++,
    testId: test.id,
    studentId: req.body.studentId,
    score,
    total: test.questions.length,
    submittedAt: new Date()
  };
  results.push(result);

  createNotification(result.studentId, `Your test result is ready: ${result.score}/${result.total}`);

  res.status(201).json(result);
});

module.exports = router;
