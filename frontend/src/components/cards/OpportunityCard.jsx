import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Sparkles, Bookmark, ArrowRight, Building } from 'lucide-react';
import { getStatusBadgeStyle } from '../../utils/helpers';

const OpportunityCard = ({ opportunity, onApply, onSave, isSaved = false }) => {
  const {
    id,
    title,
    company,
    logo,
    type,
    category,
    location,
    stipend,
    skills = [],
    matchScore = 90,
    deadline,
  } = opportunity;

  return (
    <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider ${
            type === 'Job' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
            type === 'Internship' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
            'bg-amber-50 text-amber-700 border border-amber-100'
          }`}>
            {type}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold">
            {category}
          </span>
        </div>

        <button
          onClick={() => onSave && onSave(id)}
          className={`p-2 rounded-xl transition-colors ${
            isSaved ? 'text-brand-600 bg-brand-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
          title="Save opportunity"
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-brand-600' : ''}`} />
        </button>
      </div>

     
      <div className="flex items-start gap-4 mb-4">
        <img
          src={logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200'}
          alt={company}
          className="w-12 h-12 rounded-xl object-cover ring-1 ring-gray-200 flex-shrink-0"
        />
        <div>
          <h3 className="font-bold text-gray-900 text-base group-hover:text-brand-600 transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 mt-0.5">
            <Building className="w-3.5 h-3.5 text-gray-400" /> {company}
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4 bg-gray-50/70 p-3 rounded-xl">
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold text-emerald-600 truncate">
          <DollarSign className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span className="truncate">{stipend}</span>
        </div>
      </div>

      
      <div className="flex flex-wrap gap-1.5 mb-5">
        {skills.slice(0, 4).map((skill, i) => (
          <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[11px] text-gray-600 font-medium">
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[11px] text-gray-500 font-bold">
            +{skills.length - 4}
          </span>
        )}
      </div>

      
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span className="text-xs font-extrabold text-brand-700">{matchScore}% Match</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/opportunities/${id}`}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Details
          </Link>
          <button
            onClick={() => onApply && onApply(opportunity)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white gradient-btn shadow-sm hover:shadow flex items-center gap-1"
          >
            Apply <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;
