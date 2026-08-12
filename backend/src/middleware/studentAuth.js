const studentAuth = (req, res, next) => {
  const studentId = req.header("x-student-id");

  if (!studentId) {
    return res.status(401).json({
      success: false,
      message: "Student ID is required",
    });
  }

  req.user = {
    studentId,
  };

  next();
};

module.exports = studentAuth;