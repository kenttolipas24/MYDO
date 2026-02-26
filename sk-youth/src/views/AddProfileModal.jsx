import React, { useState, useEffect, useRef } from 'react';
import { X, Eye, User, Save, UserPlus, Edit3, Camera, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const AddProfileModal = ({ isOpen, onClose, mode, initialData, onSave }) => {
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageUrlRef = useRef('');

  const defaultForm = {
    firstName: '', middleName: '', lastName: '', suffix: '',
    birthdate: '', age: '', sex: 'Male', civilStatus: 'Single',
    email: '', contact: '',
    region: 'VIII', province: 'Northern Samar', municipality: 'Catarman',
    barangay: 'Old Rizal', purok: '',
    youthClass: 'In-School Youth', workStatus: 'Student',
    education: 'High School Level', image: ''
  };

  const [formData, setFormData] = useState(defaultForm);

  // --- AUTO-CALCULATE AGE ---
  const calculateAge = (birthDateString) => {
    if (!birthDateString) return '';
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  // --- SYNC DATA when modal opens ---
  useEffect(() => {
    if (!isOpen) return;

    if (initialData && (mode === 'edit' || mode === 'view')) {
      const imageUrl = initialData.image_url || '';
      imageUrlRef.current = imageUrl; // sync ref
      setFormData({
        firstName: initialData.first_name || '',
        middleName: initialData.middle_name || '',
        lastName: initialData.last_name || '',
        suffix: initialData.suffix || '',
        birthdate: initialData.birthday || '',
        age: initialData.age || '',
        sex: initialData.sex || 'Male',
        civilStatus: initialData.civil_status || 'Single',
        email: initialData.email || '',
        contact: initialData.contact || '',
        region: initialData.region || 'VIII',
        province: initialData.province || 'Northern Samar',
        municipality: initialData.municipality || 'Catarman',
        barangay: initialData.barangay || 'Old Rizal',
        purok: initialData.purok || '',
        youthClass: initialData.youth_class || 'In-School Youth',
        workStatus: initialData.work_status || 'Student',
        education: initialData.education || 'High School Level',
        image: imageUrl
      });
    } else {
      imageUrlRef.current = '';
      setFormData(defaultForm);
    }
  }, [initialData, isOpen, mode]);

  // --- IMAGE UPLOAD ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('youth_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get permanent public URL
      const { data } = supabase.storage
        .from('youth_images')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // 3. Save to BOTH state for display and ref for save reliability
      imageUrlRef.current = publicUrl;
      setFormData(prev => ({ ...prev, image: publicUrl }));

    } catch (error) {
      console.error('Upload Error:', error.message);
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  // --- SAVE image ---
  const handleFinalSave = async () => {
    const currentAge = parseInt(formData.age);
    if (currentAge >= 31) {
      alert('Registration failed: This registry is for youth aged 30 and below only.');
      return;
    }

    setIsSubmitting(true);

    // Use imageUrlRef.current to ensure we always get the latest uploaded URL
    const finalImageUrl = imageUrlRef.current || formData.image || '';

    const payload = {
      first_name: formData.firstName.toUpperCase(),
      middle_name: formData.middleName?.toUpperCase(),
      last_name: formData.lastName.toUpperCase(),
      suffix: formData.suffix?.toUpperCase(),
      birthday: formData.birthdate,
      age: currentAge,
      sex: formData.sex,
      civil_status: formData.civilStatus,
      email: formData.email,
      contact: formData.contact,
      region: formData.region,
      province: formData.province,
      municipality: formData.municipality,
      barangay: formData.barangay,
      purok: formData.purok,
      youth_class: formData.youthClass,
      work_status: formData.workStatus,
      education: formData.education,
      image_url: finalImageUrl
    };

    try {
      let result;
      if (mode === 'edit') {
        result = await supabase
          .from('youth_profiles')
          .update(payload)
          .eq('id', initialData.id);
      } else {
        result = await supabase
          .from('youth_profiles')
          .insert([payload]);
      }

      if (result.error) throw result.error;

      onSave();
      onClose();
    } catch (error) {
      console.error('Database Error:', error.message);
      alert('Error saving: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    if (mode !== 'view') fileInputRef.current.click();
  };

  if (!isOpen) return null;

  const isView = mode === 'view';
  const isAdd = mode === 'add';
  const isEdit = mode === 'edit';
  const isDisabled = isView || isSubmitting || uploadingImage;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0D2440]/30 dark:bg-slate-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2rem] shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-8 py-5 flex justify-between items-center border-b border-gray-50 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
              isAdd ? 'bg-emerald-50 text-emerald-600'
              : isEdit ? 'bg-blue-50 text-blue-600'
              : 'bg-gray-50 text-gray-600'
            }`}>
              {isAdd ? <UserPlus size={20} /> : isEdit ? <Edit3 size={20} /> : <Eye size={20} />}
            </div>
            <div>
              <h2 className="text-base font-black text-[#0D2440] dark:text-white leading-tight uppercase tracking-tight">
                {isAdd ? 'Register New Youth' : isEdit ? 'Modify Youth Profile' : 'View Youth Profile'}
              </h2>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                {isAdd ? 'Official Entry' : 'Existing Record'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Avatar Column */}
            <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-auto">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
              <div
                onClick={triggerFileInput}
                className={`w-28 h-28 rounded-2xl overflow-hidden border-4 border-gray-50 dark:border-slate-800 shadow-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center group relative transition-all ${!isView ? 'cursor-pointer hover:border-blue-400/50' : ''}`}
              >
                {uploadingImage ? (
                  <Loader2 className="animate-spin text-blue-500" />
                ) : formData.image ? (
                  <img
                    src={formData.image}
                    alt="Profile"
                    className="w-full h-full object-cover aspect-square"
                  />
                ) : (
                  <User size={32} className="text-gray-300" />
                )}

                {!isView && !uploadingImage && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                    <Camera size={20} className="text-white mb-1" />
                    <span className="text-white text-[10px] font-bold uppercase">Change Photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Column */}
            <div className="flex-1 space-y-6">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <EditField label="First Name" value={formData.firstName} onChange={(v) => setFormData({ ...formData, firstName: v })} disabled={isDisabled} />
                <EditField label="Middle Name" value={formData.middleName} onChange={(v) => setFormData({ ...formData, middleName: v })} disabled={isDisabled} />
                <EditField label="Last Name" value={formData.lastName} onChange={(v) => setFormData({ ...formData, lastName: v })} disabled={isDisabled} />
                <EditField label="Suffix" value={formData.suffix} onChange={(v) => setFormData({ ...formData, suffix: v })} disabled={isDisabled} />

                <EditField
                  label="Birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={(v) => {
                    const calculatedAge = calculateAge(v);
                    setFormData({ ...formData, birthdate: v, age: calculatedAge });
                  }}
                  disabled={isDisabled}
                />

                <EditField label="Age" type="number" value={formData.age} disabled={true} className="opacity-80" />

                <SelectField label="Sex" value={formData.sex} onChange={(v) => setFormData({ ...formData, sex: v })} options={['Male', 'Female']} disabled={isDisabled} />
                <SelectField label="Civil Status" value={formData.civilStatus} onChange={(v) => setFormData({ ...formData, civilStatus: v })} options={['Single', 'Married', 'Widowed', 'Separated']} disabled={isDisabled} />
              </div>

              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Demographics</h3>
              <div className="grid grid-cols-2 gap-4">
                <SelectField label="Youth Class" value={formData.youthClass} onChange={(v) => setFormData({ ...formData, youthClass: v })} options={['In-School Youth', 'Out-of-School Youth', 'Working Youth', 'Specific Needs']} disabled={isDisabled} />
                <SelectField label="Work Status" value={formData.workStatus} onChange={(v) => setFormData({ ...formData, workStatus: v })} options={['Student', 'Employed', 'Unemployed', 'Self-Employed']} disabled={isDisabled} />
                <EditField label="Education" value={formData.education} onChange={(v) => setFormData({ ...formData, education: v })} disabled={isDisabled} />
                <EditField label="Contact No." value={formData.contact} onChange={(v) => setFormData({ ...formData, contact: v })} disabled={isDisabled} />
                <EditField label="Email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} disabled={isDisabled} className="col-span-2" />
              </div>

              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <EditField label="Region" value={formData.region} disabled={true} />
                <EditField label="Province" value={formData.province} disabled={true} />
                <EditField label="Municipality" value={formData.municipality} disabled={true} />
                <EditField label="Barangay" value={formData.barangay} disabled={true} />
                <EditField label="Sitio / Purok" value={formData.purok} onChange={(v) => setFormData({ ...formData, purok: v })} disabled={isDisabled} className="col-span-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {!isView && (
          <div className="px-8 py-4 bg-[#0D2440] dark:bg-slate-950 flex justify-end items-center shrink-0">
            <button
              onClick={handleFinalSave}
              disabled={isDisabled}
              className="flex items-center gap-2 px-8 py-2.5 bg-white dark:bg-slate-800 text-[#0D2440] dark:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {isAdd ? 'Register Youth' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EditField = ({ label, value, onChange, type = 'text', disabled, className = '' }) => (
  <div className={`min-w-0 ${className}`}>
    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className={`w-full text-xs font-bold bg-gray-50 dark:bg-slate-800 border-none rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 text-[#0D2440] dark:text-white ${disabled ? 'cursor-not-allowed' : ''}`}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, disabled }) => (
  <div className="min-w-0">
    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wide mb-1">{label}</p>
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      className={`w-full text-xs font-bold bg-gray-50 dark:bg-slate-800 border-none rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 text-[#0D2440] dark:text-white ${disabled ? 'cursor-not-allowed' : ''}`}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default AddProfileModal;