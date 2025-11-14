export const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 border-t border-gray-800 py-10">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-center items-center text-center sm:text-left gap-6 sm:gap-0">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()}{' '}
          <span className="text-white font-semibold">StageGate</span>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);
