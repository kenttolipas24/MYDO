import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { X, Printer, BarChart3, Wallet, FileSpreadsheet } from 'lucide-react';
import { KKProfilePrint } from './KKProfilePrint'; 

const GenerateReportModal = ({ isOpen, onClose }) => {
  const componentRef = useRef(null);
  const [selectedType, setSelectedType] = useState('kk');

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: selectedType === 'kk' ? "KK_Profile_Summary" : "Utilization_Report",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-blue-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Print Preparation</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-3">
          {/* KK Profile Selection */}
          <button 
            onClick={() => setSelectedType('kk')}
            className={`w-full p-4 border rounded-lg text-left transition-all ${
              selectedType === 'kk' ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${selectedType === 'kk' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">Summary of KK Profile</div>
                <div className="text-[10px] text-slate-400 font-medium tracking-tight">Auto-summarized demographics for official hard copy filing[cite: 7].</div>
              </div>
            </div>
          </button>

          {/* Utilization Report Selection */}
          <button 
            onClick={() => setSelectedType('utilization')}
            className={`w-full p-4 border rounded-lg text-left transition-all ${
              selectedType === 'utilization' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${selectedType === 'utilization' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                <Wallet size={20} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">Utilization Report</div>
                <div className="text-[10px] text-slate-400 font-medium tracking-tight">Financial appropriations and spending summary.</div>
              </div>
            </div>
          </button>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={() => handlePrint()} 
            className="px-6 py-2 bg-[#0D2440] dark:bg-blue-600 text-white text-[10px] font-bold uppercase rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
          >
            <Printer size={14} /> Generate & Print
          </button>
        </div>

        {/* Hidden Container for Print Data */}
        <div style={{ display: 'none' }}>
           <div ref={componentRef}>
             {selectedType === 'kk' ? (
                <KKProfilePrint />
              ) : (
                <div className="p-20 bg-white text-black font-serif text-center uppercase font-bold underline">
                  Fund Utilization Summary Report
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportModal;