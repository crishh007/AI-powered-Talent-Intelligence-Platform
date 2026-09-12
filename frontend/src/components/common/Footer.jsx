import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Globe, Share2, Mail, ArrowUpRight } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { MOCK_ADMIN } from '../../utils/constants';

const Footer = () => {
  const { addToast } = useNotification();
  const contactEmail = MOCK_ADMIN?.email || 'admin@talentintel.ai';

  const handleShare = async (e) => {
    e.preventDefault();
    const shareData = {
      title: 'TalentIntel AI',
      text: 'Autonomous Talent Intelligence Career Ecosystem',
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        addToast('Shared successfully!', 'success');
      } catch (err) {
        // Fallback to clipboard if user cancels or share fails
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.origin);
        }
        addToast('Link copied to clipboard!', 'success');
      }
    } else {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.origin);
      }
      addToast('Link copied to clipboard!', 'success');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Talent<span className="gradient-text">Intel AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Autonomous Talent Intelligence Ecosystem bridging Students, High-Growth Recruiters, and AI Skill Verification into a single platform.
            </p>
            
            
            <div className="flex items-center gap-3 pt-2">
              
              {/* 1. Global Web */}
              <a
                href="https://api.talentintelligence.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Global Web Portal"
                aria-label="Global Web Portal"
              >
                <Globe className="w-4 h-4" />
              </a>

              
              <button
                type="button"
                onClick={handleShare}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer border-none outline-none focus:outline-none"
                title="Share Network"
                aria-label="Share Network"
              >
                <Share2 className="w-4 h-4" />
              </button>

            
              <a
                href={`mailto:${contactEmail}`}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Contact Us"
                aria-label="Contact Us"
              >
                <Mail className="w-4 h-4" />
              </a>

            </div>
          </div>

          
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">For Talent</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/opportunities" className="hover:text-white transition-colors">Explore Opportunities</Link></li>
              <li><Link to="/assessments" className="hover:text-white transition-colors">AI Skill Assessment</Link></li>
              <li><Link to="/student/dashboard" className="hover:text-white transition-colors">AI Resume Score</Link></li>
              <li><Link to="/opportunities?type=Hackathon" className="hover:text-white transition-colors">Global Hackathons</Link></li>
            </ul>
          </div>

          
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">For Recruiters</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/recruiter/post" className="hover:text-white transition-colors">Post an Opportunity</Link></li>
              <li><Link to="/recruiter/applicants" className="hover:text-white transition-colors">Candidate ATS Pipeline</Link></li>
              <li><Link to="/recruiter/analytics" className="hover:text-white transition-colors">Talent Market Analytics</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Enterprise Portal</Link></li>
            </ul>
          </div>

        
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ & Support</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors inline-flex items-center gap-1">Contact Us <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 AI-Powered Talent Intelligence Ecosystem. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-gray-400">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gray-400">Terms of Service</Link>
            <Link to="/contact" className="hover:text-gray-400">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
