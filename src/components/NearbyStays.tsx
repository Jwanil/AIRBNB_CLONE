'use client';
import { useState } from 'react';
import Image from 'next/image';

const PAGES = [
  [
    { title: 'Beautiful Studio with a view to die for', price: 23600, rating: 4.91, image: '/images/s1.jpeg' },
    { title: 'NAQAB - 1bhk with private pool', price: 42218, rating: 4.95, image: '/images/s2.jpeg' },
    { title: 'Greentique Luxury Flat with plunge pool, Calangute', price: 44506, rating: 4.94, image: '/images/s3.jpeg' },
    { title: 'The Tropical Studio | 5 mins to Beach', price: 22824, rating: 4.96, image: '/images/s4.jpeg' },
    { title: 'Luxury Casa Bella 1BHK with plunge pool, Calangute', price: 39942, rating: 4.95, image: '/images/s5.jpeg' },
  ],
  [
    { title: 'Casa Susegad 1BHK, Heart of Calangute', price: 18500, rating: 4.88, image: '/images/s6.jpeg' },
    { title: 'Mirashya Garden Suite with private jacuzzi', price: 31200, rating: 4.97, image: '/images/0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg' },
    { title: 'Beachside Bliss 1BHK near Baga Beach', price: 27400, rating: 4.92, image: '/images/3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg' },
    { title: 'Forest Retreat Villa with pool, Siolim', price: 52000, rating: 4.98, image: '/images/4fede77d-7a71-446f-89e3-263af937f3fa.jpeg' },
    { title: 'Heritage Portuguese Villa, Fontainhas', price: 35800, rating: 4.93, image: '/images/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg' },
  ],
];

export default function NearbyStays() {
  const [page, setPage] = useState(0);
  const listings = PAGES[page];

  const navBtn: React.CSSProperties = {
    width: 32, height: 32, borderRadius: '50%', border: '1px solid #222',
    background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: 0 }}>More stays nearby</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, color: '#222' }}>{page + 1} / {PAGES.length}</span>
          <button style={{ ...navBtn, opacity: page === 0 ? 0.35 : 1, cursor: page === 0 ? 'not-allowed' : 'pointer' }}
            onClick={() => page > 0 && setPage(p => p - 1)}
            onMouseEnter={e => { if(page > 0) e.currentTarget.style.backgroundColor = '#f7f7f7'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12" strokeLinecap="round"><path d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"/></svg>
          </button>
          <button style={{ ...navBtn, opacity: page === PAGES.length - 1 ? 0.35 : 1, cursor: page === PAGES.length - 1 ? 'not-allowed' : 'pointer' }}
            onClick={() => page < PAGES.length - 1 && setPage(p => p + 1)}
            onMouseEnter={e => { if(page < PAGES.length-1) e.currentTarget.style.backgroundColor = '#f7f7f7'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12" strokeLinecap="round"><path d="M12 4l11.3 11.3a1 1 0 0 1 0 1.4L12 28"/></svg>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
        {listings.map((item, i) => (
          <div key={i} style={{ cursor: 'pointer' }}
            onMouseEnter={e => { (e.currentTarget.querySelector('.card-title') as HTMLElement).style.textDecoration = 'underline'; }}
            onMouseLeave={e => { (e.currentTarget.querySelector('.card-title') as HTMLElement).style.textDecoration = 'none'; }}>
            {/* Image */}
            <div style={{ position: 'relative', paddingTop: '100%', borderRadius: 16, overflow: 'hidden', marginBottom: 10 }}>
              <Image src={item.image} alt={item.title} fill unoptimized style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
            </div>
            {/* Title */}
            <div className="card-title" style={{ fontSize: 14, fontWeight: 500, color: '#222', lineHeight: 1.4, marginBottom: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {item.title}
            </div>
            {/* Price + rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#222' }}>
              <span>₹{item.price.toLocaleString()}</span>
              <span style={{ color: '#717171' }}>·</span>
              <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12"><path d="M8 1.3l1.5 3.1 3.4.5-2.5 2.4.6 3.4L8 9l-3 1.7.6-3.4L3.1 4.9l3.4-.5z"/></svg>
              <span>{item.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
