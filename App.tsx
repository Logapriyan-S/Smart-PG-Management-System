import React, { useState, useEffect } from 'react';
import { User, UserRole, Complaint, Notice, WeeklyMenu } from './types.ts';
import Auth from './components/Auth.tsx';
import Dashboard from './components/Dashboard.tsx';
import Complaints from './components/Complaints.tsx';
import Notices from './components/Notices.tsx';
import Chatbot from './components/Chatbot.tsx';
import Layout from './components/Layout.tsx';
import ResidentList from './components/ResidentList.tsx';
import FoodMenu from './components/FoodMenu.tsx';
import Profile from './components/Profile.tsx';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'complaints' | 'notices' | 'chat' | 'residents' | 'food' | 'profile'>('dashboard');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [residents, setResidents] = useState<User[]>([]);
  const [foodMenu, setFoodMenu] = useState<WeeklyMenu | null>(null);
  const [loading, setLoading] = useState(true);

  const TOTAL_ROOMS = 50;

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('pg_user');
        if (storedUser) setCurrentUser(JSON.parse(storedUser));

        const [complaintsRes, noticesRes, residentsRes, menuRes] = await Promise.all([
          fetch('/api/complaints'),
          fetch('/api/notices'),
          fetch('/api/residents'),
          fetch('/api/menu')
        ]);

        setComplaints(await complaintsRes.json());
        setNotices(await noticesRes.json());
        setResidents(await residentsRes.json());
        setFoodMenu(await menuRes.json());
      } catch (err) {
        console.error("Failed to fetch data from Flask:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('pg_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pg_user');
    setActiveTab('dashboard');
  };

  const updateProfile = async (updatedUser: User) => {
    try {
      const res = await fetch(`/api/user/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      const data = await res.json();
      setCurrentUser(data);
      localStorage.setItem('pg_user', JSON.stringify(data));
      setResidents(prev => prev.map(r => (r.id === data.id ? data : r)));
    } catch (err) {
      alert("Update failed!");
    }
  };

  const updateFoodMenu = async (newMenu: WeeklyMenu) => {
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMenu)
      });
      setFoodMenu(await res.json());
    } catch (err) {
      alert("Failed to update menu.");
    }
  };

  const addComplaint = async (complaint: Complaint) => {
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(complaint)
      });
      setComplaints(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const addNotice = async (notice: Notice) => {
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notice)
      });
      setNotices(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Resident Handlers ----------------
  const handleAddResident = async (resident: User) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resident)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to add resident');
        return;
      }
      setResidents(prev => [data, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateRent = async (id: string, isPaid: boolean) => {
    try {
      const resident = residents.find(r => r.id === id);
      if (!resident) return;
      const res = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRentPaid: isPaid })
      });
      const data = await res.json();
      setResidents(prev => prev.map(r => (r.id === id ? data : r)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteResident = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this resident?')) return;
    try {
      // Remove resident in backend
      const updatedResidents = residents.filter(r => r.id !== id);
      await fetch('/api/residents', {  // Make sure your Flask API supports PUT for updating full residents list
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedResidents)
      });
      setResidents(updatedResidents);
    } catch (err) {
      console.error(err);
    }
  };

  // -----------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-bold">Waking up Smart PG Server...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return <Auth onLogin={handleLogin} />;

  return (
    <Layout
      user={currentUser}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === 'dashboard' && (
        <Dashboard
          user={currentUser}
          complaints={complaints}
          notices={notices}
          residents={residents}
          totalRooms={TOTAL_ROOMS}
          onNavigate={setActiveTab}
        />
      )}
      {activeTab === 'complaints' && (
        <Complaints
          user={currentUser}
          complaints={complaints}
          onAdd={addComplaint}
          onUpdateStatus={() => {}}
        />
      )}
      {activeTab === 'notices' && (
        <Notices
          user={currentUser}
          notices={notices}
          onAdd={addNotice}
        />
      )}
      {activeTab === 'chat' && <Chatbot />}
      {activeTab === 'food' && foodMenu && (
        <FoodMenu
          user={currentUser}
          menu={foodMenu}
          onUpdate={updateFoodMenu}
        />
      )}
      {activeTab === 'residents' && currentUser.role === UserRole.ADMIN && (
        <ResidentList
          residents={residents}
          totalRooms={TOTAL_ROOMS}
          currentUser={currentUser}
          onUpdateRent={handleUpdateRent}
          onAddResident={handleAddResident}
          onDeleteResident={handleDeleteResident}
        />
      )}
      {activeTab === 'profile' && (
        <Profile user={currentUser} onUpdate={updateProfile} />
      )}
    </Layout>
  );
};

export default App;