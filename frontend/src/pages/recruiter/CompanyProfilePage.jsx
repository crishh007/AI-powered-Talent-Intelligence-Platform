import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  Save, 
  Upload, 
  Calendar, 
  Mail, 
  Share2, 
  Image as ImageIcon,
  Sparkles,
  FileText
} from 'lucide-react';

const CompanyProfilePage = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [companyName, setCompanyName] = useState(user?.company || 'Vertex AI Systems');
  const [industry, setIndustry] = useState('Artificial Intelligence & Enterprise SaaS');
  const [location, setLocation] = useState('Austin, TX (Headquarters)');
  const [website, setWebsite] = useState('https://vertexai.com');
  const [description, setDescription] = useState('Vertex AI Systems builds autonomous agent execution engines, real-time vector search indexes, and enterprise talent intelligence tools powering high-growth software engineering teams worldwide.');
  const [companySize, setCompanySize] = useState('250 - 500 Employees');
  const [foundedYear, setFoundedYear] = useState('2021');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/company/vertex-ai-systems');
  const [businessEmail, setBusinessEmail] = useState('careers@vertexai.com');
  const [logoUrl, setLogoUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000');

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoUrl(URL.createObjectURL(file));
      addToast('Company logo updated!', 'success');
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerUrl(URL.createObjectURL(file));
      addToast('Company banner background updated!', 'success');
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Company Profile saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-brand-600" /> Company Profile
        </h1>
        <p className="text-xs text-gray-500">
          Manage employer branding, company bio, headquarters, and organization details visible to job candidates
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
          
          
          <div className="relative h-44 sm:h-52 bg-gradient-to-r from-gray-900 via-brand-950 to-blue-950 overflow-hidden">
            <img
              src={bannerUrl}
              alt="Company Banner"
              className="w-full h-full object-cover opacity-40"
            />
            <label className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/20 cursor-pointer hover:bg-gray-900 transition-colors flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" /> Change Banner Image
              <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload} />
            </label>
          </div>

          
          <div className="px-6 sm:px-8 pb-6 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12">
            <div className="flex items-end gap-4">
              <div className="relative group">
                <img
                  src={logoUrl}
                  alt={companyName}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-white"
                />
                <label className="absolute inset-0 bg-gray-900/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-gray-900">{companyName}</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Verified Employer
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-500">{industry}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{location}</p>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Company Profile
            </button>
          </div>
        </div>

       
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-600" /> General Company Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Company Name</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Industry Sector</label>
              <input
                type="text"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="e.g. Artificial Intelligence & SaaS"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">Company Overview & Mission</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your company background, culture, mission, and products..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 leading-relaxed transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Headquarters Location</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Austin, TX"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Company Size</label>
              <div className="relative">
                <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
                >
                  <option>1 - 10 Employees (Seed Stage)</option>
                  <option>11 - 50 Employees (Early Stage)</option>
                  <option>51 - 200 Employees (Growth)</option>
                  <option>250 - 500 Employees</option>
                  <option>500 - 1000 Employees</option>
                  <option>1000+ Enterprise Employees</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Founded Year</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={foundedYear}
                  onChange={(e) => setFoundedYear(e.target.value)}
                  placeholder="2021"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft space-y-6">
          <h3 className="text-base font-extrabold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Globe className="w-5 h-5 text-brand-600" /> Digital Presence & Business Contact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Official Website URL</label>
              <div className="relative">
                <Globe className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="url"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">LinkedIn Profile / Page</label>
              <div className="relative">
                <Share2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1.5">Business Contact Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="careers@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Company Profile
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default CompanyProfilePage;
