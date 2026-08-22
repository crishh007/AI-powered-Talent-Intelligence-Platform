const express = require("express");

const {
  getStudentProfile,
  updateStudentProfile,

  getStudentSkills,
  addStudentSkill,
  updateStudentSkill,
  deleteStudentSkill,

  getStudentEducation,
  addStudentEducation,
  updateStudentEducation,
  deleteStudentEducation,

  getStudentProjects,
  addStudentProject,
  updateStudentProject,
  deleteStudentProject,

  getStudentResume,
  uploadStudentResume,
  deleteStudentResume,

  getStudentApplications,
  addStudentApplication,
updateStudentApplication,
deleteStudentApplication,
} = require("../controllers/studentController");

const studentAuth = require("../middleware/studentAuth");
const uploadResume = require("../middleware/upload");

const router = express.Router();

// Temporary student authentication
router.use(studentAuth);

// ==================== PROFILE ====================

router.get("/profile", getStudentProfile);
router.put("/profile", updateStudentProfile);

// ==================== SKILLS ====================

router.get("/skills", getStudentSkills);
router.post("/skills", addStudentSkill);
router.put("/skills/:id", updateStudentSkill);
router.delete("/skills/:id", deleteStudentSkill);

// ==================== EDUCATION ====================

router.get("/education", getStudentEducation);
router.post("/education", addStudentEducation);
router.put("/education/:id", updateStudentEducation);
router.delete("/education/:id", deleteStudentEducation);

// ==================== PROJECTS ====================

router.get("/projects", getStudentProjects);
router.post("/projects", addStudentProject);
router.put("/projects/:id", updateStudentProject);
router.delete("/projects/:id", deleteStudentProject);

// ==================== RESUME ====================

// Get current resume
router.get("/resume", getStudentResume);

// Upload / Replace resume
router.post(
  "/resume",
  uploadResume.single("resume"),
  uploadStudentResume
);

// Delete resume
router.delete("/resume", deleteStudentResume);

// ==================== APPLICATIONS ====================

// Get student's application history
router.get("/applications", getStudentApplications);

// Add new application
router.post("/applications", addStudentApplication);

// Update application
router.put("/applications/:id", updateStudentApplication);

// Delete application
router.delete("/applications/:id", deleteStudentApplication);
module.exports = router;