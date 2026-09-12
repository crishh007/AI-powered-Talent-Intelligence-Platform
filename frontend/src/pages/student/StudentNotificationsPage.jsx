import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Bell, Sparkles, Calendar, Briefcase, Check } from 'lucide-react';

const StudentNotificationsPage = () => {
  const { notifications, markAllAsRead } = useNotification();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Notifications</h1>
          <p className="text-xs text-gray-500">Alerts, interview invites, and AI score updates</p>
        </div>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-brand-600 hover:bg-gray-50 flex items-center gap-1.5 shadow-sm"
        >
          <Check className="w-4 h-4" /> Mark All as Read
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft divide-y divide-gray-100 overflow-hidden">
        {notifications.map((n) => (
          <div key={n.id} className="p-6 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
              {n.type === 'interview' ? <Calendar className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">{n.title}</h3>
                <span className="text-[11px] font-semibold text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentNotificationsPage;
