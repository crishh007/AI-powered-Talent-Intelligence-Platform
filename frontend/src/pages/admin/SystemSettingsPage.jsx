import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { ShieldAlert, Server, Save } from 'lucide-react';

const SystemSettingsPage = () => {
  const { addToast } = useNotification();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [aiScoringEngine, setAiScoringEngine] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('System settings updated successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Platform System Settings</h1>
        <p className="text-xs text-gray-500">Configure global AI scoring engine parameters and API thresholds</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-soft space-y-6">
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-900">Enable Autonomous AI Scoring Engine</p>
              <p className="text-[11px] text-gray-500">Automatically calculate candidate vector match scores for new applications</p>
            </div>
            <input
              type="checkbox"
              checked={aiScoringEngine}
              onChange={(e) => setAiScoringEngine(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100/60 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-gray-900">Maintenance Mode</p>
              <p className="text-[11px] text-gray-500">Restrict non-admin access during scheduled platform upgrades</p>
            </div>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 text-brand-600 rounded"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemSettingsPage;
