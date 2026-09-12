import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { opportunityService } from '../../services/opportunityService';
import { Briefcase, Users, PlusCircle, Trash2, Search, SlidersHorizontal } from 'lucide-react';

const ManageOpportunitiesPage = () => {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  useEffect(() => {
    fetchData();
  }, [typeFilter, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await opportunityService.getOpportunities({
        type: typeFilter,
        search: searchQuery,
      });
      setOpps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'All', label: 'Opportunities' },
    { id: 'Job', label: 'Jobs' },
    { id: 'Internship', label: 'Internships' },
    { id: 'Hackathon', label: 'Hackathons' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
     
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Manage Opportunity Postings</h1>
          <p className="text-xs text-gray-500">Edit, close, or review applicant submissions for active postings</p>
        </div>
        <Link
          to="/recruiter/post"
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Post New Opportunity
        </Link>
      </div>

      
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-100 shadow-soft space-y-4">
        
     
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posting title, location, or required skills..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none transition-all"
          />
        </div>

       
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 border-t border-gray-100 pt-3">
          {tabs.map((tab) => {
            const isSelected = typeFilter.toLowerCase() === tab.id.toLowerCase();
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTypeFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap outline-none focus:outline-none select-none cursor-pointer border ${
                  isSelected
                    ? 'bg-[#6D5DF6] text-white border-[#6D5DF6] shadow-md shadow-[#6D5DF6]/25 hover:bg-[#583ef0] active:bg-[#583ef0] focus:bg-[#6D5DF6] focus:text-white'
                    : 'bg-[#F1F5F9] text-[#334155] border-gray-200/60 hover:bg-[#E2E8F0] hover:text-[#0F172A] active:bg-[#E2E8F0] focus:bg-[#F1F5F9] focus:text-[#334155]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

      </div>

    
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-3xl h-28 animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : opps.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-gray-100">
          <Briefcase className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">No Opportunity Postings Found</h3>
          <p className="text-xs text-gray-500">Try adjusting your search filter or publish a new posting.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {opps.map((opp) => (
            <div key={opp.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gray-200 transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-extrabold">
                    {opp.type}
                  </span>
                  <h3 className="font-extrabold text-gray-900 text-base">{opp.title}</h3>
                </div>
                <p className="text-xs text-gray-500">{opp.location} • Posted {opp.postedDate} • Deadline {opp.deadline}</p>
                <div className="flex items-center gap-2 pt-1 text-xs text-gray-600 font-semibold">
                  <Users className="w-4 h-4 text-brand-600" /> {opp.applicantsCount} Applicants Pipeline
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/recruiter/applicants"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  View Pipeline
                </Link>
                <button
                  type="button"
                  onClick={() => setOpps(opps.filter((o) => o.id !== opp.id))}
                  className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Posting"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ManageOpportunitiesPage;
