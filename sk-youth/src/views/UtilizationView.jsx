import React, { useState, useEffect } from 'react';
import { Wallet, Download, TrendingUp } from 'lucide-react';
import { exportSKFundReport } from '../utils/exportSKFundReport';
import { supabase } from '../supabaseClient';

const UtilizationView = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestFunds();
  }, []);

  const fetchLatestFunds = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('fund_utilization')
      .select(`
        *,
        fund_expenses (category, amount)
      `)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error(error);
    } else if (data && data.length > 0) {
      const record = data[0];
      setFunds({
        year: record.year,
        barangay: record.barangay,
        totalSKFunds: record.total_sk_funds || 0,
        expenses: record.fund_expenses || []
      });
    } else {
      setFunds({
        year: "2026",
        barangay: "OLD RIZAL",
        totalSKFunds: 0,
        expenses: []
      });
    }
    setLoading(false);
  };

  if (loading) return <div className="p-20 text-center text-slate-500">Loading latest fund data...</div>;

  const totalSpent = funds.expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const unutilizedFund = funds.totalSKFunds - totalSpent;
  const utilizationRate = funds.totalSKFunds > 0 ? ((totalSpent / funds.totalSKFunds) * 100).toFixed(1) : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        
        <div className="px-10 pt-10 pb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={16} className="text-[#7BA4D0]" />
              <h2 className="text-[10px] font-black tracking-[0.3em] text-[#7BA4D0] uppercase">
                Financial Tracking
              </h2>
            </div>
            <h1 className="text-3xl font-black text-[#0D2440] dark:text-white uppercase tracking-tight leading-none mb-2">
              Fund Utilization
            </h1>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
              {funds.barangay} • FY {funds.year}
            </p>
          </div>

          <button
            onClick={() => exportSKFundReport()}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-[#0D2440] dark:hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
            <Download size={16} /> Export Report
          </button>
        </div>

        <div className="px-10 pb-10 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-50 dark:border-slate-800/50">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Total SK Funds</p>
            <p className="text-3xl font-black text-[#0D2440] dark:text-white tabular-nums">
              {formatCurrency(funds.totalSKFunds)}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1.5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Utilized</p>
              <div className="flex items-center gap-1 text-emerald-500">
                <TrendingUp size={12} strokeWidth={3} />
                <span className="text-[10px] font-black">{utilizationRate}%</span>
              </div>
            </div>
            <p className="text-3xl font-black text-[#0D2440] dark:text-white tabular-nums mb-3">
              {formatCurrency(totalSpent)}
            </p>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${Math.min(utilizationRate, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Unutilized Fund</p>
            <p className="text-3xl font-black text-slate-400 dark:text-slate-500 tabular-nums">
              {formatCurrency(unutilizedFund)}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/20">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="px-10 py-5 text-[10px] font-black text-[#7BA4D0] uppercase tracking-[0.2em] w-16 text-center">No.</th>
                <th className="px-6 py-5 text-[10px] font-black text-[#7BA4D0] uppercase tracking-[0.2em]">Program / Project Category</th>
                <th className="px-6 py-5 text-[10px] font-black text-[#7BA4D0] uppercase tracking-[0.2em] text-right">Amount Spent</th>
                <th className="px-10 py-5 text-[10px] font-black text-[#7BA4D0] uppercase tracking-[0.2em] text-right">% Allocation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {funds.expenses.map((expense, idx) => {
                const isZero = expense.amount === 0;
                const percentage = funds.totalSKFunds > 0 ? ((expense.amount / funds.totalSKFunds) * 100).toFixed(1) : 0;
                
                return (
                  <tr key={idx} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors ${isZero ? 'opacity-40 grayscale' : ''}`}>
                    <td className="px-10 py-5 text-[10px] font-bold text-slate-300 dark:text-slate-600 text-center">
                      {String(idx + 1).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-5 text-xs font-black text-[#0D2440] dark:text-white uppercase tracking-wide">
                      {expense.category}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-[#0D2440] dark:text-slate-300 text-right tabular-nums">
                      {isZero ? '—' : formatCurrency(expense.amount)}
                    </td>
                    <td className="px-10 py-5 text-right">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md tracking-widest ${isZero ? 'text-slate-400' : 'bg-slate-100 dark:bg-slate-800 text-[#0D2440] dark:text-white'}`}>
                        {isZero ? '0.0%' : `${percentage}%`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UtilizationView;