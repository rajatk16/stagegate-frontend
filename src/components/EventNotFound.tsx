import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

export const EventNotFound = ({ orgSlug }: { orgSlug: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
    <p className="text-red-500 font-medium mb-1">Event not found.</p>
    <p className="text-gray-600 dark:text-gray-400">Please try again later.</p>
    <Link
      to={`/organizations/${orgSlug}`}
      className="text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:underline transition mt-4"
    >
      Go back to events
    </Link>
  </motion.div>
);
