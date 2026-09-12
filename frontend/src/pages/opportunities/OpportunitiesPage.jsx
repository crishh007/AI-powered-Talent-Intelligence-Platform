import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { opportunityService } from '../../services/opportunityService';
import OpportunityCard from '../../components/cards/OpportunityCard';
import ApplyModal from '../../components/modals/ApplyModal';
import { SKILL_CATEGORIES } from '../../utils/constants';
import { Search, Filter, Sparkles, Briefcase, SlidersHorizontal } from 'lucide-react';

const OpportunitiesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramType = searchParams.get('type') || 'All';

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [typeFilter, setTypeFilter] = useState(paramType);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOppForApply, setSelectedOppForApply] = useState(null);

  
  useEffect(() => {
    const currentParam = searchParams.get('type') || 'All';
    setTypeFilter(currentParam);
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [typeFilter, categoryFilter, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await opportunityService.getOpportunities({
        type: typeFilter,
        category: categoryFilter,
        search: searchQuery,
      });
      setOpportunities(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeSelect = (selectedType) => {
    setTypeFilter(selectedType);
    const newParams = new URLSearchParams(searchParams);
    if (selectedType === 'All') {
      newParams.delete('type');
    } else {
      newParams.set('type', selectedType);
    }
    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
    
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> AI Talent Match Active
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore High-Growth Opportunities
        </h1>
        <p className="text-sm text-gray-600 max-w-2xl">
          Discover verified tech jobs, internships, and global hackathons matched directly to your AI skill graph.
        </p>
      </div>

      
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-soft space-y-4">
        
       
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, company, or skills (e.g. React, Python, Vertex AI)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
          />
        </div>

        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-t border-gray-100">
          
          
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Job', 'Internship', 'Hackathon'].map((t) => {
              const isSelected = typeFilter.toLowerCase() === t.toLowerCase();
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeSelect(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap outline-none focus:outline-none select-none cursor-pointer border ${
                    isSelected
                      ? 'bg-[#6D5DF6] text-white border-[#6D5DF6] shadow-md shadow-[#6D5DF6]/30 hover:bg-[#583ef0] active:bg-[#583ef0] focus:bg-[#6D5DF6] focus:text-white'
                      : 'bg-[#F1F5F9] text-[#334155] border-gray-200/60 hover:bg-[#E2E8F0] hover:text-[#0F172A] active:bg-[#E2E8F0] focus:bg-[#F1F5F9] focus:text-[#334155]'
                  }`}
                >
                  {t === 'All' ? 'All Opportunities' : `${t}s`}
                </button>
              );
            })}
          </div>

          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-white outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="All">All Tech Domains</option>
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

     
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 h-64 animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-gray-100">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-lg font-bold text-gray-900">No Opportunities Found</h3>
          <p className="text-xs text-gray-500">Try broadening your search query or clear category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onApply={(item) => setSelectedOppForApply(item)}
            />
          ))}
        </div>
      )}

      
      {selectedOppForApply && (
        <ApplyModal
          opportunity={selectedOppForApply}
          onClose={() => setSelectedOppForApply(null)}
        />
      )}

    </div>
  );
};

export default OpportunitiesPage;
