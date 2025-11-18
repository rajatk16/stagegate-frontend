import { Helmet } from 'react-helmet';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FunctionComponent<AuthLayoutProps> = (props) => {
  const { title, description, children } = props;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center bg-linear-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-500/10 dark:bg-brand-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="max-w-6xl mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
};
