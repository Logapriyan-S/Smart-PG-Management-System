import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface ResidentListProps {
  residents: User[];
  totalRooms: number;
  currentUser: User;
  onUpdateRent: (id: string, isPaid: boolean) => void;
  onAddResident: (resident: any) => void;
  onDeleteResident: (id: string) => void;
}

const ResidentList: React.FC<ResidentListProps> = ({
  residents = [], totalRooms = 50, currentUser, onUpdateRent, onAddResident, onDeleteResident
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phoneNumber: '', roomNumber: '', roomType: 'Single'
  });

  const availableRooms = Array.from({ length: totalRooms }, (_, i) => (101 + i).toString())
    .filter(room => !residents.map(r => r.roomNumber).includes(room));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddResident(formData); 
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '', phoneNumber: '', roomNumber: '', roomType: 'Single' });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '', phoneNumber: '', roomNumber: '', roomType: 'Single' });
  };

  return (
    <div className="space-y-10 p-6">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-bold text-white">Resident Ledger</h2>
           <p className="text-slate-500">Manage allocations and credentials.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] hover:bg-[#E5C07B] text-black px-8 py-3 rounded-2xl font-bold uppercase text-[10px] transition-colors">
          Allocate New Suite
        </button>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[#D4AF37] text-[10px] uppercase">
            <tr>
              <th className="px-8 py-6">Resident Identity</th>
              <th className="px-8 py-6">Suite & Type</th>
              <th className="px-8 py-6">Security Key (Admin Only)</th>
              <th className="px-8 py-6">Financials</th>
              <th className="px-8 py-6">Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {residents.filter(r => r.role === UserRole.RESIDENT).map(res => (
              <tr key={res.id} className="hover:bg-white/[0.01] text-white">
                <td className="px-8 py-6">
                    <p className="font-bold">{res.name}</p>
                    <p className="text-[10px] text-slate-500 lowercase">{res.email}</p>
                </td>
                <td className="px-8 py-6 text-sm">
                  Room {res.roomNumber} 
                  <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded ml-2 uppercase tracking-wider border border-[#D4AF37]/20">
                    {res.roomType}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <code className="text-xs text-amber-200/50 bg-white/5 px-2 py-1 rounded border border-white/5">{res.password}</code>
                </td>
                <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${res.isRentPaid ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' : 'text-rose-500 bg-rose-500/10 border-rose-500/20'}`}>
                        {res.isRentPaid ? 'Cleared' : 'Pending'}
                    </span>
                </td>
                <td className="px-8 py-6 flex space-x-4">
                  <button onClick={() => onUpdateRent(res.id, !res.isRentPaid)} className="text-[#D4AF37] text-[10px] font-bold uppercase border-b border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all">Toggle Rent</button>
                  <button onClick={() => onDeleteResident(res.id)} className="text-slate-500 hover:text-rose-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-[#050917] border border-[#D4AF37]/30 p-10 rounded-[3rem] w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-4">Onboard Resident</h3>
            
            <input required className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <input required className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" placeholder="Create Secret Key (Password)" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-4">
              <select required className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" value={formData.roomNumber} onChange={e => setFormData({...formData, roomNumber: e.target.value})}>
                <option value="" className="bg-[#030614] text-slate-400">Select Room</option>
                {availableRooms.map(r => <option key={r} value={r} className="bg-[#030614] text-white">Room {r}</option>)}
              </select>
              
              <select className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" value={formData.roomType} onChange={e => setFormData({...formData, roomType: e.target.value})}>
                <option value="Single" className="bg-[#030614] text-white">Single</option>
                <option value="Double sharing" className="bg-[#030614] text-white">Double sharing</option>
                <option value="Triple sharing" className="bg-[#030614] text-white">Triple sharing</option>
              </select>
            </div>
            
            <input className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" placeholder="Phone Number (Optional)" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
            
            {/* Added Flex container for Cancel and Save buttons */}
            <div className="flex gap-4 mt-6">
              <button 
                type="button" 
                onClick={handleCancel}
                className="w-1/3 py-5 rounded-2xl font-bold uppercase text-xs text-slate-400 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="w-2/3 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] hover:scale-[1.02] active:scale-95 transition-all py-5 rounded-2xl font-black uppercase text-xs text-[#030614] shadow-xl"
              >
                Save Resident
              </button>
            </div>

          </form>
        </div>
      )}
    </div>
  );
};

export default ResidentList;