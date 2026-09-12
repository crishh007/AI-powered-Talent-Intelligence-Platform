import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { 
  Sparkles, 
  Search, 
  Menu, 
  X, 
  Briefcase, 
  Award, 
  CheckSquare, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';
import { USER_ROLES } from '../../utils/constants';

const Navbar = () => {
  const { user, isAuthenticated, role, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = location.pathname.startsWith('/auth') || location.pathname.startsWith('/login') || location.pathname.startsWith('/register');
  if (isAuthPage) return null;

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
         
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-gray-900 tracking-tight flex items-center gap-1.5">
                  Talent<span className="gradient-text">Intel AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-500 -mt-1">
                  Career Ecosystem
                </span>
              </div>
            </Link>

            
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/opportunities"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/opportunities'
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Opportunities
              </Link>
              <Link
                to="/assessments"
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === '/assessments'
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                AI Assessments
              </Link>
            </div>
          </div>

          
          <div className="hidden md:flex items-center gap-4">
            
           
            {isAuthenticated && (
              <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button
                  onClick={() => switchRole(USER_ROLES.STUDENT)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    role === USER_ROLES.STUDENT
                      ? 'bg-white text-brand-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => switchRole(USER_ROLES.RECRUITER)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    role === USER_ROLES.RECRUITER
                      ? 'bg-white text-brand-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Recruiter
                </button>
                <button
                  onClick={() => switchRole(USER_ROLES.ADMIN)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    role === USER_ROLES.ADMIN
                      ? 'bg-white text-brand-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Admin
                </button>
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white gradient-btn shadow-md hover:shadow-lg transition-all"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

         
          <div className="flex md:hidden items-center gap-2">
            {isAuthenticated && <NotificationDropdown />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Explore Opportunities
          </Link>
          <Link
            to="/assessments"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            AI Assessments
          </Link>
          {isAuthenticated ? (
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3">Switch Role View</div>
              <div className="grid grid-cols-3 gap-2 px-3">
                <button
                  onClick={() => { switchRole(USER_ROLES.STUDENT); setMobileMenuOpen(false); }}
                  className={`py-1.5 rounded text-xs font-bold ${role === USER_ROLES.STUDENT ? 'bg-brand-500 text-white' : 'bg-gray-100'}`}
                >
                  Student
                </button>
                <button
                  onClick={() => { switchRole(USER_ROLES.RECRUITER); setMobileMenuOpen(false); }}
                  className={`py-1.5 rounded text-xs font-bold ${role === USER_ROLES.RECRUITER ? 'bg-brand-500 text-white' : 'bg-gray-100'}`}
                >
                  Recruiter
                </button>
                <button
                  onClick={() => { switchRole(USER_ROLES.ADMIN); setMobileMenuOpen(false); }}
                  className={`py-1.5 rounded text-xs font-bold ${role === USER_ROLES.ADMIN ? 'bg-brand-500 text-white' : 'bg-gray-100'}`}
                >
                  Admin
                </button>
              </div>
              <Link
                to={role === USER_ROLES.STUDENT ? '/student/dashboard' : role === USER_ROLES.RECRUITER ? '/recruiter/dashboard' : '/admin/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-semibold text-brand-600 hover:bg-brand-50"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-4 py-2 rounded-lg text-sm font-semibold text-white gradient-btn"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
