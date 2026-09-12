import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { recruiterService } from '../../services/recruiterService';
import ScheduleInterviewModal from '../../components/modals/ScheduleInterviewModal';
import { 
  Users, 
  Briefcase, 
  CheckCircle, 
  Calendar, 
  PlusCircle, 
  Sparkles, 
  ArrowRight,
  Video,
  FileText
} from 'lucide-react';

const RecruiterDashboardHome = () => {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState(null);

  useEffect(() => {
    recruiterService.getApplicants().then((res) => setApplicants(res.data));
  }, []);

  const handleStatusChange = async (candidateId, newStatus) => {
    await recruiterService.updateCandidateStatus(candidateId, newStatus);
    const updated = await recruiterService.getApplicants();
    setApplicants(updated.data);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/40">
            <Sparkles className="w-3.5 h-3.5" /> Enterprise Talent ATS Active
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {user?.company || 'Vertex AI Systems'} Recruitment Portal
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            You have 18 pre-vetted AI & Engineering candidates waiting for technical interview scheduling.
          </p>
        </div>

        <Link
          to="/recruiter/post"
          className="px-6 py-3 rounded-xl text-xs font-bold text-white gradient-btn shadow-lg hover:shadow-brand-500/30 flex items-center gap-2 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" /> Post New Opportunity
        </Link>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Active Postings</span>
            <Briefcase className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">4</div>
          <p className="text-[11px] font-semibold text-gray-400 mt-1">2 Jobs • 1 Internship • 1 Hackathon</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Total Applicants</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">124</div>
          <p className="text-[11px] font-semibold text-emerald-600 mt-1">+34 new this week</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Shortlisted</span>
            <CheckCircle className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">18</div>
          <p className="text-[11px] font-semibold text-purple-600 mt-1">Avg AI Score: 93%</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase mb-2">
            <span>Interviews Scheduled</span>
            <Calendar className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">6</div>
          <p className="text-[11px] font-semibold text-cyan-600 mt-1">Next: Today at 2:00 PM</p>
        </div>
      </div>

      {/* CANDIDATE TALENT PIPELINE */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-gray-900 text-lg">Top AI Candidate Pipeline</h2>
            <p className="text-xs text-gray-500">Sorted by AI Talent Match Score</p>
          </div>
          <Link to="/recruiter/applicants" className="text-xs font-bold text-brand-600 hover:underline">
            View All 124 Applicants
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="pb-3">Candidate</th>
                <th className="pb-3">Role Applied</th>
                <th className="pb-3">AI Skill Match</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applicants.map((cand) => (
                <tr key={cand.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5">
                    <span className="font-bold text-gray-900 block">{cand.name}</span>
                    <span className="text-[11px] text-gray-400">{cand.email}</span>
                  </td>
                  <td className="py-3.5 font-semibold text-gray-700">{cand.roleApplied}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-extrabold">
                      <Sparkles className="w-3 h-3 text-brand-600" /> {cand.aiScore}%
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full font-bold ${
                      cand.status === 'Shortlisted' ? 'bg-purple-100 text-purple-700' :
                      cand.status === 'Interview Scheduled' ? 'bg-cyan-100 text-cyan-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {cand.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    {cand.status !== 'Shortlisted' && (
                      <button
                        onClick={() => handleStatusChange(cand.id, 'Shortlisted')}
                        className="px-3 py-1 rounded-lg bg-purple-50 text-purple-700 font-bold hover:bg-purple-100 transition-colors"
                      >
                        Shortlist
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedCandidateForInterview(cand)}
                      className="px-3 py-1 rounded-lg gradient-btn text-white font-bold shadow-sm flex items-center gap-1 inline-flex"
                    >
                      <Video className="w-3 h-3" /> Schedule
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {selectedCandidateForInterview && (
        <ScheduleInterviewModal
          candidate={selectedCandidateForInterview}
          onClose={() => setSelectedCandidateForInterview(null)}
          onSuccess={() => {
            recruiterService.getApplicants().then((res) => setApplicants(res.data));
          }}
        />
      )}

    </div>
  );
};

export default RecruiterDashboardHome;
