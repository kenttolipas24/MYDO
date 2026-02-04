import React from 'react';
import { Users, GraduationCap, Briefcase, MapPin, Download } from 'lucide-react';

const DashboardView = () => {
  const stats = [
    { label: 'Total Youth', value: '1,247', change: '+12%', icon: Users },
    { label: 'Out-of-School Youth', value: '186', change: '14.9%', icon: GraduationCap },
    { label: 'Employed', value: '743', change: '59.6%', icon: Briefcase },
    { label: 'Active Puroks', value: '8', change: '100%', icon: MapPin }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#7BA4D0]/20 p-8 min-h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2440]">Dashboard</h2>
          <p className="text-sm text-[#7BA4D0]">Real-time youth statistics</p>
        </div>
        <button className="bg-[#0D2440] hover:bg-[#2E5E99] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm">
          <Download size={18} /> <span className="font-medium">Export Data</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#7BA4D0]/10 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[#7BA4D0]">{stat.label}</p>
                <p className="text-2xl font-bold text-[#0D2440] mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-[#E7F0FA] rounded-xl text-[#2E5E99]">
                <stat.icon size={22} />
              </div>
            </div>
            <p className="text-xs font-bold mt-4 text-[#2E5E99]">{stat.change} vs last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-[#0D2440] mb-4">Recent Activities</h3>
          <div className="space-y-4 text-sm">
            {["Juan Dela Cruz registered", "Leadership Summit 2026", "Monthly Report"].map((act, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-[#0D2440] font-medium">{act}</span>
                <span className="text-[#7BA4D0]">Today</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30">
          <h3 className="font-bold text-[#0D2440] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
             <button className="p-3 bg-white border border-[#d1e3f8] rounded-xl text-xs font-bold text-[#2E5E99]">Add Youth</button>
             <button className="p-3 bg-white border border-[#d1e3f8] rounded-xl text-xs font-bold text-[#2E5E99]">Map Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;