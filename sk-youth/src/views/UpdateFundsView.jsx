import React, { useState, useEffect, useRef } from 'react';
import { 
  Wallet, Save, ArrowLeft, TrendingUp, AlertCircle, Eye, EyeOff, Lock, X, ShieldCheck 
} from 'lucide-react';
import { supabase } from '../supabaseClient';   // ← Added import

// ── Change this to your desired password ──────────────────────────────────
const FUND_UPDATE_PASSWORD = 'mydo2025';

// ── Password Confirmation Modal ────────────────────────────────────────────
const PasswordModal = ({ onConfirm, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleConfirm = () => {
    if (password === FUND_UPDATE_PASSWORD) {
      onConfirm();
    } else {
      setError('Incorrect password. Please try again.');
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ${shake ? 'animate-shake' : ''}`}
      >
        {/* Header - unchanged */}
        <div className="px-7 pt-7 pb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
              <Lock size={18} className="text-amber-500" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0D2440] dark:text-white uppercase tracking-wider leading-none">
                Confirm Update
              </h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Authorization Required
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors">
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-7 pb-7 space-y-4">
          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed">
            Enter the fund management password to save these records. This ensures only authorized users can modify financial data.
          </p>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-[#0D2440] dark:text-white uppercase tracking-widest">
              Password
            </label>
            <div className="relative">
              {/* FIXED: Use type="text" + CSS to hide characters → Browser won't detect it as password */}
              <input
                ref={inputRef}
                type="text"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                onKeyDown={handleKeyDown}
                placeholder="Enter password"
                className={`w-full px-4 py-3 pr-10 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm font-bold text-[#0D2440] dark:text-white outline-none focus:ring-2 transition-all
                  ${error
                    ? 'border-red-300 dark:border-red-500/50 focus:border-red-400 focus:ring-red-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:border-blue-400 focus:ring-blue-500/20'
                  }`}
                style={{ 
                  WebkitTextSecurity: 'disc',   // Makes dots like password
                  fontFamily: 'sans-serif'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 animate-in slide-in-from-top-1 duration-150">
                <AlertCircle size={12} className="text-red-500 flex-shrink-0" />
                <p className="text-[10px] font-bold text-red-500">{error}</p>
              </div>
            )}
          </div>

          {/* Actions - unchanged */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!password}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0D2440] dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShieldCheck size={13} strokeWidth={2.5} /> Confirm
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

// ── Main UpdateFundsView ───────────────────────────────────────────────────
const UpdateFundsView = ({ currentData, onSave, onCancel }) => {
  const [totalFunds, setTotalFunds] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (currentData) {
      setTotalFunds(currentData.totalSKFunds || 0);
      setExpenses(JSON.parse(JSON.stringify(currentData.expenses || [])));
    }
  }, [currentData]);

  const handleExpenseChange = (index, newValue) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index].amount = Number(newValue) || 0;
    setExpenses(updatedExpenses);
  };

  const handleSaveClick = () => {
    setShowPasswordModal(true);
  };

  useEffect(() => {
  const fetchData = async () => {
    const { data: utilization } = await supabase
      .from('fund_utilization')
      .select('*')
      .eq('year', currentData.year)
      .eq('barangay', currentData.barangay)
      .maybeSingle();

    if (!utilization) return;

    setTotalFunds(utilization.total_sk_funds || 0);

    const { data: expensesData } = await supabase
      .from('fund_expenses')
      .select('*')
      .eq('utilization_id', utilization.id);

    if (expensesData) {
      const mapped = currentData.expenses.map(cat => {
        const found = expensesData.find(e => e.category === cat.category);
        return {
          category: cat.category,
          amount: found ? Number(found.amount) : 0
        };
      });

      setExpenses(mapped);
    }
  };

  fetchData();
}, []);

    // ==================== FIXED handleConfirmed ====================
  const handleConfirmed = async () => {
    setShowPasswordModal(false);

    try {
      const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

      // 1. First try to find existing record
      let { data: existing, error: fetchError } = await supabase
        .from('fund_utilization')
        .select('id')
        .eq('year', currentData.year)
        .eq('barangay', currentData.barangay)
        .maybeSingle();

      let utilizationId;

      if (existing?.id) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('fund_utilization')
          .update({
            total_sk_funds: Number(totalFunds),
            utilized_sk_funds: 'YES',
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (updateError) throw updateError;
        utilizationId = existing.id;

      } else {
        // Insert new record
        const { data: newRecord, error: insertError } = await supabase
          .from('fund_utilization')
          .insert({
            year: currentData.year,
            region: currentData.region || 'REGION VIII (EASTERN VISAYAS)',
            province: currentData.province,
            city: currentData.city,
            barangay: currentData.barangay,
            total_sk_funds: Number(totalFunds),
            utilized_sk_funds: 'YES',
          })
          .select('id')
          .single();

        if (insertError) throw insertError;
        utilizationId = newRecord.id;
      }

      // 2. Delete old expenses for this utilization
      if (utilizationId) {
        await supabase
          .from('fund_expenses')
          .delete()
          .eq('utilization_id', utilizationId);

        // 3. Insert new expenses
        const expensePayload = expenses.map(exp => ({
          utilization_id: utilizationId,
          category: exp.category,
          amount: exp.amount || 0
        }));

        const { error: expError } = await supabase
          .from('fund_expenses')
          .insert(expensePayload);

        if (expError) throw expError;
      }

      alert('✅ Funds saved successfully to database!');

      if (onSave) {
        onSave({
          ...currentData,
          totalSKFunds: Number(totalFunds),
          expenses: expenses
        });
      }

      onCancel(); // Go back to Overview

    } catch (error) {
      console.error('Save error:', error);
      alert('❌ Failed to save to database: ' + (error.message || error));
    }
  };

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalFunds - totalSpent;
  const isOverBudget = remaining < 0;
  const utilizationRate = totalFunds > 0 ? ((totalSpent / totalFunds) * 100).toFixed(1) : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', { maximumFractionDigits: 2 }).format(amount);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto py-8 px-6 animate-in fade-in duration-500">

        {/* PAGE HEADER - Unchanged */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <button
              onClick={onCancel}
              className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-[#0D2440] dark:hover:text-white uppercase tracking-widest transition-colors mb-4 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Overview
            </button>
            <div className="flex items-center gap-2 mb-1.5">
              <Wallet size={15} className="text-[#7BA4D0]" />
              <span className="text-[10px] font-black tracking-[0.3em] text-[#7BA4D0] uppercase">Financial Entry</span>
            </div>
            <h1 className="text-3xl font-black text-[#0D2440] dark:text-white uppercase tracking-tight leading-none">
              Update Fund Allocation
            </h1>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1.5">
              {currentData?.barangay} • FY {currentData?.year}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-10">
            <button
              onClick={onCancel}
              className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveClick}
              disabled={isOverBudget}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0D2440] dark:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save size={14} strokeWidth={2.5} /> Save Records
            </button>
          </div>
        </div>

        <div className="space-y-6">

          {/* OVER BUDGET ALERT - Unchanged */}
          {isOverBudget && (
            <div className="flex items-center gap-3 px-5 py-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl animate-in slide-in-from-top-1 duration-200">
              <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
              <p className="text-[11px] font-black text-red-500 uppercase tracking-widest">
                Total expenditures exceed approved funds by ₱ {formatCurrency(Math.abs(remaining))}
              </p>
            </div>
          )}

          {/* MASTER BUDGET CARD - Unchanged */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
              <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Approved Budget
              </h2>
            </div>
            <div className="px-8 py-8 flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1 w-full">
                <label className="block text-[10px] font-black text-[#0D2440] dark:text-white uppercase tracking-widest mb-2.5">
                  Total Approved SK Funds (₱)
                </label>
                <input
                  type="number"
                  value={totalFunds === 0 ? '' : totalFunds}
                  onChange={(e) => setTotalFunds(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-5 py-4 bg-[#F8FAFC] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-2xl font-black text-[#0D2440] dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="flex-[0.9] w-full flex flex-col gap-4 md:pl-8 md:border-l border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Allocated</span>
                  <span className="text-sm font-black text-[#0D2440] dark:text-white tabular-nums">₱ {formatCurrency(totalSpent)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Remaining Balance</span>
                  <span className={`text-sm font-black tabular-nums ${isOverBudget ? 'text-red-500' : 'text-emerald-500'}`}>
                    {isOverBudget ? '-' : ''}₱ {formatCurrency(Math.abs(remaining))}
                  </span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Utilization</span>
                    <div className="flex items-center gap-1 text-emerald-500">
                      <TrendingUp size={11} strokeWidth={3} />
                      <span className="text-[10px] font-black">{utilizationRate}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${isOverBudget ? 'bg-red-400' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(utilizationRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EXPENDITURES CARD - Unchanged */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800">
              <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Program &amp; Project Expenditures
              </h2>
            </div>
            <div className="px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {expenses.map((expense, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">
                      <span className="text-slate-300 dark:text-slate-600 mr-1">{String(idx + 1).padStart(2, '0')}.</span>
                      {expense.category}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[11px] font-black text-slate-400">₱</span>
                      <input
                        type="number"
                        value={expense.amount === 0 ? '' : expense.amount}
                        onChange={(e) => handleExpenseChange(idx, e.target.value)}
                        placeholder="0"
                        className="w-full pl-8 pr-4 py-3 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl text-sm font-black text-[#0D2440] dark:text-white outline-none focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500/20 border border-transparent focus:border-blue-400 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-8 py-5 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Expenditures</span>
              <span className={`text-lg font-black tabular-nums ${isOverBudget ? 'text-red-500' : 'text-[#0D2440] dark:text-white'}`}>
                ₱ {formatCurrency(totalSpent)}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <PasswordModal
          onConfirm={handleConfirmed}
          onClose={() => setShowPasswordModal(false)}
        />
      )}
    </>
  );
};

export default UpdateFundsView;