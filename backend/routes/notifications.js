const express = require('express');
const router = express.Router();

let notifications = [];
let nextId = 1;

function createNotification(studentId, message) {
  const newNotification = {
    id: nextId++,
    studentId,
    message,
    read: false,
    createdAt: new Date()
  };
  notifications.push(newNotification);
  return newNotification;
}

router.post('/send', (req, res) => {
  const newNotification = createNotification(req.body.studentId, req.body.message);
  res.status(201).json(newNotification);
});

router.get('/:studentId', (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const studentNotifications = notifications.filter(n => n.studentId === studentId);
  res.json(studentNotifications);
});

router.patch('/:id/read', (req, res) => {
  const notifId = parseInt(req.params.id);
  const notification = notifications.find(n => n.id === notifId);

  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }

  notification.read = true;
  res.json(notification);
});

module.exports = { router, createNotification };
