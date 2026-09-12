import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assessmentService } from '../../services/assessmentService';
import { Award, Clock, Code2, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const AssessmentListPage = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    assessmentService.getAssessments().then((res) => setTests(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
          <Award className="w-3.5 h-3.5" /> Anti-Cheat AI Skill Proctored Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          AI Technical & Skill Assessments
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Take proctored coding and MCQ tests to verify your tech stack. Top scorers receive direct interview invitations from recruiters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-extrabold">
                  {test.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  {test.difficulty}
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-gray-900">{test.title}</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{test.description}</p>

              <div className="flex items-center gap-6 text-xs text-gray-500 pt-2 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-600" /> {test.durationMinutes} Minutes
                </div>
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-blue-600" /> {test.totalQuestions} Questions ({test.type})
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Passing Score: {test.passingScore}%</span>
              <Link
                to={`/assessments/runner/${test.id}`}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md hover:shadow-lg flex items-center gap-1.5"
              >
                Start Assessment <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentListPage;
