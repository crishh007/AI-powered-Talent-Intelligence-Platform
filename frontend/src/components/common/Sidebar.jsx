import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { USER_ROLES } from '../../utils/constants';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Bookmark, 
  Bell, 
  Settings, 
  PlusCircle, 
  Users, 
  FileText, 
  Award, 
  BarChart3, 
  ShieldCheck, 
  CheckSquare, 
  LogOut,
  Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const { user, role, logout } = useAuth();

  const studentLinks = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Applied Opportunities', path: '/student/applications', icon: Briefcase },
    { label: 'Saved Jobs', path: '/student/saved', icon: Bookmark },
    { label: 'AI Assessments', path: '/assessments', icon: Award },
    { label: 'Notifications', path: '/student/notifications', icon: Bell },
    { label: 'Settings', path: '/student/settings', icon: Settings },
  ];

  const recruiterLinks = [
    { label: 'Overview', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'Post Opportunity', path: '/recruiter/post', icon: PlusCircle },
    { label: 'Manage Postings', path: '/recruiter/opportunities', icon: Briefcase },
    { label: 'Applicant Pipeline', path: '/recruiter/applicants', icon: Users },
    { label: 'Company Profile', path: '/recruiter/company', icon: FileText },
    { label: 'Talent Analytics', path: '/recruiter/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/recruiter/settings', icon: Settings },
  ];

  const adminLinks = [
    { label: 'Admin Command', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manage Students', path: '/admin/students', icon: Users },
    { label: 'Manage Recruiters', path: '/admin/recruiters', icon: ShieldCheck },
    { label: 'Moderation Hub', path: '/admin/opportunities', icon: CheckSquare },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  let currentLinks = studentLinks;
  if (role === USER_ROLES.RECRUITER) currentLinks = recruiterLinks;
  if (role === USER_ROLES.ADMIN) currentLinks = adminLinks;

  return (
    <aside className="w-64 bg-[#111827] text-gray-300 flex flex-col justify-between min-h-[calc(100vh-4rem)] border-r border-gray-800 shadow-xl">
      <div className="p-4 space-y-6">
        
       
        <div className="px-3 py-2.5 rounded-xl bg-gray-800/80 border border-gray-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
              {role} Workspace
            </span>
          </div>
          <Sparkles className="w-4 h-4 text-brand-400" />
        </div>

        
        <nav className="space-y-1">
          {currentLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600 to-blue-600 text-white font-semibold shadow-md shadow-brand-500/20'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/60'
                  }`
                }
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      
      <div className="p-4 border-t border-gray-800/80 bg-gray-900/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/40"
            />
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-gray-100 truncate">{user?.name || 'User'}</span>
              <span className="text-[11px] text-gray-400 truncate">{user?.email || 'user@example.com'}</span>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
