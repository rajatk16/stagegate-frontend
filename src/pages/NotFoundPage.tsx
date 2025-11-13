import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftCircle, Home } from 'lucide-react';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>StageGate - Page Not Found</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>

      <main
        role="main"
        className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-[8rem] font-extrabold text-brand-500 leading-none"
          >
            404
          </motion.h1>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-md mx-auto">
            Oops! The page you are looking for does not exist.
            <br />
            Let's get you back to where you need to be.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              <ArrowLeftCircle className="w-4 h-4" />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-medium transition"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
};
