import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLES } from '../../utils/constants';
import { User, LayoutDashboard, Settings, LogOut, ChevronDown, Sparkles } from 'lucide-react';

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (role === USER_ROLES.RECRUITER) return '/recruiter/dashboard';
    if (role === USER_ROLES.ADMIN) return '/admin/dashboard';
    return '/student/dashboard';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
          alt={user?.name}
          className="w-9 h-9 rounded-xl object-cover ring-2 ring-brand-500/20"
        />
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs font-bold text-gray-900 leading-tight">{user?.name || 'Alex Rivera'}</span>
          <span className="text-[10px] font-semibold text-brand-600 capitalize">{role}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-500 hidden lg:block" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 py-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-bold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              <span className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-extrabold uppercase">
                <Sparkles className="w-3 h-3" /> {role} Mode
              </span>
            </div>

            <div className="py-1">
              <Link
                to={getDashboardPath()}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-600"
              >
                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
              </Link>
              {role === USER_ROLES.STUDENT && (
                <Link
                  to="/student/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-600"
                >
                  <User className="w-4 h-4" /> Edit Profile
                </Link>
              )}
              <Link
                to={role === USER_ROLES.STUDENT ? '/student/settings' : role === USER_ROLES.RECRUITER ? '/recruiter/settings' : '/admin/settings'}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-brand-50 hover:text-brand-600"
              >
                <Settings className="w-4 h-4" /> Account Settings
              </Link>
            </div>

            <div className="pt-1 border-t border-gray-100">
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                  navigate('/login');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
