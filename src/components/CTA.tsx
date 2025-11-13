import { Link } from 'react-router';
import { motion } from 'framer-motion';

export const CTA = () => (
  <section className="relative bg-brand-500 text-white py-20 sm:py-28 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-br from-brand-400 via-brand-500 to-brand-600 opacity-90" />
    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight"
      >
        Ready to Simplify Your Proposal Reviews?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
        className="mt-4 text-lg text-white/90"
      >
        Create your account today and start reviewing proposals in minutes - for free!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
        className="mt-8"
      >
        <Link
          to="/auth"
          className="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-brand-500 transition-all"
        >
          Get Started for Free
        </Link>
      </motion.div>
    </div>

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_107%,rgba(255,255,255,0.1)_0%,transparent_90%)]" />
  </section>
);
