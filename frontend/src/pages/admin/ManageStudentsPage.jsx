import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Users, Search, Ban, CheckCircle } from 'lucide-react';

const ManageStudentsPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminService.getUsers().then((res) => setUsers(res.data.filter((u) => u.role === 'student')));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Manage Candidate Profiles</h1>
        <p className="text-xs text-gray-500">Monitor candidate accounts and AI assessment histories</p>
      </div>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-soft flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{u.name}</h3>
              <p className="text-xs text-gray-500">{u.email} • Joined {u.joinedDate}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              {u.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudentsPage;
