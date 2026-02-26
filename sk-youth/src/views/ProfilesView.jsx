import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, FileDown, MoreHorizontal, Eye, Edit2, Trash2, AlertCircle, RefreshCw } from 'lucide-react';
import AddProfileModal from '../views/AddProfileModal'; 
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { supabase } from '../supabaseClient';

const ProfilesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('youth_profiles') 
      .select('*')
      .lt('age', 31) 
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching profiles:', error.message);
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  };

  const getAgeGroup = (age) => {
    const numAge = parseInt(age);
    if (numAge >= 15 && numAge <= 17) return "CHILD YOUTH (15-17)";
    if (numAge >= 18 && numAge <= 24) return "CORE YOUTH (18-24)";
    if (numAge >= 25 && numAge <= 30) return "YOUNG ADULT (25-30)";
    return "OUT OF RANGE";
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record? This cannot be undone.")) {
      const { error } = await supabase
        .from('youth_profiles')
        .delete()
        .eq('id', id);

      if (error) {
        alert("Error deleting: " + error.message);
      } else {
        setOpenMenuId(null);
        fetchProfiles();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Youth Profile');

    worksheet.columns = [
      { header: 'NO.', key: 'no', width: 5 },
      { header: 'REGION', key: 'region', width: 10 },
      { header: 'PROVINCE', key: 'province', width: 20 },
      { header: 'CITY/MUNICIPALITY', key: 'municipality', width: 20 },
      { header: 'BARANGAY', key: 'barangay', width: 20 },
      { header: 'NAME', key: 'name', width: 35 },
      { header: 'AGE', key: 'age', width: 8 },
      { header: 'BIRTHDAY', key: 'birthday', width: 15 },
      { header: 'SEX', key: 'sex', width: 10 },
      { header: 'CIVIL STATUS', key: 'civilStatus', width: 15 },
      { header: 'YOUTH CLASSIFICATION', key: 'youthClass', width: 25 },
      { header: 'YOUTH AGE GROUP', key: 'ageGroup', width: 25 },
      { header: 'EMAIL ADDRESS', key: 'email', width: 25 },
      { header: 'CONTACT NUMBER', key: 'contact', width: 20 },
      { header: 'HOME ADDRESS', key: 'purok', width: 30 },
      { header: 'HIGHEST EDUCATIONAL ATTAINMENT', key: 'education', width: 30 },
      { header: 'WORK STATUS', key: 'workStatus', width: 20 },
    ];

    const titleRow = worksheet.insertRow(1, ['Catarman- Katipunan ng kabataan Youth Profile']);
    worksheet.mergeCells('A1:Q1');
    titleRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    titleRow.getCell(1).font = { size: 20, bold: true };
    titleRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEB3B' } };
    titleRow.height = 40;

    const headerRow = worksheet.getRow(2);
    headerRow.eachCell((cell) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF22C55E' } };
      cell.font = { color: { argb: 'FFFFFFFF' }, bold: true, size: 10 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    profiles.forEach((p, index) => {
      worksheet.addRow({
        no: index + 1,
        region: p.region,
        province: p.province,
        municipality: p.municipality,
        barangay: p.barangay,
        name: `${p.last_name || ''}, ${p.first_name || ''} ${p.middle_name || ''}`.toUpperCase(),
        age: p.age,
        birthday: p.birthday,
        sex: p.sex === 'Male' ? 'M' : 'F',
        civilStatus: p.civil_status,
        youthClass: p.youth_class,
        ageGroup: getAgeGroup(p.age),
        email: p.email,
        contact: p.contact,
        purok: p.purok,
        education: p.education,
        workStatus: p.work_status
      }).eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
    });

    const lastRow = worksheet.lastRow.number;
    const signatureRowStart = lastRow + 3;

    worksheet.getCell(`B${signatureRowStart}`).value = 'Prepared by:';
    worksheet.getCell(`B${signatureRowStart}`).font = { italic: true };
    worksheet.getCell(`B${signatureRowStart + 3}`).value = 'NAME OF SECRETARY';
    worksheet.getCell(`B${signatureRowStart + 3}`).font = { bold: true };
    worksheet.getCell(`B${signatureRowStart + 3}`).border = { bottom: { style: 'thin' } };
    worksheet.getCell(`B${signatureRowStart + 4}`).value = 'SK Secretary';
    worksheet.getCell(`B${signatureRowStart + 4}`).alignment = { horizontal: 'center' };
    worksheet.getCell(`L${signatureRowStart}`).value = 'Approved by:';
    worksheet.getCell(`L${signatureRowStart}`).font = { italic: true };
    worksheet.getCell(`L${signatureRowStart + 3}`).value = 'NAME OF CHAIRMAN';
    worksheet.getCell(`L${signatureRowStart + 3}`).font = { bold: true };
    worksheet.getCell(`L${signatureRowStart + 3}`).border = { bottom: { style: 'thin' } };
    worksheet.getCell(`L${signatureRowStart + 4}`).value = 'SK Chairman';
    worksheet.getCell(`L${signatureRowStart + 4}`).alignment = { horizontal: 'center' };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Catarman_KK_Profile_Output.xlsx`);
  };

  // handleAction now fetches fresh data from DB before opening modal
  const handleAction = async (mode, profile = null) => {
    if (profile && (mode === 'edit' || mode === 'view')) {
      const { data, error } = await supabase
        .from('youth_profiles')
        .select('*')
        .eq('id', profile.id)
        .single();

      if (!error && data) {
        setSelectedProfile(data);
      } else {
        setSelectedProfile(profile);
      }
    } else {
      setSelectedProfile(null);
    }

    setModalMode(mode);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  // onSave re-fetches the full list AND updates selectedProfile with latest data
  const handleSave = async () => {
    await fetchProfiles();
    setIsModalOpen(false);
  };

  // onClose also refreshes so list stays in sync
  const handleClose = async () => {
    await fetchProfiles();
    setIsModalOpen(false);
  };

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left - 120 + window.scrollX
    });
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const filteredProfiles = profiles.filter(p => 
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 h-full shadow-sm flex flex-col transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4 shrink-0">
        <div>
          <h1 className="text-xl font-black text-[#0D2440] dark:text-white transition-colors uppercase tracking-tight">Youth Registry</h1>
          <p className="text-xs text-[#7BA4D0] dark:text-slate-400 transition-colors">Master Database • {profiles.length} Total Records</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchProfiles} className="p-2 bg-gray-50 dark:bg-slate-800 text-gray-500 rounded-lg hover:text-blue-500 transition-colors" title="Refresh List">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={exportToExcel} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[#0D2440] dark:text-white rounded-lg font-bold text-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-95">
            <FileDown size={16} /> Export
          </button>
          <button onClick={() => handleAction('add')} className="flex items-center gap-2 px-3 py-2 bg-[#0D2440] dark:bg-blue-600 text-white rounded-lg font-bold text-xs shadow-lg hover:opacity-90 transition-all active:scale-95">
            <UserPlus size={16} /> Add Youth
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7BA4D0] dark:text-slate-400" size={16} />
        <input 
          type="text" 
          placeholder="Search Name..." 
          className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-xs text-[#0D2440] dark:text-white font-bold outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto border border-gray-200 dark:border-slate-700 rounded-xl relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
        <table className="w-full text-left border-collapse min-w-max"> 
          <thead className="bg-gray-50 dark:bg-slate-800 sticky top-0 z-20 shadow-sm">
            <tr className="text-[10px] font-black uppercase text-[#7BA4D0] dark:text-slate-400 border-b border-gray-200 dark:border-slate-700 h-10">
              <th className="px-3 bg-gray-50 dark:bg-slate-800 sticky left-0 z-30 w-12 text-center border-r dark:border-slate-700">No.</th>
              <th className="px-3 bg-gray-50 dark:bg-slate-800 sticky left-12 z-30 w-64 border-r dark:border-slate-700 drop-shadow-sm text-left">Name</th>
              <th className="px-3 whitespace-nowrap">Sitio/Purok</th>
              <th className="px-3 text-center">Age</th>
              <th className="px-3 whitespace-nowrap">Youth Age Group</th>
              <th className="px-3 whitespace-nowrap">Birthday</th>
              <th className="px-3 whitespace-nowrap">Sex</th>
              <th className="px-3 whitespace-nowrap">Civil Status</th>
              <th className="px-3 whitespace-nowrap">Youth Class</th>
              <th className="px-3 sticky right-0 bg-gray-50 dark:bg-slate-800 z-30 text-center w-16 border-l dark:border-slate-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50 uppercase">
            {loading ? (
              <tr>
                <td colSpan="11" className="py-20 text-center text-xs font-bold text-gray-400 animate-pulse">Loading Database...</td>
              </tr>
            ) : filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile, index) => (
                <tr key={profile.id} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors h-10">
                  <td className="px-3 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center sticky left-0 bg-white dark:bg-slate-900 border-r dark:border-slate-700 z-10">{index + 1}</td>
                  <td className="px-3 text-[11px] font-black text-[#0D2440] dark:text-white sticky left-12 bg-white dark:bg-slate-900 border-r dark:border-slate-700 z-10 drop-shadow-sm truncate max-w-[16rem]">
                    {profile.last_name}, {profile.first_name} {profile.middle_name}
                  </td>
                  <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.purok}</td>
                  <td className="px-3 text-[11px] font-bold text-center text-gray-800 dark:text-slate-200 tabular-nums">{profile.age}</td>
                  <td className="px-3 text-[10px] font-black text-blue-600 dark:text-blue-400 whitespace-nowrap">
                    {getAgeGroup(profile.age)}
                  </td>
                  <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 tabular-nums">{profile.birthday}</td>
                  <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.sex}</td>
                  <td className="px-3 text-[10px] font-bold text-gray-500 dark:text-slate-500">{profile.civil_status}</td>
                  <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 whitespace-nowrap">{profile.youth_class}</td>
                  <td className="px-3 sticky right-0 bg-white dark:bg-slate-900 border-l dark:border-slate-700 z-10 text-center relative">
                    <button onClick={(e) => toggleMenu(profile.id, e)} className="p-1.5 text-gray-400 hover:text-[#0D2440] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="px-10 py-20 text-center opacity-30 flex flex-col items-center gap-3">
                  <AlertCircle size={40} className="text-gray-400" />
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase">No Profile Records Found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ACTION MENU */}
      {openMenuId && (
        <div 
          ref={menuRef}
          style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
          className="fixed w-32 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 z-[9999] py-1 text-left animate-in fade-in zoom-in duration-150"
        >
          <button 
            onClick={() => handleAction('view', profiles.find(p => p.id === openMenuId))} 
            className="w-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2"
          >
            <Eye size={12} /> View
          </button>
          <button 
            onClick={() => handleAction('edit', profiles.find(p => p.id === openMenuId))} 
            className="w-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center gap-2"
          >
            <Edit2 size={12} /> Edit
          </button>
          <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
          <button 
            onClick={() => handleDelete(openMenuId)}
            className="w-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      )}

      {/* ADD/EDIT/VIEW MODAL */}
      <AddProfileModal 
        isOpen={isModalOpen} 
        onClose={handleClose}
        mode={modalMode} 
        initialData={selectedProfile} 
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfilesView;