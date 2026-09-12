import api from './api';

const MOCK_USERS_LIST = [
  { id: 'usr-1', name: 'Alex Rivera', email: 'alex@example.com', role: 'student', status: 'Active', joinedDate: '2026-05-10' },
  { id: 'usr-2', name: 'Sarah Jenkins', email: 'sarah@vertexai.com', role: 'recruiter', status: 'Verified', company: 'Vertex AI', joinedDate: '2026-04-12' },
  { id: 'usr-3', name: 'Marcus Vance', email: 'marcus@cloudscale.io', role: 'recruiter', status: 'Pending Verification', company: 'CloudScale', joinedDate: '2026-08-01' },
  { id: 'usr-4', name: 'Elena Rostova', email: 'elena@univ.edu', role: 'student', status: 'Active', joinedDate: '2026-06-18' },
];

export const adminService = {
  getUsers: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, data: MOCK_USERS_LIST };
  },

  updateUserStatus: async (userId, status) => {
    await new Promise((r) => setTimeout(r, 500));
    const user = MOCK_USERS_LIST.find((u) => u.id === userId);
    if (user) user.status = status;
    return { success: true, message: `User status changed to ${status}` };
  },

  getSystemStats: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return {
      success: true,
      stats: {
        totalStudents: 14250,
        totalRecruiters: 840,
        activeOpportunities: 312,
        assessmentsTaken: 48900,
        verificationPending: 18,
      }
    };
  }
};
