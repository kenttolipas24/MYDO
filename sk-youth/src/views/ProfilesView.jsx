import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, FileDown, MoreHorizontal, Eye, Edit2, Trash2 } from 'lucide-react';
import AddProfileModal from '../views/AddProfileModal'; 
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ProfilesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [profiles, setProfiles] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1, no: i + 1,
      region: "VIII", province: "Northern Samar", municipality: "Catarman", barangay: "Old Rizal", purok: `Purok ${Math.floor(Math.random() * 5) + 1}`,
      name: i % 2 === 0 ? `Dela Cruz, Juan ${i+1}, Jr., Santos` : `Reyes, Ana ${i+1}, , Mercado`, 
      firstName: i % 2 === 0 ? "Juan" : "Ana", lastName: i % 2 === 0 ? "Dela Cruz" : "Reyes", middleName: i % 2 === 0 ? "Santos" : "Mercado", suffix: i % 2 === 0 ? "Jr." : "",
      age: 18 + (i % 10), birthday: `200${i % 5}-05-12`, sex: i % 2 === 0 ? "Male" : "Female", civilStatus: "Single", 
      youthClass: i % 3 === 0 ? "In-School Youth" : "Working Youth", ageGroup: "Core Youth (18-24)",
      email: `user${i+1}@email.com`, contact: "0917-123-4567", education: "College Level", workStatus: i % 3 === 0 ? "Student" : "Employed",
      isSkVoter: true, isNatVoter: true, votedLastSk: true, attendedAssembly: false
    }))
  );

  // --- THE FIXED EXCEL EXPORT LOGIC WITH SIGNATURES ---
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Youth Profile');

    // 1. Define exact columns
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
      { header: 'YOUTH AGE GROUP', key: 'ageGroup', width: 20 },
      { header: 'EMAIL ADDRESS', key: 'email', width: 25 },
      { header: 'CONTACT NUMBER', key: 'contact', width: 20 },
      { header: 'HOME ADDRESS', key: 'purok', width: 30 },
      { header: 'HIGHEST EDUCATIONAL ATTAINMENT', key: 'education', width: 30 },
      { header: 'WORK STATUS', key: 'workStatus', width: 20 },
    ];

    // 2. Yellow Merged Title Header
    const titleRow = worksheet.insertRow(1, ['Catarman- Katipunan ng kabataan Youth Profile']);
    worksheet.mergeCells('A1:Q1');
    titleRow.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    titleRow.getCell(1).font = { size: 20, bold: true };
    titleRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEB3B' } };
    titleRow.height = 40;

    // 3. Green Table Headers
    const headerRow = worksheet.getRow(2);
    headerRow.eachCell((cell) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF22C55E' } };
      cell.font = { color: { argb: 'FFFFFFFF' }, bold: true, size: 10 };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });

    // 4. Data Rows
    profiles.forEach((p, index) => {
      const row = worksheet.addRow({
        no: index + 1,
        region: p.region,
        province: p.province,
        municipality: p.municipality,
        barangay: p.barangay,
        name: `${p.lastName}, ${p.firstName} ${p.middleName}`.toUpperCase(),
        age: p.age,
        birthday: p.birthday,
        sex: p.sex === 'Male' ? 'M' : 'F',
        civilStatus: p.civilStatus,
        youthClass: p.youthClass,
        ageGroup: p.ageGroup,
        email: p.email,
        contact: p.contact,
        purok: p.purok,
        education: p.education,
        workStatus: p.workStatus
      });
      row.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'left' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
    });

    // --- 5. ADD SIGNATURE SECTION ---
    worksheet.addRow([]); // Spacer
    worksheet.addRow([]); // Spacer

    // Labels: Prepared by and Approved by
    const labelRow = worksheet.addRow([]);
    labelRow.getCell(2).value = "Prepared by:";
    labelRow.getCell(11).value = "Approved by:";
    labelRow.font = { italic: true, size: 11 };

    worksheet.addRow([]); // Space for actual signature
    worksheet.addRow([]); // Space for actual signature

    // Names
    const nameRow = worksheet.addRow([]);
    nameRow.getCell(2).value = "NAME OF SECRETARY"; // Replace with actual name
    nameRow.getCell(11).value = "NAME OF CHAIRMAN";  // Replace with actual name
    nameRow.font = { bold: true, size: 12 };
    
    // Underlines for names
    nameRow.getCell(2).border = { bottom: { style: 'thin' } };
    nameRow.getCell(11).border = { bottom: { style: 'thin' } };

    // Positions
    const posRow = worksheet.addRow([]);
    posRow.getCell(2).value = "SK Secretary";
    posRow.getCell(11).value = "SK Chairman";
    posRow.font = { size: 11 };

    // Alignment for signature block
    [labelRow, nameRow, posRow].forEach(row => {
      row.getCell(2).alignment = { horizontal: 'center' };
      row.getCell(11).alignment = { horizontal: 'center' };
    });

    // 6. Write to buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `Catarman_KK_Profile_Output.xlsx`);
  };

  const handleAction = (mode, profile = null) => {
    setModalMode(mode);
    setSelectedProfile(profile);
    setIsModalOpen(true);
    setOpenMenuId(null);
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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 h-full shadow-sm flex flex-col transition-colors duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-4 shrink-0">
        <div>
          <h1 className="text-xl font-black text-[#0D2440] dark:text-white transition-colors">Katipunan ng Kabataan Profile</h1>
          <p className="text-xs text-[#7BA4D0] dark:text-slate-400 transition-colors">Master Database • {profiles.length} Total Records</p>
        </div>
        <div className="flex gap-2">
          {/* ASSIGNED EXPORT HANDLER */}
          <button onClick={exportToExcel} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-[#0D2440] dark:text-white rounded-lg font-bold text-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-all">
            <FileDown size={16} /> Export
          </button>
          <button onClick={() => handleAction('add')} className="flex items-center gap-2 px-3 py-2 bg-[#0D2440] dark:bg-blue-600 text-white rounded-lg font-bold text-xs shadow-lg hover:bg-[#1a3b5e] transition-all">
            <UserPlus size={16} /> Add Youth
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7BA4D0] dark:text-slate-400" size={16} />
        <input type="text" placeholder="Search Name..." className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl text-xs text-[#0D2440] dark:text-white font-bold outline-none focus:ring-2 focus:ring-blue-500/50 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto border border-gray-200 dark:border-slate-700 rounded-xl relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600">
        <table className="w-full text-left border-collapse min-w-max"> 
          <thead className="bg-gray-50 dark:bg-slate-800 sticky top-0 z-20 shadow-sm">
            <tr className="text-[10px] font-black uppercase text-[#7BA4D0] dark:text-slate-400 border-b border-gray-200 dark:border-slate-700 h-10">
              <th className="px-3 bg-gray-50 dark:bg-slate-800 sticky left-0 z-30 w-12 text-center border-r dark:border-slate-700">No.</th>
              <th className="px-3 bg-gray-50 dark:bg-slate-800 sticky left-12 z-30 w-64 border-r dark:border-slate-700 drop-shadow-sm text-left">Name</th>
              <th className="px-3 whitespace-nowrap">Region</th>
              <th className="px-3 whitespace-nowrap">Province</th>
              <th className="px-3 whitespace-nowrap">Municipality</th>
              <th className="px-3 whitespace-nowrap">Barangay</th>
              <th className="px-3 whitespace-nowrap">Sitio/Purok</th>
              <th className="px-3 text-center">Age</th>
              <th className="px-3 whitespace-nowrap">Birthday</th>
              <th className="px-3 whitespace-nowrap">Sex</th>
              <th className="px-3 whitespace-nowrap">Civil Status</th>
              <th className="px-3 whitespace-nowrap">Youth Class</th>
              <th className="px-3 whitespace-nowrap">Age Group</th>
              <th className="px-3 whitespace-nowrap">Email</th>
              <th className="px-3 whitespace-nowrap">Contact</th>
              <th className="px-3 whitespace-nowrap">Education</th>
              <th className="px-3 whitespace-nowrap">Work Status</th>
              <th className="px-3 sticky right-0 bg-gray-50 dark:bg-slate-800 z-30 text-center w-16 border-l dark:border-slate-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50">
            {profiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors h-10">
                <td className="px-3 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center sticky left-0 bg-white dark:bg-slate-900 border-r dark:border-slate-700 z-10">{profile.no}</td>
                <td className="px-3 text-[11px] font-black text-[#0D2440] dark:text-white sticky left-12 bg-white dark:bg-slate-900 border-r dark:border-slate-700 z-10 drop-shadow-sm truncate max-w-[16rem]">{profile.name}</td>
                
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.region}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.province}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.municipality}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.barangay}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.purok}</td>
                <td className="px-3 text-[11px] font-bold text-center text-gray-800 dark:text-slate-200">{profile.age}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 whitespace-nowrap">{profile.birthday}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300">{profile.sex}</td>
                <td className="px-3 text-[10px] font-bold uppercase text-gray-500 dark:text-slate-500">{profile.civilStatus}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 whitespace-nowrap">{profile.youthClass}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 whitespace-nowrap">{profile.ageGroup}</td>
                <td className="px-3 text-[11px] text-blue-600 dark:text-blue-400 underline truncate max-w-[10rem]">{profile.email}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 font-mono">{profile.contact}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 whitespace-nowrap">{profile.education}</td>
                <td className="px-3 text-[11px] text-gray-600 dark:text-slate-300 whitespace-nowrap">{profile.workStatus}</td>
                
                <td className="px-3 sticky right-0 bg-white dark:bg-slate-900 border-l dark:border-slate-700 z-10 text-center relative">
                  <button onClick={(e) => toggleMenu(profile.id, e)} className="p-1.5 text-gray-400 hover:text-[#0D2440] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
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
            className="w-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-2"
          >
            <Edit2 size={12} /> Edit
          </button>
          <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
          <button className="w-full px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2">
            <Trash2 size={12} /> Delete
          </button>
        </div>
      )}

      <AddProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={modalMode} initialData={selectedProfile} onSave={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProfilesView;