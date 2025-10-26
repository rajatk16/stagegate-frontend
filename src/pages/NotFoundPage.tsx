import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router';

import { Footer, Header } from '@/components';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>StageGate - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6">
        <h1 className="text-[8rem] font-bold text-brand-500 leading-none">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-md">
          Oops! The page you are looking for does not exist.
          <br />
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="px-5 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
