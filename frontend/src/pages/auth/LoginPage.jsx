import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { useNotification } from '../../context/NotificationContext';
import { USER_ROLES } from '../../utils/constants';
import { Sparkles, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || USER_ROLES.STUDENT;

  const [email, setEmail] = useState('alex.rivera@example.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login(email, password, role);
      login(res.user, res.token);
      addToast(`Welcome back, ${res.user.name}!`, 'success');
      if (role === USER_ROLES.RECRUITER) navigate('/recruiter/dashboard');
      else if (role === USER_ROLES.ADMIN) navigate('/admin/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        
       
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl text-gray-900 tracking-tight">
              Talent<span className="gradient-text">Intel AI</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="text-xs text-gray-500">Sign in to access your AI Career Workspace</p>
        </div>

        
        <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setRole(USER_ROLES.STUDENT)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              role === USER_ROLES.STUDENT ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole(USER_ROLES.RECRUITER)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              role === USER_ROLES.RECRUITER ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            Recruiter
          </button>
          <button
            type="button"
            onClick={() => setRole(USER_ROLES.ADMIN)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              role === USER_ROLES.ADMIN ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500'
            }`}
          >
            Admin
          </button>
        </div>

       
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Password</label>
              <Link to="/auth/forgot-password" className="text-xs font-semibold text-brand-600 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold text-white gradient-btn shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to={`/register?role=${role}`} className="font-bold text-brand-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
