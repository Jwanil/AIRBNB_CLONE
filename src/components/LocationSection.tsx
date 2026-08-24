'use client';
import AirbnbIcon from './AirbnbIcon';


export default function LocationSection() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 16px', letterSpacing: -0.2 }}>
        Where you’ll be
      </h2>

      <p style={{ fontSize: 16, color: '#222222', margin: '0 0 24px' }}>
        Candolim, Goa, India
      </p>

      {/* Map Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 460,
          borderRadius: 16,
          overflow: 'hidden',
          backgroundColor: '#E3ECDA',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}
      >
        {/* SVG Graphic Map */}
        <svg width="100%" height="100%" style={{ display: 'block' }} preserveAspectRatio="none" viewBox="0 0 800 460">
          <defs>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D3E0C8" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Land background */}
          <rect width="800" height="460" fill="#E3ECDA" />

          {/* Grid lines across land */}
          <rect width="800" height="460" fill="url(#mapGrid)" />

          {/* Coastline / Sea on left */}
          <polygon points="0,0 290,0 150,460 0,460" fill="#A4CAE1" />

          {/* Translucent Green Landmark Circles */}
          <circle cx="255" cy="230" r="32" fill="#C5DBB5" opacity="0.85" />
          <circle cx="540" cy="295" r="42" fill="#C5DBB5" opacity="0.85" />
        </svg>

        {/* Top-Left Search Button */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 3,
          }}
        >
          <AirbnbIcon name="image (31).svg" size={16} color="#222222" />
        </div>

        {/* Top-Right Zoom In / Out Controls */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 3,
          }}
        >
          <button
            aria-label="Zoom in"
            style={{
              width: 40,
              height: 40,
              border: 'none',
              borderBottom: '1px solid #EBEBEB',
              background: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              color: '#222222',
              fontWeight: 400,
              padding: 0,
            }}
          >
            +
          </button>
          <button
            aria-label="Zoom out"
            style={{
              width: 40,
              height: 40,
              border: 'none',
              background: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              color: '#222222',
              fontWeight: 400,
              padding: 0,
            }}
          >
            −
          </button>
        </div>

        {/* Center Home Pin */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: '#222222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
            zIndex: 2,
          }}
        >
          <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AirbnbIcon name="image (34).svg" size={28} color="#FFFFFF" />
          </div>
        </div>
      </div>

      <p style={{ fontSize: 14, color: '#222222', margin: '16px 0 0' }}>
        Exact location will be provided after booking.
      </p>

      {/* Neighbourhood highlights */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 500, color: '#222222', margin: '0 0 8px' }}>
          Neighbourhood highlights
        </h3>
        <p style={{ fontSize: 15, color: '#222222', margin: '0 0 12px', lineHeight: 1.5 }}>
          Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.
        </p>
        <button
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 500,
            color: '#222222',
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          Show more
          <AirbnbIcon name="image (42).svg" size={12} color="#222222" />
        </button>
      </div>
    </div>
  );
}

