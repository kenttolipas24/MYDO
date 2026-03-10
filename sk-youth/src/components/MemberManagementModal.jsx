import React, { useState, useEffect, useRef } from 'react';
import {
  X, Edit2, Save, User, Camera, Loader2,
  CheckCircle2, UserCheck
} from 'lucide-react';
import { supabase } from '../supabaseClient';

const DESIGNATIONS = ['SK CHAIRMAN', 'SK KAGAWAD', 'SK SECRETARY', 'SK TREASURER', 'SANGGUNIANG KABATAAN MEMBER'];
const GENDERS = ['MALE', 'FEMALE', 'PREFER NOT TO SAY'];
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const MemberManagementModal = ({ isOpen, onClose, member, onUpdate }) => {
  const [mode, setMode] = useState('view');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const emptyForm = {
    first_name: '', middle_name: '', last_name: '', suffix: '',
    designation: '', date_joined: '', image_url: '',
    // SK-Related Data
    birthday_month: '', birthday_day: '', birthday_year: '',
    gender: '', email: '', contact_no: '',
    philhealth_no: '', date_of_election: '', date_of_assumption: '',
    skmt_control_no: '',
  };

  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (member && isOpen) {
      setForm({
        first_name:       member.first_name       || '',
        middle_name:      member.middle_name      || '',
        last_name:        member.last_name        || '',
        suffix:           member.suffix           || '',
        designation:      member.designation      || '',
        date_joined:      member.date_joined      || '',
        image_url:        member.image_url        || '',
        birthday_month:   member.birthday_month   || '',
        birthday_day:     member.birthday_day     || '',
        birthday_year:    member.birthday_year    || '',
        gender:           member.gender           || '',
        email:            member.email            || '',
        contact_no:       member.contact_no       || '',
        philhealth_no:    member.philhealth_no    || '',
        date_of_election: member.date_of_election || '',
        date_of_assumption: member.date_of_assumption || '',
        skmt_control_no:  member.skmt_control_no  || '',
      });
      setPreview(member.image_url || null);
      setMode(member._startMode || 'view');
      setSaved(false);
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

  const set = (key) => (v) => setForm((f) => ({ ...f, [key]: v }));

  const handlePhotoClick = () => {
    if (mode === 'edit') fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploadingImage(true);
    try {
      const filePath = `member-profiles/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('youth_images').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('youth_images').getPublicUrl(filePath);
      setForm((f) => ({ ...f, image_url: data.publicUrl }));
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
          first_name:         form.first_name,
          middle_name:        form.middle_name,
          last_name:          form.last_name,
          suffix:             form.suffix,
          designation:        form.designation,
          date_joined:        form.date_joined        || null,
          image_url:          form.image_url,
          birthday_month:     form.birthday_month     || null,
          birthday_day:       form.birthday_day       || null,
          birthday_year:      form.birthday_year      || null,
          gender:             form.gender             || null,
          email:              form.email              || null,
          contact_no:         form.contact_no         || null,
          philhealth_no:      form.philhealth_no      || null,
          date_of_election:   form.date_of_election   || null,
          date_of_assumption: form.date_of_assumption || null,
          skmt_control_no:    form.skmt_control_no    || null,
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

  const isView = mode === 'view';

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div className="px-10 py-6 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              {isView ? <UserCheck size={20} /> : <Edit2 size={20} />}
            </div>
            <div>
              <h2 className="text-sm font-black text-[#0D2440] dark:text-white uppercase tracking-tight leading-none">
                {isView ? 'View Youth Profile' : 'Modify Youth Profile'}
              </h2>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Existing Record</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-300 rounded-full transition-all active:scale-90">
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
                className={`w-32 h-32 rounded-2xl bg-slate-100 dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 shadow-sm relative group overflow-hidden ${mode === 'edit' ? 'cursor-pointer hover:border-blue-400/50' : ''}`}
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
              <p className="mt-3 text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Official Identification</p>
            </div>

            {/* FORM */}
            <div className="flex-1 space-y-7">

              {/* SECTION 1 – Personal Information */}
              <Section title="Personal Information">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name"   value={form.first_name}   readOnly={isView} onChange={set('first_name')} />
                  <Field label="Middle Name"  value={form.middle_name}  readOnly={isView} onChange={set('middle_name')} />
                  <Field label="Last Name"    value={form.last_name}    readOnly={isView} onChange={set('last_name')} />
                  <Field label="Suffix"       value={form.suffix}       readOnly={isView} onChange={set('suffix')} />
                </div>
              </Section>

              {/* SECTION 2 – Council Designation */}
              <Section title="Council Designation">
                <div className="grid grid-cols-1 gap-4">
                  <SelectField
                    label="Designation"
                    value={form.designation}
                    disabled={isView}
                    onChange={set('designation')}
                    options={DESIGNATIONS}
                  />
                  <Field label="Registry Date" type="date" value={form.date_joined} readOnly={isView} onChange={set('date_joined')} uppercase={false} />
                </div>
              </Section>

              {/* SECTION 3 – SK-Related Data */}
              <Section title="SK-Related Data">
                <div className="grid grid-cols-2 gap-4">

                  {/* Birthday */}
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">
                      Birthday (Spell-out the Month)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <SelectField
                        value={form.birthday_month}
                        disabled={isView}
                        onChange={set('birthday_month')}
                        options={MONTHS}
                        placeholder="Month"
                        noLabel
                      />
                      <Field placeholder="Day (e.g. 15)"   value={form.birthday_day}  readOnly={isView} onChange={set('birthday_day')}  noLabel maxLength={2} />
                      <Field placeholder="Year (e.g. 2000)" value={form.birthday_year} readOnly={isView} onChange={set('birthday_year')} noLabel maxLength={4} />
                    </div>
                  </div>

                  {/* Gender */}
                  <SelectField
                    label="Gender"
                    value={form.gender}
                    disabled={isView}
                    onChange={set('gender')}
                    options={GENDERS}
                  />

                  {/* Email */}
                  <Field label="Email" type="email" value={form.email} readOnly={isView} onChange={set('email')} uppercase={false} />

                  {/* Contact No. */}
                  <Field label="Contact No." type="tel" value={form.contact_no} readOnly={isView} onChange={set('contact_no')} maxLength={11} />

                  {/* PhilHealth No. */}
                  <Field label="PhilHealth No." value={form.philhealth_no} readOnly={isView} onChange={set('philhealth_no')} />

                  {/* Date of Election/Appointment */}
                  <Field label="Date of Election / Appointment" type="date" value={form.date_of_election} readOnly={isView} onChange={set('date_of_election')} uppercase={false} />

                  {/* Date of Assumption */}
                  <Field label="Date of Assumption" type="date" value={form.date_of_assumption} readOnly={isView} onChange={set('date_of_assumption')} uppercase={false} />

                  {/* SKMT Control No. */}
                  <Field label="SKMT Control No." value={form.skmt_control_no} readOnly={isView} onChange={set('skmt_control_no')} />

                </div>
              </Section>

            </div>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────── */}
        {mode === 'edit' && (
          <div className="px-10 py-5 bg-[#0D2440] flex justify-end shrink-0">
            <button
              onClick={handleSave}
              disabled={saving || saved || uploadingImage}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50 ${saved ? 'bg-emerald-500 text-white' : 'bg-white text-[#0D2440] hover:bg-slate-50'}`}
            >
              {saving ? <Loader2 size={14} className="animate-spin" />
               : saved ? <CheckCircle2 size={14} />
               : <Save size={14} />}
              {saved ? 'Record Updated' : 'Save Changes'}
            </button>
          </div>
        )}
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

const Field = ({ label, value, onChange, readOnly, type = 'text', noLabel = false, placeholder = '', maxLength, uppercase = true }) => (
  <div className="space-y-1.5 min-w-0">
    {!noLabel && label && (
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    )}
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => onChange && onChange(uppercase ? e.target.value.toUpperCase() : e.target.value)}
      className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold text-[#0D2440] dark:text-white outline-none transition-all placeholder:normal-case placeholder:font-normal placeholder:text-slate-400
        ${uppercase ? 'uppercase' : 'normal-case'}
        ${readOnly
          ? 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-default opacity-80'
          : 'bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-slate-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300'
        }`}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, disabled, noLabel = false, placeholder }) => (
  <div className="space-y-1.5 min-w-0">
    {!noLabel && label && (
      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    )}
    <select
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-[#0D2440] dark:text-white outline-none transition-all
        ${disabled
          ? 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-default opacity-80'
          : 'bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 hover:border-slate-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-300 cursor-pointer'
        }`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default MemberManagementModal;