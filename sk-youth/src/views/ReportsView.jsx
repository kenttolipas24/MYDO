import React, { useState, useMemo } from 'react';
import { 
  FileText, BarChart3, Download, Filter, 
  CheckCircle2, AlertCircle, Clock, Search, 
  ChevronDown, ArrowUpRight, Printer, X,
  PieChart, TrendingUp, User, Trash2 
} from 'lucide-react';

const ReportsView = () => {
  const [selectedTab, setSelectedTab] = useState('submissions');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Keep items per page reasonable, or increase it to see a longer list immediately
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // --- MOCK DATA ---
  const [submissions, setSubmissions] = useState([
    { id: 1, type: "CBYIP 2026", barangay: "Brgy. Old Rizal", submittedBy: "Hon. Maria Clara", date: "Feb 06, 2026", status: "Pending", size: "2.4 MB" },
    { id: 2, type: "Q1 Financial Report", barangay: "Brgy. Dalakit", submittedBy: "Hon. Jose Rizal", date: "Feb 05, 2026", status: "Approved", size: "1.1 MB" },
    { id: 3, type: "Annual Accomplishment", barangay: "Brgy. Baybay", submittedBy: "Hon. Andres Bonifacio", date: "Feb 04, 2026", status: "Revision Needed", size: "5.8 MB" },
    { id: 4, type: "Youth Profile Update", barangay: "Brgy. UEP Zone 1", submittedBy: "Hon. Apolinario Mabini", date: "Feb 03, 2026", status: "Approved", size: "850 KB" },
    { id: 5, type: "Project Proposal: Sports", barangay: "Brgy. Acacia", submittedBy: "Hon. Emilio Aguinaldo", date: "Feb 02, 2026", status: "Pending", size: "3.2 MB" },
    { id: 6, type: "ABYIP 2026", barangay: "Brgy. Yakal", submittedBy: "Hon. Gabriela Silang", date: "Feb 01, 2026", status: "Approved", size: "4.1 MB" },
    { id: 7, type: "SK Budget 2026", barangay: "Brgy. Narra", submittedBy: "Hon. Melchora Aquino", date: "Jan 30, 2026", status: "Pending", size: "1.9 MB" },
    { id: 8, type: "Event Liquidation", barangay: "Brgy. Molave", submittedBy: "Hon. Tandang Sora", date: "Jan 28, 2026", status: "Approved", size: "3.5 MB" },
    { id: 9, type: "Monthly Assembly Minutes", barangay: "Brgy. Sampaguita", submittedBy: "Hon. Gregoria de Jesus", date: "Jan 25, 2026", status: "Approved", size: "1.2 MB" },
    { id: 10, type: "KK Profile Update", barangay: "Brgy. Talisay", submittedBy: "Hon. Juan Luna", date: "Jan 24, 2026", status: "Pending", size: "3.0 MB" },
    { id: 11, type: "Purchase Request: Office", barangay: "Brgy. Mabolo", submittedBy: "Hon. Antonio Luna", date: "Jan 22, 2026", status: "Revision Needed", size: "900 KB" },
    { id: 12, type: "Activity Report: Clean-up", barangay: "Brgy. Santol", submittedBy: "Hon. Diego Silang", date: "Jan 20, 2026", status: "Approved", size: "5.5 MB" },
  ]);

  const stats = [
    { label: "Total Reports", value: submissions.length, change: "+12%", icon: FileText, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30" },
    { label: "Approved", value: submissions.filter(s => s.status === 'Approved').length, change: "+5%", icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
    { label: "Pending", value: submissions.filter(s => s.status === 'Pending').length, change: "-8", icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30" },
    { label: "Revisions", value: submissions.filter(s => s.status === 'Revision Needed').length, change: "+2%", icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30" },
  ];

  const filteredData = useMemo(() => {
    return submissions.filter(item => {
      const matchesSearch = 
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.barangay.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [submissions, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenReview = (report) => {
    setSelectedReport(report);
    setIsReviewModalOpen(true);
  };

  const handleUpdateStatus = (newStatus) => {
    setSubmissions(prev => prev.map(item => 
      item.id === selectedReport.id ? { ...item, status: newStatus } : item
    ));
    setIsReviewModalOpen(false);
  };

  return (
    // FIXED: Removed 'h-full' and 'overflow-hidden'. Used 'min-h-full' instead.
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8 min-h-full shadow-sm flex flex-col relative transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white transition-colors">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">Monitor compliance and review SK submissions.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Printer size={16} />
            PRINT
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0D2440] dark:bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-[#1a3b5e] dark:hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10 dark:shadow-none">
            <Download size={16} />
            EXPORT
          </button>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-4 gap-6 mb-8 shrink-0">
        {stats.map((stat, index) => (
          <div key={index} className="p-5 rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-colors`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full transition-colors ${stat.change.startsWith('+') ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white transition-colors">{stat.value}</h3>
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-1 transition-colors">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      {/* FIXED: Removed fixed height, let it grow naturally */}
      <div className="flex-1 flex flex-col bg-gray-50/50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 transition-colors duration-300">
        
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center transition-colors rounded-t-2xl">
          <div className="flex bg-gray-100/50 dark:bg-slate-800 p-1 rounded-xl transition-colors">
            <button 
              onClick={() => setSelectedTab('submissions')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${selectedTab === 'submissions' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'}`}
            >
              <FileText size={14} /> Recent Submissions
            </button>
            <button 
              onClick={() => setSelectedTab('analytics')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${selectedTab === 'analytics' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'}`}
            >
              <BarChart3 size={14} /> Compliance Analytics
            </button>
          </div>

          {selectedTab === 'submissions' && (
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500/50 w-48 transition-all"
                />
              </div>
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <Filter size={14} />
                  {statusFilter === 'All' ? 'Filter' : statusFilter}
                  <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl rounded-xl overflow-hidden hidden group-hover:block z-20">
                  {['All', 'Approved', 'Pending', 'Revision Needed'].map(status => (
                    <button key={status} onClick={() => setStatusFilter(status)} className="w-full text-left px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors">
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- VIEW CONTENT --- */}
        <div className="p-0">
          {selectedTab === 'submissions' ? (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 dark:bg-slate-800 transition-colors shadow-sm">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-400 uppercase tracking-widest border-b border-gray-200 dark:border-slate-700">Report Type</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-400 uppercase tracking-widest border-b border-gray-200 dark:border-slate-700">Barangay / Official</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-400 uppercase tracking-widest border-b border-gray-200 dark:border-slate-700">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-400 uppercase tracking-widest border-b border-gray-200 dark:border-slate-700">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-400 uppercase tracking-widest border-b border-gray-200 dark:border-slate-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900 transition-colors">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="group hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm transition-all">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{item.type}</p>
                            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">{item.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.barangay}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.submittedBy}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <Clock size={14} />
                          <span className="text-xs font-medium">{item.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border transition-colors ${
                          item.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50' :
                          item.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/50' :
                          'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800/50'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <button onClick={() => handleOpenReview(item)} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1">Review <ArrowUpRight size={14} /></button>
                            <button className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 text-sm">No submissions found.</td></tr>
                )}
              </tbody>
            </table>
          ) : (
            /* ANALYTICS VIEW */
            <div className="p-8 grid grid-cols-2 gap-8">
               {/* Simplified for brevity - same analytics cards as before */}
               <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
                  <h3 className="font-bold text-slate-900 dark:text-white">Status Distribution</h3>
                  <div className="h-40 bg-gray-50 dark:bg-slate-700 rounded-xl mt-4 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs">Chart Visualization</div>
               </div>
               <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
                  <h3 className="font-bold text-slate-900 dark:text-white">Top Barangays</h3>
                  <div className="h-40 bg-gray-50 dark:bg-slate-700 rounded-xl mt-4 flex items-center justify-center text-slate-400 dark:text-slate-500 text-xs">List Visualization</div>
               </div>
            </div>
          )}
        </div>
        
        {/* Pagination Footer */}
        {selectedTab === 'submissions' && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center rounded-b-2xl transition-colors">
            <p className="text-xs font-medium text-gray-400 dark:text-slate-500">
                Showing {paginatedData.length} of {filteredData.length} submissions
            </p>
            <div className="flex gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 border border-gray-200 dark:border-slate-700 rounded-lg text-xs font-bold text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">Previous</button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 border border-gray-200 dark:border-slate-700 rounded-lg text-xs font-bold text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">Next</button>
            </div>
            </div>
        )}
      </div>

      {/* REVIEW MODAL (Same as before) */}
      {isReviewModalOpen && selectedReport && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0D2440]/20 dark:bg-slate-900/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 dark:border-slate-700">
                <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between">
                    <h3 className="font-black text-[#0D2440] dark:text-white">Review Submission</h3>
                    <button onClick={() => setIsReviewModalOpen(false)}><X size={18} /></button>
                </div>
                {/* Content... */}
            </div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;