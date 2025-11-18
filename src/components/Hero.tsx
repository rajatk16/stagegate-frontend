import { Link } from 'react-router';
import { motion } from 'framer-motion';

export const Hero = () => (
  <section className="relative overflow-hidden bg-white dark:bg-gray-900 py-24 sm:py-32">
    <div className="absolute inset-0 bg-linear-to-br from-brand-50/40 via-transparent to-transparent dark:from-brand-950/10 pointer-events-none" />

    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
      >
        Streamline Your{' '}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-500 to-brand-600">
          Proposal Reviews
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
      >
        StageGate helps organizations easily review, score, and approve talk proposals for
        conferences, meetups, and workshops - all in one place.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
        className="mt-10 flex justify-center"
      >
        <Link
          to="/auth"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none" />
  </section>
);
