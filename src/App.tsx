import { Route, Routes } from 'react-router';

import { AuthPage, LandingPage, NotFoundPage } from '@/pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
