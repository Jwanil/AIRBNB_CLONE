'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGallery } from '@/context/GalleryContext';
import { setLastLightboxIndex } from '@/lib/storage';
import AirbnbIcon from './AirbnbIcon';


export default function Lightbox({ photos }: { photos: any[] }) {
  const { lightboxIndex, setLightboxIndex, setPhotoTourOpen } = useGallery();

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handleGridClick = () => {
    // Return to Photo Tour overview
    setLightboxIndex(null);
    setPhotoTourOpen(true);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    const next = (lightboxIndex + 1) % photos.length;
    setLightboxIndex(next);
    setLastLightboxIndex(photos[0]?.id ?? 'gallery', next);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    const prev = (lightboxIndex - 1 + photos.length) % photos.length;
    setLightboxIndex(prev);
    setLastLightboxIndex(photos[0]?.id ?? 'gallery', prev);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  if (lightboxIndex === null || !photos[lightboxIndex]) return null;

  const photo = photos[lightboxIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${lightboxIndex + 1} of ${photos.length}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
      }}
    >
      {/* ── Top Header Bar (Matching Reference image copy 12.png) ── */}
      <header
        style={{
          height: 64,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          flexShrink: 0,
          zIndex: 20,
        }}
      >
        {/* Left: 9-Dot Grid Icon Button to return to Photo Tour overview */}
        <button
          onClick={handleGridClick}
          aria-label="Show all photos"
          title="Show all photos"
          style={{
            background: 'none',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#222222',
            transition: 'background-color 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <AirbnbIcon name="image (5).svg" size={16} />
        </button>

        {/* Center: Room Category Name */}
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#222222',
            textAlign: 'center',
            letterSpacing: -0.1,
          }}
        >
          {photo.room}
        </div>

        {/* Right: "1 of 43" Counter & Close Button ✕ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: '#222222',
              whiteSpace: 'nowrap',
            }}
          >
            {lightboxIndex + 1} of {photos.length}
          </span>

          {/* Close (✕) Button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            title="Close"
            style={{
              background: 'none',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#222222',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <AirbnbIcon name="image (40).svg" size={14} />
          </button>
        </div>
      </header>

      {/* ── Main Centered Image Stage ── */}
      <main
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 80px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous photo"
          style={{
            position: 'absolute',
            left: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDDDDD',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            zIndex: 10,
            transition: 'background-color 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F7F7F7';
            e.currentTarget.style.borderColor = '#222222';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#DDDDDD';
          }}
        >
          <AirbnbIcon name="image (41).svg" size={14} />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next photo"
          style={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDDDDD',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            zIndex: 10,
            transition: 'background-color 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F7F7F7';
            e.currentTarget.style.borderColor = '#222222';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#DDDDDD';
          }}
        >
          <AirbnbIcon name="image (42).svg" size={14} />
        </button>

        {/* Current Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              position: 'relative',
              maxWidth: 'calc(100vw - 160px)',
              maxHeight: 'calc(100vh - 120px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.alt || `${photo.room} photo`}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 120px)',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next photo"
          style={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#FFFFFF',
            border: '1px solid #DDDDDD',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
            zIndex: 10,
            transition: 'background-color 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F7F7F7';
            e.currentTarget.style.borderColor = '#222222';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#DDDDDD';
          }}
        >
          <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.8" width="14" height="14" strokeLinecap="round">
            <path d="M12 28l12-12-12-12" />
          </svg>
        </button>
      </main>
    </div>
  );
}
