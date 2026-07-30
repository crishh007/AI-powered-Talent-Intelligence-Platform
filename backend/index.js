const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const applicationRoutes = require('./routes/applications');
app.use('/applications', applicationRoutes);

const assessmentRoutes = require('./routes/assessments');
app.use('/assessments', assessmentRoutes);

const { router: notificationRoutes } = require('./routes/notifications');
app.use('/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
