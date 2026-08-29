const express = require("express");

const { createTest, getTest, submitTest } = require("../controllers/assessmentController");

const studentAuth = require("../middleware/studentAuth");

const router = express.Router();

router.use(studentAuth);

router.post("/create", createTest);
router.get("/:id", getTest);
router.post("/:id/submit", submitTest);

module.exports = router;
