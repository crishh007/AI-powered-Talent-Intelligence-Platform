import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { ShieldCheck, Users, Briefcase, Award, CheckCircle, Ban, AlertTriangle } from 'lucide-react';

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminService.getSystemStats().then((res) => setStats(res.stats));
    adminService.getUsers().then((res) => setUsers(res.data));
  }, []);

  const handleUserStatus = async (userId, newStatus) => {
    await adminService.updateUserStatus(userId, newStatus);
    const res = await adminService.getUsers();
    setUsers(res.data);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Admin Control Center</h1>
        <p className="text-xs text-gray-500">Platform security, verification requests, user moderation, and health metrics</p>
      </div>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase">Total Candidates</span>
          <div className="text-3xl font-extrabold text-brand-600 mt-1">{stats?.totalStudents || '14,250'}</div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">+12% this month</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase">Total Recruiters</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1">{stats?.totalRecruiters || '840'}</div>
          <p className="text-[11px] text-gray-400 mt-1">500+ Verified Companies</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase">Active Opportunities</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-1">{stats?.activeOpportunities || '312'}</div>
          <p className="text-[11px] text-purple-600 font-bold mt-1">Jobs, Internships & Hackathons</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft">
          <span className="text-xs font-bold text-gray-500 uppercase">Pending Verifications</span>
          <div className="text-3xl font-extrabold text-amber-600 mt-1">{stats?.verificationPending || '18'}</div>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Requires Admin Review</p>
        </div>
      </div>

     
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-soft space-y-4">
        <h2 className="font-extrabold text-gray-900 text-lg">User Moderation & Access Control</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="pb-3">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Joined Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5">
                    <span className="font-bold text-gray-900 block">{u.name}</span>
                    <span className="text-[11px] text-gray-400">{u.email}</span>
                  </td>
                  <td className="py-3.5 capitalize font-semibold text-gray-700">{u.role}</td>
                  <td className="py-3.5 text-gray-500">{u.joinedDate}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full font-bold ${
                      u.status === 'Active' || u.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                      u.status === 'Blocked' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    {u.status !== 'Verified' && (
                      <button
                        onClick={() => handleUserStatus(u.id, 'Verified')}
                        className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100"
                      >
                        Verify
                      </button>
                    )}
                    {u.status !== 'Blocked' ? (
                      <button
                        onClick={() => handleUserStatus(u.id, 'Blocked')}
                        className="px-3 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserStatus(u.id, 'Active')}
                        className="px-3 py-1 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
