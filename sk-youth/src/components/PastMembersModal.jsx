import React from 'react';
import { X, History, Archive, Clock, UserMinus } from 'lucide-react';

const PastMembersModal = ({ isOpen, onClose, pastMembers, formatName, formatDate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[80vh] overflow-hidden transition-all">
        
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <History size={14} className="text-blue-600" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100">
              Council Archive
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {pastMembers && pastMembers.length > 0 ? (
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {pastMembers.map((member) => (
                <div key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[12px] font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                        {formatName(member)}
                      </h4>
                      {/* Badge logic: Shows if they Resigned or finished a Term */}
                      {member.status === 'resigned' ? (
                        <span className="flex items-center gap-1 text-[7px] font-black bg-red-50 text-red-500 px-1.5 py-0.5 rounded uppercase">
                          <UserMinus size={8} /> Resigned
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[7px] font-black bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded uppercase">
                          <Clock size={8} /> Term Completed
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">
                      {member.designation}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 tabular-nums">
                      {formatDate(member.date_joined)} — {formatDate(member.date_resigned || member.date_joined)}
                    </p>
                    <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
                      Archived Record
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-3 opacity-20">
              <Archive size={32} strokeWidth={1.5} />
              <p className="text-[10px] font-black uppercase tracking-widest">Archive Empty</p>
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button onClick={onClose} className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-800 transition-colors">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastMembersModal;