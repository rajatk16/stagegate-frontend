import { Link } from 'react-router';

export const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-6">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
      <p>© {new Date().getFullYear()} StageGate. All rights reserved.</p>
      <div className="flex gap-6 mt-3 sm:mt-0">
        <Link to="/privacy" className="hover:text-white transition">
          Privacy Policy
        </Link>
        <Link to="/terms" className="hover:text-white transition">
          Terms of Service
        </Link>
        <Link to="/contact" className="hover:text-white transition">
          Contact Us
        </Link>
      </div>
    </div>
  </footer>
);
