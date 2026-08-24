'use client';
import AirbnbIcon from './AirbnbIcon';


export default function ThingsToKnow() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 24px', letterSpacing: -0.2 }}>
        Things to know
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px 48px' }}>
        {/* ── Column 1: Cancellation policy ── */}
        <div>
          <div style={{ marginBottom: 12, color: '#222222' }}>
            <AirbnbIcon name="image (38).svg" size={24} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: '#222222', margin: '0 0 12px' }}>
            Cancellation policy
          </h3>
          <p style={{ fontSize: 14, color: '#222222', lineHeight: 1.45, margin: '0 0 8px' }}>
            Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.
          </p>
          <p style={{ fontSize: 14, color: '#222222', lineHeight: 1.45, margin: '0 0 16px' }}>
            Review this host’s full policy for details.
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
            }}
          >
            Learn more
          </button>
        </div>

        {/* ── Column 2: House rules ── */}
        <div>
          <div style={{ marginBottom: 12, color: '#222222' }}>
            <AirbnbIcon name="image (27).svg" size={24} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: '#222222', margin: '0 0 12px' }}>
            House rules
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <div style={{ fontSize: 14, color: '#222222', lineHeight: 1.45 }}>
              Check-in after 2:00 pm
            </div>
            <div style={{ fontSize: 14, color: '#222222', lineHeight: 1.45 }}>
              Checkout before 11:00 am
            </div>
            <div style={{ fontSize: 14, color: '#222222', lineHeight: 1.45 }}>
              3 guests maximum
            </div>
          </div>
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
            }}
          >
            Learn more
          </button>
        </div>

        {/* ── Column 3: Safety & property ── */}
        <div>
          <div style={{ marginBottom: 12, color: '#222222' }}>
            <AirbnbIcon name="image (37).svg" size={24} />
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 500, color: '#222222', margin: '0 0 12px' }}>
            Safety & property
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
            <div style={{ fontSize: 14, color: '#222222', lineHeight: 1.45 }}>
              Carbon monoxide alarm not reported
            </div>
            <div style={{ fontSize: 14, color: '#222222', lineHeight: 1.45 }}>
              Smoke alarm not reported
            </div>
            <div style={{ fontSize: 14, color: '#222222', lineHeight: 1.45 }}>
              Exterior security cameras on property
            </div>
          </div>
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
            }}
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}

