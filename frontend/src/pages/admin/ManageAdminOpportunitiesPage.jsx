import React, { useState, useEffect } from 'react';
import { opportunityService } from '../../services/opportunityService';
import { CheckSquare, Trash2 } from 'lucide-react';

const ManageAdminOpportunitiesPage = () => {
  const [opps, setOpps] = useState([]);

  useEffect(() => {
    opportunityService.getOpportunities().then((res) => setOpps(res.data));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Opportunity Moderation Hub</h1>
        <p className="text-xs text-gray-500">Review flagged job postings and take down spam listings</p>
      </div>

      <div className="space-y-3">
        {opps.map((opp) => (
          <div key={opp.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 text-[10px] font-bold uppercase">{opp.type}</span>
              <h3 className="font-bold text-gray-900 text-sm mt-1">{opp.title}</h3>
              <p className="text-xs text-gray-500">{opp.company} • {opp.location}</p>
            </div>
            <button
              onClick={() => setOpps(opps.filter((o) => o.id !== opp.id))}
              className="p-2 rounded-xl text-rose-600 hover:bg-rose-50"
              title="Remove listing"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAdminOpportunitiesPage;
