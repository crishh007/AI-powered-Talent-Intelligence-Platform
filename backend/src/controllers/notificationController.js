const prisma = require("../lib/prisma");

// CREATE - Send a notification
const sendNotification = async (req, res) => {
  try {
    const { studentId, message } = req.body;

    const notification = await prisma.notification.create({
      data: { studentId, message },
    });

    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ - Get notifications for the logged-in student
const getNotifications = async (req, res) => {
  try {
    const { studentId } = req.user;

    const notifications = await prisma.notification.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE - Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.update({
      where: { id },
      data: { read: true },
    });

    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  sendNotification,
  getNotifications,
  markAsRead,
};
