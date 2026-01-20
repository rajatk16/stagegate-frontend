import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const OrgSettingsError = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
    <p className="text-red-500 font-medium mb-1">Failed to load organization settings.</p>
    <p className="text-gray-600 dark:text-gray-400">Please refresh the page.</p>
  </motion.div>
);
