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
    { id: 'food', label: 'Food Menu', icon: 'M12 6.253v13' }
  ];

  if (user.role === UserRole.ADMIN) {
    navItems.push({ id: 'residents', label: 'Residents', icon: 'M17 20h5v-2' });
  } else {
    navItems.push({ id: 'profile', label: 'My Profile', icon: 'M16 7a4 4 0 11-8 0' });
  }

  navItems.push(
    { id: 'complaints', label: 'Complaints', icon: 'M12 9v2m0 4h.01' },
    { id: 'notices', label: 'Notice Board', icon: 'M11 5H6a2 2 0 00-2 2' },
    { id: 'chat', label: 'AI Assistant', icon: 'M8 10h.01M12 10h.01' }
  );

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">

      {/* ========== MOBILE HEADER ========== */}
      <div className="md:hidden bg-white border-b border-stone-200 px-4 py-3 flex justify-between items-center sticky top-0 z-20">

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-bold text-stone-800">Smart PG</span>
        </div>

        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-stone-600">
          ☰
        </button>
      </div>


      {/* ========== SIDEBAR ========== */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-stone-200 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static transition-transform duration-300`}
      >
        <div className="flex flex-col h-full">

          {/* Logo */}
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center text-white shadow">
                🏠
              </div>
              <h1 className="text-lg font-bold text-stone-800">Smart PG</h1>
            </div>

            {/* Nav */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                    activeTab === item.id
                      ? 'bg-amber-50 text-amber-700 font-semibold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>


          {/* ========== FOOTER USER INFO ========== */}
          <div className="mt-auto p-6 border-t border-stone-200 bg-stone-50">

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 font-bold uppercase">
                {user.name.charAt(0)}
              </div>

              <div>
                <p className="text-sm font-semibold text-stone-800">{user.name}</p>
                <p className="text-xs text-stone-500">{user.role}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-2 rounded-xl font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>


      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
