import React, { useState, useEffect } from 'react';
import { User, UserRole, Complaint, Notice, WeeklyMenu, ComplaintStatus } from './types';
import Landing from './pages/Landing';
import Auth from './components/Auth';
import Layout from './components/Layout';
import ResidentList from './components/ResidentList';
import Dashboard from './components/Dashboard';
import Complaints from './components/Complaints';
import Notices from './components/Notices';
import FoodMenu from './components/FoodMenu';
import Profile from './components/Profile';

// Premium initial menu used for self-healing if the database is empty
const initialMenu: WeeklyMenu = {
  Monday: { 
    breakfast: { time: '8:00 AM', menu: 'Idly & Sambar', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop' }, 
    lunch: { time: '1:30 PM', menu: 'Rice & Veg Curry', image: 'https://images.unsplash.com/photo-1512058560366-cd2429555614?q=80&w=600&auto=format&fit=crop' }, 
    dinner: { time: '8:30 PM', menu: 'Roti & Dal', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600&auto=format&fit=crop' } 
  },
  Tuesday: { 
    breakfast: { time: '8:00 AM', menu: 'Poori Bhaji', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600&auto=format&fit=crop' }, 
    lunch: { time: '1:30 PM', menu: 'North Indian Meal', image: 'https://images.unsplash.com/photo-1512058560366-cd2429555614?q=80&w=600&auto=format&fit=crop' }, 
    dinner: { time: '8:30 PM', menu: 'Fried Rice', image: 'https://images.unsplash.com/photo-1512058560366-cd2429555614?q=80&w=600&auto=format&fit=crop' } 
  },
  Wednesday: { 
    breakfast: { time: '8:00 AM', menu: 'Dosa & Chutney', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop' }, 
    lunch: { time: '1:30 PM', menu: 'South Indian Meal', image: 'https://images.unsplash.com/photo-1512058560366-cd2429555614?q=80&w=600&auto=format&fit=crop' }, 
    dinner: { time: '8:30 PM', menu: 'Paneer Butter Masala', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop' } 
  },
  Thursday: { 
    breakfast: { time: '8:00 AM', menu: 'Poha', image: 'https://images.unsplash.com/photo-1625232757233-149f193c7847?q=80&w=600&auto=format&fit=crop' }, 
    lunch: { time: '1:30 PM', menu: 'Veg Biryani', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop' }, 
    dinner: { time: '8:30 PM', menu: 'Aloo Paratha', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600&auto=format&fit=crop' } 
  },
  Friday: { 
    breakfast: { time: '8:00 AM', menu: 'Pongal', image: 'https://images.unsplash.com/photo-1516100882582-76c9a58b3e28?q=80&w=600&auto=format&fit=crop' }, 
    lunch: { time: '1:30 PM', menu: 'North Indian Thali', image: 'https://images.unsplash.com/photo-1512058560366-cd2429555614?q=80&w=600&auto=format&fit=crop' }, 
    dinner: { time: '8:30 PM', menu: 'Poori Sabji', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=600&auto=format&fit=crop' } 
  },
  Saturday: { 
    breakfast: { time: '8:00 AM', menu: 'Bread Omelette', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop' }, 
    lunch: { time: '1:30 PM', menu: 'Lemon Rice', image: 'https://images.unsplash.com/photo-1512058560366-cd2429555614?q=80&w=600&auto=format&fit=crop' }, 
    dinner: { time: '8:30 PM', menu: 'Dosa & Chutney', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop' } 
  },
  Sunday: { 
    breakfast: { time: '8:00 AM', menu: 'Special Breakfast', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop' }, 
    lunch: { time: '1:30 PM', menu: 'Veg Biryani', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop' }, 
    dinner: { time: '8:30 PM', menu: 'Chinese Special', image: 'https://images.unsplash.com/photo-1512058560366-cd2429555614?q=80&w=600&auto=format&fit=crop' } 
  }
};

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'complaints' | 'notices' | 'residents' | 'food' | 'profile'>('dashboard');

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [residents, setResidents] = useState<User[]>([]);
  const [foodMenu, setFoodMenu] = useState<WeeklyMenu | null>(null);
  const [loading, setLoading] = useState(true);

  const TOTAL_ROOMS = 50;

  useEffect(() => {
    const storedUser = localStorage.getItem('pg_user');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    
    const fetchData = async () => {
      try {
        const [complaintsRes, noticesRes, residentsRes, menuRes] = await Promise.all([
          fetch('/api/complaints').then(res => res.ok ? res.json() : []),
          fetch('/api/notices').then(res => res.ok ? res.json() : []),
          fetch('/api/residents').then(res => res.ok ? res.json() : []),
          fetch('/api/menu').then(res => res.ok ? res.json() : {})
        ]);

        setComplaints(complaintsRes);
        setNotices(noticesRes);
        setResidents(residentsRes);
        
        // SELF-HEALING LOGIC: If database menu is empty, use initialMenu and save to backend
        if (!menuRes || !menuRes.Monday) {
          setFoodMenu(initialMenu);
          await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialMenu)
          });
        } else {
          setFoodMenu(menuRes);
        }
        
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setShowLogin(false);
    localStorage.setItem('pg_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(false);
    localStorage.removeItem('pg_user');
    setActiveTab('dashboard');
  };

  const handleAddResident = async (formData: any) => {
    const res = await fetch('/api/residents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      const newRes = await res.json();
      setResidents(prev => [...prev, newRes]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030614]">
        <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser && !showLogin) return <Landing onLoginClick={() => setShowLogin(true)} />;
  if (!currentUser && showLogin) return <Auth onLogin={handleLogin} onBack={() => setShowLogin(false)} />;

  return (
    <Layout user={currentUser} activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout}>
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
      
      {activeTab === 'residents' && (
        <ResidentList 
          residents={residents} 
          totalRooms={TOTAL_ROOMS}
          currentUser={currentUser!} 
          onAddResident={handleAddResident} 
          onUpdateRent={async (id, isPaid) => {
            const r = await fetch(`/api/user/${id}`, { 
              method: 'PUT', 
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify({isRentPaid: isPaid}) 
            });
            if (r.ok) setResidents(prev => prev.map(res => res.id === id ? {...res, isRentPaid: isPaid} : res));
          }}
          onDeleteResident={async (id) => {
            if (window.confirm("Delete resident from ledger?")) {
              await fetch(`/api/user/${id}`, { method: 'DELETE' });
              setResidents(prev => prev.filter(res => res.id !== id));
            }
          }}
        />
      )}
      
      {activeTab === 'food' && foodMenu && (
        <FoodMenu 
          user={currentUser} 
          menu={foodMenu} 
          onUpdate={async (newMenu) => {
            const res = await fetch('/api/menu', { 
              method: 'POST', 
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(newMenu) 
            });
            if (res.ok) setFoodMenu(newMenu);
          }} 
        />
      )}
      
      {activeTab === 'complaints' && (
        <Complaints 
          user={currentUser} 
          complaints={complaints} 
          onAdd={async (c) => {
            const res = await fetch('/api/complaints', { 
              method: 'POST', 
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(c) 
            });
            if (res.ok) {
              const savedComplaint = await res.json();
              setComplaints([savedComplaint, ...complaints]);
            }
          }} 
          onUpdateStatus={async (id, newStatus) => {
            const res = await fetch(`/api/complaints/${id}`, { 
              method: 'PUT', 
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify({status: newStatus}) 
            });
            if (res.ok) {
              setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus as ComplaintStatus } : c));
            }
          }} 
        />
      )}
      
      {activeTab === 'notices' && (
        <Notices 
          user={currentUser!} 
          notices={notices} 
          onAdd={async (n) => {
            const res = await fetch('/api/notices', { 
              method: 'POST', 
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(n) 
            });
            if (res.ok) {
              const savedNotice = await res.json();
              setNotices([savedNotice, ...notices]);
            }
          }} 
          onDelete={async (id) => {
            if (window.confirm("Delete this notice permanently?")) {
              await fetch(`/api/notices/${id}`, { method: 'DELETE' });
              setNotices(prev => prev.filter(n => n.id !== id));
            }
          }}
        />
      )}
      {activeTab === 'profile' && <Profile user={currentUser} onUpdate={setCurrentUser} />}
    </Layout>
  );
};

export default App;
