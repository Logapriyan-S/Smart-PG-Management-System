import React, { useState } from 'react';
import { User, UserRole, Complaint, ComplaintStatus } from '../types';

interface ComplaintsProps {
  user: User;
  complaints: Complaint[];
  onAdd: (complaint: Complaint) => void;
  onUpdateStatus: (id: string, status: ComplaintStatus) => void;
}

const Complaints: React.FC<ComplaintsProps> = ({ user, complaints, onAdd, onUpdateStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: '', description: '' });
  
  const isAdmin = user.role === UserRole.ADMIN;
  
  // Residents only see their own complaints. Admin sees all.
  const visibleComplaints = isAdmin ? complaints : complaints.filter(c => c.author === user.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComplaint = {
      id: 'cmp-' + Math.random().toString(36).substr(2, 9),
      type: formData.type,
      description: formData.description,
      status: ComplaintStatus.PENDING,
      author: user.name,
      createdAt: new Date().toISOString()
    };
    onAdd(newComplaint as Complaint);
    setIsModalOpen(false);
    setFormData({ type: '', description: '' });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'RESOLVED': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'IN_PROGRESS': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default: return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    }
  };

  return (
    <div className="space-y-10 p-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Facility Services</p>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Support Requests</h2>
          <p className="text-slate-500 font-light mt-2">
            {isAdmin ? 'Manage and resolve resident facility issues.' : 'Report and track your suite maintenance requests.'}
          </p>
        </div>
        {!isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#030614] px-8 py-3.5 rounded-2xl font-bold tracking-widest uppercase text-[10px] shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
          >
            Raise New Request
          </button>
        )}
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[#D4AF37] text-[10px] uppercase tracking-widest">
            <tr>
              <th className="px-8 py-6">Ticket Info</th>
              {isAdmin && <th className="px-8 py-6">Resident</th>}
              <th className="px-8 py-6">Status / Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {visibleComplaints.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 3 : 2} className="px-8 py-10 text-center text-slate-500 italic">
                  No active support requests.
                </td>
              </tr>
            ) : (
              visibleComplaints.map(complaint => (
                <tr key={complaint.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-white font-bold mb-1">{complaint.type}</p>
                    <p className="text-sm text-slate-400 font-light line-clamp-1">{complaint.description}</p>
                    <p className="text-[10px] text-slate-600 mt-2">
                      {new Date(complaint.createdAt).toLocaleDateString('en-GB')}
                    </p>
                  </td>
                  
                  {isAdmin && (
                    <td className="px-8 py-6">
                      <p className="text-sm text-white">{complaint.author}</p>
                    </td>
                  )}

                  <td className="px-8 py-6">
                    {isAdmin ? (
                      // ADMIN VIEW: Dropdown to change status
                      <select 
                        value={complaint.status}
                        onChange={(e) => onUpdateStatus(complaint.id, e.target.value as ComplaintStatus)}
                        className={`text-[10px] font-bold uppercase px-4 py-2 rounded-xl border outline-none cursor-pointer ${getStatusColor(complaint.status)}`}
                      >
                        <option value="PENDING" className="bg-[#050917] text-white">Pending</option>
                        <option value="IN_PROGRESS" className="bg-[#050917] text-white">In Progress</option>
                        <option value="RESOLVED" className="bg-[#050917] text-white">Resolved</option>
                      </select>
                    ) : (
                      // RESIDENT VIEW: Read-only status badge
                      <span className={`text-[10px] font-bold uppercase px-4 py-1.5 rounded-full border ${getStatusColor(complaint.status)}`}>
                        {complaint.status.replace('_', ' ')}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Resident Raise Complaint Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-[#050917] border border-[#D4AF37]/30 p-10 rounded-[3rem] w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-4">New Support Request</h3>
            
            <input 
              required 
              className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" 
              placeholder="Issue Type (e.g., Plumbing, WiFi, Cleaning)" 
              value={formData.type} 
              onChange={e => setFormData({...formData, type: e.target.value})} 
            />
            
            <textarea 
              required 
              rows={4}
              className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all resize-none" 
              placeholder="Describe the issue in detail..." 
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
            />
            
            <div className="flex gap-4 mt-6">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="w-1/3 py-5 rounded-2xl font-bold uppercase text-xs text-slate-400 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="w-2/3 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] hover:scale-[1.02] active:scale-95 transition-all py-5 rounded-2xl font-black uppercase text-xs text-[#030614] shadow-xl"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Complaints;