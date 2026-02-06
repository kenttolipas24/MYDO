import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, Filter, Edit2, Eye, Calendar, MoreHorizontal } from 'lucide-react';
import AddProfileModal from './AddProfileModal';

const ProfilesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  // Modal State Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Your original profiles data
  const [profiles, setProfiles] = useState([
    { id: 1, skmtNo: '2026-001', firstName: 'Juan', middleName: '', lastName: 'dela Cruz', suffix: '', position: 'SK Chairperson', birthdate: '2004-05-12', age: 22, gender: 'Male', status: 'Active', purok: 'Purok 1' },
    { id: 2, skmtNo: '2026-002', firstName: 'Maria', middleName: '', lastName: 'Garcia', suffix: '', position: 'Secretary', birthdate: '2007-02-20', age: 19, gender: 'Female', status: 'Active', purok: 'Purok 3' },
    { id: 3, skmtNo: '2026-003', firstName: 'Pedro', middleName: '', lastName: 'Santos', suffix: '', position: 'Treasurer', birthdate: '2001-11-30', age: 25, gender: 'Male', status: 'Inactive', purok: 'Purok 5' },
  ]);

  // Original search filtering logic
  const filteredProfiles = profiles.filter(p => 
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.skmtNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to trigger Modal
  const handleAction = (mode, profile = null) => {
    setModalMode(mode);
    setSelectedProfile(profile);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 h-full shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#0D2440]">SK Profiles</h1>
          <p className="text-sm text-[#7BA4D0]">Official Youth Registry</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-xl text-[#7BA4D0] font-bold text-sm hover:bg-gray-50 transition-all">
            <Filter size={18} /> Filter
          </button>
          <button 
            onClick={() => handleAction('add')}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0D2440] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#0D2440]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <UserPlus size={18} /> Add Profile
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7BA4D0]" size={20} />
        <input 
          type="text" 
          placeholder="Search by SKMT No. or Name..." 
          className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border-none rounded-2xl text-[#0D2440] font-medium placeholder-[#7BA4D0]/60 outline-none focus:ring-2 focus:ring-[#0D2440]/5 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-black uppercase tracking-[0.2em] text-[#7BA4D0] border-b border-gray-50">
              <th className="pb-4 px-4">SKMT No.</th>
              <th className="pb-4 px-4">Name</th>
              <th className="pb-4 px-4">Position</th>
              <th className="pb-4 px-4">Birthdate</th>
              <th className="pb-4 px-4 text-center">Age</th>
              <th className="pb-4 px-4">Gender</th>
              <th className="pb-4 px-4">Status</th>
              <th className="pb-4 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredProfiles.map((profile) => (
              <tr key={profile.id} className="group hover:bg-[#F8FAFC]/50 transition-all">
                <td className="py-5 px-4 text-sm font-bold text-[#7BA4D0]">{profile.skmtNo}</td>
                <td className="py-5 px-4 text-sm font-black text-[#0D2440]">{profile.firstName} {profile.lastName}</td>
                <td className="py-5 px-4 text-sm text-[#7BA4D0] font-medium">{profile.position}</td>
                <td className="py-5 px-4 text-sm text-[#7BA4D0] font-medium">
                  <div className="flex items-center gap-2"><Calendar size={14} className="opacity-40" /> {profile.birthdate}</div>
                </td>
                <td className="py-5 px-4 text-sm font-black text-[#0D2440] text-center">{profile.age}</td>
                <td className="py-5 px-4 text-sm text-[#7BA4D0] font-medium">{profile.gender}</td>
                <td className="py-5 px-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    profile.status === 'Active' ? 'bg-green-50 text-green-500' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {profile.status}
                  </span>
                </td>
                <td className="py-5 px-4 text-right relative">
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === profile.id ? null : profile.id)}
                    className="p-2 text-[#7BA4D0] hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {/* Universal Action Dropdown */}
                  {openMenuId === profile.id && (
                    <div ref={menuRef} className="absolute right-4 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-2 animate-in fade-in zoom-in duration-200">
                      <button 
                        onClick={() => handleAction('view', profile)}
                        className="w-full px-4 py-2.5 text-left text-[11px] font-black uppercase tracking-widest text-[#7BA4D0] hover:bg-[#F8FAFC] hover:text-[#0D2440] flex items-center gap-2 transition-colors"
                      >
                        <Eye size={14} /> View
                      </button>
                      <button 
                        onClick={() => handleAction('edit', profile)}
                        className="w-full px-4 py-2.5 text-left text-[11px] font-black uppercase tracking-widest text-[#7BA4D0] hover:bg-[#F8FAFC] hover:text-[#0D2440] flex items-center gap-2 transition-colors"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Adaptive Component */}
      <AddProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode}
        initialData={selectedProfile}
        onSave={(data) => {
          console.log("Saving profile:", data);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProfilesView;