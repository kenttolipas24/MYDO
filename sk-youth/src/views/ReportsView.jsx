import React, { useState } from 'react';
import { 
  Search, 
  Printer, History, AlertCircle
} from 'lucide-react';
import GenerateReportModal from '../components/GenerateReportModal';

const ReportsView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Replaced dummy data with an empty array representing the initial state.
  // In the future, you will populate this via a Supabase fetch call.
  const recentHistory = []; 

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
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0D2440] dark:bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all shadow-md active:scale-95"
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
              className="pl-9 pr-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none w-56 focus:border-blue-500 transition-colors" 
            />
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto min-h-[300px] flex flex-col">
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
            
            {/* Render rows only if data exists */}
            {recentHistory.length > 0 && (
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* Future mapping logic goes here */}
              </tbody>
            )}
          </table>

          {/* EMPTY STATE */}
          {recentHistory.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-400">
              <AlertCircle size={32} strokeWidth={1.5} className="mb-3 opacity-50" />
              <h3 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-1">
                No Reports Generated
              </h3>
              <p className="text-[11px] font-medium max-w-sm mx-auto tracking-wide">
                There is no filing history available. Click the "Generate Report" button above to create your first automated document.
              </p>
            </div>
          )}
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