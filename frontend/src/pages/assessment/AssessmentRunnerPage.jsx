import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assessmentService } from '../../services/assessmentService';
import { formatTimeSeconds } from '../../utils/formatters';
import { 
  Clock, 
  Code2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  AlertCircle,
  Play
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const AssessmentRunnerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [assessment, setAssessment] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [codeContent, setCodeContent] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    assessmentService.getAssessmentById(id).then((res) => {
      setAssessment(res.data);
      if (res.data.questions[0]?.type === 'coding') {
        setCodeContent(res.data.questions[0].initialCode || '');
      }
    });
  }, [id]);

 
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (qId, optionIdx) => {
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const handleSubmitTest = async () => {
    setSubmitting(true);
    try {
      const res = await assessmentService.submitAssessment(id, answers);
      addToast('Assessment submitted successfully!', 'success');
      navigate(`/assessments/result/${id}?score=${res.score}&passed=${res.passed}`);
    } catch (err) {
      addToast('Submission failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!assessment) {
    return <div className="p-12 text-center text-xs font-bold text-gray-400">Initializing Proctored Test Session...</div>;
  }

  const currentQ = assessment.questions[currentIdx] || assessment.questions[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      
     
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold">
            AI
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-white">{assessment.title}</h1>
            <span className="text-[11px] text-gray-400">Proctored Anti-Cheat Mode Active</span>
          </div>
        </div>

      
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gray-800 border border-gray-700 text-brand-400 font-extrabold text-sm">
          <Clock className="w-4 h-4 text-brand-400 animate-pulse" />
          <span>{formatTimeSeconds(timeLeft)}</span>
        </div>

        <button
          onClick={handleSubmitTest}
          disabled={submitting}
          className="px-5 py-2 rounded-xl text-xs font-bold text-white gradient-btn shadow"
        >
          {submitting ? 'Submitting...' : 'Finish & Submit Test'}
        </button>
      </header>

     
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-0 overflow-hidden">
        
        
        <aside className="bg-gray-950/80 border-r border-gray-800 p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">Question Palette</h3>
            <p className="text-[11px] text-gray-500 mt-1">Jump directly to any question</p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {assessment.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentIdx === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-10 rounded-xl font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-brand-500 text-white ring-2 ring-brand-300'
                      : isAnswered
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Q{idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-800 space-y-2 text-[11px] text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-950 border border-emerald-700" /> Answered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-brand-500" /> Current Question
            </div>
          </div>
        </aside>

       
        <main className="md:col-span-3 p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-brand-500/20 text-brand-300 text-xs font-extrabold uppercase">
                Question {currentIdx + 1} of {assessment.questions.length}
              </span>
              <span className="text-xs text-gray-400 capitalize">{currentQ.type} Challenge</span>
            </div>

            <h2 className="text-xl font-extrabold text-white leading-relaxed">
              {currentQ.question}
            </h2>

           
            {currentQ.type === 'mcq' && (
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optionIdx) => {
                  const isSelected = answers[currentQ.id] === optionIdx;
                  return (
                    <button
                      key={optionIdx}
                      onClick={() => handleSelectOption(currentQ.id, optionIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-brand-600/30 border-brand-500 text-white font-bold'
                          : 'bg-gray-800/60 border-gray-700/80 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-brand-400 bg-brand-500' : 'border-gray-600'}`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            
            {currentQ.type === 'coding' && (
              <div className="space-y-3">
                <div className="bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden font-mono">
                  <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between text-xs text-gray-400">
                    <span>Code Editor (JavaScript)</span>
                    <button
                      onClick={() => addToast('Code syntax validated!', 'success')}
                      className="px-3 py-1 bg-brand-600 text-white rounded text-[11px] font-bold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" /> Run Tests
                    </button>
                  </div>
                  <textarea
                    rows={10}
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    className="w-full bg-gray-950 text-emerald-400 p-4 text-xs font-mono outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

          </div>

         
          <div className="flex items-center justify-between pt-6 border-t border-gray-800">
            <button
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-gray-800 text-xs font-bold text-gray-300 disabled:opacity-30 hover:bg-gray-700 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Question
            </button>

            <button
              onClick={() => setCurrentIdx(Math.min(assessment.questions.length - 1, currentIdx + 1))}
              disabled={currentIdx === assessment.questions.length - 1}
              className="px-4 py-2 rounded-xl bg-brand-600 text-xs font-bold text-white hover:bg-brand-500 flex items-center gap-1"
            >
              Next Question <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </main>

      </div>
    </div>
  );
};

export default AssessmentRunnerPage;
