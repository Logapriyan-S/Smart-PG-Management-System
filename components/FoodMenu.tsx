import React, { useState, useEffect } from 'react';
import { User, UserRole, WeeklyMenu } from '../types';

interface FoodMenuProps {
  user: User;
  menu: WeeklyMenu;
  onUpdate: (newMenu: WeeklyMenu) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['breakfast', 'lunch', 'dinner'] as const;

const FoodMenu: React.FC<FoodMenuProps> = ({ user, menu, onUpdate }) => {
  const isAdmin = user.role === UserRole.ADMIN;
  const [activeDay, setActiveDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  
  // Local state to hold the Admin's edits before saving
  const [editableMenu, setEditableMenu] = useState<WeeklyMenu>(menu);
  const [isSaving, setIsSaving] = useState(false);

  // Keep local state in sync if the database updates
  useEffect(() => {
    setEditableMenu(menu);
  }, [menu]);

  const handleEdit = (day: string, meal: string, field: 'menu' | 'time' | 'image', value: string) => {
    setEditableMenu(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof WeeklyMenu],
        [meal]: {
          ...prev[day as keyof WeeklyMenu][meal as 'breakfast' | 'lunch' | 'dinner'],
          [field]: value
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(editableMenu); // Sends the updated menu to App.tsx -> Backend
    setIsSaving(false);
    alert('Menu successfully updated for all residents.');
  };

  const currentDayMenu = isAdmin ? editableMenu[activeDay as keyof WeeklyMenu] : menu[activeDay as keyof WeeklyMenu];

  return (
    <div className="space-y-10 p-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Culinary Experience</p>
          <h2 className="text-4xl font-extrabold text-white tracking-tight">Weekly Menu</h2>
          <p className="text-slate-500 font-light mt-2">
            {isAdmin ? 'Manage the culinary schedule for all residents.' : 'Discover this week’s gourmet selections.'}
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-[#030614] px-8 py-3.5 rounded-2xl font-bold tracking-widest uppercase text-[10px] shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSaving ? 'Synchronizing...' : 'Publish Menu to Residents'}
          </button>
        )}
      </div>

      {/* Day Selector */}
      <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar">
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] whitespace-nowrap transition-all ${
              activeDay === day 
              ? 'bg-[#D4AF37] text-[#030614] shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {MEALS.map((mealType) => {
          const mealData = currentDayMenu[mealType];
          
          return (
            <div key={mealType} className="bg-[#050917] rounded-[2.5rem] border border-white/5 overflow-hidden group hover:border-[#D4AF37]/30 transition-all shadow-2xl">
              {/* Image Section */}
              <div className="h-48 relative overflow-hidden bg-[#0A0F1D]">
                <img 
                  src={mealData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop'} 
                  alt={mealData.menu}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050917] to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <p className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-[10px] mb-1">{mealType}</p>
                </div>
              </div>

              {/* Data Section */}
              <div className="p-6 space-y-4">
                {isAdmin ? (
                  // ADMIN VIEW: Editable Inputs
                  <div className="space-y-4">
                     <div>
                      <label className="text-[9px] text-slate-500 uppercase tracking-widest ml-1">Menu Item</label>
                      <input 
                        type="text"
                        value={mealData.menu}
                        onChange={(e) => handleEdit(activeDay, mealType, 'menu', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-[#D4AF37]/50 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase tracking-widest ml-1">Timing</label>
                      <input 
                        type="text"
                        value={mealData.time}
                        onChange={(e) => handleEdit(activeDay, mealType, 'time', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-slate-300 text-xs outline-none focus:border-[#D4AF37]/50 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] text-slate-500 uppercase tracking-widest ml-1">Image URL</label>
                      <input 
                        type="text"
                        value={mealData.image}
                        onChange={(e) => handleEdit(activeDay, mealType, 'image', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-slate-400 text-xs outline-none focus:border-[#D4AF37]/50 mt-1"
                        placeholder="Paste image link here"
                      />
                    </div>
                  </div>
                ) : (
                  // RESIDENT VIEW: Read-Only Display
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{mealData.menu}</h3>
                    <div className="flex items-center text-slate-400 text-xs space-x-2">
                      <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{mealData.time}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodMenu;