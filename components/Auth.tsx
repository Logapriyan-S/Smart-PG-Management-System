import React, { useState } from 'react';
import { User, UserRole } from '../types';

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
      /* ------------ LOGIN ------------ */
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
      }

      /* ------------ REGISTER ------------ */
      else {
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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-stone-100">

      {/* ================================================= */}
      {/* LEFT IMAGE (PERMANENT WATERMARK FIX VERSION) */}
      {/* ================================================= */}
      <div className="hidden md:block overflow-hidden">
  <img
    src="https://lh3.googleusercontent.com/p/AF1QipPFKE6_3Y8U_MnsazRDIYrSY6YDYCKGXjc4U8n_=s1360-w1360-h1020-rw"
    alt="PG Entrance"
    className="h-full w-full object-cover object-top scale-150"
  />
</div>

      {/* ================================================= */}
      {/* RIGHT FORM */}
      {/* ================================================= */}
      <div className="flex items-center justify-center p-8">

        <div className="w-full max-w-md">

          <h1 className="text-3xl font-bold text-stone-800 text-center mb-8">
            Smart PG
          </h1>

          <form
            onSubmit={handleSubmit}
            className="
              bg-white
              p-8
              rounded-2xl
              shadow-xl
              border border-stone-200
              space-y-4
            "
          >

            {/* Role selector */}
            <div className="flex rounded-xl overflow-hidden mb-4">
              <button
                type="button"
                onClick={() => handleRoleChange(UserRole.RESIDENT)}
                className={`flex-1 p-3 font-semibold transition ${
                  activeRole === UserRole.RESIDENT
                    ? 'bg-amber-700 text-white'
                    : 'bg-stone-200 text-stone-700'
                }`}
              >
                Resident
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange(UserRole.ADMIN)}
                className={`flex-1 p-3 font-semibold transition ${
                  activeRole === UserRole.ADMIN
                    ? 'bg-amber-700 text-white'
                    : 'bg-stone-200 text-stone-700'
                }`}
              >
                Owner / Admin
              </button>
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
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
              className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {error && (
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                bg-amber-700
                hover:bg-amber-800
                text-white
                p-3
                rounded-xl
                font-semibold
                transition
              "
            >
              {isLoading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
            </button>

            {activeRole === UserRole.RESIDENT && (
              <p className="text-center text-sm mt-2 text-stone-700">
                {isLogin ? (
                  <>
                    Don&apos;t have an account?{' '}
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
