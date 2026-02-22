import React, { useState } from 'react';
import { UserRole } from '../types';

interface AuthProps {
  onLogin: (user: any) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.RESIDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sending credentials to your Flask backend
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login! Pass the user data to App.tsx
        onLogin(data);
      } else {
        // Show the error from the backend (e.g., "Invalid credentials")
        setError(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Cannot connect to the server. Ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030614] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      {/* golden glitter particles */}
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="absolute bg-[#D4AF37] rounded-full w-1 h-1 opacity-0 animate-ping"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      {/* decorative side panels */}
      <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-[#D4AF37]/30 via-transparent to-[#D4AF37]/30 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-b from-[#D4AF37]/30 via-transparent to-[#D4AF37]/30 pointer-events-none" />

      <button 
        onClick={onBack}
        className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center space-x-2 transition-colors z-20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-xs font-bold tracking-widest uppercase">Return</span>
      </button>

      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-xl border border-white/5 p-10 rounded-[3rem] shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#AA771C] rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <svg className="w-8 h-8 text-[#030614]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">Secure Portal</h2>
          <p className="text-slate-500 text-sm">Enter your credentials to access your suite.</p>
        </div>

        {/* Role Selection Toggle */}
        <div className="flex bg-[#0A0F1D] p-1 rounded-xl mb-8 border border-white/5">
          <button
            type="button"
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              role === UserRole.RESIDENT ? 'bg-[#D4AF37] text-[#030614] shadow-lg' : 'text-slate-500 hover:text-white'
            }`}
            onClick={() => setRole(UserRole.RESIDENT)}
          >
            Resident
          </button>
          <button
            type="button"
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              role === UserRole.ADMIN ? 'bg-[#D4AF37] text-[#030614] shadow-lg' : 'text-slate-500 hover:text-white'
            }`}
            onClick={() => setRole(UserRole.ADMIN)}
          >
            Management
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 ml-1">Email Identity</label>
            <input
              type="email"
              required
              className="w-full bg-[#0A0F1D] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-colors"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-2 ml-1">Security Key</label>
            <input
              type="password"
              required
              className="w-full bg-[#0A0F1D] border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-colors"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-[#030614] py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] active:scale-95 transition-all mt-4 disabled:opacity-70"
          >
            {isLoading ? 'Authenticating...' : 'Authorize Access'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;