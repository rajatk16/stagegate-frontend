import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '1',
    title: 'Create Organization and Event',
    desc: 'Set up your organization and create an event to get started.',
  },
  {
    step: '2',
    title: 'Invite Reviewers',
    desc: 'Invite your team to score and comment on proposals in real time.',
  },
  {
    step: '3',
    title: 'Add Proposals',
    desc: 'Add proposals through CSV import or invite speakers to submit directly.',
  },
  {
    step: '4',
    title: 'Review and Score',
    desc: 'Review and score proposals using custom scoring criteria.',
  },
  {
    step: '5',
    title: 'Approve!',
    desc: 'Proposals automatically move through review rounds based on your criteria.',
  },
];

export const HowItWorks = () => (
  <section className="relative bg-white dark:bg-gray-900 py-24">
    <div className="max-w-3xl mx-auto px-6">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white text-center"
      >
        How It Works
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
        className="text-gray-600 dark:text-gray-400 text-center mt-3 mb-16 max-w-2xl mx-auto"
      >
        Follow these simple steps to go from setup to approvals seamlessly.
      </motion.p>

      {/* Timeline container */}
      <div className="relative">
        {/* Timeline steps */}
        <div className="space-y-16">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step bubble */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md bg-brand-500 dark:bg-brand-600 relative z-10">
                {s.step}
                {idx === steps.length - 1 && (
                  <CheckCircle className="absolute -bottom-2 -right-2 w-5 h-5 text-green-400 bg-white dark:bg-gray-800 rounded-full" />
                )}
              </div>

              {/* Step content */}
              <div className="mt-6 max-w-md mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Decorative glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />
  </section>
);
