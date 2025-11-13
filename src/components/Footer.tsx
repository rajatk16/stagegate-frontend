import { Link } from 'react-router';

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 py-10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-6 sm:gap-0">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{' '}
          <span className="text-white font-semibold">StageGate</span>. All rights reserved.
        </p>
      </div>

      <div className="flex flex-wrap justify-center sm:justify-end gap-6 text-sm">
        <Link to="/privacy" className="hover:text-white transition-colors duration-200">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-white transition-colors duration-200">
          Terms of Service
        </Link>
        <Link to="/contact" className="hover:text-white transition-colors duration-200">
          Contact Us
        </Link>
      </div>
    </div>
  </footer>
);
