import { Link } from 'react-router';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { EditProfileForm } from '@/components';

export const EditProfilePage = () => (
  <>
    <Helmet>
      <title>StageGate - Edit Profile</title>
      <meta name="description" content="Edit your profile information" />
    </Helmet>

    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          to="/profile"
          className="flex items-center text-brand-600 hover:underline mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Edit Profile</h1>
        <EditProfileForm />
      </div>
    </main>
  </>
);
