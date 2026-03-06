import React, { useState, useEffect, useRef } from 'react';
import {
  X, Edit2, Save, User, Shield, Calendar,
  CheckCircle2, UserCheck, Camera, Loader2
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const DESIGNATIONS = ['SK CHAIRMAN', 'SK KAGAWAD', 'SK SECRETARY', 'SK TREASURER', 'SANGGUNIANG KABATAAN MEMBER'];

const MemberManagementModal = ({ isOpen, onClose, member, onUpdate }) => {
  const [mode, setMode] = useState('view'); 
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false); // Track upload state
  const fileInputRef = useRef(null); // Reference for choosing photo
  
  const [form, setForm] = useState({
    first_name: '', middle_name: '', last_name: '',
    suffix: '', designation: '', date_joined: '',
    image_url: ''
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (member && isOpen) {
      setForm({
        first_name: member.first_name || '',
        middle_name: member.middle_name || '',
        last_name: member.last_name || '',
        suffix: member.suffix || '',
        designation: member.designation || '',
        date_joined: member.date_joined || '',
        image_url: member.image_url || ''
      });
      setPreview(member.image_url || null);
      setMode(member._startMode || 'view');
      setSaved(false);
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  // --- PHOTO SELECTION LOGIC ---
  const handlePhotoClick = () => {
    if (mode === 'edit') fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show local preview immediately
    setPreview(URL.createObjectURL(file));
    setUploadingImage(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `member-profiles/${fileName}`;

      // 2. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('youth_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get Public URL
      const { data } = supabase.storage
        .from('youth_images')
        .getPublicUrl(filePath);

      setForm(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('members')
        .update({
          first_name: form.first_name,
          middle_name: form.middle_name,
          last_name: form.last_name,
          suffix: form.suffix,
          designation: form.designation,
          date_joined: form.date_joined,
          image_url: form.image_url // Save new image URL
        })
        .eq('id', member.id);

      if (error) throw error;
      
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setMode('view');
        if (onUpdate) onUpdate(); 
      }, 1000);
    } catch (err) {
      alert('Error saving: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="px-10 py-6 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              {mode === 'view' ? <UserCheck size={20} /> : <Edit2 size={20} />}
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0D2440] dark:text-white uppercase tracking-tight leading-none">
                {mode === 'view' ? 'View Youth Profile' : 'Modify Youth Profile'}
              </h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Existing Record</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-300 rounded-full transition-all active:scale-90">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto max-h-[70vh] flex flex-col md:flex-row gap-8">
          
          {/* Photo Column */}
          <div className="flex flex-col items-center shrink-0">
             <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
             />
             <div 
                onClick={handlePhotoClick}
                className={`w-32 h-32 rounded-2xl bg-slate-50 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-200 shadow-sm relative group overflow-hidden ${mode === 'edit' ? 'cursor-pointer hover:border-blue-400/50' : ''}`}
             >
                {uploadingImage ? (
                  <Loader2 className="animate-spin text-blue-500" />
                ) : preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} />
                )}

                {mode === 'edit' && !uploadingImage && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white">
                    <Camera size={20} className="mb-1" />
                    <span className="text-[8px] font-black uppercase">Change Photo</span>
                  </div>
                )}
             </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" value={form.first_name} readOnly={mode === 'view'} onChange={(v) => setForm({...form, first_name: v})} />
                <Input label="Middle Name" value={form.middle_name} readOnly={mode === 'view'} onChange={(v) => setForm({...form, middle_name: v})} />
                <Input label="Last Name" value={form.last_name} readOnly={mode === 'view'} onChange={(v) => setForm({...form, last_name: v})} />
                <Input label="Suffix" value={form.suffix} readOnly={mode === 'view'} onChange={(v) => setForm({...form, suffix: v})} />
              </div>
            </div>

            <div>
              <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 border-b pb-2">Council Designation</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Designation</label>
                  <select 
                    disabled={mode === 'view'}
                    value={form.designation} 
                    onChange={(e) => setForm({...form, designation: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-transparent rounded-xl text-xs font-bold uppercase text-[#0D2440] dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-100 disabled:cursor-default"
                  >
                    {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <Input label="Registry Date" type="date" value={form.date_joined} readOnly={mode === 'view'} onChange={(v) => setForm({...form, date_joined: v})} />
              </div>
            </div>
          </div>
        </div>

        {mode === 'edit' && (
          <div className="px-10 py-6 bg-[#0D2440] flex justify-end shrink-0">
            <button 
              onClick={handleSave} 
              disabled={saving || saved || uploadingImage}
              className={`flex items-center gap-2 px-8 py-2.5 bg-white text-[#0D2440] rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50
                ${saved ? 'bg-emerald-500 text-white' : ''}
              `}
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : saved ? (
                <CheckCircle2 size={14} />
              ) : (
                <Save size={14} />
              )}
              {saved ? 'RECORD UPDATED' : 'SAVE CHANGES'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Input = ({ label, onChange, readOnly, ...props }) => (
  <div className="space-y-1.5 min-w-0">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    <input 
      {...props} 
      readOnly={readOnly}
      onChange={(e) => onChange && onChange(e.target.value.toUpperCase())}
      className={`w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-transparent rounded-xl text-xs font-bold uppercase text-[#0D2440] dark:text-white outline-none transition-all ${readOnly ? 'cursor-default opacity-80' : 'hover:bg-slate-100/50 focus:ring-2 focus:ring-blue-500/20'}`}
    />
  </div>
);

export default MemberManagementModal;