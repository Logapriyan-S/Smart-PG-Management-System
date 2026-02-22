import React from 'react';
import { User, UserRole, Complaint, Notice, ComplaintStatus } from '../types';

interface DashboardProps {
  user?: User | null;
  complaints: Complaint[];
  notices: Notice[];
  residents: User[];
  totalRooms: number;
  onNavigate: (tab: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  complaints = [],
  notices = [],
  residents = [],
  totalRooms = 50,
  onNavigate
}) => {
  if (!user) return null;

  const isAdmin = user.role === UserRole.ADMIN;
  const occupiedRooms = residents.length;

  const stats = isAdmin
    ? [
        { label: 'Occupied Rooms', value: `${occupiedRooms}/${totalRooms}`, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        { label: 'Total Residents', value: residents.length, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197' },
        { label: 'Active Issues', value: complaints.filter(c => c.status !== ComplaintStatus.RESOLVED).length, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        { label: 'Notice Board', value: notices.length, icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.167H3.3a1.598 1.598 0 01-1.3-2.42l2.392-4.102a1.598 1.598 0 011.3-.703h3.424z' }
      ]
    : [
        { label: 'Assigned Room', value: user.roomNumber || 'Pending', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { label: 'Meal Preference', value: 'Veg/Non-Veg', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0-3.332.477-4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { label: 'Stay Status', value: 'Active', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
        { label: 'Unread Notices', value: notices.length, icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' }
      ];

  return (
    // FIX 1: Changed padding to 'pt-0 md:pt-2' to eliminate the massive gap at the top
    <div className="space-y-8 bg-[#030614] min-h-screen px-6 pb-8 md:px-8 md:pb-8 -mt-8 md:-mt-12 relative overflow-hidden text-slate-300">
      {/* Background Silk Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= HEADER ================= */}
      <header className="relative z-10">
        <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">Resident Overview</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Hello, {user.name}
        </h2>
        <p className="text-slate-400 font-light mt-2 text-sm md:text-base">
          {isAdmin ? 'Operational Command Center • Sri Sai Balaji' : 'Welcome to your premium residence.'}
        </p>
      </header>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/[0.02] backdrop-blur-xl p-6 rounded-[1.5rem] border border-white/[0.05] hover:border-[#D4AF37]/40 transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
               <div className="w-10 h-10 bg-[#0A0F1D] rounded-xl flex items-center justify-center border border-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                 </svg>
               </div>
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

        {/* LEFT PANEL: FEED */}
        <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-xl rounded-[2rem] border border-white/[0.05] overflow-hidden flex flex-col h-full">
          <div className="p-6 md:p-8 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
            <h3 className="font-bold text-white tracking-widest uppercase text-xs">
              {isAdmin ? 'Recent Support Requests' : 'Official Announcements'}
            </h3>
            <button
              onClick={() => onNavigate(isAdmin ? 'complaints' : 'notices')}
              className="text-[#D4AF37] font-bold text-[10px] tracking-widest uppercase hover:text-white transition-colors"
            >
              View Full Archive
            </button>
          </div>

          <div className="divide-y divide-white/[0.05] flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
            {(isAdmin ? complaints : notices).length === 0 ? (
               <div className="p-8 text-center text-slate-500 text-sm italic">Nothing to show right now.</div>
            ) : (
              (isAdmin ? complaints : notices)
                .slice(0, 4)
                .map((item: any) => (
                  <div key={item.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-base font-bold text-slate-100 group-hover:text-[#D4AF37] transition-colors mb-2">
                          {isAdmin ? item.type : item.title}
                        </p>
                        {/* FIX 2: Removed line-clamp restriction and added whitespace-pre-wrap to show full text clearly */}
                        <p className="text-sm text-slate-400 font-light leading-relaxed whitespace-pre-wrap">
                          {isAdmin ? item.status : item.content}
                        </p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-[#D4AF37]/50 mt-2 shadow-[0_0_8px_rgba(212,175,55,0.4)] flex-shrink-0" />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* RIGHT PANEL: QUICK ACTIONS */}
        <div className="bg-gradient-to-b from-[#0A0F1D] to-[#050917] rounded-[2rem] p-8 border border-[#D4AF37]/20 flex flex-col justify-between shadow-2xl relative overflow-hidden group h-full">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E5C07B] to-[#AA771C] flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
               <svg className="w-6 h-6 text-[#030614]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
               </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">Quick Actions</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Use the complaints and notice sections to report issues and stay updated with PG announcements.
            </p>
          </div>

          <button
            onClick={() => onNavigate('complaints')}
            className="mt-8 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] hover:scale-[1.02] active:scale-95 text-[#030614] py-4 rounded-xl font-bold tracking-[0.15em] uppercase text-[10px] transition-all w-full shadow-lg"
          >
            Open Complaints
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


