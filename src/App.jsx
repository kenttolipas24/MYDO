import React, { useState } from 'react';
import { Bell, Search, User, Home, Users, Map, FileText, Menu } from 'lucide-react';
import mydoLogo from './assets/mydo logo.png'; 
import DashboardView from './views/DashboardView';
import ProfilesView from './views/ProfilesView';

export default function App() {
  const [isSidebarShrinked, setIsSidebarShrinked] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 shrink-0">
        <div className="flex items-center gap-6 flex-1">
          <button 
            onClick={() => setIsSidebarShrinked(!isSidebarShrinked)}
            className="hover:bg-gray-200/50 p-2 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-[#0D2440]" />
          </button>
          <span className="text-xl font-bold text-[#0D2440]">MYDO SYSTEM</span>
        </div>

        <div className="flex justify-center flex-1">
          <img src={mydoLogo} alt="Logo" className="w-16 h-16 rounded-full shadow-lg object-cover" />
        </div>

        <div className="flex items-center justify-end gap-4 flex-1">
          <div className="relative w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7BA4D0]" />
            <input
              type="text"
              placeholder="Search..."
              style={{ backgroundColor: '#e7f0fa' }}
              className="w-full pl-10 pr-4 py-2 border border-[#d1e3f8] rounded-xl focus:bg-white transition-all outline-none text-sm text-[#0D2440]"
            />
          </div>
          <button className="p-2.5 text-[#2E5E99] hover:text-[#0D2440]">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-[#0D2440] text-white rounded-full flex items-center justify-center shadow-md">
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <nav className={`pl-10 pr-4 py-2 space-y-2 transition-all duration-300 shrink-0 ${isSidebarShrinked ? 'w-24' : 'w-72'}`}>
          <button 
            onClick={() => setActiveMenu('dashboard')}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              activeMenu === 'dashboard' ? 'bg-[#0D2440] text-white shadow-lg' : 'text-[#7BA4D0] hover:bg-[#e7f0fa]'
            }`}>
            <Home className="w-5 h-5 flex-shrink-0" />
            {!isSidebarShrinked && <span className="font-semibold text-sm">Dashboard</span>}
          </button>
          
          <button 
            onClick={() => setActiveMenu('youth')}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              activeMenu === 'youth' ? 'bg-[#0D2440] text-white shadow-lg' : 'text-[#7BA4D0] hover:bg-[#e7f0fa]'
            }`}>
            <Users className="w-5 h-5 flex-shrink-0" />
            {!isSidebarShrinked && <span className="font-semibold text-sm">SK Profiles</span>}
          </button>
          
          <button 
            onClick={() => setActiveMenu('map')}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              activeMenu === 'map' ? 'bg-[#0D2440] text-white shadow-lg' : 'text-[#7BA4D0] hover:bg-[#e7f0fa]'
            }`}>
            <Map className="w-5 h-5 flex-shrink-0" />
            {!isSidebarShrinked && <span className="font-semibold text-sm">Brgy Map</span>}
          </button>
          
          <button 
            onClick={() => setActiveMenu('reports')}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
              activeMenu === 'reports' ? 'bg-[#0D2440] text-white shadow-lg' : 'text-[#7BA4D0] hover:bg-[#e7f0fa]'
            }`}>
            <FileText className="w-5 h-5 flex-shrink-0" />
            {!isSidebarShrinked && <span className="font-semibold text-sm">Reports</span>}
          </button>
        </nav>

        {/* MAIN AREA: FIXED LOGIC HERE */}
        <main className="flex-1 pr-10 pb-10 overflow-y-auto">
          {activeMenu === 'dashboard' && <DashboardView />}
          
          {/* Add this line specifically for the profiles view */}
          {activeMenu === 'youth' && <ProfilesView />}
          
          {/* Changed this to only show if it's NOT dashboard AND NOT youth */}
          {activeMenu !== 'dashboard' && activeMenu !== 'youth' && (
             <div className="bg-white rounded-2xl shadow-sm border border-[#7BA4D0]/20 p-12 text-center h-full flex flex-col items-center justify-center">
               <h2 className="text-xl font-bold text-[#0D2440] capitalize">{activeMenu} Module</h2>
               <p className="text-[#7BA4D0]">Coming Soon</p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}