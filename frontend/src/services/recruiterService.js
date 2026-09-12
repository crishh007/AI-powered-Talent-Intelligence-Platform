import api from './api';

const MOCK_APPLICANTS = [
  {
    id: 'cand-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    roleApplied: 'Senior AI / ML Engineer',
    appliedDate: '2026-08-01',
    aiScore: 94,
    skillsMatch: 95,
    status: 'Shortlisted',
    resumeUrl: 'alex_rivera_resume.pdf',
    experience: '3 years',
  },
  {
    id: 'cand-2',
    name: 'Jessica Chen',
    email: 'jessica.chen@tech.org',
    roleApplied: 'Senior AI / ML Engineer',
    appliedDate: '2026-08-02',
    aiScore: 89,
    skillsMatch: 91,
    status: 'Under Review',
    resumeUrl: 'jessica_chen_cv.pdf',
    experience: '4 years',
  },
  {
    id: 'cand-3',
    name: 'David Miller',
    email: 'david.m@dev.net',
    roleApplied: 'Senior AI / ML Engineer',
    appliedDate: '2026-07-30',
    aiScore: 78,
    skillsMatch: 80,
    status: 'Rejected',
    resumeUrl: 'dmiller_resume.pdf',
    experience: '1 year',
  }
];

export const recruiterService = {
  getApplicants: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, data: MOCK_APPLICANTS };
  },

  updateCandidateStatus: async (candidateId, status) => {
    await new Promise((r) => setTimeout(r, 500));
    const cand = MOCK_APPLICANTS.find((c) => c.id === candidateId);
    if (cand) cand.status = status;
    return { success: true, message: `Candidate status updated to ${status}` };
  },

  scheduleInterview: async (candidateId, interviewData) => {
    await new Promise((r) => setTimeout(r, 600));
    return {
      success: true,
      message: `Interview scheduled with candidate for ${interviewData.date} at ${interviewData.time}`,
    };
  }
};
