export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case 'Applied':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Under Review':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Shortlisted':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Interview Scheduled':
      return 'bg-cyan-100 text-cyan-700 border-cyan-200';
    case 'Accepted':
    case 'Verified':
    case 'Active':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Rejected':
    case 'Blocked':
      return 'bg-rose-100 text-rose-700 border-rose-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};
