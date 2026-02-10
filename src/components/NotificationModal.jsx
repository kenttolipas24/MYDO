import React from 'react';
import { 
  CheckCircle2, AlertCircle, Calendar, 
  Clock, ChevronRight, Mail
} from 'lucide-react';

const NotificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock Notification Data
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Submission Deadline Approaching',
      message: 'CBYIP 2026 submission deadline is tomorrow.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      type: 'success',
      title: 'Report Approved',
      message: 'Brgy. Dalakit Q1 Financial Report has been approved.',
      time: '5 hours ago',
      unread: true,
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Admin sent a feedback on your profile update.',
      time: '1 day ago',
      unread: false,
    },
    {
      id: 4,
      type: 'event',
      title: 'Leadership Summit',
      message: 'Reminder: Summit starts on Feb 15 at the Gym.',
      time: '2 days ago',
      unread: false,
    },
  ];

  return (
    <>
      {/* 1. DEFINE CUSTOM ANIMATION HERE */}
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
      <div className="fixed inset-0 z-[40]" onClick={onClose}></div>

      {/* MODAL CONTAINER with Custom Animation Class */}
      <div className="animate-modal-enter absolute top-full right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[50] overflow-hidden origin-top-right">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-[#0D2440]">Notifications</h3>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-red-200">2 New</span>
          </div>
          <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline transition-all">
            Mark all read
          </button>
        </div>

        {/* List */}
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 border-b border-gray-50 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer group relative ${notif.unread ? 'bg-blue-50/40' : ''}`}
            >
              {/* Unread Indicator Dot */}
              {notif.unread && (
                <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white shadow-sm"></div>
              )}

              {/* Icon based on type */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                notif.type === 'alert' ? 'bg-amber-100 text-amber-600' :
                notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                notif.type === 'event' ? 'bg-purple-100 text-purple-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {notif.type === 'alert' && <AlertCircle size={18} strokeWidth={2.5} />}
                {notif.type === 'success' && <CheckCircle2 size={18} strokeWidth={2.5} />}
                {notif.type === 'event' && <Calendar size={18} strokeWidth={2.5} />}
                {notif.type === 'message' && <Mail size={18} strokeWidth={2.5} />}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className={`text-sm ${notif.unread ? 'font-black text-[#0D2440]' : 'font-bold text-gray-700'}`}>
                  {notif.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                  {notif.message}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-gray-400">
                  <Clock size={10} />
                  {notif.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <button className="w-full py-3 text-xs font-bold text-gray-500 hover:text-[#0D2440] hover:bg-gray-50 transition-colors border-t border-gray-100 flex items-center justify-center gap-1">
          View All Notifications <ChevronRight size={14} />
        </button>

      </div>
    </>
  );
};

export default NotificationModal;