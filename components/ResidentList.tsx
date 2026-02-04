import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface ResidentListProps {
  residents: User[];
  totalRooms: number;
  currentUser: User;
  onUpdateRent: (id: string, isPaid: boolean) => void;
  onAddResident: (resident: User) => void;
  onDeleteResident: (id: string) => void;
}

const ResidentList: React.FC<ResidentListProps> = ({
  residents = [], // Default to empty array
  totalRooms = 0,
  currentUser,
  onUpdateRent,
  onAddResident,
  onDeleteResident
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    roomNumber: '',
    entryDate: new Date().toISOString().split('T')[0],
    exitDate: ''
  });

  // Safety check
  if (!currentUser) {
    return <div className="p-6 text-red-600">Error: No user logged in</div>;
  }

  const occupiedRoomNumbers = residents.map(r => r.roomNumber);
  const availableRooms = Array.from({ length: totalRooms }, (_, i) => (101 + i).toString())
    .filter(room => !occupiedRoomNumbers.includes(room));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newResident: User = {
      id: 'res-' + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      role: UserRole.RESIDENT,
      roomNumber: formData.roomNumber,
      entryDate: formData.entryDate,
      exitDate: formData.exitDate,
      isRentPaid: false
    };
    onAddResident(newResident);
    setIsModalOpen(false);
    setFormData({ 
      name: '', 
      email: '', 
      phoneNumber: '', 
      roomNumber: '', 
      entryDate: new Date().toISOString().split('T')[0], 
      exitDate: '' 
    });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Resident Directory</h2>
          <p className="text-slate-500">Manage room assignments and rent tracking.</p>
        </div>
        {currentUser.role === UserRole.ADMIN && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all flex items-center space-x-2"
          >
            Add Resident
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Resident</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Room</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Residency</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Rent</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {residents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No residents found. Add your first resident to get started.
                </td>
              </tr>
            ) : (
              residents.map(resident => (
                <tr key={resident.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {resident.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{resident.name}</p>
                        <p className="text-xs text-slate-500">{resident.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{resident.phoneNumber || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono">Room {resident.roomNumber}</td>
                  <td className="px-6 py-4 text-xs text-slate-600">
                    <div>Entry: {resident.entryDate}</div>
                    <div className="mt-1">Exit: {resident.exitDate || 'Open'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      resident.isRentPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {resident.isRentPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {currentUser.role === UserRole.ADMIN && (
                        <>
                          <button 
                            onClick={() => onUpdateRent(resident.id, !resident.isRentPaid)}
                            className="text-xs text-indigo-600 font-bold hover:underline"
                          >
                            Mark {resident.isRentPaid ? 'Unpaid' : 'Paid'}
                          </button>
                          <button
                            onClick={() => onDeleteResident(resident.id)}
                            className="text-xs text-red-600 font-bold hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Resident Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="p-8 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Allocate Room</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input 
                    required 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input 
                    required 
                    type="email" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  value={formData.phoneNumber} 
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Empty Room</label>
                <select 
                  required 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  value={formData.roomNumber} 
                  onChange={e => setFormData({...formData, roomNumber: e.target.value})}
                >
                  <option value="">Choose a room...</option>
                  {availableRooms.map(room => <option key={room} value={room}>Room {room}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Entry Date</label>
                  <input 
                    required 
                    type="date" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    value={formData.entryDate} 
                    onChange={e => setFormData({...formData, entryDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Target Exit Date</label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                    value={formData.exitDate} 
                    onChange={e => setFormData({...formData, exitDate: e.target.value})}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                Save Resident
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentList;