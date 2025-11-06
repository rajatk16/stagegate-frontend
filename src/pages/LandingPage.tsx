import { Helmet } from 'react-helmet';

import { CTA, Features, Hero, HowItWorks } from '@/components';

export const LandingPage = () => (
  <>
    <Helmet>
      <title>StageGate - Streamline Your Proposal Reviews</title>
    </Helmet>
    <Hero />
    <Features />
    <HowItWorks />
    <CTA />
  </>
);
