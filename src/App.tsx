import { Navigate, Route, Routes } from 'react-router';

import { Footer, Header } from '@/components';
import { useAppSelector } from '@/hooks';
import {
  CreateEventPage,
  CreateOrganizationPage,
  DashboardPage,
  EditProfilePage,
  EditProfilePicturePage,
  EventOverviewPage,
  ForgotPasswordPage,
  JoinOrganizationPage,
  LandingPage,
  LoginPage,
  NotFoundPage,
  OrganizationPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
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
  return uid ? <>{children}</> : <Navigate to="/login" replace />;
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
            <MainLayout>
              <LandingPage />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <MainLayout>
                <RegisterPage />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <MainLayout>
                <LoginPage />
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
          path="/create-organization"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateOrganizationPage />
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
          path="/join-organization"
          element={
            <ProtectedRoute>
              <MainLayout>
                <JoinOrganizationPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizations/:slug"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrganizationPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizations/:orgSlug/events/:eventSlug"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EventOverviewPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/new"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CreateEventPage />
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
