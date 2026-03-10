import React from 'react';
import { Icon } from '@iconify/react';
import { useAdminStats, useLiveQueue } from '../../hooks/useBookingData';

export const DashboardPage: React.FC = () => {
  const { data: stats } = useAdminStats();
  const { data: queue } = useLiveQueue();

  const statCards = [
    { label: 'Today\'s Bookings', value: stats?.totalBookings || 0, icon: 'lucide:calendar', color: 'bg-blue-500' },
    { label: 'Active Queue', value: stats?.activeQueue || 0, icon: 'lucide:users', color: 'bg-orange-500' },
    { label: 'Revenue Today', value: `$${stats?.revenueToday || 0}`, icon: 'lucide:dollar-sign', color: 'bg-green-500' },
    { label: 'New Clients', value: stats?.newClients || 0, icon: 'lucide:user-plus', color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg text-white", stat.color)}>
                <Icon icon={stat.icon} className="text-xl" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Live Queue Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Live Walk-in Queue</h2>
          <button className="text-primary text-sm font-bold hover:underline">Manage Queue</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Position</th>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Service</th>
                <th className="px-6 py-4 font-semibold">Wait Time</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {queue?.map((entry, idx) => (
                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{entry.client?.name || 'Guest'}</div>
                    <div className="text-xs text-slate-500">{entry.client?.phone || 'No phone'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{entry.service?.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">{entry.estimatedWait} mins</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase">Waiting</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <Icon icon="lucide:more-vertical" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};