import api from './api';

const INITIAL_OPPORTUNITIES = [
  {
    id: 'opp-1',
    title: 'Senior AI / ML Engineer',
    company: 'Vertex AI Systems',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    type: 'Job',
    category: 'Data Science & AI',
    location: 'San Francisco, CA (Hybrid)',
    stipend: '$140,000 - $180,000 / yr',
    salaryMin: 140000,
    experience: '3-5 years',
    skills: ['Python', 'PyTorch', 'LLMs', 'FastAPI', 'Docker'],
    postedDate: '2026-07-28',
    deadline: '2026-08-30',
    applicantsCount: 42,
    matchScore: 94,
    description: 'We are seeking a brilliant AI/ML Engineer to optimize large language model pipelines, scale real-time vector search indexes, and implement autonomous AI agent flows.',
    requirements: [
      'Strong proficiency in Python, PyTorch, and CUDA benchmarking',
      'Experience deploying LLM serving stacks (vLLM, Ollama, TensorRT)',
      'Solid understanding of vector databases (Pinecone, Qdrant, Milvus)',
      'B.S. or M.S. in Computer Science, Data Science, or related engineering discipline'
    ]
  },
  {
    id: 'opp-2',
    title: 'Frontend React Architect',
    company: 'Linear Tech Labs',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200',
    type: 'Job',
    category: 'Frontend Development',
    location: 'Remote',
    stipend: '$120,000 - $150,000 / yr',
    salaryMin: 120000,
    experience: '2-4 years',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
    postedDate: '2026-08-01',
    deadline: '2026-08-25',
    applicantsCount: 78,
    matchScore: 96,
    description: 'Lead the frontend engineering team in building ultra-responsive, dynamic SaaS dashboards with 60fps micro-animations and zero-latency user interactions.',
    requirements: [
      'Expert level knowledge of modern React, Virtual DOM optimizations, and custom hooks',
      'Proven track record with Framer Motion, Tailwind CSS, and Webpack/Vite',
      'Passionate about UI/UX design systems and polished component libraries'
    ]
  },
  {
    id: 'opp-3',
    title: 'Full Stack Development Intern',
    company: 'Stripe Innovations',
    logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=200',
    type: 'Internship',
    category: 'Frontend Development',
    location: 'New York, NY (On-site)',
    stipend: '$4,500 / month',
    salaryMin: 54000,
    experience: '0-1 years (Students)',
    skills: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    postedDate: '2026-08-02',
    deadline: '2026-09-10',
    applicantsCount: 156,
    matchScore: 89,
    description: 'Join Stripe for a 12-week summer internship! You will work directly alongside senior platform engineers shipping features for millions of global merchants.',
    requirements: [
      'Currently enrolled in Computer Science undergraduate or master degree',
      'Proficiency in JavaScript/TypeScript and SQL fundamentals',
      'Strong problem-solving skills and passion for fintech'
    ]
  },
  {
    id: 'opp-4',
    title: 'Global AI Agent Buildathon 2026',
    company: 'OpenAI Community',
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=200',
    type: 'Hackathon',
    category: 'Data Science & AI',
    location: 'Global (Virtual)',
    stipend: '$50,000 Cash Prize Pool',
    salaryMin: 50000,
    experience: 'All levels',
    skills: ['LangChain', 'AutoGPT', 'Python', 'React', 'OpenAI API'],
    postedDate: '2026-07-25',
    deadline: '2026-08-20',
    applicantsCount: 840,
    matchScore: 98,
    description: 'Compete with developers worldwide to create autonomous AI agents that solve real-world productivity challenges. Top 3 teams win seed investment support.',
    requirements: [
      'Open to teams of 1 to 4 members',
      'Must submit working GitHub codebase + 3-minute video demo',
      'Must use multi-agent framework or LLM orchestration'
    ]
  },
  {
    id: 'opp-5',
    title: 'Cloud Infrastructure & DevOps Engineer',
    company: 'CloudScale Networks',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200',
    type: 'Job',
    category: 'DevOps & Cloud',
    location: 'Austin, TX',
    stipend: '$130,000 - $160,000 / yr',
    salaryMin: 130000,
    experience: '3+ years',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Go'],
    postedDate: '2026-07-30',
    deadline: '2026-08-28',
    applicantsCount: 29,
    matchScore: 82,
    description: 'Build automated CI/CD pipelines, Kubernetes microservices clusters, and resilient multi-region infrastructure on AWS.',
    requirements: [
      'Proven hands-on experience with Terraform, EKS, and Helm charts',
      'Deep understanding of Linux network internals and zero-trust security'
    ]
  },
  {
    id: 'opp-6',
    title: 'UI/UX Product Design Fellow',
    company: 'Figma Creators',
    logo: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=200',
    type: 'Internship',
    category: 'UI/UX Design',
    location: 'Remote',
    stipend: '$3,800 / month',
    salaryMin: 45000,
    experience: '0-2 years',
    skills: ['Figma', 'User Research', 'Design Systems', 'Wireframing', 'Prototyping'],
    postedDate: '2026-08-01',
    deadline: '2026-09-01',
    applicantsCount: 210,
    matchScore: 91,
    description: 'Design dark-mode SaaS components, micro-interactions, and visual design tokens for next-generation web applications.',
    requirements: [
      'Portfolio showcasing high-fidelity interactive prototypes in Figma',
      'Strong understanding of accessibility (WCAG 2.1) and grid systems'
    ]
  }
];

export const opportunityService = {
  getOpportunities: async (filters = {}) => {
    await new Promise((res) => setTimeout(res, 400));
    let opps = [...INITIAL_OPPORTUNITIES];

    if (filters.type && filters.type !== 'All') {
      opps = opps.filter((o) => o.type.toLowerCase() === filters.type.toLowerCase());
    }
    if (filters.category && filters.category !== 'All') {
      opps = opps.filter((o) => o.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      opps = opps.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.company.toLowerCase().includes(q) ||
          o.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return { success: true, count: opps.length, data: opps };
  },

  getOpportunityById: async (id) => {
    await new Promise((res) => setTimeout(res, 300));
    const item = INITIAL_OPPORTUNITIES.find((o) => o.id === id);
    if (!item) throw new Error('Opportunity not found');
    return { success: true, data: item };
  },

  postOpportunity: async (opportunityData) => {
    await new Promise((res) => setTimeout(res, 700));
    const newOpp = {
      id: `opp-${Date.now()}`,
      ...opportunityData,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      matchScore: 95,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200',
    };
    INITIAL_OPPORTUNITIES.unshift(newOpp);
    return { success: true, data: newOpp, message: 'Opportunity posted successfully!' };
  },

  applyToOpportunity: async (opportunityId, applicationDetails) => {
    await new Promise((res) => setTimeout(res, 800));
    return {
      success: true,
      applicationId: `app-${Date.now()}`,
      message: 'Application submitted successfully! Track status in your Student Dashboard.',
    };
  }
};
