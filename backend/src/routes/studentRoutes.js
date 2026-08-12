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
} = require("../controllers/studentController");

const studentAuth = require("../middleware/studentAuth");

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

module.exports = router;