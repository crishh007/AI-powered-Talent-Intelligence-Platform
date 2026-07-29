const express = require('express');
const router = express.Router();
const { createNotification } = require('./notifications');

let applications = [];
let nextId = 1;

router.post('/apply', (req, res) => {
  const newApplication = {
    id: nextId++,
    studentId: req.body.studentId,
    opportunityId: req.body.opportunityId,
    status: 'pending',
    appliedAt: new Date()
  };
  applications.push(newApplication);
  res.status(201).json(newApplication);
});

router.get('/', (req, res) => {
  res.json(applications);
});

router.patch('/:id/status', (req, res) => {
  const appId = parseInt(req.params.id);
  const application = applications.find(a => a.id === appId);

  if (!application) {
    return res.status(404).json({ error: 'Application not found' });
  }

  application.status = req.body.status;

  createNotification(application.studentId, `Your application status changed to: ${application.status}`);

  res.json(application);
});

router.delete('/:id', (req, res) => {
  const appId = parseInt(req.params.id);
  const index = applications.findIndex(a => a.id === appId);

  if (index === -1) {
    return res.status(404).json({ error: 'Application not found' });
  }

  applications.splice(index, 1);
  res.json({ message: 'Application withdrawn successfully' });
});

module.exports = router;
