import React, { useState } from 'react';
import { X, User, Mail, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, Camera, Save } from 'lucide-react';
import { UserProfile, updateUserProfile } from '../services/authService';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onProfileUpdated: (updatedUser: UserProfile) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
];

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onProfileUpdated
}) => {
  const [fullName, setFullName] = useState(user.fullName || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || PRESET_AVATARS[0]);
  const [customAvatar, setCustomAvatar] = useState(user.avatarUrl || '');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Full Name cannot be empty.');
      return;
    }

    setLoading(true);
    const finalAvatar = customAvatar.trim() || avatarUrl;
    const { success, error } = await updateUserProfile(user.id, fullName.trim(), finalAvatar);
    setLoading(false);

    if (!success || error) {
      setErrorMessage(error || 'Failed to update profile.');
    } else {
      setSuccessMessage('Profile details updated successfully!');
      const updatedUser: UserProfile = {
        ...user,
        fullName: fullName.trim(),
        avatarUrl: finalAvatar
      };
      onProfileUpdated(updatedUser);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-w-lg w-full p-6 sm:p-8 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-slate-950 rounded-xl border border-white/10 hover:bg-slate-800 transition-all"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <User size={22} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white font-heading">Account Profile Settings</h2>
            <p className="text-xs text-gray-400">Modify your member details and avatar picture</p>
          </div>
        </div>

        {/* Alert Messages */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1">
              <Camera size={14} className="text-indigo-400" /> Choose Profile Avatar
            </label>

            <div className="flex items-center gap-4 py-2">
              <img 
                src={customAvatar || avatarUrl} 
                alt="Avatar Preview" 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-lg bg-slate-950 shrink-0" 
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">{fullName || 'Member Name'}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-extrabold border border-emerald-500/30 inline-flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified Member
                </span>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-6 gap-2 pt-1">
              {PRESET_AVATARS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAvatarUrl(url);
                    setCustomAvatar('');
                  }}
                  className={`w-11 h-11 rounded-xl p-0.5 border transition-all overflow-hidden bg-slate-950 ${
                    (avatarUrl === url && !customAvatar) 
                      ? 'border-indigo-400 ring-2 ring-indigo-500/40 scale-105' 
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>

            {/* Custom Avatar URL Field */}
            <div className="pt-2">
              <span className="text-[10px] text-gray-400 block mb-1">Or paste a custom avatar image URL:</span>
              <input
                type="url"
                placeholder="https://example.com/my-photo.jpg"
                value={customAvatar}
                onChange={(e) => setCustomAvatar(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl px-3 py-2 border border-white/10 focus:border-indigo-500 focus:outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 text-white text-xs rounded-xl pl-10 pr-4 py-3 border border-white/10 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Email Read-Only Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300 block">Email Address (Read-only)</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full bg-slate-950/50 text-gray-400 text-xs rounded-xl pl-10 pr-4 py-3 border border-white/5 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="glow-btn w-full justify-center py-3 text-xs font-extrabold shadow-lg shadow-indigo-600/30"
          >
            <Save size={16} />
            <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
