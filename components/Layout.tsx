import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LayoutProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: any) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  user,
  activeTab,
  onTabChange,
  onLogout,
  children
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'food', label: 'Food Menu', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
  ];

  if (user.role === UserRole.ADMIN) {
    navItems.push({ id: 'residents', label: 'Resident Ledger', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' });
  } else {
    navItems.push({ id: 'profile', label: 'My Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' });
  }

  navItems.push(
    { id: 'complaints', label: 'Complaints', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { id: 'notices', label: 'Notice Board', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.167H3.3a1.598 1.598 0 01-1.3-2.42l2.392-4.102a1.598 1.598 0 011.3-.703h3.424z' }
  );

  return (
    <div className="min-h-screen bg-[#030614] flex flex-col md:flex-row font-sans selection:bg-[#D4AF37] selection:text-[#030614]">

      {/* ========== MOBILE HEADER ========== */}
      <div className="md:hidden bg-[#070B1A]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#AA771C] rounded-lg flex items-center justify-center text-[#030614] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            B
          </div>
          <span className="font-bold tracking-[0.2em] text-white uppercase text-xs">Balaji PG</span>
        </div>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#D4AF37] p-2">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* ========== SIDEBAR ========== */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#050917] border-r border-white/5 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static transition-transform duration-500 ease-in-out`}
      >
        <div className="flex flex-col h-full">

          {/* Logo Section */}
          <div className="p-8 border-b border-white/[0.03]">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E5C07B] to-[#AA771C] rounded-xl flex items-center justify-center text-[#030614] shadow-lg shadow-amber-500/20">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                </svg>
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-[0.3em] text-white uppercase leading-none">Balaji</h1>
                <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-light">Residences</span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-grow p-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                  activeTab === item.id
                    ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]'
                    : 'text-slate-500 hover:text-white hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 w-1 h-6 bg-[#D4AF37] rounded-r-full" />
                )}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'bg-[#D4AF37] text-[#030614] shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                    : 'bg-white/5 text-slate-400 group-hover:text-[#D4AF37]'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* ========== FOOTER USER INFO ========== */}
          <div className="mt-auto p-8 border-t border-white/[0.03] bg-[#070B1A]/30">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-white font-bold uppercase shadow-inner">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#070B1A] rounded-full"></div>
              </div>

              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-[9px] tracking-widest text-[#D4AF37] uppercase font-bold">{user.role}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full bg-white/[0.03] hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 text-xs font-bold tracking-[0.2em] text-red-400/70 hover:text-red-400 py-4 rounded-2xl transition-all duration-300 uppercase active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* ========== OVERLAY FOR MOBILE ========== */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 min-h-screen overflow-y-auto relative">
        {/* Subtle background glow for all pages */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/[0.02] rounded-full blur-[150px] pointer-events-none -z-10" />
        
        <div className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
