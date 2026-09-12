import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { studentService } from '../../services/studentService';
import { useNotification } from '../../context/NotificationContext';
import { 
  User, 
  UploadCloud, 
  Sparkles, 
  Check, 
  Plus, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Award,
  Trash2
} from 'lucide-react';

const StudentProfilePage = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();

  const [profileData, setProfileData] = useState(null);
  const [title, setTitle] = useState(user?.title || 'Full Stack Engineer & AI Enthusiast');
  const [location, setLocation] = useState(user?.location || 'San Francisco, CA');
  const [skills, setSkills] = useState(user?.skills || ['React.js', 'Node.js', 'Python', 'Tailwind CSS', 'TypeScript']);
  const [newSkill, setNewSkill] = useState('');
  
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeName, setResumeName] = useState(user?.resumeUrl || 'alex_rivera_resume_2026.pdf');
  const [resumeScore, setResumeScore] = useState(user?.resumeScore || 92);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const profileRes = await studentService.getProfile();
        if (profileRes?.data) {
          setProfileData(profileRes.data);
          if (profileRes.data.university) {
            setLocation(profileRes.data.university);
          }
          if (profileRes.data.bio) {
            setTitle(profileRes.data.bio);
          }
        }

        const skillsRes = await studentService.getSkills();
        if (skillsRes?.data && Array.isArray(skillsRes.data) && skillsRes.data.length > 0) {
          const loadedSkills = skillsRes.data.map(item => item.skill?.name || item.name).filter(Boolean);
          if (loadedSkills.length > 0) {
            setSkills(loadedSkills);
          }
        }

        const resumeRes = await studentService.getResume();
        if (resumeRes?.data?.fileName) {
          setResumeName(resumeRes.data.fileName);
        }
      } catch (err) {
        console.warn('Error loading student profile data from server:', err);
      }
    };

    fetchStudentData();
  }, []);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    const skillToAdd = newSkill.trim();
    if (!skills.includes(skillToAdd)) {
      try {
        await studentService.addSkill({ name: skillToAdd, proficiency: 'Intermediate' });
      } catch (err) {
        console.warn('Skill added locally (server offline)');
      }
      setSkills([...skills, skillToAdd]);
      setNewSkill('');
      addToast('Skill added to profile!', 'success');
    }
  };

  const handleRemoveSkill = async (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
    addToast('Skill removed from profile!', 'info');
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const res = await studentService.uploadResume(file);
      setResumeName(res.resumeUrl);
      setResumeScore(res.score || 94);
      addToast(res.message || 'Resume uploaded successfully!', 'success');
    } catch (err) {
      addToast('Failed to parse resume file', 'error');
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={user?.avatar || profileData?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={profileData?.user?.name || user?.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-500/20 shadow-md"
          />
          <label className="absolute bottom-0 right-0 p-2 rounded-full bg-brand-600 text-white shadow-md cursor-pointer hover:bg-brand-700">
            <User className="w-4 h-4" />
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900">{profileData?.user?.name || user?.name || 'Alex Rivera'}</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">
              Profile Verified
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-600">{title}</p>
          <p className="text-xs text-gray-400">{location} • Member since 2026</p>
        </div>

        <div className="bg-brand-50 p-4 rounded-2xl border border-brand-100 text-center space-y-1">
          <div className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-700">
            <Sparkles className="w-3.5 h-3.5" /> AI Resume Score
          </div>
          <div className="text-3xl font-extrabold text-brand-600">{resumeScore} / 100</div>
          <p className="text-[10px] text-gray-500 font-semibold">Top 8% Candidate Pool</p>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-gray-900 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-600" /> AI Resume Parser & Analyzer
            </h2>
            <p className="text-xs text-gray-500">Upload your latest PDF/DOCX resume to auto-update keywords</p>
          </div>
          <label className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-btn shadow cursor-pointer flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            {uploadingResume ? 'Parsing AI Keywords...' : 'Upload New Resume'}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              disabled={uploadingResume}
            />
          </label>
        </div>

        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              PDF
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{resumeName}</p>
              <p className="text-[11px] text-gray-500">Last analyzed: Today • ATS Compatibility: High</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
            Parsed Successfully
          </span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
        <h2 className="font-extrabold text-gray-900 text-lg">Verified Tech Stack & Skills</h2>

        <form onSubmit={handleAddSkill} className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill (e.g. Next.js, Docker, PyTorch)..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gray-900 hover:bg-gray-800 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold flex items-center gap-2 shadow-sm"
            >
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-rose-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Education & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600" /> Education
          </h3>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h4 className="text-xs font-bold text-gray-900">{profileData?.university || 'Stanford University'}</h4>
            <p className="text-xs text-gray-600">B.S. in Computer Science & AI</p>
            <p className="text-[11px] text-gray-400">{profileData?.graduationYear ? `Graduation Year: ${profileData.graduationYear}` : '2022 - 2026 • GPA: 3.9/4.0'}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
          <h3 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-600" /> Experience & Projects
          </h3>
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
            <h4 className="text-xs font-bold text-gray-900">Frontend Engineer Intern</h4>
            <p className="text-xs text-gray-600">TechCorp Labs • Summer 2025</p>
            <p className="text-[11px] text-gray-400">Built React component design system with 60fps animations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
