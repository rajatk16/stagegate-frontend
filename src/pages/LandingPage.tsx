import { Helmet } from 'react-helmet';

import { CTA, Features, Hero, HowItWorks } from '@/components';

export const LandingPage = () => (
  <>
    <Helmet>
      <title>StageGate - Streamline Your Proposal Reviews</title>
      <meta
        name="description"
        content="Simplify proposal submissions and reviews for conferences, meetups, and workshops. Collaborate, score, and approve proposals in one place with StageGate."
      />
      <meta property="og:title" content="StageGate - Streamline Your Proposal Reviews" />
      <meta
        property="og:description"
        content="Simplify proposal submissions and reviews for conferences, meetups, and workshops."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://stagegate.app" />
      <meta property="og:image" content="https://stagegate.app/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="StageGate - Streamline Your Proposal Reviews" />
      <meta
        name="twitter:description"
        content="Manage and review talk proposals effortlessly with StageGate."
      />
      <meta name="twitter:image" content="https://stagegate.app/og-image.png" />
    </Helmet>
    <Hero />
    <Features />
    <HowItWorks />
    <CTA />
  </>
);
