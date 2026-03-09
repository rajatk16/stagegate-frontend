import { Link } from 'react-router';

export const OrganizationNotFound = () => {
  return (
    <div className="p-6 flex-col items-center justify-center py-24 text-center">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Unable to load organization
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        You may not have access to this organization.
      </p>

      <Link
        to="/dashboard"
        className="px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white font-semibold"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};
