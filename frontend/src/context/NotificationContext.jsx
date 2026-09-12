import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Interview Scheduled!',
      message: 'Vertex AI scheduled technical round for Senior AI Engineer.',
      time: '10m ago',
      unread: true,
      type: 'interview',
    },
    {
      id: 'notif-2',
      title: 'AI Resume Score Updated',
      message: 'Your resume score improved from 86 to 92 based on new projects.',
      time: '2h ago',
      unread: true,
      type: 'ai',
    },
    {
      id: 'notif-3',
      title: 'Hackathon Alert',
      message: 'Global AI Agent Buildathon 2026 registration is now open.',
      time: '1d ago',
      unread: false,
      type: 'opportunity',
    }
  ]);

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        toasts,
        addToast,
        markAllAsRead,
        unreadCount: notifications.filter((n) => n.unread).length,
      }}
    >
      {children}

      {/* Floating Toast Notification Bar */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-5 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-900 text-rose-100 border-rose-700'
                : 'bg-gray-900 text-white border-gray-700'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
