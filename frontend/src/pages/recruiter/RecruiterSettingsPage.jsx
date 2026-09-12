import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  ShieldCheck, 
  KeyRound, 
  Smartphone, 
  Lock, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Clock, 
  Calendar, 
  Eye, 
  Download, 
  AlertTriangle, 
  LogOut, 
  Trash2, 
  Save,
  Upload,
  CheckCircle2,
  Monitor
} from 'lucide-react';

const RecruiterSettingsPage = () => {
  const { user, logout } = useAuth();
  const { addToast } = useNotification();

  
  const [recruiterName, setRecruiterName] = useState(user?.name || 'Sarah Jenkins');
  const [email, setEmail] = useState(user?.email || 'sarah@vertexai.com');
  const [phone, setPhone] = useState('+1 (512) 894-3021');
  const [jobTitle, setJobTitle] = useState(user?.title || 'Head of Talent Acquisition');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200');

  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [applicationAlerts, setApplicationAlerts] = useState(true);
  const [interviewReminders, setInterviewReminders] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

 
  const [themeMode, setThemeMode] = useState('light');

  
  const [language, setLanguage] = useState('English (US)');
  const [timeZone, setTimeZone] = useState('UTC-06:00 (Central Time)');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');

 
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarUrl(URL.createObjectURL(file));
      addToast('Profile picture updated successfully!', 'success');
    }
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    addToast('Account Settings saved!', 'success');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      addToast('New passwords do not match!', 'error');
      return;
    }
    addToast('Security credentials updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDownloadData = () => {
    addToast('Account & recruiting data backup request initiated. Check email shortly.', 'info');
  };

  const handleLogoutAll = () => {
    addToast('Logged out from all active background sessions.', 'info');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to permanently delete your recruiter account? This action cannot be undone.')) {
      addToast('Account deletion request initiated.', 'error');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      
     
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-brand-600" /> Account & System Settings
        </h1>
        <p className="text-xs text-gray-500">
          Manage your recruiter credentials, security preferences, notification alerts, regional settings, and privacy options
        </p>
      </div>

      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <User className="w-5 h-5 text-brand-600" /> Personal Account Profile
        </h2>

        <form onSubmit={handleSaveAccount} className="space-y-6">
          
         
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={avatarUrl}
                alt={recruiterName}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-brand-500/20 shadow-md"
              />
              <label className="absolute inset-0 bg-gray-900/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                <Upload className="w-4 h-4" />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900">{recruiterName}</h3>
              <p className="text-xs text-gray-500">{jobTitle}</p>
              <label className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold cursor-pointer hover:bg-brand-100 transition-colors">
                <Upload className="w-3.5 h-3.5" /> Upload New Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Recruiter Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={recruiterName}
                  onChange={(e) => setRecruiterName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Business Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Direct Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (512) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Designation / Job Title</label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Head of Talent Acquisition"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Account Profile
            </button>
          </div>
        </form>
      </div>

    
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand-600" /> Password & Authentication Security
        </h2>

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Current Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">New Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Confirm New Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Update Password
            </button>
          </div>
        </form>

        <div className="border-t border-gray-100 pt-5 space-y-4">
          

          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Two-Factor Authentication (2FA)</p>
                <p className="text-[11px] text-gray-500">Require an authenticator code or SMS pin upon login</p>
              </div>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorAuth}
                onChange={(e) => {
                  setTwoFactorAuth(e.target.checked);
                  addToast(`2FA has been ${e.target.checked ? 'enabled' : 'disabled'}`, 'info');
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
            </label>
          </div>

        
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900">Active Login Sessions</span>
              <button
                onClick={handleLogoutAll}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                Logout From All Devices
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100">
                <div className="flex items-center gap-2.5">
                  <Monitor className="w-4 h-4 text-brand-600" />
                  <div>
                    <p className="font-bold text-gray-900">Chrome on macOS (Austin, USA)</p>
                    <p className="text-[10px] text-gray-400">Current Session • IP: 192.168.1.42</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Active Now</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-gray-100">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-bold text-gray-900">Recruiter Mobile App (iOS 17)</p>
                    <p className="text-[10px] text-gray-400">Last active 2 hours ago</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">Austin, USA</span>
              </div>
            </div>
          </div>

        </div>
      </div>

     
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand-600" /> Notification & Alert Triggers
        </h2>

        <div className="space-y-3">
          {[
            {
              title: 'Email Notifications',
              desc: 'Receive instant email digests for applicant updates and pipeline status changes',
              state: emailNotifications,
              setState: setEmailNotifications,
            },
            {
              title: 'Push Notifications',
              desc: 'Receive browser and desktop push alerts when new candidates apply',
              state: pushNotifications,
              setState: setPushNotifications,
            },
            {
              title: 'New Candidate Application Alerts',
              desc: 'Get notified immediately when a 90%+ AI matched candidate submits an application',
              state: applicationAlerts,
              setState: setApplicationAlerts,
            },
            {
              title: 'Interview Reminders',
              desc: 'Receive automated Google Meet interview reminders 15 minutes before scheduled times',
              state: interviewReminders,
              setState: setInterviewReminders,
            },
            {
              title: 'Product Updates & Market Insights',
              desc: 'Receive monthly tech hiring benchmarking reports and platform features',
              state: marketingEmails,
              setState: setMarketingEmails,
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100/60 transition-colors">
              <div>
                <p className="text-xs font-bold text-gray-900">{item.title}</p>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.state}
                  onChange={(e) => item.setState(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Sun className="w-5 h-5 text-brand-600" /> Interface Theme & Appearance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'light', title: 'Light Mode', icon: Sun, desc: 'Clean white SaaS theme' },
            { id: 'dark', title: 'Dark Mode', icon: Moon, desc: 'Sleek dark contrast' },
            { id: 'system', title: 'System Default', icon: Monitor, desc: 'Auto match OS preference' },
          ].map((mode) => {
            const IconComponent = mode.icon;
            const isSelected = themeMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setThemeMode(mode.id);
                  addToast(`Appearance theme changed to ${mode.title}`, 'info');
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-500/30'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`w-5 h-5 ${isSelected ? 'text-brand-600' : 'text-gray-400'}`} />
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </div>
                <h4 className="text-xs font-bold text-gray-900">{mode.title}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">{mode.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

     
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Globe className="w-5 h-5 text-brand-600" /> Language & Regional Localization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Display Language</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish (Español)</option>
                <option>French (Français)</option>
                <option>German (Deutsch)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Time Zone</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option>UTC-06:00 (Central Time)</option>
                <option>UTC-08:00 (Pacific Time)</option>
                <option>UTC-05:00 (Eastern Time)</option>
                <option>UTC+00:00 (London, GMT)</option>
                <option>UTC+05:30 (India Standard Time)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Date Display Format</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD (2026-08-06)</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY (08/06/2026)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY (06/08/2026)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

   
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <Eye className="w-5 h-5 text-brand-600" /> Recruiter Privacy & Data Governance
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <p className="text-xs font-bold text-gray-900">Public Recruiter Profile Visibility</p>
              <p className="text-[11px] text-gray-500">Allow job applicants to see your official recruiter badge & contact details</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <p className="text-xs font-bold text-gray-900">Anonymous Market Analytics Sharing</p>
              <p className="text-[11px] text-gray-500">Contribute anonymized time-to-hire statistics to benchmark reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dataSharing}
                onChange={(e) => setDataSharing(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
            </label>
          </div>

          <div className="pt-2 flex justify-start">
            <button
              type="button"
              onClick={handleDownloadData}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-brand-600" /> Export & Download My Data (.JSON)
            </button>
          </div>
        </div>
      </div>

     
      <div className="bg-rose-50/50 rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-soft space-y-6">
        <h2 className="text-base font-extrabold text-rose-900 border-b border-rose-200/60 pb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" /> Danger Zone
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-extrabold text-rose-900">Sign Out of Current Account Session</h3>
            <p className="text-[11px] text-rose-700">End your current session safely across this browser</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-white border border-rose-300 text-rose-700 text-xs font-bold hover:bg-rose-100 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Log Out Now
          </button>
        </div>

        <div className="border-t border-rose-200/60 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xs font-extrabold text-rose-900">Permanently Delete Recruiter Account</h3>
            <p className="text-[11px] text-rose-700">Delete your personal recruiter credentials and candidate pipeline history</p>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 flex items-center gap-1.5 shadow transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        </div>
      </div>

    </div>
  );
};

export default RecruiterSettingsPage;
