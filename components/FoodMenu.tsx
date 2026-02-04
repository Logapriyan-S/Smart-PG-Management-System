
import React, { useState } from 'react';
import { User, UserRole, WeeklyMenu, DayMenu } from '../types';

interface FoodMenuProps {
  user: User;
  menu: WeeklyMenu;
  onUpdate: (menu: WeeklyMenu) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const FoodMenu: React.FC<FoodMenuProps> = ({ user, menu, onUpdate }) => {
  const isAdmin = user.role === UserRole.ADMIN;
  const [selectedDay, setSelectedDay] = useState<string>(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMenu, setEditMenu] = useState<WeeklyMenu>(menu);

  const handleUpdate = () => {
    onUpdate(editMenu);
    setIsEditing(false);
  };

  const currentDayMenu = isEditing ? editMenu[selectedDay] : menu[selectedDay];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Weekly Food Menu</h2>
          <p className="text-slate-500">Delicious meals scheduled for the community.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => {
              if (isEditing) handleUpdate();
              else {
                setEditMenu(menu);
                setIsEditing(true);
              }
            }}
            className={`px-6 py-2.5 rounded-xl font-bold shadow-lg transition-all ${
              isEditing 
              ? 'bg-emerald-600 text-white shadow-emerald-100' 
              : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'
            }`}
          >
            {isEditing ? 'Save All Changes' : 'Manage Menu'}
          </button>
        )}
      </div>

      {/* Day Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              selectedDay === day 
              ? 'bg-slate-900 text-white' 
              : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-100'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Breakfast */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          </div>
          <div className="mb-6">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full">Breakfast</span>
            {isEditing ? (
              <input 
                className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm text-slate-500 font-bold"
                value={editMenu[selectedDay].breakfast.time}
                onChange={e => setEditMenu({
                  ...editMenu,
                  [selectedDay]: {
                    ...editMenu[selectedDay],
                    breakfast: { ...editMenu[selectedDay].breakfast, time: e.target.value }
                  }
                })}
              />
            ) : (
              <h4 className="text-sm font-bold text-slate-400 mt-4">{currentDayMenu.breakfast.time}</h4>
            )}
          </div>
          {isEditing ? (
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 h-24 text-sm resize-none"
              value={editMenu[selectedDay].breakfast.menu}
              onChange={e => setEditMenu({
                ...editMenu,
                [selectedDay]: {
                  ...editMenu[selectedDay],
                  breakfast: { ...editMenu[selectedDay].breakfast, menu: e.target.value }
                }
              })}
            />
          ) : (
            <p className="text-lg font-bold text-slate-900 leading-relaxed">{currentDayMenu.breakfast.menu}</p>
          )}
        </div>

        {/* Lunch */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-indigo-600">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/></svg>
          </div>
          <div className="mb-6">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Lunch</span>
            {isEditing ? (
              <input 
                className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm text-slate-500 font-bold"
                value={editMenu[selectedDay].lunch.time}
                onChange={e => setEditMenu({
                  ...editMenu,
                  [selectedDay]: {
                    ...editMenu[selectedDay],
                    lunch: { ...editMenu[selectedDay].lunch, time: e.target.value }
                  }
                })}
              />
            ) : (
              <h4 className="text-sm font-bold text-slate-400 mt-4">{currentDayMenu.lunch.time}</h4>
            )}
          </div>
          {isEditing ? (
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 h-24 text-sm resize-none"
              value={editMenu[selectedDay].lunch.menu}
              onChange={e => setEditMenu({
                ...editMenu,
                [selectedDay]: {
                  ...editMenu[selectedDay],
                  lunch: { ...editMenu[selectedDay].lunch, menu: e.target.value }
                }
              })}
            />
          ) : (
            <p className="text-lg font-bold text-slate-900 leading-relaxed">{currentDayMenu.lunch.menu}</p>
          )}
        </div>

        {/* Dinner */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-rose-600">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/></svg>
          </div>
          <div className="mb-6">
            <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full">Dinner</span>
            {isEditing ? (
              <input 
                className="mt-4 w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-sm text-slate-500 font-bold"
                value={editMenu[selectedDay].dinner.time}
                onChange={e => setEditMenu({
                  ...editMenu,
                  [selectedDay]: {
                    ...editMenu[selectedDay],
                    dinner: { ...editMenu[selectedDay].dinner, time: e.target.value }
                  }
                })}
              />
            ) : (
              <h4 className="text-sm font-bold text-slate-400 mt-4">{currentDayMenu.dinner.time}</h4>
            )}
          </div>
          {isEditing ? (
            <textarea 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 h-24 text-sm resize-none"
              value={editMenu[selectedDay].dinner.menu}
              onChange={e => setEditMenu({
                ...editMenu,
                [selectedDay]: {
                  ...editMenu[selectedDay],
                  dinner: { ...editMenu[selectedDay].dinner, menu: e.target.value }
                }
              })}
            />
          ) : (
            <p className="text-lg font-bold text-slate-900 leading-relaxed">{currentDayMenu.dinner.menu}</p>
          )}
        </div>
      </div>

      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
        <div className="flex items-center space-x-3 text-amber-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-sm font-bold italic">Mess Rules: Please inform the mess manager 4 hours in advance if you will skip a meal to avoid food waste.</span>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
