
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
    onUpdate({
      ...user,
      ...formData
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Residency Profile</h2>
          <p className="text-slate-500">Manage your contact details and room allocation.</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
            {user.name.charAt(0)}
          </div>
          {isEditing ? (
            <input 
              className="text-center w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-bold text-slate-900"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          ) : (
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
          )}
          <p className="text-slate-500 text-sm mb-6">{user.email}</p>
          <div className="space-y-3">
            <div className="bg-slate-50 rounded-2xl py-3 px-4 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Room Number</p>
              {isEditing ? (
                <input 
                  className="text-center w-full bg-white border border-slate-200 rounded-lg p-1 font-bold text-indigo-600"
                  placeholder="e.g. 101"
                  value={formData.roomNumber}
                  onChange={e => setFormData({...formData, roomNumber: e.target.value})}
                />
              ) : (
                <span className="text-sm font-bold text-indigo-600 uppercase">Room {user.roomNumber || 'TBD'}</span>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span>Personal Details</span>
              </div>
            </h4>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase mb-2">Phone Number</p>
                {isEditing ? (
                  <input 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                    placeholder="+91 00000 00000"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                ) : (
                  <p className="text-lg font-semibold text-slate-800">{user.phoneNumber || 'Not provided'}</p>
                )}
              </div>
              
              {!isEditing && (
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase mb-2">Residency Status</p>
                  <div className="flex items-center space-x-3">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active Resident</span>
                    <span className="text-sm text-slate-500 font-medium">Joined {user.entryDate || 'Recently'}</span>
                  </div>
                </div>
              )}
            </div>

            {isEditing && (
              <div className="mt-8 pt-6 border-t border-slate-50 flex space-x-4">
                <button 
                  onClick={handleSave}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-100"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100">
            <h4 className="font-bold mb-2">Help Desk</h4>
            <p className="text-indigo-200 text-sm mb-4 leading-relaxed">
              If you need to change your room officially or have issues with your allocation, please speak to the Warden during office hours (10 AM - 6 PM).
            </p>
            <div className="flex items-center space-x-2 text-indigo-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span className="text-xs font-bold">+91 999 000 1111</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
