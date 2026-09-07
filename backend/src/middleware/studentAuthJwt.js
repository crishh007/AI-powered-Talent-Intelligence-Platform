const prisma = require("../lib/prisma");

const studentAuthJwt = async (req, res, next) => {
  try {
    // JWT middleware se req.user.id = User ID milti hai
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in authentication token",
      });
    }

    // User ID se corresponding Student find karo
    const student = await prisma.student.findUnique({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    if (!student) {
      return res.status(403).json({
        success: false,
        message: "Student profile not found for this user",
      });
    }

    // Existing Student controllers req.user.studentId use karte hain
    req.user.studentId = student.id;

    next();
  } catch (error) {
    console.error("Student authentication error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to authenticate student",
    });
  }
};

module.exports = studentAuthJwt;
