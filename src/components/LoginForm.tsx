import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/libs';
import { setAuth, setLoading } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setError(null);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password.trim(),
      );

      const token = await user.getIdToken();

      dispatch(setAuth({ uid: user.uid, email: user.email ?? '', token }));
      navigate('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login error: ', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-2 rounded-md">
          {error}
        </p>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="new-email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 font-semibold rounded-lg text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 cursor-pointer'}`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
