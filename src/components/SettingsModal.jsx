import React from 'react';
import { 
  User, Settings, LogOut, FileClock, 
  ChevronRight 
} from 'lucide-react';
import mydoLogo from '../assets/mydo logo.png';

const SettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 1. DEFINE CUSTOM ANIMATION HERE (Same as NotificationModal) */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-modal-enter {
          animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Invisible backdrop to close when clicking outside */}
      <div 
        className="fixed inset-0 z-[40]" 
        onClick={onClose}
      ></div>

      {/* MODAL CONTENT - Added 'animate-modal-enter' class */}
      <div className="animate-modal-enter absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-[50] overflow-hidden origin-top-right">
        
        {/* User Header */}
        <div className="bg-[#0D2440] p-6 text-white text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
                <div className="w-16 h-16 mx-auto bg-white p-1 rounded-full mb-3 shadow-lg">
                    <img 
                      src={mydoLogo} 
                      alt="User" 
                      className="w-full h-full rounded-full object-cover" 
                    />
                </div>
                <h3 className="font-bold text-lg">Admin User</h3>
                <p className="text-xs text-blue-200 uppercase tracking-widest font-semibold">System Administrator</p>
            </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1">
            
            {/* My Profile */}
            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="p-2 bg-gray-100 text-gray-500 rounded-lg group-hover:text-[#0D2440] transition-colors">
                    <User size={18} />
                </div>
                <div className="flex-1 text-left">
                    <p className="text-[#0D2440] font-bold">My Profile</p>
                    <p className="text-[10px] text-gray-400">Account details & personal info</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0D2440]" />
            </button>

            {/* Account Logs */}
            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="p-2 bg-gray-100 text-gray-500 rounded-lg group-hover:text-[#0D2440] transition-colors">
                    <FileClock size={18} />
                </div>
                <div className="flex-1 text-left">
                    <p className="text-[#0D2440] font-bold">Account Logs</p>
                    <p className="text-[10px] text-gray-400">Recent login activity & history</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0D2440]" />
            </button>

            {/* System Settings */}
            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
                <div className="p-2 bg-gray-100 text-gray-500 rounded-lg group-hover:text-[#0D2440] transition-colors">
                    <Settings size={18} />
                </div>
                <div className="flex-1 text-left">
                    <p className="text-[#0D2440] font-bold">System Settings</p>
                    <p className="text-[10px] text-gray-400">Preferences & configurations</p>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-[#0D2440]" />
            </button>

        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 my-1 mx-4"></div>

        {/* Logout Section */}
        <div className="p-2">
            <button className="w-full flex items-center gap-3 p-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors group">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg transition-colors">
                    <LogOut size={18} />
                </div>
                <span className="font-bold">Sign Out</span>
            </button>
        </div>

        {/* Footer Info */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
            <p className="text-[10px] font-bold text-gray-400">MYDO System v1.0.2</p>
        </div>

      </div>
    </>
  );
};

export default SettingsModal;