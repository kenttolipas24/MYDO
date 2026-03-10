import React, { useState, useRef, useEffect } from 'react';
import {
  UserPlus, UserMinus, MoreVertical, AlertCircle,
  Shield, Eye, Edit2, History, Download
} from 'lucide-react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { supabase } from '../supabaseClient';

// ── Import actual logo images ────────────────────────────────────────
// Place these files in src/assets/ (or public/assets/ if you prefer)
import catarmanLogoSrc from '../assets/catarman-logo.jpg';
import mydoLogoSrc from '../assets/mydo-logo.png';

import AddSKMemberModal from '../components/AddSKMemberModal';
import PastMembersModal from '../components/PastMembersModal';
import MemberManagementModal from '../components/MemberManagementModal';

// You might also want to add a ResignConfirmModal component
// (shown as placeholder below — implement it or remove if not needed)
const ResignConfirmModal = ({ member, onConfirm, onClose }) => {
  if (!member) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Resignation</h3>
        <p className="mb-6">
          Are you sure you want to mark <strong>{member.name}</strong> as resigned?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Confirm Resign
          </button>
        </div>
      </div>
    </div>
  );
};

const SKMembers = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const [isPastModalOpen, setIsPastModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resignTarget, setResignTarget] = useState(null);

  const menuRef = useRef(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (err) {
      console.error("Fetch members error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isTermExpired = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    let electionYear;

    if (currentYear <= 2026) electionYear = 2026;
    else if (currentYear <= 2030) electionYear = 2030;
    else {
      const yearsSince2030 = currentYear - 2030;
      electionYear = 2030 + (Math.ceil(yearsSince2030 / 4) * 4);
    }

    return today >= new Date(electionYear, 11, 1); // Dec 1
  };

  const handleAddMember = async (formData) => {
    const payload = {
      first_name: formData.firstName?.toUpperCase() || '',
      middle_name: formData.middleName?.toUpperCase() || null,
      last_name: formData.lastName?.toUpperCase() || '',
      suffix: formData.suffix?.toUpperCase() || null,
      designation: formData.designation,
      date_joined: formData.registryDate,
      status: 'active'
    };

    try {
      const { error } = await supabase.from('members').insert([payload]);
      if (error) throw error;
      fetchMembers();
      setIsAddModalOpen(false);
    } catch (err) {
      alert("Error adding member: " + err.message);
    }
  };

  const handleResign = async (id) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({
          status: 'resigned',
          date_resigned: new Date().toISOString().split('T')[0]
        })
        .eq('id', id);

      if (error) throw error;
      fetchMembers();
      setOpenMenuId(null);
    } catch (err) {
      alert("Error marking resignation: " + err.message);
    }
  };

  const handleOpenMember = (memberId, startMode = 'view') => {
    const found = members.find(m => m.id === memberId);
    if (!found) return;
    setSelectedMember({ ...found, _startMode: startMode });
    setIsMemberModalOpen(true);
    setOpenMenuId(null);
  };

  const toggleMenu = (e, memberId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      right: window.innerWidth - rect.right
    });
    setOpenMenuId(openMenuId === memberId ? null : memberId);
  };

  const formatName = (m) =>
    `${m.first_name} ${m.middle_name ? m.middle_name + ' ' : ''}${m.last_name}${m.suffix ? ', ' + m.suffix : ''}`;

  const formatDate = (dateString) =>
    dateString
      ? new Date(dateString).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        }).toUpperCase()
      : '';

  const termEnded = isTermExpired();
  const filteredMembers = termEnded ? [] : members.filter(m => m.status === 'active');
  const pastMembers = termEnded ? members : members.filter(m => m.status === 'resigned');

  // ─────────────────────────────────────────────────────────────
  //                  EXPORT TO EXCEL (fixed version)
  // ─────────────────────────────────────────────────────────────
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const ws = workbook.addWorksheet('SK Directory');

    ws.columns = [
      { width: 9.1 }, { width: 9.1 }, { width: 12 }, { width: 10 },
      { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
      { width: 17 }, { width: 7.5 }, { width: 24 }, { width: 18.5 },
      { width: 21 }, { width: 20.5 }, { width: 19.7 }, { width: 15.7 }
    ];

    const GREY_FILL    = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF808080' } };
    const DARK_FILL    = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF595959' } };
    const DATA_FILL    = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA6A6A6' } };
    const WHITE_FILL   = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };

    const THIN         = { style: 'thin', color: { argb: 'FF000000' } };
    const BORDERS      = { top: THIN, bottom: THIN, left: THIN, right: THIN };

    const CENTER       = { horizontal: 'center', vertical: 'middle' };
    const LEFT         = { horizontal: 'left', vertical: 'middle' };

    const STD          = { name: 'Arial', size: 11 };
    const SMALL        = { name: 'Arial', size: 8 };
    const WHITE_BOLD   = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    const WHITE_BOLD_ITALIC = { name: 'Arial', size: 11, bold: true, italic: true, color: { argb: 'FFFFFFFF' } };
    const OLD_ENGLISH  = { name: 'Old English Text MT', size: 14 };

    const fillRange = (r1, r2, c1, c2, fill, border) => {
      for (let r = r1; r <= r2; r++) {
        for (let c = c1; c <= c2; c++) {
          const cell = ws.getCell(r, c);
          if (fill) cell.fill = fill;
          if (border) cell.border = border;
        }
      }
    };

    const sc = (row, col, value, font, align, fill, border) => {
      const c = ws.getCell(row, col);
      if (value !== undefined) c.value = value;
      if (font) c.font = font;
      if (align) c.alignment = align;
      if (fill) c.fill = fill;
      if (border) c.border = border;
    };

    // Row heights
    ws.getRow(1).height = 22;
    ws.getRow(2).height = 20;
    ws.getRow(3).height = 20;
    ws.getRow(4).height = 16;
    ws.getRow(12).height = 32;

    // Header text
    sc(1, 1, 'Republic of the Philippines', OLD_ENGLISH, CENTER);
    ws.mergeCells('A1:P1');

    sc(2, 1, 'Province of Northern Samar', STD, CENTER);
    ws.mergeCells('A2:P2');

    sc(3, 1, 'MUNICIPALITY OF CATARMAN', { ...STD, bold: true }, CENTER);
    ws.mergeCells('A3:P3');

    sc(4, 1, 'o0o', { ...STD, bold: true }, CENTER);
    ws.mergeCells('A4:P4');

    ws.mergeCells('A5:P5');

    sc(6, 1, 'DIRECTORY OF SANGGUNIANG KABATAAN OFFICIALS', { ...STD, bold: true }, CENTER);
    ws.mergeCells('A6:P6');

    sc(7, 1, 'November 30, 2023 - November 30, 2026', STD, CENTER);
    ws.mergeCells('A7:P7');

    ws.mergeCells('A8:P8');

    sc(9, 1, 'BARANGAY: ', { ...STD, bold: true }, LEFT);
    ws.mergeCells('A9:F9');

    ws.mergeCells('A10:P10');

    // ── Add logos using imported images ───────────────────────────────
    const logoSize = 55; // pixels (~0.57in at 96dpi)

    // Catarman logo - left / center area
    const catarmanId = workbook.addImage({
      base64: await fetch(catarmanLogoSrc).then(r => r.blob()).then(b => {
        return new Promise((res) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result.split(',')[1]);
          reader.readAsDataURL(b);
        });
      }),
      extension: 'png',
    });

    ws.addImage(catarmanId, {
      tl: { col: 7.5, row: 0.2 },
      ext: { width: logoSize, height: logoSize }
    });

    // MYDO logo - right side
    const mydoId = workbook.addImage({
      base64: await fetch(mydoLogoSrc).then(r => r.blob()).then(b => {
        return new Promise((res) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result.split(',')[1]);
          reader.readAsDataURL(b);
        });
      }),
      extension: 'png',
    });

    ws.addImage(mydoId, {
      tl: { col: 11, row: 0.2 },
      ext: { width: logoSize, height: logoSize }
    });

    // ── Table headers ────────────────────────────────────────────────
    sc(11, 1, 'POSITION/RANK', WHITE_BOLD, CENTER, DARK_FILL, BORDERS);
    ws.mergeCells('A11:B12');
    fillRange(11, 12, 1, 2, DARK_FILL, BORDERS);

    sc(11, 3, 'NAME', WHITE_BOLD, CENTER, DARK_FILL, BORDERS);
    ws.mergeCells('C11:H12');
    fillRange(11, 12, 3, 8, DARK_FILL, BORDERS);

    sc(11, 9, 'SK-RELATED DATA', WHITE_BOLD, CENTER, DARK_FILL, BORDERS);
    ws.mergeCells('I11:P11');
    fillRange(11, 11, 9, 16, DARK_FILL, BORDERS);

    const subHeaders = [
      [9,  'Birthday (Spell-out the Month)', 9],
      [10, 'Gender',                         9],
      [11, 'Email',                          8],
      [12, 'Contact No.',                    9],
      [13, 'PhilHealth No.',                 8],
      [14, 'Date of Election/Appointment',   8],
      [15, 'Date of Assumption',             8],
      [16, 'SKMT Control No.',               9],
    ];

    subHeaders.forEach(([col, text, sz]) => {
      sc(12, col, text,
        { name: 'Arial', bold: true, size: sz, color: { argb: 'FFFFFFFF' } },
        CENTER,
        DARK_FILL,
        BORDERS
      );
    });

    // ── Helper functions for sections ────────────────────────────────
    const sectionRow = (row, text) => {
      sc(row, 1, text || null, WHITE_BOLD_ITALIC, LEFT, GREY_FILL, BORDERS);
      ws.mergeCells(`A${row}:P${row}`);
      fillRange(row, row, 1, 16, GREY_FILL, BORDERS);
    };

    const dataRow = (row, rankVal, member) => {
      sc(row, 1, rankVal ?? null,
        { name: 'Arial', size: 8, color: { argb: 'FFFFFFFF' } },
        CENTER,
        DATA_FILL,
        BORDERS
      );
      ws.mergeCells(`A${row}:B${row}`);
      fillRange(row, row, 1, 2, DATA_FILL, BORDERS);

      sc(row, 3, member ? formatName(member) : null, SMALL, LEFT, WHITE_FILL, BORDERS);
      ws.mergeCells(`C${row}:H${row}`);
      fillRange(row, row, 3, 8, WHITE_FILL, BORDERS);

      const vals = member ? [
        member.birthday || '',
        member.gender || '',
        member.email || '',
        member.contact_no || '',
        member.philhealth_no || '',
        formatDate(member.date_election || member.date_joined),
        formatDate(member.date_assumption || member.date_joined),
        member.skmt_control_no || '',
      ] : Array(8).fill('');

      vals.forEach((val, i) => {
        sc(row, 9 + i, val, SMALL, CENTER, WHITE_FILL, BORDERS);
      });
    };

    // ── Data layout ──────────────────────────────────────────────────
    const activeMembers = filteredMembers;
    const chairman    = activeMembers.find(m => /chair(man|person)/i.test(m.designation || ''));
    const secretary   = activeMembers.find(m => /secretary/i.test(m.designation || ''));
    const treasurer   = activeMembers.find(m => /treasurer/i.test(m.designation || ''));
    const regulars    = activeMembers.filter(m =>
      !/chair(man|person)|secretary|treasurer/i.test(m.designation || '')
    );

    sectionRow(13, 'Chairperson, Sangguniang Kabataan');
    dataRow(14, null, chairman);

    sectionRow(15, 'Members, Sangguniang Kabataan');
    for (let i = 0; i < 7; i++) {
      dataRow(16 + i, i + 1, regulars[i] || null);
    }

    sectionRow(23, 'Secretary, Sangguniang Kabataan');
    dataRow(24, null, secretary);

    sectionRow(25, 'Treasurer, Sangguniang Kabataan');
    dataRow(26, null, treasurer);

    sectionRow(27);

    // Signature lines
    sc(29, 1, 'Prepared by:', STD);
    ws.mergeCells('A29:E29');

    sc(29, 11, 'Attested:', STD);
    ws.mergeCells('K29:L29');

    sc(33, 1, '___________________________', STD, CENTER);
    ws.mergeCells('A33:E33');

    sc(33, 11, '_______________________________', STD, CENTER);
    ws.mergeCells('K33:L33');

    sc(34, 1, 'SK Secretary', STD, CENTER);
    ws.mergeCells('A34:E34');

    sc(34, 11, 'SK Chairperson', STD, CENTER);
    ws.mergeCells('K34:L34');

    // Generate file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    saveAs(blob, 'SK_Directory.xlsx');
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-950 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img src="/src/assets/philippines-sk-seeklogo.svg" alt="SK Logo" className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#7BA4D0] uppercase">
                Official Council Records
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#0D2440] dark:text-white tracking-tight uppercase leading-tight">
              Sangguniang Kabataan
            </h1>
            {termEnded && (
              <div className="mt-2 flex items-center gap-1.5 text-red-500 text-[10px] font-bold uppercase animate-pulse">
                <AlertCircle size={11} /> Term Expired — Records Archived
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
            >
              <Download size={13} />
              Export Directory
            </button>

            <button
              onClick={() => setIsPastModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              <History size={13} />
              Past Members
            </button>

            {!termEnded && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold bg-[#0D2440] text-white hover:bg-[#163560] transition-all"
              >
                <UserPlus size={13} />
                Add SK Member
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-800 px-4">
          <TabButton
            active={activeTab === 'active'}
            onClick={() => setActiveTab('active')}
            label="Current Council"
          />
          <TabButton
            active={activeTab === 'resigned'}
            onClick={() => setActiveTab('resigned')}
            label="Resigned SK"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/60 dark:bg-slate-800/40">
                <th className="px-6 py-3 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  Member Identity
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  Gender
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  Designation
                </th>
                <th className="px-4 py-3 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  Registry Date
                </th>
                <th className="px-6 py-3 text-right text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-[11px] font-medium text-gray-400">
                    Loading records...
                  </td>
                </tr>
              ) : (activeTab === 'active' ? filteredMembers : pastMembers).length > 0 ? (
                (activeTab === 'active' ? filteredMembers : pastMembers).map((member) => (
                  <tr
                    key={member.id}
                    className={`hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${
                      member.status === 'resigned' || termEnded ? 'opacity-40' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0D2440]/10 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {member.image_url ? (
                            <img
                              src={member.image_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[11px] font-black text-[#0D2440] dark:text-white uppercase">
                              {member.first_name?.[0]}{member.last_name?.[0]}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-[#0D2440] dark:text-white uppercase">
                          {formatName(member)}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {member.gender ? (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            member.gender.toLowerCase() === 'male'
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : member.gender.toLowerCase() === 'female'
                              ? 'bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                              : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
                          }`}
                        >
                          {member.gender}
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-300 dark:text-slate-600">—</span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 uppercase">
                        {member.designation || '—'}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-[11px] font-semibold text-gray-700 dark:text-slate-300 uppercase">
                        {formatDate(member.date_joined)}
                      </p>
                      <p className="text-[9px] font-medium text-gray-400 dark:text-slate-500 uppercase mt-0.5">
                        Term Start
                      </p>
                    </td>

                    <td className="px-6 py-4 text-right">
                      {!termEnded && (
                        <button
                          onClick={(e) => toggleMenu(e, member.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-gray-300 dark:text-slate-600">
                      <AlertCircle size={28} strokeWidth={1.5} />
                      <span className="text-[11px] font-medium uppercase tracking-widest">
                        No Records Found
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dropdown Menu */}
      {openMenuId && !termEnded && (
        <div
          ref={menuRef}
          style={{
            top: `${menuPosition.top + 4}px`,
            right: `${menuPosition.right}px`,
          }}
          className="fixed w-40 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 z-[100] py-1 overflow-hidden"
        >
          <button
            onClick={() => handleOpenMember(openMenuId, 'view')}
            className="w-full px-4 py-2.5 text-[11px] font-medium text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
          >
            <Eye size={13} className="text-gray-400" />
            View Profile
          </button>

          <button
            onClick={() => handleOpenMember(openMenuId, 'edit')}
            className="w-full px-4 py-2.5 text-[11px] font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center gap-2.5 transition-colors"
          >
            <Edit2 size={13} />
            Edit Info
          </button>

          <div className="border-t border-gray-100 dark:border-slate-700 my-1" />

          <button
            onClick={() => {
              const found = members.find(m => m.id === openMenuId);
              setResignTarget({ id: openMenuId, name: formatName(found) });
              setOpenMenuId(null);
            }}
            className="w-full px-4 py-2.5 text-[11px] font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2.5 transition-colors"
          >
            <UserMinus size={13} />
            Resign
          </button>
        </div>
      )}

      {/* Modals */}
      <PastMembersModal
        isOpen={isPastModalOpen}
        onClose={() => setIsPastModalOpen(false)}
        pastMembers={pastMembers}
        formatName={formatName}
        formatDate={formatDate}
      />

      <AddSKMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMember}
      />

      <MemberManagementModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        member={selectedMember}
        onUpdate={fetchMembers}
      />

      <ResignConfirmModal
        member={resignTarget}
        onConfirm={() => {
          handleResign(resignTarget.id);
          setResignTarget(null);
        }}
        onClose={() => setResignTarget(null)}
      />
    </div>
  );
};

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-5 py-3.5 text-[11px] font-semibold transition-all relative border-b-2 -mb-px ${
      active
        ? 'text-[#0D2440] dark:text-white border-[#0D2440] dark:border-white'
        : 'text-gray-400 dark:text-slate-500 border-transparent hover:text-gray-600 dark:hover:text-slate-300'
    }`}
  >
    {label}
  </button>
);

export default SKMembers;