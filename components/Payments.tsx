
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
      alert('Rent payment of 10,000 INR successful!');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Rent Payments</h2>
        <p className="text-slate-500">Manage your monthly PG dues securely.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
          <div>
            <p className="text-indigo-100 text-sm">Monthly Rent Amount</p>
            <h3 className="text-3xl font-bold">10,000 INR</h3>
          </div>
          <div className="bg-white/20 p-3 rounded-2xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-between py-4 border-b">
            <span className="text-slate-500">Resident Name</span>
            <span className="font-semibold">{user.name}</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-slate-500">Room Number</span>
            <span className="font-semibold">{user.roomNumber}</span>
          </div>
          <div className="flex justify-between py-4 border-b">
            <span className="text-slate-500">Payment Status</span>
            <span className={`font-bold ${user.isRentPaid ? 'text-emerald-600' : 'text-rose-600'}`}>
              {user.isRentPaid ? 'CLEARED' : 'PENDING'}
            </span>
          </div>

          {!user.isRentPaid ? (
            <div className="pt-4">
              <button 
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center space-x-2"
              >
                {processing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Pay 10,000 INR Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4 4H3" /></svg>
                  </>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">Security powered by Smart PG Billing System</p>
            </div>
          ) : (
            <div className="pt-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-emerald-600 font-bold">You are all caught up for this month!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
