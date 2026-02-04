import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

const ProfilesView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const profiles = [
    { id: 1, name: 'Juan dela Cruz', age: 22, status: 'Employed', purok: 'Purok 3' },
    { id: 2, name: 'Maria Garcia', age: 19, status: 'Student', purok: 'Purok 1' },
    { id: 3, name: 'Pedro Santos', age: 25, status: 'Unemployed', purok: 'Purok 5' },
    { id: 4, name: 'Ana Reyes', age: 21, status: 'Student', purok: 'Purok 2' },
    { id: 5, name: 'Jose Martinez', age: 23, status: 'Employed', purok: 'Purok 4' },
  ];

  const filteredProfiles = profiles.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.purok.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Youth Profiles</h2>
          <p className="text-sm text-gray-500">Manage youth information</p>
        </div>
        <button 
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-all shadow-sm"
        >
          <UserPlus size={18} /> Add New Profile
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or purok..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-black transition-all" 
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Age</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Purok</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 text-gray-600">{p.age}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      p.status === 'Employed' ? 'bg-green-50 text-green-700' :
                      p.status === 'Student' ? 'bg-blue-50 text-blue-700' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{p.purok}</td>
                  <td className="px-6 py-4">
                    <button className="text-black font-bold text-sm hover:underline">View</button>
                    <span className="mx-2 text-gray-300">|</span>
                    <button className="text-black font-bold text-sm hover:underline">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  No profiles found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilesView;