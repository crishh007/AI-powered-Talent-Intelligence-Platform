import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { ShieldCheck, Check, Ban } from 'lucide-react';

const ManageRecruitersPage = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    adminService.getUsers().then((res) => setRecruiters(res.data.filter((u) => u.role === 'recruiter')));
  }, []);

  const toggleVerify = async (id, status) => {
    await adminService.updateUserStatus(id, status);
    const res = await adminService.getUsers();
    setRecruiters(res.data.filter((u) => u.role === 'recruiter'));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Manage Employer Verification</h1>
        <p className="text-xs text-gray-500">Approve or reject enterprise employer accounts</p>
      </div>

      <div className="space-y-3">
        {recruiters.map((r) => (
          <div key={r.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{r.name} ({r.company || 'Enterprise Recruiter'})</h3>
              <p className="text-xs text-gray-500">{r.email} • Joined {r.joinedDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${r.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {r.status}
              </span>
              <button
                onClick={() => toggleVerify(r.id, r.status === 'Verified' ? 'Pending Verification' : 'Verified')}
                className="px-3 py-1.5 rounded-xl bg-brand-50 text-brand-700 text-xs font-bold hover:bg-brand-100"
              >
                Toggle Verification
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRecruitersPage;
