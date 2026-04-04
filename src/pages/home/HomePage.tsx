import { useAuth } from '@/hooks/useAuth';

export function HomePage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero welcome block */}
      <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-14 text-center text-white shadow-lg">
        <h2 className="text-4xl font-bold tracking-tight">Welcome back, {firstName}!</h2>
        <p className="mx-auto mt-4 max-w-xl text-brand-100">
          Your learning journey continues here. Courses, videos, and more — coming soon.
        </p>
      </div>

      {/* Placeholder feature cards */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              {card.icon}
            </div>
            <h3 className="font-semibold text-gray-900">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.description}</p>
            <span className="mt-auto inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
              Coming soon
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

const placeholderCards = [
  {
    title: 'Browse Courses',
    description: 'Explore a wide range of courses created by expert trainers.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: 'Watch Videos',
    description: 'Stream high-quality course videos at your own pace, anytime.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Track Progress',
    description: 'Monitor your learning progress and pick up where you left off.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
];
