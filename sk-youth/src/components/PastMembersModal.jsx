import React from 'react';
import { X, History, FileText, Calendar } from 'lucide-react';

const PastMembersModal = ({ isOpen, onClose, pastMembers }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-[#0D2440]/20 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-8 border-b border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/30 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <History size={16} className="text-[#7BA4D0]" />
              <h2 className="text-[10px] font-black tracking-[0.3em] text-[#7BA4D0] uppercase">Official Archive</h2>
            </div>
            <h3 className="text-3xl font-black text-[#0D2440] dark:text-white tracking-tight uppercase">Past SK Officials</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-gray-100 dark:bg-slate-800 text-gray-400 hover:text-red-500 rounded-2xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {pastMembers && pastMembers.length > 0 ? (
            <div className="space-y-4">
              {pastMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="p-6 border border-gray-50 dark:border-slate-800 rounded-3xl flex items-center justify-between group transition-all hover:bg-gray-50/50 dark:hover:bg-slate-800/50"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-1.5 h-10 bg-gray-200 dark:bg-slate-700 rounded-full" />
                    <div>
                      <h4 className="text-sm font-black text-[#0D2440] dark:text-white uppercase tracking-tight">{member.name}</h4>
                      <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-12 items-center">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 text-[10px] font-black text-gray-500 dark:text-slate-400 tabular-nums">
                        <Calendar size={12} />
                        {member.termPeriod || "2020 — 2023"}
                      </div>
                      <p className="text-[8px] font-bold text-[#7BA4D0] uppercase tracking-tighter mt-1">Previous Term Duration</p>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                      <p className="text-[8px] font-black text-[#7BA4D0] uppercase mb-0.5">End of Service</p>
                      <p className="text-[10px] font-bold text-[#0D2440] dark:text-slate-300 uppercase italic">Term Ended</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4 opacity-30">
              <FileText size={48} strokeWidth={1} />
              <p className="text-xs font-black uppercase tracking-[0.2em]">No historical records available</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-50 dark:border-slate-800 bg-gray-50/10 flex justify-end gap-4">
          <button 
            onClick={onClose} 
            className="px-8 py-3 bg-[#0D2440] dark:bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
          >
            Close Registry
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastMembersModal;