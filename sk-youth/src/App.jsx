import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Home, 
  Users, 
  UserCog, // Official Member icon
  FileText, 
  Menu 
} from 'lucide-react';
import mydoLogo from './assets/mydo logo.png'; 

// --- IMPORTS ---
import NotificationModal from './components/NotificationModal'; 
import DashboardView from './views/DashboardView'; 
import ProfilesView from './views/ProfilesView';
import SKMembers from './views/SKMembers'; 
import ReportsView from './views/ReportsView';
import SettingsModal from './components/SettingsModal';
import UserSettingsModal from './components/UserSettingsModal';
import AddProfileModal from './views/AddProfileModal'; 

export default function App() {
  const [isSidebarShrinked, setIsSidebarShrinked] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  // MODAL STATES
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [userSettingsTab, setUserSettingsTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ADD PROFILE MODAL STATE
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalMode, setAddModalMode] = useState('add');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleOpenSettings = (tab) => {
    setUserSettingsTab(tab);
    setIsUserSettingsOpen(true);
    setIsProfileOpen(false); 
  };

  const handleProfileAction = (mode, profile = null) => {
    setAddModalMode(mode);
    setSelectedProfile(profile);
    setIsAddModalOpen(true);
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-slate-900 flex overflow-hidden font-sans relative">
      
      {/* 1. SIDEBAR */}
      <aside className={`flex flex-col bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 transition-all duration-300 z-10 ${isSidebarShrinked ? 'w-20' : 'w-72'}`}>
        <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-50 dark:border-slate-800 shrink-0">
          <img src={mydoLogo} alt="Logo" className="w-8 h-8 rounded-full shadow-sm object-cover" />
          {!isSidebarShrinked && (
            <div className="flex flex-col">
              <span className="text-lg font-black text-[#0D2440] dark:text-white leading-none">MYDO</span>
              <span className="text-[9px] font-bold text-[#7BA4D0] dark:text-slate-500 uppercase tracking-widest">SK Portal</span>
            </div>
          )}
        </div>
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <MenuButton icon={Home} label="Dashboard" active={activeMenu === 'dashboard'} collapsed={isSidebarShrinked} onClick={() => setActiveMenu('dashboard')} />
          <MenuButton icon={Users} label="Youth Registry" active={activeMenu === 'youth'} collapsed={isSidebarShrinked} onClick={() => setActiveMenu('youth')} />
          
          {/* UPDATED SK MEMBERS ICON TO UserCog */}
          <MenuButton 
            icon={UserCog} 
            label="SK Members" 
            active={activeMenu === 'members'} 
            collapsed={isSidebarShrinked} 
            onClick={() => setActiveMenu('members')} 
          />
          
          <MenuButton icon={FileText} label="Submissions" active={activeMenu === 'reports'} collapsed={isSidebarShrinked} onClick={() => setActiveMenu('reports')} />
        </nav>
        <div className="p-4 border-t border-gray-50 dark:border-slate-800 shrink-0">
          <button onClick={() => setIsSidebarShrinked(!isSidebarShrinked)} className="w-full flex items-center justify-center p-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <Menu size={20} />
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT BODY */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-20 px-8 flex items-center justify-between shrink-0 relative bg-gray-50 dark:bg-slate-900">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
              className={`p-2.5 rounded-xl transition-all relative ${isNotifOpen ? 'bg-white text-blue-600 shadow-md ring-1 ring-blue-100' : 'text-gray-400 hover:text-[#0D2440] hover:bg-white dark:hover:bg-slate-800'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <button 
              onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-white dark:border-slate-700 transition-all ${isProfileOpen ? 'bg-[#0D2440] text-white ring-4 ring-gray-100 dark:ring-slate-800' : 'bg-white dark:bg-slate-800 text-[#0D2440] dark:text-white'}`}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 pt-0">
          {activeMenu === 'dashboard' && <DashboardView />}
          {activeMenu === 'youth' && <ProfilesView onAction={handleProfileAction} />}
          {activeMenu === 'members' && <SKMembers />}
          {activeMenu === 'reports' && <ReportsView />}
        </div>
      </main>

      {/* --- 3. THE MASTER LAYER --- */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {isNotifOpen && (
          <div className="absolute top-20 right-24 pointer-events-auto">
            <NotificationModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>
        )}
        {isProfileOpen && (
          <div className="absolute top-20 right-8 pointer-events-auto">
            <SettingsModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} onOpenSettings={handleOpenSettings} />
          </div>
        )}
        <div className="pointer-events-auto">
            <AddProfileModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} mode={addModalMode} initialData={selectedProfile} onSave={() => setIsAddModalOpen(false)} />
            <UserSettingsModal isOpen={isUserSettingsOpen} onClose={() => setIsUserSettingsOpen(false)} initialTab={userSettingsTab} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
      </div>
    </div>
  );
}

const MenuButton = ({ icon: Icon, label, active, collapsed, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${active ? 'bg-[#0D2440] dark:bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#0D2440]'}`}>
    <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-gray-400 group-hover:text-[#0D2440] dark:group-hover:text-white'}`} />
    {!collapsed && <span className="font-bold text-xs tracking-wide">{label}</span>}
  </button>
);