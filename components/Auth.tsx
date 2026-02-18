import React, { useState } from 'react';
import { User, UserRole } from '../types';
import loginBg from '../assets/pg1.jpg';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(UserRole.RESIDENT);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roomNumber: '',
    phoneNumber: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    if (role === UserRole.ADMIN) setIsLogin(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: activeRole
          })
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Login failed');
          return;
        }

        onLogin(data);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Registration failed');
          return;
        }

        alert('Registration successful. Please login.');
        setIsLogin(true);
      }
    } catch {
      setError('Server not reachable');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ================= LEFT IMAGE ================= */}
      <div
        className="hidden md:block w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        {/* Premium dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>

        {/* Branding text */}
        <div className="absolute bottom-16 left-16 text-white max-w-sm">
          <h2 className="text-4xl font-bold mb-4">Welcome to Smart PG</h2>
          <p className="text-stone-200 text-lg">
            Manage residents, payments, complaints and everything —
            all in one smart platform.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 p-8">

        <div className="w-full max-w-md">

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-stone-800">
              Smart PG Portal
            </h1>
            <p className="text-stone-500 mt-2">
              Secure access to your dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              backdrop-blur-xl
              bg-white/70
              p-8
              rounded-3xl
              shadow-2xl
              border border-white/40
              space-y-5
            "
          >

            {/* Role Selector */}
            <div className="flex rounded-full bg-stone-200 p-1">
              <button
                type="button"
                onClick={() => handleRoleChange(UserRole.RESIDENT)}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                  activeRole === UserRole.RESIDENT
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'text-stone-600'
                }`}
              >
                Resident
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange(UserRole.ADMIN)}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                  activeRole === UserRole.ADMIN
                    ? 'bg-amber-700 text-white shadow-md'
                    : 'text-stone-600'
                }`}
              >
                Owner / Admin
              </button>
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-xl bg-white border border-stone-300 focus:ring-2 focus:ring-amber-600 outline-none transition"
              value={formData.email}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white border border-stone-300 focus:ring-2 focus:ring-amber-600 outline-none transition"
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                bg-amber-700
                hover:bg-amber-800
                text-white
                py-3
                rounded-xl
                font-semibold
                shadow-lg
                transition
              "
            >
              {isLoading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
            </button>

            {activeRole === UserRole.RESIDENT && (
              <p className="text-center text-sm text-stone-600">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-amber-700 font-semibold"
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-amber-700 font-semibold"
                    >
                      Login
                    </button>
                  </>
                )}
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
