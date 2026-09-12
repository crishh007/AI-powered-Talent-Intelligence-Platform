import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { studentService } from '../../services/studentService';
import { opportunityService } from '../../services/opportunityService';
import OpportunityCard from '../../components/cards/OpportunityCard';
import ApplyModal from '../../components/modals/ApplyModal';
import { 
  Sparkles, 
  Award, 
  Briefcase, 
  TrendingUp, 
  FileText, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  Zap
} from 'lucide-react';

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [recommendedOpps, setRecommendedOpps] = useState([]);
  const [selectedOppForApply, setSelectedOppForApply] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appsRes = await studentService.getApplications();
        const oppsRes = await opportunityService.getOpportunities();
        setApplications(appsRes.data);
        setRecommendedOpps(oppsRes.data.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      
     
      <div className="bg-gradient-to-r from-brand-600 via-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> AI Profile Match Active
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Alex'}!
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 max-w-xl">
            Your AI Resume Score is in the top 8% of applicants. Take an assessment to unlock direct recruiter interview invites.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            to="/student/profile"
            className="px-5 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-xs shadow-md hover:bg-brand-50 transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" /> Update Resume
          </Link>
          <Link
            to="/assessments"
            className="px-5 py-2.5 rounded-xl bg-gray-900/80 text-white font-bold text-xs hover:bg-gray-900 transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" /> Take Skill Test
          </Link>
        </div>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Resume Score</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">{user?.resumeScore || 92}</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              +4 pts vs last month
            </span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand-500 h-full w-[92%]" />
          </div>
        </div>

        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Career Score</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">{user?.careerScore || 88}</span>
            <span className="text-xs font-semibold text-gray-500">Industry Rank #420</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[88%]" />
          </div>
        </div>

      
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Applications</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">{applications.length}</span>
            <span className="text-xs font-bold text-purple-600">1 Shortlisted</span>
          </div>
          <div className="text-[11px] font-semibold text-gray-400">Vertex AI & Linear Tech</div>
        </div>

        
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profile Completion</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-gray-900">{user?.profileCompletion || 95}%</span>
            <span className="text-xs font-semibold text-emerald-600">All Verified</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[95%]" />
          </div>
        </div>

      </div>

      
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-gray-900 text-lg">Active Application Pipeline</h2>
          <Link to="/student/applications" className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="pb-3">Opportunity</th>
                <th className="pb-3">Applied Date</th>
                <th className="pb-3">Current Stage</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 font-bold text-gray-900">
                    {app.title}
                    <span className="block text-[11px] font-normal text-gray-400">{app.company}</span>
                  </td>
                  <td className="py-3.5 text-gray-600 font-medium">{app.appliedDate}</td>
                  <td className="py-3.5 font-semibold text-gray-700">{app.stage}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full font-bold ${
                      app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-700' :
                      app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-gray-900 text-lg">AI Recommended Opportunities</h2>
            <p className="text-xs text-gray-500">Based on your skill graph and resume keywords</p>
          </div>
          <Link to="/opportunities" className="text-xs font-bold text-brand-600 hover:underline">
            Explore All Opportunities
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedOpps.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onApply={(item) => setSelectedOppForApply(item)}
            />
          ))}
        </div>
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

export default StudentDashboardHome;
