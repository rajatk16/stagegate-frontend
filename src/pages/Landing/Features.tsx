import { motion } from 'framer-motion';
import { Users, Workflow, Calendar } from 'lucide-react';

const features = [
  {
    title: 'Collaborative Reviews',
    desc: 'Invite your team to score and comment on proposals in real time — ensuring fair and efficient evaluations.',
    icon: Users,
  },
  {
    title: 'Smart Workflow',
    desc: 'Automatically move proposals through review rounds with custom criteria, deadlines, and scoring systems.',
    icon: Workflow,
  },
  {
    title: 'Multi-Event Support',
    desc: 'Manage multiple conferences, hackathons, or meetups under one streamlined organization.',
    icon: Calendar,
  },
];

export const Features = () => (
  <section className="bg-gray-50 dark:bg-gray-900 py-20">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl font-extrabold text-gray-900 dark:text-white"
      >
        Why StageGate?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
        className="text-gray-600 dark:text-gray-400 mt-3 mb-12 max-w-2xl mx-auto text-lg"
      >
        Simplify and scale how your organization reviews, scores, and approves proposals —
        together.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
              className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all border border-gray-100 dark:border-gray-700 text-left"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 mb-5">
                <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);
