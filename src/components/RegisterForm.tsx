import { useState } from 'react';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validFields, setValidFields] = useState<Record<string, boolean>>({});

  // password rule checks
  const passwordChecks = {
    length: (v: string) => v.length >= 8,
    upper: (v: string) => /[A-Z]/.test(v),
    lower: (v: string) => /[a-z]/.test(v),
    number: (v: string) => /\d/.test(v),
    special: (v: string) => /[^A-Za-z0-9]/.test(v),
  };

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'name' && !value.trim()) error = 'Full name is required.';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      error = 'Enter a valid email address.';

    if (name === 'password') {
      const fails = Object.entries(passwordChecks)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, fn]) => !fn(value))
        .map(([rule]) => rule);
      if (fails.length)
        error =
          'Password must include: ' + fails.join(', ').replace(/length/, '8+ characters') + '.';
    }

    if (name === 'confirmPassword') {
      // ✅ Only check if confirmPassword field has a value
      if (value.length > 0) {
        if (value !== formData.password) error = 'Passwords do not match.';
      } else {
        error = '';
      }
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
      setValidFields((prev) => ({ ...prev, [name]: false }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: '' }));
      setValidFields((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    // ✅ Revalidate confirmPassword only if it already has a value
    if (name === 'password' && formData.confirmPassword.trim().length > 0) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  };

  const isFormValid =
    Object.values(validFields).every((v) => v === true) &&
    Object.keys(validFields).length === Object.keys(formData).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log('✅ Signup form valid:', formData);
  };

  const fieldClass = (field: string) => {
    if (errors[field]) return 'border-red-500 focus:ring-red-500';
    if (validFields[field]) return 'border-green-500 focus:ring-green-500';
    return 'border-gray-300 dark:border-gray-600 focus:ring-brand-500';
  };

  // For password checklist
  const password = formData.password;
  const passwordStatus = {
    length: passwordChecks.length(password),
    upper: passwordChecks.upper(password),
    lower: passwordChecks.lower(password),
    number: passwordChecks.number(password),
    special: passwordChecks.special(password),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
      {/* Full Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 dark:bg-gray-700 dark:text-white ${fieldClass('name')}`}
        />
        {errors.name ? (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        ) : validFields.name ? (
          <p className="mt-1 text-sm text-green-600">✓ Looks good!</p>
        ) : null}
      </div>

      {/* Email */}
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
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 dark:bg-gray-700 dark:text-white ${fieldClass('email')}`}
        />
        {errors.email ? (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        ) : validFields.email ? (
          <p className="mt-1 text-sm text-green-600">✓ Valid email.</p>
        ) : null}
      </div>

      {/* Password */}
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
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 dark:bg-gray-700 dark:text-white ${fieldClass('password')}`}
        />
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
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 dark:bg-gray-700 dark:text-white ${fieldClass('confirmPassword')}`}
        />
        {/* ✅ Show success message only when user has typed something */}
        {formData.confirmPassword.length > 0 ? (
          errors.confirmPassword ? (
            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
          ) : validFields.confirmPassword ? (
            <p className="mt-1 text-sm text-green-600">✓ Passwords match!</p>
          ) : null
        ) : null}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
          isFormValid ? 'bg-brand-500 hover:bg-brand-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Sign Up
      </button>
    </form>
  );
};
