import React, { useState, useEffect } from 'react';
import { opportunityService } from '../../services/opportunityService';
import OpportunityCard from '../../components/cards/OpportunityCard';
import ApplyModal from '../../components/modals/ApplyModal';
import { Bookmark, Search } from 'lucide-react';

const SavedOpportunitiesPage = () => {
  const [savedOpps, setSavedOpps] = useState([]);
  const [selectedOppForApply, setSelectedOppForApply] = useState(null);

  useEffect(() => {
    opportunityService.getOpportunities().then((res) => {
      setSavedOpps(res.data.slice(0, 2)); // demo saved items
    });
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Saved Opportunities</h1>
        <p className="text-xs text-gray-500">Bookmarked jobs, internships, and hackathons</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedOpps.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            isSaved={true}
            onApply={(item) => setSelectedOppForApply(item)}
            onSave={(id) => setSavedOpps(savedOpps.filter((o) => o.id !== id))}
          />
        ))}
      </div>

      {selectedOppForApply && (
        <ApplyModal
          opportunity={selectedOppForApply}
          onClose={() => setSelectedOppForApply(null)}
        />
      )}
    </div>
  );
};

export default SavedOpportunitiesPage;
