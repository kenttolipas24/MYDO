import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, Shield, User, Star, StarHalf, Save, UserPlus, Edit3, Camera } from 'lucide-react';

const AddProfileModal = ({ isOpen, onClose, mode, initialData, onSave }) => {
  const fileInputRef = useRef(null);

  // 1. STATE
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '', 
    lastName: '',
    suffix: '',    
    skmtNo: '',
    birthdate: '',
    gender: 'Male', 
    brgy: '',
    status: 'Active',
    image: ''       
  });

  // 2. SYNC DATA
  useEffect(() => {
    if (initialData && (mode === 'edit' || mode === 'view')) {
      setFormData(initialData);
    } else {
      setFormData({ 
        firstName: '', middleName: '', lastName: '', suffix: '', 
        skmtNo: '', birthdate: '', gender: 'Male', brgy: '', status: 'Active', image: '' 
      });
    }
  }, [initialData, isOpen, mode]);

  // 3. HANDLERS
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const triggerFileInput = () => {
    if (mode !== 'view') {
      fileInputRef.current.click();
    }
  };

  if (!isOpen) return null;

  const isAdd = mode === 'add';
  const isView = mode === 'view';
  const isEdit = mode === 'edit';

  // Helper to construct Full Name for View Mode
  const fullName = `${formData.firstName} ${formData.middleName || ''} ${formData.lastName} ${formData.suffix || ''}`.replace(/\s+/g, ' ').trim();

  const categories = [
    { name: "CBYDP", status: true },
    { name: "ABYIP", status: false },
    { name: "BUDGET", status: true },
    { name: "KK PROFILE", status: false },
    { name: "DIRECTORY", status: true },
    { name: "UTILIZATION", status: false }
  ];

  // =========================================================
  // Grid: 
  // Full Name   | Birthdate
  // SKMT Number | Gender
  // Barangay    | Status
  // =========================================================
  const RenderViewInterface = () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      {/* Row 1 */}
      <ViewField label="FULL NAME" value={fullName} />
      <ViewField label="BIRTHDATE" value={formData.birthdate} />

      {/* Row 2 */}
      <ViewField label="SKMT NUMBER" value={formData.skmtNo} isHighlight />
      <ViewField label="GENDER" value={formData.gender} />

      {/* Row 3 */}
      <ViewField label="BARANGAY" value={formData.brgy || 'Airport Village'} />
      <div>
        <p className="text-[9px] font-bold text-gray-400 uppercase mb-1 tracking-wide">STATUS</p>
        <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[9px] font-black border border-emerald-100 uppercase">
          {formData.status || 'ACTIVE'}
        </span>
      </div>
    </div>
  );

  // =========================================================
  // LAYOUT 2: MODIFY / ADD DETAILS
  // =========================================================
  const RenderModifyInterface = () => (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      
      {/* Row 1: First Name & Middle Name */}
      <EditField 
        label="First Name" 
        value={formData.firstName} 
        onChange={(v) => setFormData({...formData, firstName: v})} 
      />
      <EditField 
        label="Middle Name" 
        value={formData.middleName} 
        onChange={(v) => setFormData({...formData, middleName: v})} 
      />

      {/* Row 2: Last Name & Suffix */}
      <EditField 
        label="Last Name" 
        value={formData.lastName} 
        onChange={(v) => setFormData({...formData, lastName: v})} 
      />
      <EditField 
        label="Suffix (e.g. Jr.)" 
        value={formData.suffix} 
        onChange={(v) => setFormData({...formData, suffix: v})} 
      />
      
      {/* Divider */}
      {isAdd && <div className="col-span-2 h-px bg-gray-50 my-2" />}

      {/* Row 3: SKMT & Birthdate */}
      <EditField 
        label="SKMT Number" 
        value={formData.skmtNo} 
        isHighlight 
        onChange={(v) => setFormData({...formData, skmtNo: v})} 
      />
      <EditField 
        label="Birthdate" 
        type="date" 
        value={formData.birthdate} 
        onChange={(v) => setFormData({...formData, birthdate: v})} 
      />

      {/* Row 4: Gender & Barangay */}
      <div>
        <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Gender</p>
        <select 
          className="w-full text-xs font-bold text-[#0D2440] bg-gray-50 border-none rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20"
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      
      <EditField 
        label="Barangay" 
        value={formData.brgy || (isAdd ? '' : 'Airport Village')} 
        onChange={(v) => setFormData({...formData, brgy: v})} 
      />
      
      {/* Row 5: Status */}
      <div className={isAdd ? "col-span-2" : ""}>
        <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Status</p>
        <select 
          className="w-full text-xs font-bold text-[#0D2440] bg-gray-50 border-none rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20"
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );

  // =========================================================
  // MAIN RENDER
  // =========================================================
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0D2440]/30 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 flex justify-between items-center border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
              isAdd ? 'bg-emerald-50 text-emerald-600' : isEdit ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
            }`}>
              {isAdd ? <UserPlus size={20} /> : isEdit ? <Edit3 size={20} /> : <Eye size={20} />}
            </div>
            <div>
              <h2 className="text-base font-black text-[#0D2440] leading-tight">
                {isAdd ? 'Register New SK' : isEdit ? 'Modify Details' : 'SK Details'}
              </h2>
              <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">
                {isAdd ? 'Official Entry Terminal' : 'Identity Management'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 text-gray-400 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          <div className="flex gap-10 items-start">
            
            {/* Left Column: Avatar (Shared) */}
            <div className="flex flex-col items-center gap-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />

              <div 
                onClick={triggerFileInput}
                className={`w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center group relative ${!isView ? 'cursor-pointer' : ''}`}
              >
                {formData.image ? (
                  <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
                ) : isAdd ? (
                  <User size={40} className="text-gray-300" />
                ) : (
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.firstName}`} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                )}

                {!isView && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200">
                    <Camera size={16} className="text-white mb-1" />
                    <span className="text-white text-[9px] font-black uppercase text-center leading-tight">Choose<br/>Profile</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-tighter">
                  {isAdd ? 'Initial Rating' : 'Performance'}
                </p>
                <div className={`flex items-center gap-0.5 ${isAdd ? 'text-gray-200' : 'text-amber-400'}`}>
                  {isAdd ? (
                     [1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} className="fill-current" />)
                  ) : (
                    <>
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <Star size={12} className="fill-current" />
                      <StarHalf size={12} className="fill-current" />
                    </>
                  )}
                </div>
                <span className={`text-[11px] font-black mt-0.5 ${isAdd ? 'text-gray-400' : 'text-amber-600'}`}>
                  {isAdd ? '0.0' : '4.5'}
                </span>
              </div>
            </div>

            {/* Right Column: SWAPS INTERFACE BASED ON MODE */}
            <div className="flex-1 space-y-6">
              {!isAdd && (
                <div className="flex items-center gap-2 opacity-30">
                  <User size={12} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Registry Information</span>
                </div>
              )}
              
              {isView ? <RenderViewInterface /> : <RenderModifyInterface />}

            </div>
          </div>

          {/* Compliance Board */}
          {!isAdd && (
            <section className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={14} className="text-indigo-500" />
                <h3 className="text-[10px] font-black text-[#0D2440] uppercase tracking-wider">Compliance Monitoring Board</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((item, i) => (
                  <div key={i} className="bg-white px-4 py-3 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">{item.name}</span>
                    <div className={`w-2.5 h-2.5 rounded-full ${item.status ? 'bg-emerald-500 shadow-emerald-100' : 'bg-red-500 shadow-red-100'}`} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-[#0D2440] flex justify-between items-center">
          <div className="flex items-center gap-2 text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">
            <div className={`w-1.5 h-1.5 rounded-full ${isAdd ? 'bg-emerald-400' : 'bg-blue-400'} animate-pulse`} />
            <span>{isAdd ? 'Secure Registration Node' : 'Secure Data Terminal'}</span>
          </div>
          
          {!isView && (
            <button 
              onClick={() => onSave(formData)}
              className={`flex items-center gap-2 px-8 py-2.5 bg-white text-[#0D2440] rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                isAdd ? 'hover:bg-emerald-50' : 'hover:bg-indigo-50'
              }`}
            >
              <Save size={14} /> 
              {isAdd ? 'Register SK Member' : 'Save Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// HELPER 1: For View (Text Only)
const ViewField = ({ label, value, isHighlight }) => (
  <div className="min-w-0">
    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <p className={`text-xs font-bold truncate ${isHighlight ? 'text-indigo-600' : 'text-[#0D2440]'}`}>
      {value || '---'}
    </p>
  </div>
);

// HELPER 2: For Edit (Input Fields)
const EditField = ({ label, value, onChange, type = "text", isHighlight }) => (
  <div className="min-w-0">
    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <input 
      type={type}
      placeholder={type === "date" ? "" : `Enter ${label}...`}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full text-xs font-bold bg-gray-50 border-none rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 ${isHighlight ? 'text-indigo-600' : 'text-[#0D2440]'}`}
    />
  </div>
);

export default AddProfileModal;