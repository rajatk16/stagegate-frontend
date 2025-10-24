import { Helmet } from 'react-helmet';

import { CTA, Features, Footer, Header, Hero, HowItWorks } from '@/components';

export const LandingPage = () => (
  <>
    <Helmet>
      <title>StageGate - Streamline Your Proposal Reviews</title>
    </Helmet>
    <Header />
    <Hero />
    <Features />
    <HowItWorks />
    <CTA />
    <Footer />
  </>
);
