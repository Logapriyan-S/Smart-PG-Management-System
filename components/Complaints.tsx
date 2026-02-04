
import React, { useState } from 'react';
import { User, UserRole, Complaint, ComplaintStatus } from '../types';

interface ComplaintsProps {
  user: User;
  complaints: Complaint[];
  onAdd: (complaint: Complaint) => void;
  onUpdateStatus: (id: string, status: ComplaintStatus) => void;
}

const Complaints: React.FC<ComplaintsProps> = ({ user, complaints, onAdd, onUpdateStatus }) => {
  const isAdmin = user.role === UserRole.ADMIN;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Water' as Complaint['type'],
    description: ''
  });

  const filteredComplaints = isAdmin ? complaints : complaints.filter(c => c.residentId === user.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) return;

    const newComplaint: Complaint = {
      id: Math.random().toString(36).substr(2, 9),
      residentId: user.id,
      residentName: user.name,
      type: formData.type,
      description: formData.description,
      status: ComplaintStatus.PENDING,
      createdAt: new Date().toISOString()
    };

    onAdd(newComplaint);
    setIsModalOpen(false);
    setFormData({ type: 'Water', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Complaints Management</h2>
          <p className="text-slate-500">Track and manage PG issues efficiently.</p>
        </div>
        {!isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            <span>Raise Issue</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Complaint ID</th>
                {isAdmin && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Resident</th>}
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                {isAdmin && <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map(complaint => (
                  <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400 uppercase">#{complaint.id}</td>
                    {isAdmin && <td className="px-6 py-4 text-sm font-medium text-slate-900">{complaint.residentName}</td>}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">{complaint.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{complaint.description}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-block ${
                        complaint.status === ComplaintStatus.PENDING ? 'bg-amber-100 text-amber-700' :
                        complaint.status === ComplaintStatus.IN_PROGRESS ? 'bg-blue-100 text-blue-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        {complaint.status.replace('_', ' ')}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <select 
                          className="text-xs border rounded-lg p-1 outline-none bg-white focus:ring-1 focus:ring-indigo-500"
                          value={complaint.status}
                          onChange={(e) => onUpdateStatus(complaint.id, e.target.value as ComplaintStatus)}
                        >
                          <option value={ComplaintStatus.PENDING}>Pending</option>
                          <option value={ComplaintStatus.IN_PROGRESS}>In Progress</option>
                          <option value={ComplaintStatus.RESOLVED}>Resolved</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isAdmin ? 7 : 5} className="px-6 py-12 text-center text-slate-400">
                    No complaints recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raise Complaint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-scaleIn">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Raise New Complaint</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Issue Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Water', 'Electricity', 'Cleaning', 'Internet', 'Food', 'Other'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, type: type as Complaint['type']})}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        formData.type === type ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                  placeholder="Describe the issue in detail..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
