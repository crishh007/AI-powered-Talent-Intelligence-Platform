import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Settings, Lock, Bell, Shield, Save } from 'lucide-react';

const StudentSettingsPage = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiMatchAlerts, setAiMatchAlerts] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Account settings updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Account Settings</h1>
        <p className="text-xs text-gray-500">Manage security preferences and notification triggers</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
          <h2 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-600" /> Notifications & Alerts
          </h2>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-gray-900">Email Interview Notifications</p>
                <p className="text-[11px] text-gray-500">Receive instant email when a recruiter schedules an interview</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer">
              <div>
                <p className="text-xs font-bold text-gray-900">AI High-Match Opportunity Digest</p>
                <p className="text-[11px] text-gray-500">Notify when new job listings achieve 90%+ AI skill score match</p>
              </div>
              <input
                type="checkbox"
                checked={aiMatchAlerts}
                onChange={(e) => setAiMatchAlerts(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
              />
            </label>
          </div>
        </div>

       
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
          <h2 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-600" /> Recruiter Visibility
          </h2>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-900">Public Recruiter Searchability</p>
              <p className="text-[11px] text-gray-500">Allow verified recruiters to discover your AI skill badges and resume</p>
            </div>
            <input
              type="checkbox"
              checked={publicProfile}
              onChange={(e) => setPublicProfile(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentSettingsPage;
