'use client';
import { useState } from 'react';
import Image from 'next/image';
import AirbnbIcon from './AirbnbIcon';

const TAGS = ['Comfort', 'Accuracy', 'Hot tub', 'Condition', 'Hospitality', 'Cleanliness', 'Amenities', 'Decor', 'Indoor spaces', 'Location'];
const TAG_COUNTS = [6, 5, 5, 4, 8, 4, 2, 2, 2, 2];
const TAG_ICONS = [
  '/images/comfort.png',
  '/images/accuracy.png',
  '/images/hot-tub.png',
  '/images/condition.png',
  '/images/hospitality.png',
  '/images/cleanliness.png',
  '/images/amenities.png',
  '/images/decor.png',
  '/images/indoor-spaces.png',
  '/images/location.png',
];

const CATEGORIES = [
  {
    label: 'Cleanliness',
    score: '5.0',
    iconName: 'image (25).svg',
  },
  {
    label: 'Accuracy',
    score: '5.0',
    iconName: 'image (26).svg',
  },
  {
    label: 'Check-in',
    score: '5.0',
    iconName: 'image (27).svg',
  },
  {
    label: 'Communication',
    score: '5.0',
    iconName: 'image (28).svg',
  },
  {
    label: 'Location',
    score: '4.8',
    iconName: 'image (29).svg',
  },
  {
    label: 'Value',
    score: '4.8',
    iconName: 'image (30).svg',
  },
];

function StarRow({ score }: { score: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(score) ? '#222222' : '#DDDDDD', fontSize: 10 }}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ rev }: { rev: any }) {
  const [expanded, setExpanded] = useState(false);
  const short = rev.text.slice(0, 200);
  const needs = rev.text.length > 200;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
            backgroundColor: '#e0e0e0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {rev.avatar ? (
            <Image src={rev.avatar} alt={rev.author} fill unoptimized style={{ objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{rev.author[0].toUpperCase()}</span>
          )}
        </div>
        <div>
          <div style={{ fontWeight: 500, fontSize: 15, color: '#222222' }}>{rev.author}</div>
          <div style={{ fontSize: 13, color: '#717171' }}>{rev.tenure}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <StarRow score={5} />
        <span style={{ fontSize: 13, color: '#717171' }}>· {rev.timeAgo}</span>
      </div>
      <p style={{ fontSize: 14, color: '#222', lineHeight: 1.6, margin: 0 }}>{expanded || !needs ? rev.text : short + '…'}</p>
      {needs && (
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{
            marginTop: 6,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 500,
            color: '#222',
            textDecoration: 'underline',
          }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

export default function ReviewsSection({ listing }: { listing: any }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const reviews = listing.reviews.map((r: any, i: number) => ({
    ...r,
    tenure: ['2 months on Airbnb', '3 years on Airbnb', '8 months on Airbnb', '4 years on Airbnb', '1 year on Airbnb', '5 years on Airbnb'][i % 6],
    timeAgo: ['1 week ago', '2 weeks ago', 'May 2026', 'May 2026', 'April 2026', 'March 2026'][i % 6],
  }));

  const histogram = [
    { star: 5, fill: '96%' },
    { star: 4, fill: '4%' },
    { star: 3, fill: '0%' },
    { star: 2, fill: '0%' },
    { star: 1, fill: '0%' },
  ];

  return (
    <div>
      {/* ── Giant Centered Rating + 3D Laurels ── */}
      <div style={{ textAlign: 'center', marginBottom: 40, marginTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 8 }}>
          <Image
            src="/images/laurel-left.png"
            alt=""
            width={72}
            height={96}
            unoptimized
            style={{ objectFit: 'contain', width: 'auto', height: 96 }}
          />
          <span
            style={{
              fontSize: 88,
              fontWeight: 600,
              color: '#222222',
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            {listing.rating}
          </span>
          <Image
            src="/images/laurel-right.png"
            alt=""
            width={72}
            height={96}
            unoptimized
            style={{ objectFit: 'contain', width: 'auto', height: 96 }}
          />
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 6px', letterSpacing: -0.2 }}>
          Guest favourite
        </h2>
        <p
          style={{
            fontSize: 15,
            color: '#222222',
            margin: '0 auto 12px',
            lineHeight: 1.4,
            maxWidth: 480,
          }}
        >
          This home is a guest favourite based on ratings, reviews and<br />reliability
        </p>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 14,
            fontWeight: 500,
            color: '#222222',
            textDecoration: 'underline',
            padding: 0,
          }}
        >
          How reviews work
        </button>
      </div>

      {/* ── 7-Column Rating Breakdown with Vertical Separator Lines ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr repeat(6, 1fr)',
          gap: 0,
          marginBottom: 22,
          alignItems: 'stretch',
        }}
      >
        {/* Column 1: Overall rating histogram */}
        <div style={{ paddingRight: 20, borderRight: '1px solid #EBEBEB' }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: '#222222', marginBottom: 12 }}>
            Overall rating
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {histogram.map((item) => (
              <div key={item.star} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#222222', width: 8, textAlign: 'right', flexShrink: 0 }}>
                  {item.star}
                </span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: 110,
                    height: 4,
                    backgroundColor: '#EBEBEB',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: '#222222',
                      width: item.fill,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columns 2-7: 6 rating categories with vertical divider lines */}
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0 20px',
              borderRight: i < CATEGORIES.length - 1 ? '1px solid #EBEBEB' : 'none',
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 500, color: '#222222', marginBottom: 8 }}>
              {cat.label}
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#222222', marginBottom: 14 }}>
              {cat.score}
            </div>
            <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AirbnbIcon name={cat.iconName} size={32} color="#222222" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Scrollable Tag Filter Cards (Boxier with soft rounded corners and hover shadow) ── */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          overflowX: 'auto',
          paddingBottom: 12,
          marginBottom: 36,
          scrollbarWidth: 'none',
        }}
      >
        {TAGS.map((tag, i) => (
          <div
            key={tag}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 14px',
              borderRadius: 8,
              border: '1px solid #DDDDDD',
              background: '#FFFFFF',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 500,
              color: '#222222',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.10)';
              e.currentTarget.style.borderColor = '#B0B0B0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.04)';
              e.currentTarget.style.borderColor = '#DDDDDD';
            }}
          >
            {TAG_ICONS[i] && (
              <Image
                src={TAG_ICONS[i]}
                alt=""
                width={18}
                height={18}
                unoptimized
                style={{
                  objectFit: 'contain',
                  flexShrink: 0,
                }}
              />
            )}
            <span>{tag}</span>
            <span style={{ color: '#717171', fontWeight: 400, marginLeft: 2 }}>
              {TAG_COUNTS[i]}
            </span>
          </div>
        ))}
      </div>

      {/* ── Review Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 48px' }}>
        {reviews.map((rev: any, i: number) => (
          <ReviewCard key={i} rev={rev} />
        ))}
      </div>

      <button
        style={{
          marginTop: 36,
          border: '1px solid #222222',
          borderRadius: 8,
          padding: '13px 23px',
          fontSize: 16,
          fontWeight: 600,
          background: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          color: '#222222',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        Show all {listing.reviewCount} reviews
      </button>
    </div>
  );
}
