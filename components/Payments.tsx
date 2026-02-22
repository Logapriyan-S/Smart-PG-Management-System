import React, { useState } from 'react';
import { User } from '../types';

interface PaymentsProps {
  user: User;
  onPay: () => void;
}

const Payments: React.FC<PaymentsProps> = ({ user, onPay }) => {
  const [processing, setProcessing] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      onPay();
      setProcessing(false);
      // Premium notification logic would go here
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-64 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-10 relative z-10 text-center md:text-left">
        <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Financial Overview</p>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Residency Dues</h2>
        <p className="text-slate-500 font-light mt-2">Securely manage your premium suite transactions.</p>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative z-10">
        {/* Header Ribbon */}
        <div className="p-10 bg-gradient-to-br from-[#0A0F1D] to-[#030614] border-b border-white/5 flex justify-between items-center">
          <div>
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Total Outstanding</p>
            <h3 className="text-4xl font-extrabold text-white tracking-tighter">
              ₹10,000 <span className="text-lg font-light text-slate-500 ml-1">INR</span>
            </h3>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E5C07B] to-[#AA771C] flex items-center justify-center shadow-lg shadow-amber-500/20 text-[#030614]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
        </div>

        <div className="p-10 space-y-8">
          <div className="flex justify-between items-center py-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Resident Identity</span>
            <span className="text-sm font-medium text-slate-200">{user.name}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Suite Allocation</span>
            <span className="text-sm font-medium text-[#D4AF37]">Suite {user.roomNumber}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Settlement Status</span>
            <div className="flex items-center space-x-2">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${user.isRentPaid ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span className={`text-[10px] font-black tracking-tighter uppercase ${user.isRentPaid ? 'text-emerald-400' : 'text-rose-400'}`}>
                {user.isRentPaid ? 'Validated & Cleared' : 'Action Required'}
                </span>
            </div>
          </div>

          <div className="pt-6">
            {!user.isRentPaid ? (
              <div className="space-y-6">
                <button 
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-[#030614] py-5 rounded-2xl font-bold tracking-[0.2em] uppercase text-xs shadow-2xl hover:shadow-[#D4AF37]/20 transition-all active:scale-95 flex items-center justify-center space-x-3"
                >
                  {processing ? (
                    <div className="w-5 h-5 border-2 border-[#030614]/30 border-t-[#030614] rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Authorize Payment</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4 4H3" />
                      </svg>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <p className="text-[9px] font-bold uppercase tracking-widest">End-to-End Encrypted Secure Gateway</p>
                </div>
              </div>
            ) : (
              <div className="py-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-full mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-emerald-400 text-xs font-bold tracking-widest uppercase">Transaction History Synchronized</p>
                <p className="text-slate-500 text-[10px] mt-2 italic font-light">No outstanding dues detected for the current cycle.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;