import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck, Calendar, Briefcase, User } from 'lucide-react';

const AddSKMemberModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    designation: 'SK Member',
    registryDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine names for the display if your table still expects a single "name" property
    const combinedData = {
      ...formData,
      fullName: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}${formData.suffix ? ', ' + formData.suffix : ''}`.toUpperCase()
    };
    
    onAdd(combinedData);
    onClose();
    
    // Reset form
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      designation: 'SK Member',
      registryDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all">
        
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Add Council Member</h2>
              <p className="text-[10px] text-slate-500 font-medium">Register a new official for Sangguniang Kabataan.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          {/* NAME DETAILS GRID */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <User size={12} className="text-blue-500" />
                First Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. JUAN"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>

            {/* Middle Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                Middle Name
              </label>
              <input
                type="text"
                placeholder="e.g. PROTACIO"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase"
                value={formData.middleName}
                onChange={(e) => setFormData({...formData, middleName: e.target.value})}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                Last Name
              </label>
              <input
                required
                type="text"
                placeholder="e.g. DELA CRUZ"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>

            {/* Suffix */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                Suffix
              </label>
              <input
                type="text"
                placeholder="e.g. JR, III"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase"
                value={formData.suffix}
                onChange={(e) => setFormData({...formData, suffix: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Designation */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Briefcase size={12} className="text-blue-500" />
                Designation
              </label>
              <select
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase cursor-pointer"
                value={formData.designation}
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
              >
                <option value="SK CHAIRMAN">SK CHAIRMAN</option>
                <option value="SK MEMBER">SK MEMBER</option>
                <option value="SECRETARY">SECRETARY</option>
                <option value="TREASURER">TREASURER</option>
              </select>
            </div>

            {/* Registry Date */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={12} className="text-blue-500" />
                Registry Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                value={formData.registryDate}
                onChange={(e) => setFormData({...formData, registryDate: e.target.value})}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] px-4 py-3 bg-[#0D2440] text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-blue-900/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <UserPlus size={14} />
              Confirm Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSKMemberModal;