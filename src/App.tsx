import { Route, Routes } from 'react-router';

import { AuthPage, LandingPage } from '@/pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
