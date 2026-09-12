import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { opportunityService } from '../../services/opportunityService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { SKILL_CATEGORIES, OPPORTUNITY_TYPES } from '../../utils/constants';
import { PlusCircle, Sparkles, Building2, MapPin, DollarSign, Calendar, ArrowRight, Award, Clock, Users, BookOpen, FileText } from 'lucide-react';

const PostOpportunityPage = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  
  const [type, setType] = useState(OPPORTUNITY_TYPES.JOB);


  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(SKILL_CATEGORIES[0]);
  const [location, setLocation] = useState('Remote');
  const [deadline, setDeadline] = useState('2026-09-30');

  
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [salaryRange, setSalaryRange] = useState('$130,000 - $160,000 / yr');
  const [jobSkills, setJobSkills] = useState('React, TypeScript, Tailwind CSS, Python');
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');

 
  const [internshipType, setInternshipType] = useState('Summer Internship');
  const [duration, setDuration] = useState('3 Months');
  const [internshipStipend, setInternshipStipend] = useState('$3,500 / month');
  const [internshipSkills, setInternshipSkills] = useState('React, Node.js, Python');
  const [internshipDescription, setInternshipDescription] = useState('');
  const [internshipRequirements, setInternshipRequirements] = useState('');

 
  const [theme, setTheme] = useState('Generative AI & Autonomous Agents');
  const [eventMode, setEventMode] = useState('Online / Virtual');
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-03');
  const [prizePool, setPrizePool] = useState('$50,000 Cash & Cloud Credits');
  const [teamSize, setTeamSize] = useState('1 - 4 Members');
  const [rules, setRules] = useState('');
  const [eligibility, setEligibility] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload = {
        title,
        type,
        category,
        location,
        deadline,
        company: user?.company || 'Vertex AI Systems',
      };

      if (type === OPPORTUNITY_TYPES.JOB) {
        payload = {
          ...payload,
          employmentType,
          stipend: salaryRange,
          skills: jobSkills.split(',').map((s) => s.trim()).filter(Boolean),
          description: jobDescription,
          requirements: jobRequirements,
        };
      } else if (type === OPPORTUNITY_TYPES.INTERNSHIP) {
        payload = {
          ...payload,
          internshipType,
          duration,
          stipend: internshipStipend,
          skills: internshipSkills.split(',').map((s) => s.trim()).filter(Boolean),
          description: internshipDescription,
          requirements: internshipRequirements,
        };
      } else if (type === OPPORTUNITY_TYPES.HACKATHON) {
        payload = {
          ...payload,
          theme,
          mode: eventMode,
          startDate,
          endDate,
          prizePool,
          stipend: prizePool,
          teamSize,
          description: rules,
          eligibility,
        };
      }

      await opportunityService.postOpportunity(payload);
      addToast(`New ${type} published successfully!`, 'success');
      navigate('/recruiter/opportunities');
    } catch (err) {
      addToast(err.message || 'Failed to post opportunity', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Post New Opportunity</h1>
        <p className="text-xs text-gray-500">Publish a Job, Internship, or Hackathon to thousands of pre-vetted AI candidates</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-soft space-y-6">
        
       
        <div>
          <label className="text-xs font-bold text-gray-700 block mb-2">Select Opportunity Type</label>
          <div className="grid grid-cols-3 gap-3">
            {[OPPORTUNITY_TYPES.JOB, OPPORTUNITY_TYPES.INTERNSHIP, OPPORTUNITY_TYPES.HACKATHON].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setType(t)}
                className={`py-3.5 px-4 rounded-2xl text-xs font-bold transition-all border outline-none focus:outline-none cursor-pointer flex items-center justify-center gap-2 ${
                  type === t
                    ? 'bg-[#6D5DF6] text-white border-[#6D5DF6] shadow-md shadow-[#6D5DF6]/25 hover:bg-[#583ef0] active:bg-[#583ef0] focus:bg-[#6D5DF6] focus:text-white'
                    : 'bg-[#F1F5F9] text-[#334155] border-gray-200/60 hover:bg-[#E2E8F0] hover:text-[#0F172A] active:bg-[#E2E8F0] focus:bg-[#F1F5F9] focus:text-[#334155]'
                }`}
              >
                {t === OPPORTUNITY_TYPES.JOB && <Building2 className="w-4 h-4" />}
                {t === OPPORTUNITY_TYPES.INTERNSHIP && <BookOpen className="w-4 h-4" />}
                {t === OPPORTUNITY_TYPES.HACKATHON && <Award className="w-4 h-4" />}
                <span>{t}</span>
              </button>
            ))}
          </div>
        </div>

      
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">General Information</h3>

         
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {type === OPPORTUNITY_TYPES.HACKATHON ? 'Hackathon Title' : type === OPPORTUNITY_TYPES.INTERNSHIP ? 'Internship Title' : 'Job Title'}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === OPPORTUNITY_TYPES.HACKATHON 
                  ? 'e.g. Global Autonomous AI Hackathon 2026' 
                  : type === OPPORTUNITY_TYPES.INTERNSHIP 
                  ? 'e.g. AI Engineering & Frontend Intern' 
                  : 'e.g. Senior Full Stack Engineer / AI Architect'
              }
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Category / Domain</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
              >
                {SKILL_CATEGORIES.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Location / Venue</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA (Hybrid), Remote, or Online Platform"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              {type === OPPORTUNITY_TYPES.HACKATHON ? 'Registration Deadline' : 'Application Deadline'}
            </label>
            <input
              type="date"
              required
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        </div>

       
        {type === OPPORTUNITY_TYPES.JOB && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-extrabold text-brand-600 uppercase tracking-wider">Job Details & Compensation</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Remote / Distributed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Salary Range</label>
                <input
                  type="text"
                  required
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  placeholder="e.g. $130,000 - $160,000 / yr"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                required
                value={jobSkills}
                onChange={(e) => setJobSkills(e.target.value)}
                placeholder="React, TypeScript, Tailwind CSS, Python"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Job Description</label>
              <textarea
                rows={4}
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Describe role responsibilities, daily workflow, and high-level projects..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Role Requirements & Qualifications</label>
              <textarea
                rows={3}
                required
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
                placeholder="Key qualifications (e.g. 4+ years React experience, B.S. in Computer Science)..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
        )}

       
        {type === OPPORTUNITY_TYPES.INTERNSHIP && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Internship Program Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Internship Type</label>
                <select
                  value={internshipType}
                  onChange={(e) => setInternshipType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option>Summer Internship</option>
                  <option>Full-time Internship</option>
                  <option>Part-time Internship</option>
                  <option>Virtual / Remote Internship</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Program Duration</label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 3 Months, 6 Months"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Monthly Stipend</label>
                <input
                  type="text"
                  required
                  value={internshipStipend}
                  onChange={(e) => setInternshipStipend(e.target.value)}
                  placeholder="e.g. $3,500 / month"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                required
                value={internshipSkills}
                onChange={(e) => setInternshipSkills(e.target.value)}
                placeholder="React, Node.js, Python, Git"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Internship Description & Learning Goals</label>
              <textarea
                rows={4}
                required
                value={internshipDescription}
                onChange={(e) => setInternshipDescription(e.target.value)}
                placeholder="Describe mentorship, project impact, learning roadmap, and team integration..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Internship Requirements</label>
              <textarea
                rows={3}
                required
                value={internshipRequirements}
                onChange={(e) => setInternshipRequirements(e.target.value)}
                placeholder="e.g. Currently enrolled in Computer Science or Software Engineering degree..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
        )}

        
        {type === OPPORTUNITY_TYPES.HACKATHON && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Hackathon Event Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Theme / Track</label>
                <input
                  type="text"
                  required
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g. Generative AI, Web3, Climate Tech"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Event Mode</label>
                <select
                  value={eventMode}
                  onChange={(e) => setEventMode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option>Online / Virtual</option>
                  <option>Offline / On-site</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Hackathon Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Hackathon End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Total Prize Pool</label>
                <input
                  type="text"
                  required
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  placeholder="e.g. $50,000 Cash & Cloud Credits"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Team Size</label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                >
                  <option>1 - 4 Members</option>
                  <option>Solo Hackers (1 Member)</option>
                  <option>2 - 5 Members</option>
                  <option>Unlimited Team Size</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Rules & Guidelines</label>
              <textarea
                rows={4}
                required
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                placeholder="Outline submission requirements, code repository guidelines, and judging criteria..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Eligibility Criteria</label>
              <textarea
                rows={3}
                required
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                placeholder="e.g. Open to all students, professionals, and open-source developers worldwide..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>
        )}

       
        <div className="pt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-xl text-xs font-bold text-white gradient-btn shadow-md hover:shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? 'Publishing...' : `Publish ${type}`} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
};

export default PostOpportunityPage;
