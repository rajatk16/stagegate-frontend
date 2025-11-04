import { Route, Routes } from 'react-router';

import {
  AuthPage,
  ForgotPassword,
  LandingPage,
  NotFoundPage,
  ResetPasswordPage,
} from '@/pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
