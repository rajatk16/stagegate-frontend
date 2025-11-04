import { auth } from '@/libs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password.trim(),
      );
      console.log('user', user);

      const token = await user.getIdToken();
      console.log('token', token);
      localStorage.setItem('access_token', token);

      setSuccessMessage(`Login successful! Welcome back, ${user.displayName || user.email}!`);
      setTimeout(() => navigate('/dashboard'), 1200);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login error: ', error);
      let message = 'Failed to login. Please check your credentials and try again.';

      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email. Please register first.';
          break;
        case 'auth/wrong-password':
          message = 'Invalid password. Please try again.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address. Please check your email and try again.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many login attempts. Please try again later.';
          break;
      }

      setError(message);
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
      {successMessage && (
        <p className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm p-2 rounded-md">
          {successMessage}
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
