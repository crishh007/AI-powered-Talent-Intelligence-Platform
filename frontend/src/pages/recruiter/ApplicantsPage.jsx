import React, { useState, useEffect } from 'react';
import { recruiterService } from '../../services/recruiterService';
import ScheduleInterviewModal from '../../components/modals/ScheduleInterviewModal';
import { Users, Sparkles, Filter, Search, Video, FileText, CheckCircle } from 'lucide-react';

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    recruiterService.getApplicants().then((res) => setApplicants(res.data));
  }, []);

  const handleStatusChange = async (candidateId, newStatus) => {
    await recruiterService.updateCandidateStatus(candidateId, newStatus);
    const res = await recruiterService.getApplicants();
    setApplicants(res.data);
  };

  const filtered = applicants.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.roleApplied.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Candidate ATS Pipeline</h1>
        <p className="text-xs text-gray-500">Filter, shortlist, and schedule interviews with top-ranking candidates</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-soft flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by candidate name or role..."
          className="w-full text-xs outline-none"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((cand) => (
          <div key={cand.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900 text-base">{cand.name}</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold">
                  <Sparkles className="w-3.5 h-3.5" /> {cand.aiScore}% Match
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500">{cand.roleApplied} • {cand.experience} Exp</p>
              <p className="text-[11px] text-gray-400">Applied on {cand.appliedDate} • {cand.email}</p>
            </div>

            <div className="flex items-center gap-2">
              {cand.status !== 'Shortlisted' && (
                <button
                  onClick={() => handleStatusChange(cand.id, 'Shortlisted')}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold hover:bg-purple-100"
                >
                  Shortlist
                </button>
              )}
              <button
                onClick={() => setSelectedCandidate(cand)}
                className="px-4 py-2 rounded-xl gradient-btn text-white text-xs font-bold shadow flex items-center gap-1.5"
              >
                <Video className="w-4 h-4" /> Schedule Interview
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCandidate && (
        <ScheduleInterviewModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onSuccess={() => recruiterService.getApplicants().then((r) => setApplicants(r.data))}
        />
      )}
    </div>
  );
};

export default ApplicantsPage;
