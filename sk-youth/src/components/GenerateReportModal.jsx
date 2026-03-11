import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { X, Printer, BarChart3, Wallet, FileSpreadsheet, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { KKProfilePrint } from './KKProfilePrint'; 

const GenerateReportModal = ({ isOpen, onClose }) => {
  const componentRef = useRef(null);
  const [selectedType, setSelectedType] = useState('kk');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  // Fetch and aggregate data when the modal opens
  useEffect(() => {
    if (isOpen && selectedType === 'kk') {
      fetchAndCalculateStats();
    }
  }, [isOpen, selectedType]);

  const fetchAndCalculateStats = async () => {
    setLoading(true);
    try {
      // Fetch all youth profiles
      const { data, error } = await supabase.from('youth_profiles').select('*');
      if (error) throw error;

      // Initialize empty statistics object based on your print template requirements
      const initialStats = {
        totalYouth: data.length,
        ageSex: {
          male: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 },
          female: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 },
          totals: { '15-17': 0, '18-24': 0, '25-30': 0, grand: 0 }
        },
        childYouth: { male: { 15: 0, 16: 0, 17: 0, total: 0 }, female: { 15: 0, 16: 0, 17: 0, total: 0 }, totals: { 15: 0, 16: 0, 17: 0, grand: 0 } },
        coreYouth: { male: { 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, total: 0 }, female: { 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, total: 0 }, totals: { 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0, 24: 0, grand: 0 } },
        youngAdult: { male: { 25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0, total: 0 }, female: { 25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0, total: 0 }, totals: { 25: 0, 26: 0, 27: 0, 28: 0, 29: 0, 30: 0, grand: 0 } },
        civilStatus: {
          '15-17': { single: 0, married: 0, widowed: 0, divorced: 0, separated: 0, annulled: 0, liveIn: 0, unknown: 0 },
          '18-24': { single: 0, married: 0, widowed: 0, divorced: 0, separated: 0, annulled: 0, liveIn: 0, unknown: 0 },
          '25-30': { single: 0, married: 0, widowed: 0, divorced: 0, separated: 0, annulled: 0, liveIn: 0, unknown: 0 },
          totals: { single: 0, married: 0, widowed: 0, divorced: 0, separated: 0, annulled: 0, liveIn: 0, unknown: 0 }
        },
        education: {
          elemLevel: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 }, elemGrad: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 },
          hsLevel: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 }, hsGrad: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 },
          vocGrad: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 },
          colLevel: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 }, colGrad: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 },
          masterLevel: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 }, masterGrad: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 },
          docLevel: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 }, docGrad: { '15-17': 0, '18-24': 0, '25-30': 0, total: 0 }
        },
        classification: {
          '15-17': { inSchool: 0, outOfSchool: 0, working: 0, specificNeeds: 0, pwd: 0, cicl: 0, ip: 0 },
          '18-24': { inSchool: 0, outOfSchool: 0, working: 0, specificNeeds: 0, pwd: 0, cicl: 0, ip: 0 },
          '25-30': { inSchool: 0, outOfSchool: 0, working: 0, specificNeeds: 0, pwd: 0, cicl: 0, ip: 0 },
          totals: { inSchool: 0, outOfSchool: 0, working: 0, specificNeeds: 0, pwd: 0, cicl: 0, ip: 0 }
        },
        workStatus: {
          '15-17': { employed: 0, unemployed: 0, selfEmployed: 0, looking: 0, notInterested: 0 },
          '18-24': { employed: 0, unemployed: 0, selfEmployed: 0, looking: 0, notInterested: 0 },
          '25-30': { employed: 0, unemployed: 0, selfEmployed: 0, looking: 0, notInterested: 0 },
          totals: { employed: 0, unemployed: 0, selfEmployed: 0, looking: 0, notInterested: 0 }
        }
      };

      // Iterate through each youth and aggregate data
      data.forEach(youth => {
        const age = parseInt(youth.age) || 0;
        const sex = youth.sex?.toLowerCase() === 'male' ? 'male' : 'female';
        
        // Determine Age Group
        let group = '';
        if (age >= 15 && age <= 17) group = '15-17';
        else if (age >= 18 && age <= 24) group = '18-24';
        else if (age >= 25 && age <= 30) group = '25-30';
        else return; // Ignore records outside 15-30 range

        // 1. Age & Sex Table
        initialStats.ageSex[sex][group]++;
        initialStats.ageSex[sex].total++;
        initialStats.ageSex.totals[group]++;
        initialStats.ageSex.totals.grand++;

        // 2. Child Youth Table
        if (group === '15-17') {
          initialStats.childYouth[sex][age]++;
          initialStats.childYouth[sex].total++;
          initialStats.childYouth.totals[age]++;
          initialStats.childYouth.totals.grand++;
        }

        // 3. Core Youth Table
        if (group === '18-24') {
          initialStats.coreYouth[sex][age]++;
          initialStats.coreYouth[sex].total++;
          initialStats.coreYouth.totals[age]++;
          initialStats.coreYouth.totals.grand++;
        }

        // 4. Young Adult Table
        if (group === '25-30') {
          initialStats.youngAdult[sex][age]++;
          initialStats.youngAdult[sex].total++;
          initialStats.youngAdult.totals[age]++;
          initialStats.youngAdult.totals.grand++;
        }

        // 5. Civil Status
        let statusKey = 'unknown';
        const cs = youth.civil_status?.toLowerCase() || '';
        if (cs.includes('single')) statusKey = 'single';
        else if (cs.includes('married')) statusKey = 'married';
        else if (cs.includes('widow')) statusKey = 'widowed';
        else if (cs.includes('divorce')) statusKey = 'divorced';
        else if (cs.includes('separat')) statusKey = 'separated';
        else if (cs.includes('annull')) statusKey = 'annulled';
        else if (cs.includes('live')) statusKey = 'liveIn';

        initialStats.civilStatus[group][statusKey]++;
        initialStats.civilStatus.totals[statusKey]++;

        // 6. Education
        let eduKey = 'hsLevel'; // Default fallback
        const edu = youth.education?.toLowerCase() || '';
        if (edu.includes('elem') && edu.includes('level')) eduKey = 'elemLevel';
        else if (edu.includes('elem') && edu.includes('grad')) eduKey = 'elemGrad';
        else if (edu.includes('high') && edu.includes('grad')) eduKey = 'hsGrad';
        else if (edu.includes('voc')) eduKey = 'vocGrad';
        else if (edu.includes('college') && edu.includes('level')) eduKey = 'colLevel';
        else if (edu.includes('college') && edu.includes('grad')) eduKey = 'colGrad';
        else if (edu.includes('master') && edu.includes('level')) eduKey = 'masterLevel';
        else if (edu.includes('master') && edu.includes('grad')) eduKey = 'masterGrad';
        else if (edu.includes('doc') && edu.includes('level')) eduKey = 'docLevel';
        else if (edu.includes('doc') && edu.includes('grad')) eduKey = 'docGrad';

        initialStats.education[eduKey][group]++;
        initialStats.education[eduKey].total++;

        // 7. Classification
        let classKey = 'inSchool';
        const yClass = youth.youth_class?.toLowerCase() || '';
        if (yClass.includes('out')) classKey = 'outOfSchool';
        else if (yClass.includes('work')) classKey = 'working';
        else if (yClass.includes('pwd')) classKey = 'pwd';
        
        initialStats.classification[group][classKey]++;
        initialStats.classification.totals[classKey]++;

        // 8. Work Status
        let workKey = 'notInterested';
        const wStat = youth.work_status?.toLowerCase() || '';
        if (wStat.includes('unemploy')) workKey = 'unemployed';
        else if (wStat.includes('self')) workKey = 'selfEmployed';
        else if (wStat.includes('look')) workKey = 'looking';
        else if (wStat.includes('employ')) workKey = 'employed';

        initialStats.workStatus[group][workKey]++;
        initialStats.workStatus.totals[workKey]++;
      });

      setStats(initialStats);
    } catch (error) {
      console.error('Error fetching KK data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: selectedType === 'kk' ? "KK_Profile_Summary" : "Utilization_Report",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-blue-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Print Preparation</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-3">
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
                <div className="text-[10px] text-slate-400 font-medium tracking-tight">Auto-summarized demographics from Youth Registry.</div>
              </div>
            </div>
          </button>

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

        <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={() => handlePrint()} 
            disabled={loading || !stats}
            className="px-6 py-2 bg-[#0D2440] dark:bg-blue-600 text-white text-[10px] font-bold uppercase rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Printer size={14} />} 
            {loading ? 'Processing Data...' : 'Generate & Print'}
          </button>
        </div>

        {/* Hidden Container for Print Data */}
        <div style={{ display: 'none' }}>
           <div ref={componentRef}>
             {selectedType === 'kk' && stats ? (
                <KKProfilePrint stats={stats} />
              ) : (
                <div className="p-20 bg-white text-black font-serif text-center uppercase font-bold underline">
                  Fund Utilization Summary Report (In Development)
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportModal;