import Link from 'next/link';

export default function NotFound() {
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
      <h1 style={{ fontSize: 88, fontWeight: 600, color: '#FF385C', margin: '0 0 16px', lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', marginBottom: 12 }}>
        Page not found
      </h2>
      <p style={{ fontSize: 15, color: '#717171', marginBottom: 28, maxWidth: 400, lineHeight: 1.5 }}>
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
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
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'opacity 0.15s',
        }}
      >
        Go to homepage
      </Link>
    </div>
  );
}
