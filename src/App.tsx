import { Navigate, Route, Routes } from 'react-router';

import { useAppSelector } from './hooks';
import { Footer, Header } from '@/components';
import {
  AuthPage,
  LandingPage,
  ProfilePage,
  NotFoundPage,
  DashboardPage,
  EditProfilePage,
  ResetPasswordPage,
  ForgotPasswordPage,
  EditProfilePicturePage,
} from '@/pages';

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { uid } = useAppSelector((state) => state.auth);
  return uid ? <>{children}</> : <Navigate to="/auth" replace />;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { uid } = useAppSelector((state) => state.auth);
  return uid ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <MainLayout>
                <LandingPage />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <MainLayout>
                <AuthPage />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthRoute>
              <MainLayout>
                <ResetPasswordPage />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AuthRoute>
              <MainLayout>
                <ForgotPasswordPage />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditProfilePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile-picture"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditProfilePicturePage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
