import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Award, CheckCircle2, XCircle, Sparkles, Trophy, ArrowRight } from 'lucide-react';

const AssessmentResultPage = () => {
  const [searchParams] = useSearchParams();
  const score = searchParams.get('score') || '92';
  const passed = searchParams.get('passed') === 'true' || true;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-soft space-y-6">
        
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {passed ? <Trophy className="w-10 h-10 animate-bounce" /> : <XCircle className="w-10 h-10" />}
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase">
            Official AI Verification Result
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {passed ? 'Assessment Passed! Top Rank Earned' : 'Assessment Completed'}
          </h1>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Your technical performance has been parsed and logged to your public TalentIntel profile.
          </p>
        </div>

        
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 max-w-xs mx-auto space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase">Final Score</span>
          <div className="text-4xl font-extrabold text-brand-600">{score}%</div>
          <p className="text-[11px] text-emerald-600 font-bold">Passed (Threshold: 70%)</p>
        </div>

       
        <div className="text-left bg-brand-50/50 p-4 rounded-2xl border border-brand-100/60 space-y-2">
          <h4 className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-600" /> AI Skill Insights
          </h4>
          <ul className="text-xs text-gray-700 space-y-1">
            <li>• React Hooks & Virtual DOM: <strong>95% Mastery</strong></li>
            <li>• Custom State Optimization: <strong>88% Mastery</strong></li>
            <li>• Fiber Rendering Pipeline: <strong>92% Mastery</strong></li>
          </ul>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/student/dashboard"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white gradient-btn shadow-md flex items-center justify-center gap-1.5"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/opportunities"
            className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Apply to Matched Roles
          </Link>
        </div>

      </div>

    </div>
  );
};

export default AssessmentResultPage;
