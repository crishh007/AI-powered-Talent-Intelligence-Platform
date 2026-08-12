const prisma = require("../lib/prisma");

// =====================================================
// PROFILE
// =====================================================

// Get Student Profile
const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Get student profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student profile",
    });
  }
};


// Update Student Profile
const updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const {
      phone,
      address,
      university,
      graduationYear,
      bio,
      profileImage,
    } = req.body;

    const student = await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        phone,
        address,
        university,
        graduationYear,
        bio,
        profileImage,
      },
    });

    res.status(200).json({
      success: true,
      message: "Student profile updated successfully",
      data: student,
    });
  } catch (error) {
    console.error("Update student profile error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student profile",
    });
  }
};


// =====================================================
// SKILLS
// =====================================================

// Get Student Skills
const getStudentSkills = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const skills = await prisma.studentSkill.findMany({
      where: {
        studentId,
      },
      include: {
        skill: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error("Get student skills error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student skills",
    });
  }
};


// Add Student Skill
const addStudentSkill = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const { name, proficiency } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Skill name is required",
      });
    }

    // Find existing skill or create a new one
    const skill = await prisma.skill.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });

    // Check if student already has this skill
    const existingStudentSkill = await prisma.studentSkill.findUnique({
      where: {
        studentId_skillId: {
          studentId,
          skillId: skill.id,
        },
      },
    });

    if (existingStudentSkill) {
      return res.status(409).json({
        success: false,
        message: "Student already has this skill",
      });
    }

    const studentSkill = await prisma.studentSkill.create({
      data: {
        studentId,
        skillId: skill.id,
        proficiency,
      },
      include: {
        skill: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      data: studentSkill,
    });
  } catch (error) {
    console.error("Add student skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add student skill",
    });
  }
};


// Update Student Skill
const updateStudentSkill = async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const { id } = req.params;
    const { proficiency } = req.body;

    const existingSkill = await prisma.studentSkill.findFirst({
      where: {
        id,
        studentId,
      },
    });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Student skill not found",
      });
    }

    const updatedSkill = await prisma.studentSkill.update({
      where: {
        id,
      },
      data: {
        proficiency,
      },
      include: {
        skill: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: updatedSkill,
    });
  } catch (error) {
    console.error("Update student skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student skill",
    });
  }
};


// Delete Student Skill
const deleteStudentSkill = async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const { id } = req.params;

    const existingSkill = await prisma.studentSkill.findFirst({
      where: {
        id,
        studentId,
      },
    });

    if (!existingSkill) {
      return res.status(404).json({
        success: false,
        message: "Student skill not found",
      });
    }

    await prisma.studentSkill.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Delete student skill error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student skill",
    });
  }
};


// =====================================================
// EDUCATION
// =====================================================

// Get Student Education
const getStudentEducation = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const education = await prisma.education.findMany({
      where: {
        studentId,
      },
      orderBy: {
        startYear: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error("Get student education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student education",
    });
  }
};


// Add Student Education
const addStudentEducation = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const {
      institution,
      degree,
      fieldOfStudy,
      startYear,
      endYear,
      grade,
    } = req.body;

    if (!institution) {
      return res.status(400).json({
        success: false,
        message: "Institution is required",
      });
    }

    const education = await prisma.education.create({
      data: {
        studentId,
        institution,
        degree,
        fieldOfStudy,
        startYear: startYear ? Number(startYear) : null,
        endYear: endYear ? Number(endYear) : null,
        grade,
      },
    });

    res.status(201).json({
      success: true,
      message: "Education added successfully",
      data: education,
    });
  } catch (error) {
    console.error("Add student education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add student education",
    });
  }
};


// Update Student Education
const updateStudentEducation = async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const { id } = req.params;

    const {
      institution,
      degree,
      fieldOfStudy,
      startYear,
      endYear,
      grade,
    } = req.body;

    const existingEducation = await prisma.education.findFirst({
      where: {
        id,
        studentId,
      },
    });

    if (!existingEducation) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    const education = await prisma.education.update({
      where: {
        id,
      },
      data: {
        institution,
        degree,
        fieldOfStudy,
        startYear: startYear ? Number(startYear) : null,
        endYear: endYear ? Number(endYear) : null,
        grade,
      },
    });

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    console.error("Update student education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student education",
    });
  }
};


// Delete Student Education
const deleteStudentEducation = async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const { id } = req.params;

    const existingEducation = await prisma.education.findFirst({
      where: {
        id,
        studentId,
      },
    });

    if (!existingEducation) {
      return res.status(404).json({
        success: false,
        message: "Education record not found",
      });
    }

    await prisma.education.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Delete student education error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student education",
    });
  }
};


// =====================================================
// EXPORTS
// =====================================================
// ==================== PROJECTS ====================

// Get Student Projects
const getStudentProjects = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const projects = await prisma.project.findMany({
      where: {
        studentId,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error("Get student projects error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch student projects",
    });
  }
};


// Add Student Project
const addStudentProject = async (req, res) => {
  try {
    const studentId = req.user.studentId;

    const {
      title,
      description,
      technologies,
      githubUrl,
      projectUrl,
      startDate,
      endDate,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Project title is required",
      });
    }

    const project = await prisma.project.create({
      data: {
        studentId,
        title,
        description,
        technologies,
        githubUrl,
        projectUrl,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully",
      data: project,
    });
  } catch (error) {
    console.error("Add student project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add student project",
    });
  }
};


// Update Student Project
const updateStudentProject = async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const projectId = req.params.id;

    const {
      title,
      description,
      technologies,
      githubUrl,
      projectUrl,
      startDate,
      endDate,
    } = req.body;

    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        studentId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        title,
        description,
        technologies,
        githubUrl,
        projectUrl,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Update student project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update student project",
    });
  }
};


// Delete Student Project
const deleteStudentProject = async (req, res) => {
  try {
    const studentId = req.user.studentId;
    const projectId = req.params.id;

    const existingProject = await prisma.project.findFirst({
      where: {
        id: projectId,
        studentId,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await prisma.project.delete({
      where: {
        id: projectId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete student project error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete student project",
    });
  }
};
module.exports = {
  // Profile
  getStudentProfile,
  updateStudentProfile,

  // Skills
  getStudentSkills,
  addStudentSkill,
  updateStudentSkill,
  deleteStudentSkill,

  // Education
  getStudentEducation,
  addStudentEducation,
  updateStudentEducation,
  deleteStudentEducation,

  getStudentEducation,
  addStudentEducation,
  updateStudentEducation,
  deleteStudentEducation,

  getStudentProjects,
  addStudentProject,
  updateStudentProject,
  deleteStudentProject,
};