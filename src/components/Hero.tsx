import { Link } from 'react-router';

export const Hero = () => (
  <section className="bg-white dark:bg-gray-900 py-20">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
        Streamline Your <span className="text-brand-500">Proposal Reviews</span>
      </h1>
      <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        StageGate helps organizations easily review, score, and approve talk proposals for
        conferences, meetups, and workshops - all in one place.
      </p>
      <div className="mt-8">
        <Link
          to="/auth/signup"
          className="px-8 py-3 rounded-lg bg-brand-500 text-white font-medium hover:bg-brand-600 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  </section>
);
