import React, { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import { Briefcase, Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const StudentApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    studentService.getApplications().then((res) => setApplications(res.data));
  }, []);

  const filteredApps = applications.filter((app) => {
    if (filter === 'All') return true;
    return app.status === filter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Applied Opportunities</h1>
        <p className="text-xs text-gray-500">Track application progress, interview schedules, and feedback</p>
      </div>

      
      <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl w-fit">
        {['All', 'Applied', 'Under Review', 'Shortlisted', 'Accepted'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === tab ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      
      <div className="space-y-4">
        {filteredApps.map((app) => (
          <div key={app.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900 text-base">{app.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                  app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-700' :
                  app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {app.status}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-500">{app.company} • Applied on {app.appliedDate}</p>
              <div className="pt-2 flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>Current Stage: <strong>{app.stage}</strong></span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-900">Next Recommended Action</p>
                <p className="text-[11px] text-gray-500">{app.nextAction}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentApplicationsPage;
