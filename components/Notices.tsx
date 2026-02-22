import React, { useState } from 'react';
import { User, UserRole, Notice } from '../types';

interface NoticesProps {
  user: User;
  notices: Notice[];
  onAdd: (notice: Notice) => void;
  onDelete: (id: string) => void;
}

const Notices: React.FC<NoticesProps> = ({ user, notices, onAdd, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const isAdmin = user.role === UserRole.ADMIN;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice = {
      id: 'not-' + Math.random().toString(36).substr(2, 9),
      title: formData.title,
      content: formData.content,
      author: user.name,
      createdAt: new Date().toISOString()
    };
    onAdd(newNotice as Notice);
    setIsModalOpen(false);
    setFormData({ title: '', content: '' });
  };

  return (
    <div className="space-y-10 p-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tight">Notice Board</h2>
          <p className="text-slate-500 mt-2">Official announcements and updates.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#D4AF37] hover:bg-[#E5C07B] text-black px-8 py-3 rounded-2xl font-bold uppercase text-[10px] transition-colors"
          >
            Draft Announcement
          </button>
        )}
      </div>

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.length === 0 ? (
          <p className="text-slate-500 italic col-span-2">No active announcements.</p>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative group hover:border-[#D4AF37]/30 transition-all">
              {isAdmin && (
                <button 
                  onClick={() => onDelete(notice.id)}
                  className="absolute top-6 right-6 text-slate-500 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Notice"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2">
                {new Date(notice.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
              <h3 className="text-xl font-bold text-white mb-3">{notice.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{notice.content}</p>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                  {notice.author.charAt(0)}
                </div>
                <p className="text-xs text-slate-500">Posted by <span className="text-slate-300">{notice.author}</span></p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Admin Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="bg-[#050917] border border-[#D4AF37]/30 p-10 rounded-[3rem] w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-white text-xl font-bold mb-4">Publish Announcement</h3>
            
            <input 
              required 
              className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all" 
              placeholder="Notice Title" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
            />
            
            <textarea 
              required 
              rows={5}
              className="w-full bg-[#0A0F1D] border border-white/10 focus:border-[#D4AF37]/50 p-4 rounded-2xl text-white outline-none transition-all resize-none" 
              placeholder="Announcement Details..." 
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
            />
            
            <div className="flex gap-4 mt-6">
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="w-1/3 py-5 rounded-2xl font-bold uppercase text-xs text-slate-400 border border-white/10 hover:bg-white/5 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="w-2/3 bg-gradient-to-r from-[#D4AF37] to-[#AA771C] hover:scale-[1.02] active:scale-95 transition-all py-5 rounded-2xl font-black uppercase text-xs text-[#030614] shadow-xl"
              >
                Publish Notice
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Notices;