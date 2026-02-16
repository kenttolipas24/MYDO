import React from 'react';
import { Users, FileText, PieChart, Clock, Plus, Upload, Calendar } from 'lucide-react';

const DashboardView = () => {
  // Stats tailored for a specific Barangay (e.g., Brgy. Old Rizal)
  const stats = [
    { 
      label: 'Registered Youth', 
      value: '342', 
      subtext: 'Brgy. Old Rizal', 
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/30'
    },
    { 
      label: 'Pending Submissions', 
      value: '3', 
      subtext: 'Awaiting Admin Review', 
      icon: FileText,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/30'
    },
    { 
      label: 'Budget Utilized', 
      value: '45%', 
      subtext: '₱ 125,000.00 Remaining', 
      icon: PieChart,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/30'
    },
    { 
      label: 'Next Deadline', 
      value: 'Feb 15', 
      subtext: 'CBYIP 2026 Submission', 
      icon: Clock,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/30'
    }
  ];

  return (
    // MAIN CONTAINER
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-[#7BA4D0]/20 dark:border-slate-800 p-8 min-h-full transition-colors duration-300">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#0D2440] dark:text-white transition-colors">Barangay Dashboard</h2>
          <p className="text-sm text-[#7BA4D0] dark:text-slate-400 transition-colors">Welcome back, Hon. Chairperson!</p>
        </div>
        <div className="flex gap-3">
            <span className="px-4 py-2 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-xs font-bold rounded-xl border border-gray-200 dark:border-slate-700 flex items-center gap-2">
                <Calendar size={14} /> February 12, 2026
            </span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-[#7BA4D0]/10 dark:border-slate-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-[#7BA4D0] dark:text-slate-400 uppercase tracking-wide transition-colors">{stat.label}</p>
                <p className="text-2xl font-black text-[#0D2440] dark:text-white mt-2 transition-colors">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl transition-colors ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-[10px] font-bold mt-4 text-gray-400 dark:text-slate-500 transition-colors">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* BOTTOM SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SUBMISSION TRACKER (Takes up 2 columns) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#0D2440] dark:text-white transition-colors">My Recent Submissions</h3>
            <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
                { title: "Quarterly Financial Report (Q1)", status: "Approved", date: "Feb 10, 2026" },
                { title: "Youth Development Plan (Draft)", status: "Pending Review", date: "Feb 08, 2026" },
                { title: "Sports League Proposal", status: "Revision Needed", date: "Feb 05, 2026" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-900 transition-all">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-400 shadow-sm">
                        <FileText size={18} />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-[#0D2440] dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-400 dark:text-slate-500">{item.date}</p>
                    </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    item.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800' :
                    item.status === 'Pending Review' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800' :
                    'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800'
                }`}>
                    {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS PANEL (Takes up 1 column) */}
        <div className="p-6 rounded-2xl border border-gray-100 dark:border-slate-700 bg-blue-50/50 dark:bg-slate-800/50 transition-colors">
          <h3 className="font-bold text-[#0D2440] dark:text-white mb-4 transition-colors">Official Actions</h3>
          <div className="space-y-3">
             <button className="w-full p-4 bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-600 rounded-xl flex items-center gap-3 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all group">
               <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <Upload size={18} />
               </div>
               <div className="text-left">
                 <p className="text-sm font-bold text-[#0D2440] dark:text-white">Submit Report</p>
                 <p className="text-[10px] text-gray-400 dark:text-slate-400">Upload compliance docs</p>
               </div>
             </button>

             <button className="w-full p-4 bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-600 rounded-xl flex items-center gap-3 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all group">
               <div className="p-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                 <Plus size={18} />
               </div>
               <div className="text-left">
                 <p className="text-sm font-bold text-[#0D2440] dark:text-white">Register Youth</p>
                 <p className="text-[10px] text-gray-400 dark:text-slate-400">Add new Katipunan member</p>
               </div>
             </button>

             <button className="w-full p-4 bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-600 rounded-xl flex items-center gap-3 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all group">
               <div className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                 <FileText size={18} />
               </div>
               <div className="text-left">
                 <p className="text-sm font-bold text-[#0D2440] dark:text-white">Draft Resolution</p>
                 <p className="text-[10px] text-gray-400 dark:text-slate-400">Create new agenda</p>
               </div>
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardView;