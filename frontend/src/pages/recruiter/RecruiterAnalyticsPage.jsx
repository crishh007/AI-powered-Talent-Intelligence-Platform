import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, Award } from 'lucide-react';

const RecruiterAnalyticsPage = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Talent Market & Pipeline Analytics</h1>
        <p className="text-xs text-gray-500">Real-time candidate conversion metrics, skill distribution, and sourcing velocity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase">Avg Time-to-Interview</span>
          <div className="text-3xl font-extrabold text-brand-600">1.8 Days</div>
          <p className="text-xs text-emerald-600 font-bold">75% faster than industry benchmark</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase">Assessment Verification</span>
          <div className="text-3xl font-extrabold text-blue-600">94.2%</div>
          <p className="text-xs text-gray-500">Candidates with verified coding badges</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-soft space-y-2">
          <span className="text-xs font-bold text-gray-500 uppercase">Offer Acceptance Rate</span>
          <div className="text-3xl font-extrabold text-emerald-600">88.5%</div>
          <p className="text-xs text-emerald-600 font-bold">+12% year-over-year</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-soft space-y-6">
        <h3 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-600" /> Sourcing Distribution by Top Skill Stack
        </h3>
        
        <div className="space-y-4">
          {[
            { skill: 'React & Frontend Architecture', count: 48, percentage: 85 },
            { skill: 'Python, PyTorch & Vector DBs', count: 34, percentage: 70 },
            { skill: 'Node.js & Microservices', count: 26, percentage: 55 },
            { skill: 'Kubernetes & DevOps', count: 16, percentage: 38 },
          ].map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-gray-800">
                <span>{item.skill}</span>
                <span>{item.count} Candidates ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-brand-500 to-blue-500 h-full rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterAnalyticsPage;
