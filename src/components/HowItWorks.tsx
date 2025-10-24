const steps = [
  {
    step: '1',
    title: 'Create Organization and Event',
    desc: 'Set up your organization and create an event to get started.',
  },
  {
    step: '2',
    title: 'Invite Reviewers',
    desc: 'Invite your team to score and comment on proposals in real time.',
  },
  {
    step: '3',
    title: 'Add Proposals',
    desc: 'Add proposals through CSV import or invite speakers to submit directly.',
  },
  {
    step: '4',
    title: 'Review and Score',
    desc: 'Review and score proposals using custom scoring criteria.',
  },
  {
    step: '5',
    title: 'Approve!',
    desc: 'Proposals are automatically moved through review rounds based on your criteria.',
  },
];

export const HowItWorks = () => (
  <section className="bg-white dark:bg-gray-900 py-16">
    <div className="max-w-6xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
      <div className="mt-10 grid md:grid-cols-3 gap-10">
        {steps.map((s) => (
          <div
            key={s.step}
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl"
          >
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 font-bold text-lg">
              {s.step}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {s.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
