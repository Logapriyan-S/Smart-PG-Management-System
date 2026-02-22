import React, { useState } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    roomNumber: user.roomNumber || '',
  });

  const handleSave = () => {
    onUpdate({ ...user, ...formData });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn relative">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-10 flex justify-between items-end relative z-10">
        <div>
          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Member Identity</p>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Residency Profile</h2>
          <p className="text-slate-500 font-light mt-2">Manage your high-end living credentials.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-white/[0.03] border border-white/10 px-6 py-2.5 rounded-xl text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all active:scale-95"
          >
            Modify Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Left Side: Avatar Card */}
        <div className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/[0.05] text-center shadow-2xl group">
          <div className="relative inline-block mb-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#E5C07B] via-[#D4AF37] to-[#AA771C] p-1 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <div className="w-full h-full rounded-full bg-[#030614] flex items-center justify-center text-4xl font-extrabold text-white">
                {user.name.charAt(0)}
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-[#030614] rounded-full shadow-lg" />
          </div>

          {isEditing ? (
            <input 
              className="text-center w-full bg-white/5 border border-white/10 rounded-xl p-3 font-bold text-white outline-none focus:border-[#D4AF37]/50 transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          ) : (
            <h3 className="text-2xl font-bold text-white tracking-tight">{user.name}</h3>
          )}
          <p className="text-slate-500 text-xs font-light mt-2 mb-8">{user.email}</p>
          
          <div className="bg-[#D4AF37]/5 rounded-2xl py-4 border border-[#D4AF37]/10">
            <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-1">Allocated Suite</p>
            {isEditing ? (
              <input 
                className="text-center w-full bg-transparent font-bold text-white outline-none"
                placeholder="Suite No."
                value={formData.roomNumber}
                onChange={e => setFormData({...formData, roomNumber: e.target.value})}
              />
            ) : (
              <span className="text-lg font-bold text-white">Room {user.roomNumber || 'TBD'}</span>
            )}
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/[0.05] shadow-2xl">
            <h4 className="font-bold text-white tracking-widest uppercase text-xs mb-10 flex items-center space-x-3">
              <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span>Verified Account Details</span>
            </h4>
            
            <div className="grid grid-cols-1 gap-10">
              <div>
                <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-3">Concierge Phone Line</p>
                {isEditing ? (
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-all"
                    placeholder="+91 00000 00000"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                ) : (
                  <p className="text-xl font-medium text-slate-200">{user.phoneNumber || 'Awaiting entry...'}</p>
                )}
              </div>
              
              {!isEditing && (
                <div>
                  <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest mb-3">Membership Tenure</p>
                  <div className="flex items-center space-x-4">
                    <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">Premium Resident</span>
                    <span className="text-sm text-slate-500 font-light italic">Member since {user.entryDate || 'February 2024'}</span>
                  </div>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="mt-12 pt-8 border-t border-white/5 flex space-x-4">
                <button 
                  onClick={handleSave}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#030614] px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-amber-500/10 active:scale-95 transition-all"
                >
                  Commit Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all"
                >
                  Discard
                </button>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-[#0A0F1D] to-[#030614] p-10 rounded-[2.5rem] border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-all" />
            <h4 className="text-white font-bold text-lg mb-2 relative z-10">Administrative Assistance</h4>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-6 relative z-10">
              For official room re-allocation or key encryption issues, please schedule a meeting with the Warden during high-tea hours (10 AM - 6 PM).
            </p>
            <div className="flex items-center space-x-3 text-[#D4AF37] relative z-10">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <span className="text-sm font-bold tracking-widest">+91 999 000 1111</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;