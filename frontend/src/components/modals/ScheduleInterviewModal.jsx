import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';
import { recruiterService } from '../../services/recruiterService';
import { useNotification } from '../../context/NotificationContext';

const ScheduleInterviewModal = ({ candidate, onClose, onSuccess }) => {
  const [date, setDate] = useState('2026-08-15');
  const [time, setTime] = useState('14:00');
  const [round, setRound] = useState('Technical Interview Round 1');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useNotification();

  if (!candidate) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await recruiterService.scheduleInterview(candidate.id, { date, time, round });
      await recruiterService.updateCandidateStatus(candidate.id, 'Interview Scheduled');
      addToast(`Interview scheduled with ${candidate.name}!`, 'success');
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      addToast(err.message || 'Error scheduling interview', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold uppercase">
            Schedule Interview
          </span>
          <h2 className="text-lg font-extrabold text-gray-900 mt-2">Candidate: {candidate.name}</h2>
          <p className="text-xs text-gray-500">{candidate.roleApplied}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Interview Round</label>
            <select
              value={round}
              onChange={(e) => setRound(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
            >
              <option>Technical Screening Round</option>
              <option>Live AI Pair Coding</option>
              <option>System Design Review</option>
              <option>Cultural & Leadership Round</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Time (UTC)</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-brand-50 rounded-xl flex items-center gap-2 text-xs text-brand-800">
            <Video className="w-4 h-4 text-brand-600 flex-shrink-0" />
            <span>Google Meet link will be generated automatically.</span>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
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
              className="px-5 py-2 rounded-xl text-xs font-bold text-white gradient-btn shadow-md"
            >
              {submitting ? 'Scheduling...' : 'Send Interview Invite'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
