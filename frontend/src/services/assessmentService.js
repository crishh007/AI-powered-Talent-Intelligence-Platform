import api from './api';

const MOCK_ASSESSMENTS = [
  {
    id: 'asmt-1',
    title: 'Advanced React & Frontend Architecture Test',
    category: 'Frontend Development',
    durationMinutes: 30,
    totalQuestions: 10,
    passingScore: 70,
    difficulty: 'Advanced',
    type: 'MCQ & Coding',
    description: 'Test your knowledge on React Virtual DOM, Fiber architecture, state management optimization, and custom hooks.',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What is the primary benefit of React Fiber architecture introduced in React 16?',
        options: [
          'Direct manipulation of DOM without virtual DOM',
          'Incremental rendering and the ability to pause/reuse work across animation frames',
          'Automatic backend server side rendering without Node.js',
          'Removal of JSX requirement in components'
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        type: 'mcq',
        question: 'Which Hook should be used to store a mutable value that does not trigger re-renders when updated?',
        options: ['useMemo', 'useState', 'useRef', 'useCallback'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        type: 'coding',
        question: 'Write a custom React hook `useDebounce(value, delay)` that returns a debounced version of the provided value.',
        initialCode: `function useDebounce(value, delay) {\n  // Implement your debounced state hook here\n  return value;\n}`,
      }
    ]
  },
  {
    id: 'asmt-2',
    title: 'AI / ML & Python Data Engineering',
    category: 'Data Science & AI',
    durationMinutes: 45,
    totalQuestions: 15,
    passingScore: 75,
    difficulty: 'Intermediate',
    type: 'MCQ & Code',
    description: 'Evaluate your command over PyTorch tensor operations, Vector DB indexing, and FastAPI async handlers.',
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        question: 'What metric is standard for computing vector embedding similarity in RAG applications?',
        options: ['Euclidean Distance', 'Cosine Similarity', 'Manhattan Distance', 'Hamming Distance'],
        correctIndex: 1,
      }
    ]
  }
];

export const assessmentService = {
  getAssessments: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, data: MOCK_ASSESSMENTS };
  },

  getAssessmentById: async (id) => {
    await new Promise((r) => setTimeout(r, 300));
    const test = MOCK_ASSESSMENTS.find((a) => a.id === id) || MOCK_ASSESSMENTS[0];
    return { success: true, data: test };
  },

  submitAssessment: async (assessmentId, userAnswers) => {
    await new Promise((r) => setTimeout(r, 900));
    
    const score = Math.floor(Math.random() * 20) + 80; // 80 - 99
    return {
      success: true,
      score: score,
      passed: score >= 70,
      totalTimeSpent: '18m 45s',
      rank: 4,
      totalParticipants: 420,
      skillInsights: [
        { topic: 'React Hooks', mastery: '95% Mastery' },
        { topic: 'State Management', mastery: '88% Mastery' },
        { topic: 'Performance Tuning', mastery: '92% Mastery' }
      ]
    };
  }
};
