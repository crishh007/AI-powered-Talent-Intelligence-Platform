import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, Sparkles, FileText } from 'lucide-react';
import { opportunityService } from '../../services/opportunityService';
import { useNotification } from '../../context/NotificationContext';

const ApplyModal = ({ opportunity, onClose, onSuccess }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useNotification();

  if (!opportunity) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await opportunityService.applyToOpportunity(opportunity.id, {
        coverNote,
        resumeName: resumeFile ? resumeFile.name : 'alex_rivera_resume.pdf',
      });
      setSubmitted(true);
      addToast(`Application submitted for ${opportunity.title}!`, 'success');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      addToast(err.message || 'Failed to submit application', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Your AI Talent Match profile and resume have been dispatched to <strong>{opportunity.company}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Direct One-Click Apply
              </div>
              <h2 className="text-xl font-extrabold text-gray-900">{opportunity.title}</h2>
              <p className="text-xs font-semibold text-gray-500">{opportunity.company} • {opportunity.location}</p>
            </div>

           
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Selected Resume
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-brand-400 bg-gray-50/50 transition-colors">
                <FileText className="w-8 h-8 text-brand-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-gray-800">
                  {resumeFile ? resumeFile.name : 'Alex_Rivera_AI_Resume_2026.pdf'}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">Parsed AI Match Score: 94%</p>
                <label className="mt-2 inline-block px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-brand-600 cursor-pointer shadow-sm hover:bg-gray-50">
                  Choose Different File
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

           
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Cover Note / Pitch (Optional)
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Why are you a great fit for this role?"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-btn shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Confirm & Submit Application'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
