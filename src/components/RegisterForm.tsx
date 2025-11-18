import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client/react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/libs';
import { InputField } from '@/components';
import { SIGN_UP_MUTATION } from '@/graphql';
import { setAuth, setLoading } from '@/store';
import { useAppDispatch, useAppSelector } from '@/hooks';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  const [signUp, { loading: signUpLoading }] = useMutation(SIGN_UP_MUTATION);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordChecks = {
    length: (v: string) => v.length >= 8,
    upper: (v: string) => /[A-Z]/.test(v),
    lower: (v: string) => /[a-z]/.test(v),
    number: (v: string) => /\d/.test(v),
    special: (v: string) => /[^A-Za-z0-9]/.test(v),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address.';

    const fails = Object.entries(passwordChecks)
      .filter(([, fn]) => !fn(formData.password))
      .map(([rule]) => rule);

    if (fails.length)
      newErrors.password =
        `Password must include: ` + fails.join(', ').replace(/length/, '8+ characters') + '.';

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(setLoading(true));

    try {
      const { data } = await signUp({
        variables: {
          input: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password.trim(),
          },
        },
      });

      if (data?.signUp?.user) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          formData.email.trim(),
          formData.password.trim(),
        );
        const token = await user.getIdToken();
        dispatch(setAuth({ uid: user.uid, email: user.email ?? '', token }));
        navigate('/edit-profile');
      }
    } catch (error: unknown) {
      console.error('Sign up error: ', error);
      setErrors({
        form: (error as Error).message || 'Something went wrong. Please try again.',
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const password = formData.password;
  const passwordStatus = {
    length: passwordChecks.length(password),
    upper: passwordChecks.upper(password),
    lower: passwordChecks.lower(password),
    number: passwordChecks.number(password),
    special: passwordChecks.special(password),
  };

  const isLoading = loading || signUpLoading;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-sm"
      autoComplete="off"
    >
      {errors.form && (
        <div className="flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm py-2 px-3 rounded-md border border-red-100 dark:border-red-800">
          {errors.form}
        </div>
      )}

      <InputField
        id="name"
        label="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        error={errors.name}
        placeholder="John Doe"
      />

      <InputField
        id="email"
        label="Email"
        type="email"
        autoComplete="new-email"
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
        placeholder="you@example.com"
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={errors.password}
        placeholder="••••••••"
        autoComplete="new-password"
      />

      {formData.password.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm">
          <li className={passwordStatus.length ? 'text-green-600' : 'text-gray-500'}>
            {passwordStatus.length ? '✓' : '•'} At least 8 characters
          </li>
          <li className={passwordStatus.upper ? 'text-green-600' : 'text-gray-500'}>
            {passwordStatus.upper ? '✓' : '•'} One uppercase letter
          </li>
          <li className={passwordStatus.lower ? 'text-green-600' : 'text-gray-500'}>
            {passwordStatus.lower ? '✓' : '•'} One lowercase letter
          </li>
          <li className={passwordStatus.number ? 'text-green-600' : 'text-gray-500'}>
            {passwordStatus.number ? '✓' : '•'} One number
          </li>
          <li className={passwordStatus.special ? 'text-green-600' : 'text-gray-500'}>
            {passwordStatus.special ? '✓' : '•'} One special character
          </li>
        </ul>
      )}

      <InputField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        error={errors.confirmPassword}
        placeholder="••••••••"
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 flex justify-center items-center gap-2 font-semibold rounded-lg text-white transition-all ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-brand-500 hover:bg-brand-600 focus:ring-2 focus:ring-brand-400'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating Account...
          </>
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
};
