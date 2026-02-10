import React, { useState, useMemo } from 'react';
import { 
  FileText, BarChart3, Download, Filter, 
  CheckCircle2, AlertCircle, Clock, Search, 
  ChevronDown, ArrowUpRight, Printer, X,
  PieChart, TrendingUp, MoreVertical, Eye, Trash2
} from 'lucide-react';

const ReportsView = () => {
  // --- STATE MANAGEMENT ---
  const [selectedTab, setSelectedTab] = useState('submissions'); // 'submissions' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Approved' | 'Pending' | 'Revision Needed'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // --- MOCK DATA (In State to allow updates) ---
  const [submissions, setSubmissions] = useState([
    { id: 1, type: "CBYIP 2026", barangay: "Brgy. Old Rizal", submittedBy: "Hon. Maria Clara", date: "Feb 06, 2026", status: "Pending", size: "2.4 MB" },
    { id: 2, type: "Q1 Financial Report", barangay: "Brgy. Dalakit", submittedBy: "Hon. Jose Rizal", date: "Feb 05, 2026", status: "Approved", size: "1.1 MB" },
    { id: 3, type: "Annual Accomplishment", barangay: "Brgy. Baybay", submittedBy: "Hon. Andres Bonifacio", date: "Feb 04, 2026", status: "Revision Needed", size: "5.8 MB" },
    { id: 4, type: "Youth Profile Update", barangay: "Brgy. UEP Zone 1", submittedBy: "Hon. Apolinario Mabini", date: "Feb 03, 2026", status: "Approved", size: "850 KB" },
    { id: 5, type: "Project Proposal: Sports", barangay: "Brgy. Acacia", submittedBy: "Hon. Emilio Aguinaldo", date: "Feb 02, 2026", status: "Pending", size: "3.2 MB" },
    { id: 6, type: "ABYIP 2026", barangay: "Brgy. Yakal", submittedBy: "Hon. Gabriela Silang", date: "Feb 01, 2026", status: "Approved", size: "4.1 MB" },
    { id: 7, type: "SK Budget 2026", barangay: "Brgy. Narra", submittedBy: "Hon. Melchora Aquino", date: "Jan 30, 2026", status: "Pending", size: "1.9 MB" },
    { id: 8, type: "Event Liquidation", barangay: "Brgy. Molave", submittedBy: "Hon. Tandang Sora", date: "Jan 28, 2026", status: "Approved", size: "3.5 MB" },
  ]);

  // --- STATS OVERVIEW ---
  const stats = [
    { label: "Total Reports", value: submissions.length, change: "+12%", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Approved", value: submissions.filter(s => s.status === 'Approved').length, change: "+5%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending", value: submissions.filter(s => s.status === 'Pending').length, change: "-8", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Revisions", value: submissions.filter(s => s.status === 'Revision Needed').length, change: "+2%", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  // --- LOGIC: Filtering & Pagination ---
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

  // --- HANDLERS ---
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
    <div className="bg-white rounded-2xl border border-gray-100 p-8 h-full shadow-sm flex flex-col overflow-hidden relative">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-[#0D2440]">Reports & Analytics</h1>
          <p className="text-sm text-[#7BA4D0] mt-1">Monitor compliance and review SK submissions.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-[#0D2440] text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors">
            <Printer size={16} />
            PRINT
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0D2440] text-white text-xs font-bold rounded-xl hover:bg-[#1a3b5e] transition-colors shadow-lg shadow-blue-900/10">
            <Download size={16} />
            EXPORT
          </button>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-4 gap-6 mb-8 shrink-0">
        {stats.map((stat, index) => (
          <div key={index} className="p-5 rounded-2xl border border-gray-100 bg-white group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#0D2440]">{stat.value}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-h-0 bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
          
          {/* Tabs */}
          <div className="flex bg-gray-100/50 p-1 rounded-xl">
            <button 
              onClick={() => setSelectedTab('submissions')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${selectedTab === 'submissions' ? 'bg-white text-[#0D2440] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <FileText size={14} /> Recent Submissions
            </button>
            <button 
              onClick={() => setSelectedTab('analytics')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${selectedTab === 'analytics' ? 'bg-white text-[#0D2440] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <BarChart3 size={14} /> Compliance Analytics
            </button>
          </div>

          {/* Filters (Only visible in Submissions tab) */}
          {selectedTab === 'submissions' && (
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#0D2440] placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0D2440]/10 w-48 transition-all"
                />
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-50">
                  <Filter size={14} />
                  {statusFilter === 'All' ? 'Filter' : statusFilter}
                  <ChevronDown size={14} />
                </button>
                {/* Simple Dropdown for Filter */}
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden hidden group-hover:block z-20">
                  {['All', 'Approved', 'Pending', 'Revision Needed'].map(status => (
                    <button 
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-[#0D2440]"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- VIEW CONTENT --- */}
        <div className="flex-1 overflow-auto p-0">
          
          {selectedTab === 'submissions' ? (
            /* === SUBMISSIONS TABLE === */
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">Report Type</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">Barangay / Official</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0D2440]">{item.type}</p>
                            <p className="text-[10px] font-semibold text-gray-400">{item.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-bold text-gray-800">{item.barangay}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{item.submittedBy}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={14} />
                          <span className="text-xs font-medium">{item.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                          item.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          item.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          {item.status === 'Approved' && <CheckCircle2 size={12} />}
                          {item.status === 'Pending' && <Clock size={12} />}
                          {item.status === 'Revision Needed' && <AlertCircle size={12} />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                            <button 
                                onClick={() => handleOpenReview(item)}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                            >
                            Review <ArrowUpRight size={14} />
                            </button>
                            <button className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400 text-sm">
                      No submissions found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            /* === ANALYTICS VIEW === */
            <div className="p-8 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* 1. Report Distribution Chart (CSS only) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><PieChart size={20}/></div>
                        <h3 className="font-bold text-[#0D2440]">Submission Status Distribution</h3>
                    </div>
                    
                    <div className="flex items-end gap-8 h-48 px-4 border-b border-gray-100 pb-2">
                        {/* Bar 1: Approved */}
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full bg-emerald-100 rounded-t-xl relative group-hover:bg-emerald-200 transition-colors" style={{height: '65%'}}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-600">65%</div>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Approved</span>
                        </div>
                        {/* Bar 2: Pending */}
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                             <div className="w-full bg-amber-100 rounded-t-xl relative group-hover:bg-amber-200 transition-colors" style={{height: '25%'}}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-600">25%</div>
                             </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Pending</span>
                        </div>
                         {/* Bar 3: Revision */}
                         <div className="flex-1 flex flex-col items-center gap-2 group">
                             <div className="w-full bg-red-100 rounded-t-xl relative group-hover:bg-red-200 transition-colors" style={{height: '10%'}}>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600">10%</div>
                             </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Revision</span>
                        </div>
                    </div>
                </div>

                {/* 2. Top Performing Barangays */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp size={20}/></div>
                        <h3 className="font-bold text-[#0D2440]">Top Compliant Barangays</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            {name: 'Brgy. Old Rizal', score: 98, color: 'bg-emerald-500'},
                            {name: 'Brgy. Dalakit', score: 92, color: 'bg-blue-500'},
                            {name: 'Brgy. UEP Zone 1', score: 88, color: 'bg-purple-500'},
                            {name: 'Brgy. Yakal', score: 85, color: 'bg-amber-500'}
                        ].map((b, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-400 w-4">0{i+1}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs font-bold text-[#0D2440]">{b.name}</span>
                                        <span className="text-xs font-bold text-gray-500">{b.score}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full ${b.color} rounded-full`} style={{width: `${b.score}%`}}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          )}
        </div>
        
        {/* Pagination Footer (Only for Submissions) */}
        {selectedTab === 'submissions' && (
            <div className="px-6 py-4 border-t border-gray-200 bg-white flex justify-between items-center shrink-0">
            <p className="text-xs font-medium text-gray-400">
                Showing {paginatedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} submissions
            </p>
            <div className="flex gap-2">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
            </div>
        )}
      </div>

      {/* --- REVIEW MODAL --- */}
      {isReviewModalOpen && selectedReport && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0D2440]/20 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
                {/* Modal Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-black text-[#0D2440]">Review Submission</h3>
                        <p className="text-xs text-gray-500">ID: #{selectedReport.id} • {selectedReport.date}</p>
                    </div>
                    <button onClick={() => setIsReviewModalOpen(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors"><X size={18} className="text-gray-500"/></button>
                </div>
                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText size={24} /></div>
                        <div>
                            <p className="text-sm font-bold text-[#0D2440]">{selectedReport.type}</p>
                            <p className="text-xs text-gray-500">{selectedReport.barangay}</p>
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Submitted By</p>
                        <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                             <User size={14} className="text-gray-400"/> {selectedReport.submittedBy}
                        </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Status</p>
                         <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border bg-white ${
                          selectedReport.status === 'Approved' ? 'text-emerald-600 border-emerald-100' :
                          selectedReport.status === 'Pending' ? 'text-amber-600 border-amber-100' :
                          'text-red-600 border-red-100'
                        }`}>
                             {selectedReport.status}
                         </span>
                    </div>
                </div>
                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                    <button 
                        onClick={() => handleUpdateStatus('Revision Needed')}
                        className="flex-1 py-2.5 bg-white border border-gray-200 text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 hover:border-red-100 transition-colors"
                    >
                        Request Revision
                    </button>
                    <button 
                        onClick={() => handleUpdateStatus('Approved')}
                        className="flex-1 py-2.5 bg-[#0D2440] text-white text-xs font-bold rounded-xl hover:bg-[#1a3b5e] transition-colors shadow-lg shadow-blue-900/10"
                    >
                        Approve Report
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default ReportsView;