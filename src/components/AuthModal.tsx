'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Password validation rules
  const hasMinLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasNumber;
  const passedChecksCount = [hasMinLength, hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

  useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
    setShowPassword(false);
    setTouchedPassword(false);
  }, [authModalMode, isAuthModalOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      if (mode === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Invalid email or password');
        }
      } else {
        if (!name.trim()) {
          setErrorMsg('Name is required');
          setSubmitting(false);
          return;
        }
        if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
          setErrorMsg('Password must be at least 8 characters and include both letters and numbers');
          setSubmitting(false);
          return;
        }
        const res = await register(name.trim(), email.trim(), password);
        if (!res.success) {
          setErrorMsg(res.error || 'Registration failed');
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(3px)',
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.22)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
          animation: 'modalSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 64,
            borderBottom: '1px solid #EBEBEB',
            padding: '0 24px',
          }}
        >
          <button
            onClick={closeAuthModal}
            style={{
              position: 'absolute',
              left: 20,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: 32,
              height: 32,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#222222',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
              <path d="M6 6l20 20M26 6L6 26" />
            </svg>
          </button>

          <span id="auth-modal-title" style={{ fontSize: 16, fontWeight: 700, color: '#222222' }}>
            {mode === 'login' ? 'Log in' : 'Sign up'}
          </span>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px 32px', overflowY: 'auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#222222', margin: '0 0 20px' }}>
            Welcome to Airbnb
          </h2>

          {/* Mode Tabs */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#F2F2F2',
              borderRadius: 12,
              padding: 4,
              marginBottom: 24,
            }}
          >
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg(null);
              }}
              style={{
                flex: 1,
                padding: '8px 0',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: mode === 'login' ? 600 : 500,
                backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
                color: '#222222',
                boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMsg(null);
              }}
              style={{
                flex: 1,
                padding: '8px 0',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: mode === 'register' ? 600 : 500,
                backgroundColor: mode === 'register' ? '#FFFFFF' : 'transparent',
                color: '#222222',
                boxShadow: mode === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Sign up
            </button>
          </div>

          {errorMsg && (
            <div
              style={{
                backgroundColor: '#FFF2F2',
                border: '1px solid #FFCDCD',
                borderRadius: 8,
                padding: '10px 14px',
                marginBottom: 20,
                fontSize: 14,
                color: '#C13515',
                lineHeight: 1.4,
              }}
            >
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div
              style={{
                border: '1px solid #B0B0B0',
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 16,
              }}
            >
              {mode === 'register' && (
                <div style={{ borderBottom: '1px solid #B0B0B0', padding: '10px 14px' }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#717171', letterSpacing: '0.04em' }}>
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name as on government ID"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      fontSize: 15,
                      color: '#222222',
                      padding: '2px 0 0',
                      background: 'transparent',
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  borderBottom: '1px solid #B0B0B0',
                  padding: '10px 14px',
                }}
              >
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#717171', letterSpacing: '0.04em' }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: 15,
                    color: '#222222',
                    padding: '2px 0 0',
                    background: 'transparent',
                  }}
                />
              </div>

              <div style={{ padding: '10px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: '#717171', letterSpacing: '0.04em' }}>
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#222222',
                      textDecoration: 'underline',
                      padding: 0,
                      fontFamily: 'inherit',
                      lineHeight: 1,
                    }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={mode === 'register' ? 'Create a secure password' : 'Your password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (!touchedPassword) setTouchedPassword(true);
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: 15,
                    color: '#222222',
                    padding: '2px 0 0',
                    background: 'transparent',
                  }}
                />
              </div>
            </div>

            {/* Real-time Password Strength & Validation Checklist (Sign up mode) */}
            {mode === 'register' && (password.length > 0 || touchedPassword) && (
              <div
                style={{
                  marginTop: -6,
                  marginBottom: 16,
                  padding: '12px 14px',
                  backgroundColor: '#F7F7F7',
                  borderRadius: 8,
                  fontSize: 12,
                  border: '1px solid #EBEBEB',
                }}
              >
                {/* Strength Meter Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#717171' }}>Password strength:</span>
                  <div style={{ display: 'flex', gap: 4, flex: 1, height: 4 }}>
                    {[1, 2, 3, 4].map((step) => {
                      let barColor = '#E0E0E0';
                      if (step <= passedChecksCount) {
                        if (passedChecksCount <= 1) barColor = '#E61E4D';
                        else if (passedChecksCount === 2) barColor = '#FF9800';
                        else barColor = '#008A05';
                      }
                      return (
                        <div
                          key={step}
                          style={{
                            flex: 1,
                            backgroundColor: barColor,
                            borderRadius: 2,
                            transition: 'background-color 0.2s ease',
                          }}
                        />
                      );
                    })}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      minWidth: 42,
                      textAlign: 'right',
                      color:
                        passedChecksCount <= 1
                          ? '#E61E4D'
                          : passedChecksCount === 2
                          ? '#FF9800'
                          : '#008A05',
                    }}
                  >
                    {passedChecksCount <= 1
                      ? 'Weak'
                      : passedChecksCount === 2
                      ? 'Fair'
                      : passedChecksCount === 3
                      ? 'Good'
                      : 'Strong'}
                  </span>
                </div>

                {/* Checklist Rules */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: hasMinLength ? '#008A05' : '#717171',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700 }}>
                      {hasMinLength ? '✓' : '○'}
                    </span>
                    <span>At least 8 characters</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: hasLetter ? '#008A05' : '#717171',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700 }}>
                      {hasLetter ? '✓' : '○'}
                    </span>
                    <span>At least one letter (a-z, A-Z)</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: hasNumber ? '#008A05' : '#717171',
                      transition: 'color 0.15s ease',
                    }}
                  >
                    <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700 }}>
                      {hasNumber ? '✓' : '○'}
                    </span>
                    <span>At least one number (0-9)</span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 600,
                padding: '14px 0',
                borderRadius: 8,
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                transition: 'opacity 0.15s ease',
              }}
            >
              {submitting ? 'Please wait...' : mode === 'login' ? 'Log in' : 'Agree and continue'}
            </button>
          </form>

          {/* Toggle mode hint */}
          <div style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#717171' }}>
            {mode === 'login' ? (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#222222',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Sign up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#222222',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  Log in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
