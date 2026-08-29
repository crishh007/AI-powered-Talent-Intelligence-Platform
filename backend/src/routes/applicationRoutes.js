const express = require("express");

const {
  applyToJob,
  getApplications,
  updateApplicationStatus,
  withdrawApplication,
} = require("../controllers/applicationController");

const studentAuth = require("../middleware/studentAuth");

const router = express.Router();

router.use(studentAuth);

router.post("/apply", applyToJob);
router.get("/", getApplications);
router.patch("/:id/status", updateApplicationStatus);
router.delete("/:id", withdrawApplication);

module.exports = router;
