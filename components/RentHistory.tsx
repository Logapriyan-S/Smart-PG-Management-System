import React from 'react';
import { User } from '../types';

interface RentHistoryProps {
  user: User;
}

const RentHistory: React.FC<RentHistoryProps> = ({ user }) => {
  const months = user.paidMonths || [];

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-10 relative z-10">
        <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Financial Records</p>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">Rent Archive</h2>
        <p className="text-slate-500 font-light mt-2">Verified payment history maintained by the residency concierge.</p>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative z-10">
        {/* Premium Header Ribbon */}
        <div className="p-10 bg-gradient-to-br from-[#0A0F1D] to-[#030614] border-b border-white/5 flex justify-between items-center">
          <div>
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Standard Monthly Commitment</p>
            <h3 className="text-4xl font-extrabold text-white tracking-tighter">
              ₹10,000 <span className="text-lg font-light text-slate-500 ml-1">INR</span>
            </h3>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] shadow-inner">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>

        <div className="p-10">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Validated Ledger</h4>
            <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {months.length} Cycles Settled
            </span>
          </div>

          {months.length > 0 ? (
            <div className="grid gap-6">
              {months.map((month, idx) => (
                <div key={idx} className="group flex items-center justify-between p-6 bg-white/[0.03] rounded-[1.5rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500">
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#E5C07B] to-[#AA771C] rounded-xl flex items-center justify-center text-[#030614] shadow-lg group-hover:shadow-[#D4AF37]/20 transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg tracking-tight">{month}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Verified Audit Receipt • ₹10,000</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter italic">Secured</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.01] rounded-[2rem] border border-white/5 border-dashed">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-400 font-light text-sm">No transaction history detected in the vault.</p>
              <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest mt-3">Contact Administration for Audit</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer Advisory */}
      <div className="mt-10 p-8 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-[2rem] border border-[#D4AF37]/20 relative z-10">
        <div className="flex items-start space-x-5">
          <div className="p-3 bg-[#D4AF37]/20 rounded-2xl text-[#D4AF37] border border-[#D4AF37]/20">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h5 className="font-bold text-white text-sm tracking-wide">Financial Disclosure</h5>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-light">
              Payment records are synchronized manually by the residency office. Discrepancies between physical receipts and digital archives should be reported to the <span className="text-[#D4AF37] font-bold">PG Warden</span> within 48 hours of transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentHistory;