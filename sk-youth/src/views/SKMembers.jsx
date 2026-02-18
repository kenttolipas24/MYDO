import React, { useState, useRef, useEffect } from 'react';
import { 
  UserPlus, UserMinus, MoreVertical, AlertCircle, 
  Shield, Eye, Edit2, History, X, FileText, Calendar 
} from 'lucide-react';

const SKMembers = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isPastModalOpen, setIsPastModalOpen] = useState(false);
  const menuRef = useRef(null);

  // --- MOCK DATA ---
  const [pastMembers] = useState([
    { id: 101, name: 'RICARDO DALISAY', role: 'SK CHAIRMAN', termPeriod: '2018 — 2023' },
    { id: 102, name: 'SARA LABRADOR', role: 'SECRETARY', termPeriod: '2018 — 2023' },
  ]);

  const [members, setMembers] = useState([
    { id: 1, name: 'JUAN DELA CRUZ', role: 'SK CHAIRMAN', status: 'active', dateJoined: 'NOV 15, 2023' },
    { id: 2, name: 'MARIA SANTOS', role: 'SECRETARY', status: 'active', dateJoined: 'NOV 16, 2023' },
    { id: 3, name: 'PEDRO PENDUKO', role: 'KAGAWAD', status: 'resigned', dateJoined: 'NOV 15, 2023', dateResigned: 'JAN 10, 2024' },
  ]);

  // --- MENU LOGIC ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResign = (id) => {
    setMembers(members.map(m => 
      m.id === id ? { 
        ...m, 
        status: 'resigned', 
        dateResigned: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase() 
      } : m
    ));
    setOpenMenuId(null);
  };

  const filteredMembers = members.filter(m => m.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      
      {/* SINGLE UNIFIED CONTAINER */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col transition-colors">
        
        {/* 1. HEADER SECTION (Inside Container) */}
        <div className="p-8 pb-6 border-b border-gray-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gray-50/10 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Shield size={16} className="text-blue-600" />
              <h2 className="text-[10px] font-black tracking-[0.4em] text-[#7BA4D0] uppercase">Official Council Records</h2>
            </div>
            <h1 className="text-3xl font-black text-[#0D2440] dark:text-white tracking-tight uppercase">Sangguniang Kabataan</h1>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsPastModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[#7BA4D0] hover:border-blue-400 hover:text-blue-600 shadow-sm active:scale-95"
            >
              <History size={14} /> See Past SK Members
            </button>
            <button className="flex items-center gap-2 bg-[#0D2440] dark:bg-blue-600 px-6 py-2.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-blue-900/10">
              <UserPlus size={12} /> Appoint Member
            </button>
          </div>
        </div>

        {/* 2. TABS SECTION */}
        <div className="flex border-b border-gray-50 dark:border-slate-800 px-6 bg-gray-50/20 dark:bg-slate-900/50">
          <TabButton active={activeTab === 'active'} onClick={() => setActiveTab('active')} label="CURRENT COUNCIL" />
          <TabButton active={activeTab === 'resigned'} onClick={() => setActiveTab('resigned')} label="RESIGNED SK" />
        </div>

        {/* 3. TABLE SECTION */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[9px] font-black text-[#7BA4D0] uppercase tracking-[0.2em] border-b border-gray-50 dark:border-slate-800">
                <th className="px-10 py-6">Member Identity</th>
                <th className="px-6 py-6">Designation</th>
                <th className="px-6 py-6">Registry Date</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800/50">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <tr key={member.id} className={`${member.status === 'resigned' ? 'opacity-50 grayscale' : ''}`}>
                    <td className="px-10 py-7 text-sm font-black text-[#0D2440] dark:text-white tracking-tight uppercase">
                      {member.name}
                    </td>
                    <td className="px-6 py-7">
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-widest uppercase border-b border-blue-100 dark:border-blue-900 pb-0.5">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-7">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-500 dark:text-slate-400 tabular-nums uppercase">
                          {activeTab === 'active' ? member.dateJoined : member.dateResigned}
                        </span>
                        <span className="text-[8px] font-bold text-[#7BA4D0] uppercase tracking-tighter">
                          {activeTab === 'active' ? 'START OF TERM' : 'END OF TERM'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-7 text-right relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === member.id ? null : member.id)}
                        className="p-2 text-[#7BA4D0] hover:text-[#0D2440] dark:hover:text-white transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenuId === member.id && (
                        <div 
                          ref={menuRef}
                          className="absolute right-10 top-16 w-32 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-150"
                        >
                          <button className="w-full px-4 py-2 text-[10px] font-bold uppercase text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2">
                            <Eye size={12} /> View
                          </button>
                          <button className="w-full px-4 py-2 text-[10px] font-bold uppercase text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2">
                            <Edit2 size={12} /> Edit
                          </button>
                          {member.status === 'active' && (
                            <button 
                              onClick={() => handleResign(member.id)}
                              className="w-full px-4 py-2 text-[10px] font-bold uppercase text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 border-t border-gray-50 dark:border-slate-700"
                            >
                              <UserMinus size={12} /> Resign
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-10 py-32 text-center opacity-30 flex flex-col items-center gap-3">
                      <AlertCircle size={32} strokeWidth={3} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">No Records Found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. INTERNAL MODAL LAYER */}
      {isPastModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-[#0D2440]/30 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 flex flex-col max-h-[85vh] overflow-hidden">
            <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/30 dark:bg-slate-900/50">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <History size={16} className="text-[#7BA4D0]" />
                  <h2 className="text-[10px] font-black tracking-[0.3em] text-[#7BA4D0] uppercase">Official Archive</h2>
                </div>
                <h3 className="text-3xl font-black text-[#0D2440] dark:text-white tracking-tight uppercase">Past SK Officials</h3>
              </div>
              <button onClick={() => setIsPastModalOpen(false)} className="p-3 bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-red-500 rounded-2xl transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {pastMembers.map((m) => (
                <div key={m.id} className="p-6 border border-gray-50 dark:border-slate-800 rounded-3xl flex items-center justify-between group transition-all hover:bg-gray-50/50 dark:hover:bg-slate-800/50">
                  <div className="flex items-center gap-6">
                    <div className="w-1.5 h-10 bg-gray-200 dark:bg-slate-700 rounded-full" />
                    <div>
                      <h4 className="text-sm font-black text-[#0D2440] dark:text-white uppercase tracking-tight">{m.name}</h4>
                      <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5">{m.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-12 items-center text-right">
                    <div>
                      <div className="flex items-center justify-end gap-2 text-[10px] font-black text-gray-500 dark:text-slate-400 tabular-nums">
                        <Calendar size={12} /> {m.termPeriod}
                      </div>
                      <p className="text-[8px] font-bold text-[#7BA4D0] uppercase tracking-tighter mt-1">Previous Term Duration</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-50 dark:border-slate-800 bg-gray-50/10 flex justify-end">
              <button onClick={() => setIsPastModalOpen(false)} className="px-8 py-3 bg-[#0D2440] dark:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                Close Registry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER TAB COMPONENT ---
const TabButton = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`px-10 py-6 text-[10px] font-black tracking-[0.2em] transition-all relative ${
      active ? 'text-[#0D2440] dark:text-white' : 'text-[#7BA4D0] hover:text-gray-600'
    }`}
  >
    {label}
    {active && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 animate-in slide-in-from-left duration-300" />}
  </button>
);

export default SKMembers;