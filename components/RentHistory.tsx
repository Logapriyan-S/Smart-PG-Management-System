
import React from 'react';
import { User } from '../types';

interface RentHistoryProps {
  user: User;
}

const RentHistory: React.FC<RentHistoryProps> = ({ user }) => {
  const months = user.paidMonths || [];

  return (
    <div className="max-w-3xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Rent History</h2>
        <p className="text-slate-500">View your verified payment records maintained by the administrator.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">Monthly Rent Amount</p>
            <h3 className="text-3xl font-bold text-white">10,000 INR</h3>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold text-slate-800">Payment Ledger</h4>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
              {months.length} Months Paid
            </span>
          </div>

          {months.length > 0 ? (
            <div className="space-y-4">
              {months.map((month, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{month}</p>
                      <p className="text-xs text-slate-400">Verified Receipt • 10,000 INR</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-600 uppercase">Paid</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-slate-500">No payment history found.</p>
              <p className="text-xs text-slate-400 mt-1">Please contact the admin if this is an error.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-100">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h5 className="font-bold text-amber-800 text-sm">Note for Residents</h5>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              Payments are recorded manually by the office. If you have made a payment and it is not reflecting here within 24 hours, please present your transaction reference to the PG Warden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentHistory;
