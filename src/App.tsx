import { Route, Routes } from 'react-router';

import {
  AuthPage,
  LandingPage,
  ProfilePage,
  NotFoundPage,
  DashboardPage,
  EditProfilePage,
  ResetPasswordPage,
  ForgotPasswordPage,
} from '@/pages';
import { Footer, Header } from '@/components';

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
