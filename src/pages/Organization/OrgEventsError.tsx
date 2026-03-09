import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const OrgEventsError = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
    <p className="text-red-500 font-medium mb-1">Failed to load events.</p>
  </motion.div>
);
