import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { opportunityService } from '../../services/opportunityService';
import ApplyModal from '../../components/modals/ApplyModal';
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  Share2, 
  Bookmark 
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const OpportunityDetailPage = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const { addToast } = useNotification();

  useEffect(() => {
    opportunityService.getOpportunityById(id).then((res) => {
      setOpportunity(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-xs font-bold text-gray-400">Loading opportunity details...</div>;
  }

  if (!opportunity) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Opportunity Not Found</h2>
        <Link to="/opportunities" className="text-xs font-bold text-brand-600 hover:underline">
          ← Back to Opportunities Board
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <Link to="/opportunities" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Back to Opportunities
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-start gap-4">
            <img
              src={opportunity.logo}
              alt={opportunity.company}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100"
            />
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
                {opportunity.type} • {opportunity.category}
              </span>
              <h1 className="text-2xl font-extrabold text-gray-900 mt-1">{opportunity.title}</h1>
              <p className="text-xs font-bold text-gray-500">{opportunity.company} • {opportunity.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast('Link copied to clipboard!', 'info')}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowApplyModal(true)}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md"
            >
              Apply Now
            </button>
          </div>
        </div>

        
        <div className="bg-brand-50 p-4 rounded-2xl border border-brand-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-800 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Your Profile Match Score: <strong>{opportunity.matchScore}% Match</strong></span>
          </div>
          <span className="text-[11px] font-bold text-brand-600">High Recommendation</span>
        </div>

        
        <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
          <h3 className="text-sm font-extrabold text-gray-900">About the Role</h3>
          <p>{opportunity.description}</p>

          {opportunity.requirements && (
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-extrabold text-gray-900">Key Requirements</h3>
              <ul className="space-y-2">
                {opportunity.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

      {showApplyModal && (
        <ApplyModal
          opportunity={opportunity}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
};

export default OpportunityDetailPage;
