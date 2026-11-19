import PriorityInbox from '../components/dashboard/PriorityInbox.jsx';
import SalesChart from '../components/dashboard/SalesChart.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import { currentUser, stats } from '../data/mock.js';

function getGreeting(date) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatToday(date) {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  return `${weekday}, ${date.getDate()} ${month}`;
}

export default function DashboardPage() {
  const now = new Date();

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-7 sm:px-7">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-600">
        {formatToday(now)}
      </p>
      <h2 className="mt-2 text-[32px] font-bold leading-tight tracking-tight text-slate-900">
        {getGreeting(now)}, {currentUser.firstName}
      </h2>
      <p className="mt-1.5 text-[15px] text-slate-500">
        Here’s what’s happening across your sales pipeline today.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[3fr_2fr]">
        <SalesChart />
        <PriorityInbox />
      </div>
    </div>
  );
}