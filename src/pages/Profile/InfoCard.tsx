import { motion } from 'framer-motion';

export const InfoCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 
               bg-gray-50/70 dark:bg-gray-800/40 hover:shadow-sm transition-all"
  >
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
      <Icon className="w-5 h-5 text-brand-600" />
      {title}
    </h3>
    {children}
  </motion.div>
);
