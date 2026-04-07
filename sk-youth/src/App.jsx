import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Home, 
  Users, 
  UserCog,
  FileText,
  Wallet,
  Menu,
  ChevronDown,
  LayoutDashboard,
  PenLine
} from 'lucide-react';
import mydoLogo from './assets/mydo-logo.png'; 

import NotificationModal from './components/NotificationModal'; 
import DashboardView from './views/DashboardView'; 
import ProfilesView from './views/ProfilesView';
import SKMembers from './views/SKMembers'; 
import ReportsView from './views/ReportsView';
import UtilizationView from './views/UtilizationView';
import UpdateFundsView from './views/UpdateFundsView';
import SettingsModal from './components/SettingsModal';
import UserSettingsModal from './components/UserSettingsModal';

export default function App() {
  const [isSidebarShrinked, setIsSidebarShrinked] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeSubMenu, setActiveSubMenu] = useState('overview');
  const [isUtilizationOpen, setIsUtilizationOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [userSettingsTab, setUserSettingsTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [fundsData, setFundsData] = useState({
    year: new Date().getFullYear().toString(),
    region: 'REGION VIII (EASTERN VISAYAS)',
    province: 'NORTHERN SAMAR',
    city: 'CATARMAN',
    barangay: 'OLD RIZAL',
    utilizedSKFunds: 'YES',
    totalSKFunds: 0,
    expenses: [
      { category: 'GAP - PS', amount: 0 },
      { category: 'GAP - MOOE and CO', amount: 0 },
      { category: 'Governance', amount: 0 },
      { category: 'Active Citizenship', amount: 0 },
      { category: 'Economic Empowerment and Global Mobility', amount: 0 },
      { category: 'Agriculture', amount: 0 },
      { category: 'Environment', amount: 0 },
      { category: 'Peace-Building and Security', amount: 0 },
      { category: 'Social Inclusion and Equity', amount: 0 },
      { category: 'Health', amount: 0 },
      { category: 'Sports Development', amount: 0 },
      { category: 'Education', amount: 0 }
    ]
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isSidebarShrinked) setIsUtilizationOpen(false);
  }, [isSidebarShrinked]);

  const handleOpenSettings = (tab) => {
    setUserSettingsTab(tab);
    setIsUserSettingsOpen(true);
    setIsProfileOpen(false); 
  };

  const handleUtilizationClick = () => {
    if (isSidebarShrinked) {
      setActiveMenu('utilization');
      setActiveSubMenu('overview');
      return;
    }
    if (activeMenu !== 'utilization') {
      setActiveMenu('utilization');
      setActiveSubMenu('overview');
      setIsUtilizationOpen(true);
    } else {
      setIsUtilizationOpen(!isUtilizationOpen);
    }
  };

  const handleSubMenuClick = (sub) => {
    setActiveSubMenu(sub);
    setActiveMenu('utilization');
  };

  const isUtilizationActive = activeMenu === 'utilization';

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
          <MenuButton icon={UserCog} label="SK Members" active={activeMenu === 'members'} collapsed={isSidebarShrinked} onClick={() => setActiveMenu('members')} />
          
          {/* FUND UTILIZATION WITH DROPDOWN */}
          <div>
            <button
              onClick={handleUtilizationClick}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative
                ${isUtilizationActive
                  ? 'bg-[#0D2440] dark:bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-[#0D2440]'
                }`}
            >
              <Wallet className={`w-5 h-5 flex-shrink-0 ${isUtilizationActive ? 'text-white' : 'text-gray-400 group-hover:text-[#0D2440] dark:group-hover:text-white'}`} />
              {!isSidebarShrinked && (
                <>
                  <span className="font-bold text-xs tracking-wide flex-1 text-left">Fund Utilization</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isUtilizationOpen ? 'rotate-180' : ''} ${isUtilizationActive ? 'text-white/70' : 'text-gray-300'}`}
                  />
                </>
              )}
            </button>

            {!isSidebarShrinked && isUtilizationOpen && (
              <div className="mt-1 ml-3 pl-5 border-l-2 border-slate-100 dark:border-slate-800 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
                <SubMenuButton
                  icon={LayoutDashboard}
                  label="Overview"
                  active={isUtilizationActive && activeSubMenu === 'overview'}
                  onClick={() => handleSubMenuClick('overview')}
                />
                <SubMenuButton
                  icon={PenLine}
                  label="Update Funds"
                  active={isUtilizationActive && activeSubMenu === 'update'}
                  onClick={() => handleSubMenuClick('update')}
                />
              </div>
            )}
          </div>

          <MenuButton icon={FileText} label="Reports" active={activeMenu === 'reports'} collapsed={isSidebarShrinked} onClick={() => setActiveMenu('reports')} />
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
          {activeMenu === 'youth' && <ProfilesView />}
          {activeMenu === 'members' && <SKMembers />}
          {activeMenu === 'utilization' && activeSubMenu === 'overview' && (
            <UtilizationView />
          )}
          {activeMenu === 'utilization' && activeSubMenu === 'update' && (
            <UpdateFundsView 
              currentData={fundsData} 
              onSave={(updated) => {
                setFundsData(updated);
                setActiveSubMenu('overview');
              }}
              onCancel={() => setActiveSubMenu('overview')}
            />
          )}
          {activeMenu === 'reports' && <ReportsView />}
        </div>
      </main>

      {/* 3. OVERLAYS LAYER */}
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

const SubMenuButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group
      ${active
        ? 'bg-[#0D2440]/8 text-[#0D2440] dark:text-white dark:bg-slate-800'
        : 'text-slate-400 hover:text-[#0D2440] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/50'
      }`}
  >
    <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${active ? 'text-[#0D2440] dark:text-white' : 'text-slate-300 group-hover:text-[#0D2440] dark:group-hover:text-white'}`} />
    <span className={`text-[11px] font-bold tracking-wide ${active ? 'text-[#0D2440] dark:text-white' : ''}`}>{label}</span>
  </button>
);