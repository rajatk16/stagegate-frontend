import { Route, Routes } from 'react-router';

import {
  AuthPage,
  LandingPage,
  NotFoundPage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from '@/pages';
import { Footer, Header } from '@/components';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
