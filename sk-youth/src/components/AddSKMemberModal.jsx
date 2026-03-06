import React, { useState, useRef } from 'react';
import { X, UserPlus, User, Camera, Save } from 'lucide-react';

const DESIGNATIONS = ['SK CHAIRMAN', 'SECRETARY', 'TREASURER', 'KAGAWAD'];

const AddSKMemberModal = ({ isOpen, onClose, onAdd }) => {
  // Reference to the hidden file input
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    designation: 'SK CHAIRMAN',
    registryDate: new Date().toISOString().split('T')[0],
    image: null // Store selected file or preview
  });

  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  // Trigger file dialog
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection and create preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, imagePreview: preview });
    onClose();
    setFormData({
      firstName: '', middleName: '', lastName: '', suffix: '',
      designation: 'SK CHAIRMAN',
      registryDate: new Date().toISOString().split('T')[0],
      image: null
    });
    setPreview(null);
  };

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-10 py-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0D2440] dark:text-white uppercase tracking-tight leading-none">
                Register New SK Member
              </h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Official Entry</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-300 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto max-h-[70vh] flex flex-col md:flex-row gap-8">
          
          {/* PHOTO SELECTION AREA */}
          <div className="flex flex-col items-center shrink-0">
             {/* Hidden File Input */}
             <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
             />
             
             <div 
                onClick={handlePhotoClick}
                className="w-32 h-32 rounded-2xl bg-slate-50 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-200 shadow-sm relative group cursor-pointer overflow-hidden"
             >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} />
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[8px] font-black uppercase text-center p-2">
                  <Camera size={16} className="mb-1" />
                  {preview ? 'Change Photo' : 'Choose Photo'}
                </div>
             </div>
             <p className="mt-3 text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Official Identification</p>
          </div>

          <form id="add-member-form" onSubmit={handleSubmit} className="flex-1 space-y-8 uppercase">
            <div>
              <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 border-b pb-2">Member Identity</h3>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" value={formData.firstName} onChange={(v) => setFormData({...formData, firstName: v})} required />
                <InputField label="Middle Name" value={formData.middleName} onChange={(v) => setFormData({...formData, middleName: v})} />
                <InputField label="Last Name" value={formData.lastName} onChange={(v) => setFormData({...formData, lastName: v})} required />
                <InputField label="Suffix" value={formData.suffix} onChange={(v) => setFormData({...formData, suffix: v})} />
              </div>
            </div>

            <div>
              <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 border-b pb-2">Council Role</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Designation</label>
                  <select 
                    value={formData.designation} 
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-transparent rounded-xl text-xs font-bold uppercase text-[#0D2440] dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <InputField label="Registry Date" type="date" value={formData.registryDate} onChange={(v) => setFormData({...formData, registryDate: v})} />
              </div>
            </div>
          </form>
        </div>

        <div className="px-10 py-6 bg-[#0D2440] flex justify-end shrink-0">
          <button 
            form="add-member-form"
            type="submit"
            className="flex items-center gap-2 px-8 py-2.5 bg-white text-[#0D2440] rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 hover:bg-slate-50"
          >
            <Save size={14} /> Confirm Registration
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text", required = false }) => (
  <div className="space-y-1.5 min-w-0">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    <input 
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value.toUpperCase())}
      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-transparent rounded-xl text-xs font-bold uppercase text-[#0D2440] dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 hover:bg-slate-100/50 transition-all"
    />
  </div>
);

export default AddSKMemberModal;