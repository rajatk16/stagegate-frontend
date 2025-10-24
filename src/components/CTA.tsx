import { Link } from 'react-router';

export const CTA = () => (
  <section className="bg-brand-500 py-20 text-center text-white">
    <h2 className="text-3xl font-bold">Ready to Simplify Your Proposal Reviews?</h2>
    <p className="mt-4 text-white/80">
      Create an account and start reviewing proposals in minutes.
    </p>
    <div className="mt-6">
      <Link
        to="/auth/signup"
        className="px-8 py-3 bg-white text-brand-600 font-medium rounded-lg hover:bg-gray-100 transition"
      >
        Get Started for Free
      </Link>
    </div>
  </section>
);
