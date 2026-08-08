import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, Camera, Save } from 'lucide-react';
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
  const [phone, setPhone] = useState(user.phone || '');
  
  // Clean Avatar Selection State
  const initialAvatar = user.avatarUrl || PRESET_AVATARS[0];
  const [selectedAvatar, setSelectedAvatar] = useState<string>(initialAvatar);
  const [customAvatarInput, setCustomAvatarInput] = useState<string>(
    PRESET_AVATARS.includes(initialAvatar) ? '' : initialAvatar
  );

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync state when user prop changes
  useEffect(() => {
    setFullName(user.fullName || '');
    setPhone(user.phone || '');
    const currentAvatar = user.avatarUrl || PRESET_AVATARS[0];
    setSelectedAvatar(currentAvatar);
    setCustomAvatarInput(PRESET_AVATARS.includes(currentAvatar) ? '' : currentAvatar);
  }, [user]);

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
    const finalAvatar = (customAvatarInput.trim() || selectedAvatar).trim() || PRESET_AVATARS[0];
    const { success, error } = await updateUserProfile(user.id, fullName.trim(), finalAvatar, phone.trim());
    setLoading(false);

    if (!success && error) {
      setErrorMessage(error || 'Failed to update profile.');
    } else {
      setSuccessMessage('Profile details updated successfully!');
      const updatedUser: UserProfile = {
        ...user,
        fullName: fullName.trim(),
        avatarUrl: finalAvatar,
        phone: phone.trim()
      };
      onProfileUpdated(updatedUser);
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  const activeDisplayAvatar = (customAvatarInput.trim() || selectedAvatar).trim() || PRESET_AVATARS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div 
        className="max-w-lg w-full p-6 sm:p-8 bg-white border border-[#E8EAED] rounded-3xl shadow-2xl relative text-[#202124]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#5F6368] hover:text-[#202124] bg-[#F8F9FA] rounded-full border border-[#E8EAED] hover:bg-[#E8EAED]/50 transition-all"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#E8EAED] mb-6">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] border border-[#1A73E8]/30 flex items-center justify-center text-[#1A73E8]">
            <User size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#202124]">Account Profile Settings</h2>
            <p className="text-xs text-[#5F6368]">Modify your member name, mobile number and avatar picture</p>
          </div>
        </div>

        {/* Alert Messages */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-[#FCE8E6] border border-[#F5C2C7] text-[#D93025] text-xs font-semibold flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0 text-[#D93025]" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] text-[#188038] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-[#188038]" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSave} className="space-y-5">
          {/* Avatar Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#202124] flex items-center gap-1">
              <Camera size={14} className="text-[#1A73E8]" /> Choose Profile Avatar
            </label>

            <div className="flex items-center gap-4 py-2">
              <img 
                src={activeDisplayAvatar} 
                alt="Avatar Preview" 
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#1A73E8] shadow-md bg-[#F8F9FA] shrink-0" 
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#202124] block">{fullName || 'Member Name'}</span>
                <span className="text-[10px] bg-[#E6F4EA] text-[#188038] px-2 py-0.5 rounded-full font-bold border border-[#CEEAD6] inline-flex items-center gap-1">
                  <ShieldCheck size={12} /> Verified IntelliBuy Member
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
                    setSelectedAvatar(url);
                    setCustomAvatarInput('');
                  }}
                  className={`w-11 h-11 rounded-xl p-0.5 border transition-all overflow-hidden bg-[#F8F9FA] ${
                    (selectedAvatar === url && !customAvatarInput.trim()) 
                      ? 'border-[#1A73E8] ring-2 ring-[#1A73E8]/30 scale-105 opacity-100' 
                      : 'border-[#E8EAED] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover rounded-lg" />
                </button>
              ))}
            </div>

            {/* Custom Avatar URL Field */}
            <div className="pt-1">
              <span className="text-[10px] text-[#5F6368] block mb-1">Or paste a custom avatar image URL:</span>
              <input
                type="url"
                placeholder="https://example.com/my-photo.jpg"
                value={customAvatarInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setCustomAvatarInput(val);
                  if (val.trim()) {
                    setSelectedAvatar(val.trim());
                  }
                }}
                className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl px-3 py-2 border border-[#E8EAED] focus:border-[#1A73E8] focus:outline-none placeholder:text-[#5F6368]"
              />
            </div>
          </div>

          {/* Full Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#202124] block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile Phone Number Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#202124] block">Mobile Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:outline-none"
              />
            </div>
          </div>

          {/* Email Read-Only Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#202124] block">Email Address (Read-only)</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full bg-[#F8F9FA]/60 text-[#5F6368] text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#E8EAED] cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3 text-xs font-bold rounded-full"
          >
            <Save size={16} />
            <span>{loading ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
