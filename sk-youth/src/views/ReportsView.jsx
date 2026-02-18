import React, { useState } from 'react';
import { 
  FileText, Search, ChevronRight, 
  FileCheck, Printer, History
} from 'lucide-react';
import GenerateReportModal from '../components/GenerateReportModal';

const ReportsView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentHistory = [
    { name: "CBYDP 2026", freq: "Annual", date: "Feb 14, 2026", status: "Ready" },
    { name: "KK Profiling Summary", freq: "Real-time", date: "Feb 14, 2026", status: "Ready" },
    { name: "Q1 FPDP Compliance", freq: "Quarterly", date: "Jan 15, 2026", status: "Submitted" },
    { name: "Jan Session Minutes", freq: "Monthly", date: "Jan 30, 2026", status: "Submitted" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 animate-in fade-in duration-500">
      
      {/* SINGLE UNIFIED CONTAINER */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col transition-colors">
        
        {/* HEADER SECTION */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Report Workspace</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Prepare automated hard copies for MYDO Head submission.</p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0D2440] dark:bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all shadow-md"
          >
            <Printer size={16} />
            Generate Report
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="px-6 py-4 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600">
            <History size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Recent Filing History</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="pl-9 pr-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none w-56" 
            />
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Generated Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentHistory.map((doc, i) => (
                <tr key={i} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-5 font-bold text-slate-700 dark:text-slate-200 text-sm">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                      {doc.name}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-semibold text-slate-500 uppercase tracking-tighter">{doc.freq}</td>
                  <td className="px-6 py-5 text-xs text-slate-400 tabular-nums">{doc.date}</td>
                  <td className="px-6 py-5">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      doc.status === 'Ready' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {doc.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-slate-300 hover:text-blue-600 transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <GenerateReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ReportsView;