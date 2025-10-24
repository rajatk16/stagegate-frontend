const features = [
  {
    title: 'Collaborative Reviews',
    desc: 'Invite your team to score and comment on proposals in real time.',
  },
  {
    title: 'Smart Workflow',
    desc: 'Automatically move proposals through review rounds with custom criteria.',
  },
  {
    title: 'Multi-Event Support',
    desc: 'Manage multiple events under one organization',
  },
];

export const Features = () => (
  <section className="bg-gray-50 dark:bg-gray-800 py-16">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why StageGate?</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 mb-10">
        Simplify how your organization reviews and approves talk proposals.
      </p>
      <div className="grid md:grid-cols-3 gap-10">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-brand-500 mb-3">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
