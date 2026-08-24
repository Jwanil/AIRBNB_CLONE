'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getSaved, setSaved } from '@/lib/storage';
import AirbnbIcon from './AirbnbIcon';


export default function ListingTitle({ listing }: { listing: any }) {
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    setIsSaved(getSaved(listing.id));
  }, [listing.id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleSave = () => {
    const v = !isSaved;
    setIsSaved(v);
    setSaved(listing.id, v);
    toast.success(v ? 'Saved to your wishlist!' : 'Removed from wishlist');
  };

  return (
    <div style={{ marginTop: 24, marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 500,
            color: '#222222',
            margin: 0,
            lineHeight: 1.3,
            letterSpacing: -0.2,
          }}
        >
          {listing.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 10px',
              borderRadius: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 500,
              color: '#222222',
              textDecoration: 'underline',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <AirbnbIcon name="image (3).svg" size={16} color="#222222" />
            Share
          </button>

          <button
            onClick={handleSave}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 10px',
              borderRadius: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 14,
              fontWeight: 500,
              color: '#222222',
              textDecoration: 'underline',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <AirbnbIcon
              name={isSaved ? 'image (4).svg' : 'image (4).svg'}
              size={16}
              color={isSaved ? '#FF385C' : '#222222'}
              fill={isSaved ? '#FF385C' : 'none'}
            />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

