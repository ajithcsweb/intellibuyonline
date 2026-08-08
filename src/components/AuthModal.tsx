import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2, AlertCircle, KeyRound, ShieldCheck, Zap } from 'lucide-react';
import { signUpWithEmail, signInWithEmail, sendPasswordResetEmail, quickDemoSignIn, UserProfile } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register' | 'forgot';
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'login',
  onLoginSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(initialTab);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI Status State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(false);
  };

  const handleTabChange = (tab: 'login' | 'register' | 'forgot') => {
    setActiveTab(tab);
    resetForm();
  };

  // Submit Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { user, error } = await signInWithEmail(email, password);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (user) {
      setSuccessMessage('Successfully signed in!');
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 500);
    }
  };

  // Submit Quick Demo Sign In
  const handleQuickDemoSignIn = async () => {
    resetForm();
    setLoading(true);
    const { user } = await quickDemoSignIn();
    setLoading(false);

    setSuccessMessage('Welcome! Signed in as IntelliBuy Member.');
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  // Submit Register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();

    if (!fullName || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const { user, error } = await signUpWithEmail(email, password, fullName);
    setLoading(false);

    if (error) {
      setErrorMessage(error);
    } else if (user) {
      setSuccessMessage('Account created successfully! Logging you in...');
      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
      }, 600);
    }
  };

  // Submit Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    resetForm();

    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setLoading(true);
    const { success, message } = await sendPasswordResetEmail(email);
    setLoading(false);

    if (success) {
      setSuccessMessage(message);
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div 
        className="max-w-md w-full p-6 sm:p-8 bg-white border border-[#E8EAED] rounded-3xl shadow-2xl relative text-[#202124]"
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
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 bg-[#1A73E8] rounded-2xl flex items-center justify-center mx-auto text-white shadow-sm">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#202124] tracking-tight">
            Intelli<span className="text-[#1A73E8]">Buy</span> Member Sign In
          </h2>
          <p className="text-xs text-[#5F6368]">
            Access live price alerts, saved wishlist items & exclusive deal coupons.
          </p>
        </div>

        {/* Tabs Switcher */}
        {activeTab !== 'forgot' && (
          <div className="grid grid-cols-2 gap-2 bg-[#F8F9FA] p-1.5 rounded-full border border-[#E8EAED] mb-6 text-xs font-bold">
            <button
              onClick={() => handleTabChange('login')}
              className={`py-2 rounded-full transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-[#1A73E8] shadow-xs'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`py-2 rounded-full transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-[#1A73E8] shadow-xs'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              Register
            </button>
          </div>
        )}

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

        {/* Tab 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <div className="space-y-4">
            {/* Quick 1-Click Instant Sign In */}
            <button
              type="button"
              onClick={handleQuickDemoSignIn}
              className="w-full py-2.5 px-4 rounded-full bg-[#E8F0FE] text-[#1A73E8] hover:bg-[#D2E3FC] text-xs font-bold transition-all border border-[#1A73E8]/30 flex items-center justify-center gap-2"
            >
              <Zap size={16} className="text-[#1A73E8]" />
              <span>Quick 1-Click Sign In (Instant Access)</span>
            </button>

            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-[#E8EAED]"></div>
              <span className="px-3 text-[11px] text-[#5F6368] font-medium uppercase">Or Sign In with Email</span>
              <div className="flex-1 border-t border-[#E8EAED]"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#202124] block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-3 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#202124]">Password</label>
                  <button
                    type="button"
                    onClick={() => handleTabChange('forgot')}
                    className="text-xs font-semibold text-[#1A73E8] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-3 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 text-xs font-bold rounded-full mt-2"
              >
                {loading ? 'Authenticating...' : 'Sign In to Account'} <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-[#202124] block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
                <input
                  type="text"
                  required
                  placeholder="Ajith Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#202124] block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#202124] block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#202124] block mb-1">Confirm Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
                <input
                  type="password"
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-2.5 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-xs font-bold rounded-full mt-2"
            >
              {loading ? 'Creating Member Account...' : 'Create Free Account'} <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Tab 3: FORGOT PASSWORD FORM */}
        {activeTab === 'forgot' && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="text-center space-y-1 pb-2">
              <div className="w-10 h-10 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center mx-auto">
                <KeyRound size={20} />
              </div>
              <h3 className="text-base font-bold text-[#202124]">Reset Password</h3>
              <p className="text-xs text-[#5F6368]">
                Enter your account email and we'll send you a password recovery link.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#202124] block mb-1">Registered Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6368] w-4 h-4" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F9FA] text-[#202124] text-xs rounded-xl pl-10 pr-4 py-3 border border-[#E8EAED] focus:border-[#1A73E8] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-xs font-bold rounded-full"
            >
              {loading ? 'Sending Recovery Email...' : 'Send Recovery Link'}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('login')}
              className="w-full text-center text-xs font-bold text-[#5F6368] hover:text-[#202124] pt-2 block"
            >
              ← Back to Sign In
            </button>
          </form>
        )}

        {/* Footer Security Notice */}
        <div className="mt-6 pt-4 border-t border-[#E8EAED] text-[11px] text-[#5F6368] text-center flex items-center justify-center gap-1">
          <ShieldCheck size={14} className="text-[#188038]" />
          <span>Secured by 256-bit Supabase Encryption</span>
        </div>
      </div>
    </div>
  );
};
