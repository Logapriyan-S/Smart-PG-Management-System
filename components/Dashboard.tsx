import React from 'react';
import { User, UserRole, Complaint, Notice, ComplaintStatus } from '../types';

interface DashboardProps {
  user: User;
  complaints: Complaint[];
  notices: Notice[];
  residents: User[];
  totalRooms: number;
  onNavigate: (tab: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  complaints,
  notices,
  residents,
  totalRooms,
  onNavigate
}) => {
  const isAdmin = user.role === UserRole.ADMIN;

  const occupiedRooms = residents.length;

  /* ================= THEMED STATS ================= */
  const stats = isAdmin
    ? [
        { label: 'Occupied Rooms', value: `${occupiedRooms}/${totalRooms}`, color: 'bg-amber-700' },
        { label: 'Residents', value: residents.length, color: 'bg-green-600' },
        { label: 'Active Issues', value: complaints.filter(c => c.status !== ComplaintStatus.RESOLVED).length, color: 'bg-red-600' },
        { label: 'Notices', value: notices.length, color: 'bg-stone-700' }
      ]
    : [
        { label: 'Room', value: user.roomNumber || 'Pending', color: 'bg-amber-700' },
        { label: 'Meal', value: 'Veg', color: 'bg-green-600' },
        { label: 'Status', value: 'Healthy', color: 'bg-stone-700' },
        { label: 'Notices', value: notices.length, color: 'bg-amber-600' }
      ];

  return (
    <div className="space-y-8 bg-stone-100 min-h-screen p-6">

      {/* ================= HEADER ================= */}
      <header>
        <h2 className="text-2xl font-bold text-stone-800">
          Hello, {user.name} 👋
        </h2>
        <p className="text-stone-500">
          {isAdmin ? 'Managing Smart PG Operations' : 'Welcome to your home.'}
        </p>
      </header>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow"
          >
            <div
              className={`w-10 h-10 ${stat.color} rounded-lg mb-3`}
            />
            <p className="text-sm text-stone-500">{stat.label}</p>
            <h3 className="text-xl font-bold text-stone-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow overflow-hidden">

          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h3 className="font-bold text-stone-800">
              {isAdmin ? 'Issues' : 'Notices'}
            </h3>

            <button
              onClick={() => onNavigate(isAdmin ? 'complaints' : 'notices')}
              className="text-amber-700 font-semibold text-sm"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {(isAdmin ? complaints : notices)
              .slice(0, 4)
              .map((item: any) => (
                <div key={item.id} className="p-5 hover:bg-stone-50">
                  <p className="font-semibold text-stone-800">
                    {isAdmin ? item.type : item.title}
                  </p>
                  <p className="text-xs text-stone-500">
                    {isAdmin ? item.status : item.content}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* ================= MESSENGER CARD ================= */}
        <div className="bg-stone-800 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl">

          <div>
            <h3 className="text-lg font-bold mb-3">PG Assistant</h3>
            <p className="text-stone-300 text-sm">
              Ask anything about rooms, food, or facilities.
            </p>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="mt-6 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold"
          >
            Chat Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
