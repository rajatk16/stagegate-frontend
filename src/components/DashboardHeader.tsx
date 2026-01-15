import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

interface DashboardHeaderProps {
  isOwnerOfAny: boolean;
  hasOrganizations: boolean;
}

export const DashboardHeader = (props: DashboardHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
  >
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Organizations</h1>
    {props.hasOrganizations && (
      <div className="flex gap-3">
        <Link
          to="/join-organization"
          className="px-4 py-2 rounded-md text-sm font-medium border border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-gray-800 transition-colors"
        >
          Join Organization
        </Link>
        {!props.isOwnerOfAny && (
          <Link
            to="/create-organization"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-medium shadow transition-all hover:shadow-md"
          >
            <Building2 className="w-4 h-4" />
            Create Organization
          </Link>
        )}
      </div>
    )}
  </motion.div>
);
