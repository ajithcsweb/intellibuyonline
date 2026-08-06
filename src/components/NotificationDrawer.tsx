import React, { useState } from 'react';
import { X, Bell, TrendingDown, Tag, Package, Check, Mail, Sparkles } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  const [emailAlert, setEmailAlert] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailAlert.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailAlert('');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-white/10 text-white p-6 shadow-2xl flex flex-col justify-between animate-slideLeft">
          <div className="space-y-6 overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-indigo-400" />
                <h2 className="text-lg font-extrabold text-white">Price & Deal Alerts</h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onMarkAllRead}
                  className="text-xs text-indigo-400 font-bold hover:underline"
                >
                  Mark all read
                </button>
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Email Subscription Box */}
            <div className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 p-4 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                <Mail size={16} /> Subscribe to Price Drop Alerts
              </div>
              <p className="text-[11px] text-gray-300">Get instant WhatsApp & Email alerts when your saved products drop in price!</p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={emailAlert}
                  onChange={e => setEmailAlert(e.target.value)}
                  className="w-full bg-slate-950 text-white text-xs p-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-indigo-400"
                />
                <button type="submit" className="glow-btn px-3 py-2 text-xs font-bold shrink-0">
                  {subscribed ? 'Subscribed!' : 'Alert Me'}
                </button>
              </form>
            </div>

            {/* Notification List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Recent Alerts</span>
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 transition-colors ${
                    notif.read ? 'bg-slate-950/40 border-white/5 opacity-70' : 'bg-slate-950 border-indigo-500/30 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-white flex items-center gap-1.5">
                      {notif.type === 'price_drop' && <TrendingDown size={14} className="text-emerald-400" />}
                      {notif.type === 'deal' && <Tag size={14} className="text-rose-400" />}
                      {notif.type === 'stock' && <Package size={14} className="text-indigo-400" />}
                      {notif.title}
                    </span>
                    <span className="text-[10px] text-gray-500">{notif.timestamp}</span>
                  </div>
                  <p className="text-gray-300 text-[11px] leading-relaxed">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-center text-[11px] text-gray-500">
            Powered by IntelliBuy Automated Sync Engine
          </div>
        </div>
      </div>
    </div>
  );
};
