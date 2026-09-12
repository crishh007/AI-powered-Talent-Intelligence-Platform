import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Award, 
  Zap, 
  Users, 
  BarChart, 
  Code2, 
  FileCheck, 
  Briefcase, 
  ChevronDown, 
  Play,
  CheckCircle2,
  Building2,
  TrendingUp,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [openFaq, setOpenFaq] = useState(0);

  const stats = [
    { label: 'Active Job & Internship Postings', value: '12,450+' },
    { label: 'Recruiter Match Speed', value: '< 24 Hours' },
    { label: 'AI Resume Score Accuracy', value: '98.4%' },
    { label: 'Enterprise Partners', value: '500+ Companies' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Talent Match Algorithm',
      desc: 'Smart vector embeddings evaluate skill profiles against job requirements for accurate 95%+ talent matching.',
    },
    {
      icon: FileCheck,
      title: 'Instant Resume Scoring',
      desc: 'Upload your CV to receive real-time keyword gap analysis, ATS readability scores, and targeted skill advice.',
    },
    {
      icon: Code2,
      title: 'Built-in Code Sandbox & Assessment',
      desc: 'Validate technical mastery through live coding tests, MCQ challenges, and automated leaderboard rankings.',
    },
    {
      icon: BarChart,
      title: 'Recruiter ATS & Interview Scheduler',
      desc: 'Seamlessly transition candidates from applicant pool to shortlist and 1-click video interview invites.',
    },
  ];

  const faqs = [
    {
      q: 'How does the AI Resume & Skill Scoring system work?',
      a: 'Our natural language processing model scans your experience, projects, and education against live industry requirements to benchmark your ATS compatibility score and recommend tailored skill upgrades.'
    },
    {
      q: 'Is TalentIntel AI free for students and job seekers?',
      a: 'Yes! Students and job seekers can search opportunities, calculate resume scores, and complete AI assessments 100% free.'
    },
    {
      q: 'How do recruiters verify student assessment results?',
      a: 'All assessment attempts are timestamped and monitored via anti-cheat session tracking. Recruiters receive raw code submissions and detailed skill radar metrics.'
    },
    {
      q: 'Can companies integrate their existing ATS pipeline?',
      a: 'Yes, our enterprise plan offers direct API sync with platforms like Greenhouse, Lever, and Workday.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 bg-gradient-to-b from-white via-brand-50/20 to-[#F8FAFC]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/20 to-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
              <span className="text-xs font-extrabold text-brand-700 uppercase tracking-wide">
                Next-Gen Talent Intelligence Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Connecting Top Tech Talent with High-Growth Startups using <span className="gradient-text">AI Precision</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Automate resume scoring, verify technical capabilities via live AI assessments, and accelerate your tech career in a single ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white gradient-btn shadow-lg shadow-brand-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/opportunities"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-gray-700 bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
              >
                Explore Opportunities
              </Link>
            </div>

            {/* Hero Interactive Card Preview */}
            <div className="pt-10">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 max-w-4xl mx-auto text-left grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                
                <div className="bg-brand-50/50 p-5 rounded-2xl border border-brand-100/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-700">AI Match Engine</span>
                    <Sparkles className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-brand-600">96%</span>
                    <p className="text-xs font-semibold text-gray-600 mt-1">Skill Alignment for React & AI Roles</p>
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700">Live Assessment</span>
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-emerald-600">Top 5%</span>
                    <p className="text-xs font-semibold text-gray-600 mt-1">Verified Frontend Architecture Rank</p>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700">Instant Invite</span>
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-blue-600">Shortlisted</span>
                    <p className="text-xs font-semibold text-gray-600 mt-1">Vertex AI requested interview</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUSTED COMPANIES LOGO MARQUEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
          Trusted by talent teams at global tech leaders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-xl font-extrabold text-gray-700 flex items-center gap-2"><Building2 className="w-6 h-6 text-brand-600" /> Stripe</span>
          <span className="text-xl font-extrabold text-gray-700 flex items-center gap-2"><Sparkles className="w-6 h-6 text-blue-600" /> Linear</span>
          <span className="text-xl font-extrabold text-gray-700 flex items-center gap-2"><Zap className="w-6 h-6 text-cyan-600" /> Vercel</span>
          <span className="text-xl font-extrabold text-gray-700 flex items-center gap-2"><Code2 className="w-6 h-6 text-purple-600" /> GitHub</span>
          <span className="text-xl font-extrabold text-gray-700 flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-emerald-600" /> Notion</span>
        </div>
      </section>

      {/* PLATFORM STATS */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl sm:text-5xl font-extrabold gradient-text">{stat.value}</div>
                <p className="text-xs sm:text-sm font-semibold text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Cutting-Edge Capability
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Supercharge Your Career & Hiring Pipeline
          </h2>
          <p className="text-base text-gray-600">
            Built for candidates seeking top tech roles and recruiters building high-performing engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE BENEFIT TABS (STUDENT vs RECRUITER) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 lg:p-12 shadow-soft">
          
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-2">
              <button
                onClick={() => setActiveTab('student')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'student'
                    ? 'bg-white text-brand-600 shadow-md'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                For Students & Candidates
              </button>
              <button
                onClick={() => setActiveTab('recruiter')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'recruiter'
                    ? 'bg-white text-brand-600 shadow-md'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                For Recruiters & Startups
              </button>
            </div>
          </div>

          {activeTab === 'student' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Land Your Dream Tech Job with AI Validation
                </h3>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>AI Resume Optimization:</strong> Discover missing keywords and raise your score above 90.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Verified Skill Badges:</strong> Take MCQ & coding tests to earn verified profile badges.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>One-Click Applications:</strong> Apply to curated jobs, internships, and hackathons in seconds.</span>
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white gradient-btn shadow-md"
                >
                  Create Candidate Profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-brand-50/60 p-6 rounded-3xl border border-brand-100">
                <div className="bg-white p-5 rounded-2xl shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <span className="text-xs font-bold text-gray-500">Student Profile Match</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-xs font-bold">95% Top Fit</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Frontend Architecture</span>
                      <span className="text-brand-600">96 / 100</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full w-[96%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Hire Pre-Vetted Engineers 5x Faster
                </h3>
                <ul className="space-y-4 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Instant Skill Match:</strong> Filter applicants by verified assessment scores rather than raw CVs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Automated Scheduling:</strong> Dispatch 1-click Google Meet interview invites directly.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Hackathon Sourcing:</strong> Sponsor coding hackathons to source fresh engineering talent.</span>
                  </li>
                </ul>
                <Link
                  to="/register?role=recruiter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 shadow-md"
                >
                  Start Recruiting <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-gray-900 p-6 rounded-3xl text-white space-y-4">
                <div className="text-xs font-bold uppercase text-gray-400">Recruiter Pipeline Overview</div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-800 p-3 rounded-xl">
                    <div className="text-xl font-bold text-white">124</div>
                    <div className="text-[10px] text-gray-400">Applicants</div>
                  </div>
                  <div className="bg-brand-900/60 border border-brand-500/40 p-3 rounded-xl">
                    <div className="text-xl font-bold text-brand-400">18</div>
                    <div className="text-[10px] text-brand-200">Shortlisted</div>
                  </div>
                  <div className="bg-emerald-900/60 border border-emerald-500/40 p-3 rounded-xl">
                    <div className="text-xl font-bold text-emerald-400">6</div>
                    <div className="text-[10px] text-emerald-200">Interviews</div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-600">Everything you need to know about the AI Talent Ecosystem</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                className="w-full text-left p-5 font-bold text-gray-900 text-sm flex items-center justify-between hover:bg-gray-50"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180 text-brand-600' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-600 via-blue-600 to-cyan-600 rounded-3xl p-8 sm:p-14 text-white text-center shadow-xl space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-brand-100 text-sm sm:text-base">
              Join thousands of developers, data scientists, and hiring leaders already using TalentIntel AI.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                 className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-all"
                // className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-brand-700 bg-white hover:bg-brand-50 transition-all shadow-md"
              >
                Create Account Now
              </Link>
              <Link
                to="/opportunities"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white border border-white/30 hover:bg-white/10 transition-all"
              >
                Browse Job Board
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
