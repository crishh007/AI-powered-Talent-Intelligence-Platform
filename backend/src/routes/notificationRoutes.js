const express = require("express");

const {
  sendNotification,
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const studentAuth = require("../middleware/studentAuth");

const router = express.Router();

router.use(studentAuth);

router.post("/send", sendNotification);
router.get("/", getNotifications);
router.patch("/:id/read", markAsRead);

module.exports = router;
