import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, User, Save, UserPlus, Edit3, Camera } from 'lucide-react';

const AddProfileModal = ({ isOpen, onClose, mode, initialData, onSave }) => {
  const fileInputRef = useRef(null);

  // 1. STATE
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', suffix: '',
    birthdate: '', age: '', sex: 'Male', civilStatus: 'Single',
    email: '', contact: '',
    region: 'VIII', province: 'Northern Samar', municipality: 'Catarman', barangay: 'Old Rizal', purok: '',
    youthClass: 'In-School Youth', workStatus: 'Student', education: 'High School Level',
    image: ''
  });

  // 2. SYNC DATA
  useEffect(() => {
    if (initialData && (mode === 'edit' || mode === 'view')) {
      setFormData(initialData);
    } else {
      setFormData({ 
        firstName: '', middleName: '', lastName: '', suffix: '',
        birthdate: '', age: '', sex: 'Male', civilStatus: 'Single',
        email: '', contact: '',
        region: 'VIII', province: 'Northern Samar', municipality: 'Catarman', barangay: 'Old Rizal', purok: '',
        youthClass: 'In-School Youth', workStatus: 'Student', education: 'High School Level',
        image: '' 
      });
    }
  }, [initialData, isOpen, mode]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const triggerFileInput = () => {
    if (mode !== 'view') fileInputRef.current.click();
  };

  if (!isOpen) return null;

  const isAdd = mode === 'add';
  const isView = mode === 'view';
  const isEdit = mode === 'edit';
  const isDisabled = isView;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0D2440]/30 dark:bg-slate-900/80 backdrop-blur-sm transition-colors" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200 transition-colors flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-5 flex justify-between items-center border-b border-gray-50 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${
              isAdd ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : isEdit ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400'
            }`}>
              {isAdd ? <UserPlus size={20} /> : isEdit ? <Edit3 size={20} /> : <Eye size={20} />}
            </div>
            <div>
              <h2 className="text-base font-black text-[#0D2440] dark:text-white leading-tight transition-colors">
                {isAdd ? 'Register New Youth' : isEdit ? 'Modify Youth Profile' : 'View Youth Profile'}
              </h2>
              <p className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                {isAdd ? 'Official Entry' : 'Existing Record'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 dark:text-slate-500 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto">
          <div className="flex gap-8 items-start">
             
            {/* Left Column: Avatar */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            
              <div
                onClick={triggerFileInput}
                className={`w-28 h-28 rounded-2xl overflow-hidden border-4 border-gray-50 dark:border-slate-800 shadow-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center group relative transition-all duration-200 ${!isView ? 'cursor-pointer hover:shadow-xl hover:border-blue-400/50' : ''}`}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={32} className="text-gray-300 dark:text-slate-600" />
                )}
            
                {/* Hover text and icon */}
                {!isView && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200">
                    <Camera size={20} className="text-white mb-1" />
                    <span className="text-white text-xs font-medium px-2 text-center">
                      Choose profile
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Form Fields */}
            <div className="flex-1 space-y-6">
                
              {/* 1. PERSONAL INFO */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700 pb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                      <EditField label="First Name" value={formData.firstName} onChange={(v)=>setFormData({...formData, firstName: v})} disabled={isDisabled} />
                      <EditField label="Middle Name" value={formData.middleName} onChange={(v)=>setFormData({...formData, middleName: v})} disabled={isDisabled} />
                      <EditField label="Last Name" value={formData.lastName} onChange={(v)=>setFormData({...formData, lastName: v})} disabled={isDisabled} />
                      <EditField label="Suffix" value={formData.suffix} onChange={(v)=>setFormData({...formData, suffix: v})} disabled={isDisabled} />
                      <EditField label="Birthdate" type="date" value={formData.birthdate} onChange={(v)=>setFormData({...formData, birthdate: v})} disabled={isDisabled} />
                      <EditField label="Age" type="number" value={formData.age} onChange={(v)=>setFormData({...formData, age: v})} disabled={isDisabled} />
                      
                      <SelectField label="Sex" value={formData.sex} onChange={(v)=>setFormData({...formData, sex: v})} options={["Male", "Female"]} disabled={isDisabled} />
                      <SelectField label="Civil Status" value={formData.civilStatus} onChange={(v)=>setFormData({...formData, civilStatus: v})} options={["Single", "Married", "Widowed", "Separated"]} disabled={isDisabled} />
                  </div>
                </div>

                {/* 2. DEMOGRAPHICS */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700 pb-2">Demographics</h3>
                  <div className="grid grid-cols-2 gap-4">
                      <SelectField label="Youth Class" value={formData.youthClass} onChange={(v)=>setFormData({...formData, youthClass: v})} options={["In-School Youth", "Out-of-School Youth", "Working Youth", "Specific Needs"]} disabled={isDisabled} />
                      <SelectField label="Work Status" value={formData.workStatus} onChange={(v)=>setFormData({...formData, workStatus: v})} options={["Student", "Employed", "Unemployed", "Self-Employed"]} disabled={isDisabled} />
                      <EditField label="Education" value={formData.education} onChange={(v)=>setFormData({...formData, education: v})} disabled={isDisabled} />
                      <EditField label="Contact No." value={formData.contact} onChange={(v)=>setFormData({...formData, contact: v})} disabled={isDisabled} />
                      <EditField label="Email" value={formData.email} onChange={(v)=>setFormData({...formData, email: v})} disabled={isDisabled} className="col-span-2" />
                  </div>
                </div>

                {/* 3. LOCATION */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-700 pb-2">Location</h3>
                  <div className="grid grid-cols-2 gap-4">
                      <EditField label="Region" value={formData.region} disabled={true} />
                      <EditField label="Province" value={formData.province} disabled={true} />
                      <EditField label="Municipality" value={formData.municipality} disabled={true} />
                      <EditField label="Barangay" value={formData.barangay} disabled={true} />
                      <EditField label="Sitio / Purok" value={formData.purok} onChange={(v)=>setFormData({...formData, purok: v})} disabled={isDisabled} className="col-span-2" />
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Footer */}
        {!isView && (
            <div className="px-8 py-4 bg-[#0D2440] dark:bg-slate-950 flex justify-end items-center shrink-0 transition-colors">
                <button onClick={() => onSave(formData)} className="flex items-center gap-2 px-8 py-2.5 bg-white dark:bg-slate-800 text-[#0D2440] dark:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg hover:bg-gray-100 dark:hover:bg-slate-700 active:scale-95">
                    <Save size={14} /> {isAdd ? 'Register Youth' : 'Save Changes'}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

// HELPER COMPONENTS
const EditField = ({ label, value, onChange, type = "text", disabled, className = "" }) => (
  <div className={`min-w-0 ${className}`}>
    <p className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-1 transition-colors">{label}</p>
    <input 
      type={type}
      value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className={`w-full text-xs font-bold bg-gray-50 dark:bg-slate-800 border-none rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-[#0D2440] dark:text-white ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, disabled }) => (
  <div className="min-w-0">
    <p className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-1 transition-colors">{label}</p>
    <select 
      value={value} 
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className={`w-full text-xs font-bold bg-gray-50 dark:bg-slate-800 border-none rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-[#0D2440] dark:text-white ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default AddProfileModal;