import React, { useState, useRef } from 'react';
import { X, UserPlus, User, Camera, Save } from 'lucide-react';

const DESIGNATIONS = ['SK CHAIRMAN', 'SECRETARY', 'TREASURER', 'KAGAWAD'];
const GENDERS = ['MALE', 'FEMALE', 'PREFER NOT TO SAY'];
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const AddSKMemberModal = ({ isOpen, onClose, onAdd }) => {
  const fileInputRef = useRef(null);

  const emptyForm = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    designation: 'SK CHAIRMAN',
    // SK-Related Data
    birthdayMonth: '',
    birthdayDay: '',
    birthdayYear: '',
    gender: '',
    email: '',
    contactNo: '',
    philhealthNo: '',
    dateOfElection: new Date().toISOString().split('T')[0],
    dateOfAssumption: new Date().toISOString().split('T')[0],
    skmtControlNo: '',
    image: null,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const set = (key) => (v) => setFormData((f) => ({ ...f, [key]: v }));

  const handlePhotoClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((f) => ({ ...f, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compose birthday string e.g. "MARCH 15, 2000"
    const birthday = [formData.birthdayMonth, formData.birthdayDay, formData.birthdayYear]
      .filter(Boolean).join(' ');
    onAdd({ ...formData, birthday, imagePreview: preview });
    onClose();
    setFormData(emptyForm);
    setPreview(null);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="px-10 py-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 shrink-0">
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

        {/* ── BODY ───────────────────────────────────────────────── */}
        <div className="p-10 overflow-y-auto max-h-[75vh]">
          <div className="flex flex-col md:flex-row gap-8">

            {/* PHOTO */}
            <div className="flex flex-col items-center shrink-0">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <div
                onClick={handlePhotoClick}
                className="w-32 h-32 rounded-2xl bg-slate-50 dark:bg-slate-800 border-4 border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-200 shadow-sm relative group cursor-pointer overflow-hidden"
              >
                {preview
                  ? <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  : <User size={48} />
                }
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[8px] font-black uppercase text-center p-2">
                  <Camera size={16} className="mb-1" />
                  {preview ? 'Change Photo' : 'Choose Photo'}
                </div>
              </div>
              <p className="mt-3 text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Official Identification</p>
            </div>

            {/* FORM */}
            <form id="add-member-form" onSubmit={handleSubmit} className="flex-1 space-y-7">

              {/* SECTION 1 – Member Identity */}
              <Section title="Member Identity">
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="First Name"   value={formData.firstName}   onChange={set('firstName')}   required />
                  <InputField label="Middle Name"  value={formData.middleName}  onChange={set('middleName')} />
                  <InputField label="Last Name"    value={formData.lastName}    onChange={set('lastName')}    required />
                  <InputField label="Suffix (e.g. JR, SR)" value={formData.suffix} onChange={set('suffix')} />
                </div>
              </Section>

              {/* SECTION 2 – Council Role */}
              <Section title="Council Role">
                <SelectField
                  label="Designation"
                  value={formData.designation}
                  onChange={set('designation')}
                  options={DESIGNATIONS}
                />
              </Section>

              {/* SECTION 3 – SK-Related Data */}
              <Section title="SK-Related Data">
                <div className="grid grid-cols-2 gap-4">

                  {/* Birthday – spell out the month */}
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">
                      Birthday (Spell-out the Month)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <SelectField
                        label=""
                        placeholder="Month"
                        value={formData.birthdayMonth}
                        onChange={set('birthdayMonth')}
                        options={MONTHS}
                        required
                        noLabel
                      />
                      <InputField
                        label=""
                        placeholder="Day (e.g. 15)"
                        value={formData.birthdayDay}
                        onChange={set('birthdayDay')}
                        required
                        noLabel
                        maxLength={2}
                      />
                      <InputField
                        label=""
                        placeholder="Year (e.g. 2000)"
                        value={formData.birthdayYear}
                        onChange={set('birthdayYear')}
                        required
                        noLabel
                        maxLength={4}
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <SelectField
                    label="Gender"
                    value={formData.gender}
                    onChange={set('gender')}
                    options={GENDERS}
                    required
                  />

                  {/* Email */}
                  <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={set('email')}
                    uppercase={false}
                  />

                  {/* Contact No. */}
                  <InputField
                    label="Contact No."
                    type="tel"
                    value={formData.contactNo}
                    onChange={set('contactNo')}
                    maxLength={11}
                  />

                  {/* PhilHealth No. */}
                  <InputField
                    label="PhilHealth No."
                    value={formData.philhealthNo}
                    onChange={set('philhealthNo')}
                  />

                  {/* Date of Election/Appointment */}
                  <InputField
                    label="Date of Election / Appointment"
                    type="date"
                    value={formData.dateOfElection}
                    onChange={set('dateOfElection')}
                    required
                    uppercase={false}
                  />

                  {/* Date of Assumption */}
                  <InputField
                    label="Date of Assumption"
                    type="date"
                    value={formData.dateOfAssumption}
                    onChange={set('dateOfAssumption')}
                    required
                    uppercase={false}
                  />

                  {/* SKMT Control No. */}
                  <InputField
                    label="SKMT Control No."
                    value={formData.skmtControlNo}
                    onChange={set('skmtControlNo')}
                  />

                </div>
              </Section>

            </form>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        <div className="px-10 py-5 bg-[#0D2440] flex justify-end shrink-0">
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

/* ── SUB-COMPONENTS ────────────────────────────────────────────── */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">
      {title}
    </h3>
    {children}
  </div>
);

const InputField = ({
  label, value, onChange, type = 'text',
  required = false, noLabel = false,
  placeholder = '', maxLength, uppercase = true,
}) => (
  <div className="space-y-1.5 min-w-0">
    {!noLabel && label && (
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    )}
    <input
      type={type}
      required={required}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)}
      className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold uppercase text-[#0D2440] dark:text-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 hover:border-slate-400 transition-all placeholder:normal-case placeholder:font-normal placeholder:text-slate-400"
    />
  </div>
);

const SelectField = ({
  label, value, onChange, options,
  required = false, noLabel = false, placeholder,
}) => (
  <div className="space-y-1.5 min-w-0">
    {!noLabel && label && (
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    )}
    <select
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold uppercase text-[#0D2440] dark:text-white outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 hover:border-slate-400 transition-all cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default AddSKMemberModal;