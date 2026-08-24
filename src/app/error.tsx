'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Airbnb Clone] Runtime error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'AirbnbCereal, -apple-system, BlinkMacSystemFont, sans-serif',
        backgroundColor: '#FFFFFF',
        padding: 40,
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', marginBottom: 12 }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: 15, color: '#717171', marginBottom: 24, maxWidth: 400, lineHeight: 1.5 }}>
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          background: 'linear-gradient(to right, #E31C5F, #FF385C)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: 8,
          padding: '12px 28px',
          fontSize: 16,
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Try again
      </button>
    </div>
  );
}
