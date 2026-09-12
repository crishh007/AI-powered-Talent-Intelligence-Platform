import React, { useState } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { Bell, Check, Sparkles, Calendar, Briefcase } from 'lucide-react';

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAllAsRead } = useNotification();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 transition-colors hover:bg-gray-50 flex items-start gap-3 ${
                    item.unread ? 'bg-brand-50/20' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.type === 'interview' ? (
                      <Calendar className="w-4 h-4" />
                    ) : item.type === 'ai' ? (
                      <Sparkles className="w-4 h-4" />
                    ) : (
                      <Briefcase className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-gray-400 font-medium mt-1 block">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
