export const USER_ROLES = {
  STUDENT: 'student',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
};

export const OPPORTUNITY_TYPES = {
  JOB: 'Job',
  INTERNSHIP: 'Internship',
  HACKATHON: 'Hackathon',
};

export const APPLICATION_STATUS = {
  APPLIED: 'Applied',
  UNDER_REVIEW: 'Under Review',
  SHORTLISTED: 'Shortlisted',
  INTERVIEW_SCHEDULED: 'Interview Scheduled',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};

export const SKILL_CATEGORIES = [
  'Frontend Development',
  'Backend Engineering',
  'Data Science & AI',
  'DevOps & Cloud',
  'UI/UX Design',
  'Cybersecurity',
  'Mobile App Development',
];

export const MOCK_USER = {
  id: 'usr-101',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  role: USER_ROLES.STUDENT,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  title: 'Full Stack Engineer & AI Enthusiast',
  location: 'San Francisco, CA',
  skills: ['React.js', 'Node.js', 'Python', 'Tailwind CSS', 'TypeScript', 'Machine Learning'],
  resumeUrl: 'alex_rivera_resume_2026.pdf',
  resumeScore: 92,
  careerScore: 88,
  profileCompletion: 95,
  education: [
    {
      institution: 'Stanford University',
      degree: 'B.S. in Computer Science',
      year: '2022 - 2026',
      gpa: '3.9/4.0',
    }
  ],
  experience: [
    {
      company: 'TechCorp Labs',
      role: 'Frontend Developer Intern',
      period: 'Summer 2025',
      description: 'Built high-throughput React dashboard with real-time analytics.'
    }
  ]
};

export const MOCK_RECRUITER = {
  id: 'rec-202',
  name: 'Sarah Jenkins',
  email: 'sarah@vertexai.com',
  role: USER_ROLES.RECRUITER,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
  company: 'Vertex AI Systems',
  companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
  designation: 'Head of Talent Acquisition',
  location: 'Austin, TX',
  industry: 'Artificial Intelligence & SaaS',
};

export const MOCK_ADMIN = {
  id: 'adm-303',
  name: 'System Admin',
  email: 'admin@talentintel.ai',
  role: USER_ROLES.ADMIN,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  title: 'Platform Administrator',
};
