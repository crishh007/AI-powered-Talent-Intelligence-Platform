const prisma = require("../lib/prisma");

const applyToJob = async (req, res) => {
  try {
    const { studentId } = req.user;
    const { jobTitle, companyName } = req.body;

    const application = await prisma.application.create({
      data: { studentId, jobTitle, companyName },
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const { studentId } = req.user;

    const applications = await prisma.application.findMany({
      where: { studentId },
    });

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await prisma.application.update({
      where: { id },
      data: { status },
    });

    await prisma.notification.create({
      data: {
        studentId: application.studentId,
        message: `Your application status changed to: ${application.status}`,
      },
    });

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const withdrawApplication = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.application.delete({ where: { id } });

    res.status(200).json({ success: true, message: "Application withdrawn successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyToJob,
  getApplications,
  updateApplicationStatus,
  withdrawApplication,
};
