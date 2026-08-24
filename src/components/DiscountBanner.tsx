'use client';
import Image from 'next/image';

export default function DiscountBanner() {
  return (
    <div style={{ border: '1px solid #DDDDDD', borderRadius: 16, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 28, height: 28, position: 'relative', flexShrink: 0 }}>
          <Image src="/images/discount.svg" alt="Discount" width={28} height={28} unoptimized style={{ objectFit: 'contain' }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>Get 10% off your next stay.</div>
          <div style={{ fontSize: 13, color: '#717171', textDecoration: 'underline', cursor: 'pointer' }}>Terms apply</div>
        </div>
      </div>
      <button
        style={{ border: '1px solid #DDDDDD', borderRadius: 8, padding: '7px 14px', fontSize: 14, fontWeight: 500, background: 'none', cursor: 'pointer', fontFamily: 'inherit', color: '#222', flexShrink: 0 }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
        Claim
      </button>
    </div>
  );
}
