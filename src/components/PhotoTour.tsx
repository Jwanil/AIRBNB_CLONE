'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useGallery } from '@/context/GalleryContext';
import { listing } from '@/lib/listing-data';
import toast from 'react-hot-toast';
import { getSaved, setSaved } from '@/lib/storage';
import AirbnbIcon from './AirbnbIcon';


function getRoomPhotoRows(roomName: string, roomPhotos: any[]) {
  if (roomName === 'Full kitchen' || roomName === 'Full bathroom') {
    return roomPhotos.map((p) => [p]);
  }
  if (roomName === 'Gym') {
    const rows = [];
    if (roomPhotos.length > 0) rows.push([roomPhotos[0]]);
    for (let i = 1; i < roomPhotos.length; i += 2) {
      rows.push(roomPhotos.slice(i, i + 2));
    }
    return rows;
  }

  // Standard alternating layout: 1, 2, 1, 2, 1, 2...
  const rows = [];
  let i = 0;
  let takeOne = true;
  while (i < roomPhotos.length) {
    if (takeOne) {
      rows.push([roomPhotos[i]]);
      i += 1;
    } else {
      rows.push(roomPhotos.slice(i, i + 2));
      i += 2;
    }
    takeOne = !takeOne;
  }
  return rows;
}

export default function PhotoTour({ photos }: { photos: any[] }) {
  const {
    isPhotoTourOpen,
    setPhotoTourOpen,
    savedScrollY,
    setLightboxIndex,
    tourTargetRoom,
    setTourTargetRoom,
  } = useGallery();

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isSaved = photos[0]?.id ? getSaved(photos[0].id) : false;

  const handleClose = () => {
    setPhotoTourOpen(false);
    setTourTargetRoom(null);
    setTimeout(() => window.scrollTo({ top: savedScrollY }), 50);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleSaveToggle = () => {
    const next = !isSaved;
    if (photos[0]?.id) {
      setSaved(photos[0].id, next);
    }
    toast.success(next ? 'Saved to your wishlist!' : 'Removed from wishlist');
  };

  // Group photos by room
  const byRoom: Record<string, typeof photos> = {};
  photos.forEach((p) => {
    if (!byRoom[p.room]) {
      byRoom[p.room] = [];
    }
    byRoom[p.room].push(p);
  });

  const categories = listing.roomCategories || [];

  // Scroll to target room when opened
  useEffect(() => {
    if (!isPhotoTourOpen) return;
    document.body.style.overflow = 'hidden';

    if (tourTargetRoom && sectionRefs.current[tourTargetRoom] && containerRef.current) {
      setTimeout(() => {
        const container = containerRef.current!;
        const el = sectionRefs.current[tourTargetRoom!]!;
        container.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }, 300);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isPhotoTourOpen, tourTargetRoom]);

  // Keyboard Escape close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isPhotoTourOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPhotoTourOpen]);

  const scrollToRoom = (roomName: string) => {
    const el = sectionRefs.current[roomName];
    if (el && containerRef.current) {
      containerRef.current.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isPhotoTourOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          ref={containerRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            backgroundColor: '#FFFFFF',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Sticky Top Header ── */}
          <header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 30,
              backgroundColor: '#FFFFFF',
              height: 64,
              display: 'flex',
              alignItems: 'center',
              padding: '0 40px',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            {/* Back Button */}
            <button
              onClick={handleClose}
              aria-label="Back to listing"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#222222',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <AirbnbIcon name="image (39).svg" size={16} />
            </button>

            {/* Center Title */}
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#222222',
                letterSpacing: -0.1,
              }}
            >
              Photo tour
            </span>

            {/* Actions: Share & Save */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={handleShare}
                aria-label="Share"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 8,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#222222',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <AirbnbIcon name="image (3).svg" size={16} color="#222222" />
              </button>

              <button
                onClick={handleSaveToggle}
                aria-label="Save"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 8,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#222222',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <AirbnbIcon
                  name={isSaved ? 'image (4).svg' : 'image (4).svg'}
                  size={16}
                  color={isSaved ? '#FF385C' : '#222222'}
                  fill={isSaved ? '#FF385C' : 'none'}
                />
              </button>
            </div>
          </header>

          {/* ── Main Content Container (More Width on Sides) ── */}
          <div
            style={{
              maxWidth: 1120,
              width: '100%',
              margin: '0 auto',
              padding: '24px 40px 96px',
            }}
          >
            {/* ── Room Thumbnail Grid (Row 1 has 8 items, Row 2 has 1 item) ── */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px 12px',
                marginBottom: 64,
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => scrollToRoom(cat.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 8,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    width: 114,
                    textAlign: 'left',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1.03)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <div
                    style={{
                      width: 114,
                      height: 106,
                      borderRadius: 10,
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    <Image
                      src={cat.cover}
                      alt={cat.name}
                      fill
                      unoptimized
                      style={{
                        objectFit: 'cover',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#717171',
                      lineHeight: 1.25,
                    }}
                  >
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>

            {/* ── Room Sections (130px Gap, Right Edge Flush with Top Section) ── */}
            {categories.map((cat) => {
              const roomPhotos = byRoom[cat.name] || [];
              const rows = getRoomPhotoRows(cat.name, roomPhotos);

              return (
                <section
                  key={cat.name}
                  ref={(el) => {
                    sectionRefs.current[cat.name] = el;
                  }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '320px 1fr',
                    gap: 130,
                    marginBottom: 76,
                    alignItems: 'flex-start',
                  }}
                >
                  {/* LEFT: Sticky Room Name + Subtitle */}
                  <div
                    style={{
                      position: 'sticky',
                      top: 88,
                      paddingRight: 8,
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 26,
                        fontWeight: 600,
                        color: '#222222',
                        margin: '0 0 10px',
                        lineHeight: 1.2,
                        letterSpacing: -0.2,
                      }}
                    >
                      {cat.name}
                    </h2>
                    {cat.subtitle && (
                      <p
                        style={{
                          fontSize: 14,
                          color: '#717171',
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {cat.subtitle}
                      </p>
                    )}
                  </div>

                  {/* RIGHT: Layout Photos (Flush with Top Grid's Right Edge) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                    {rows.map((row, rowIdx) => {
                      if (row.length === 1) {
                        const p = row[0];
                        const globalIdx = photos.findIndex((item) => item.id === p.id);
                        return (
                          <div
                            key={p.id}
                            onClick={() => setLightboxIndex(globalIdx)}
                            style={{
                              position: 'relative',
                              width: '100%',
                              aspectRatio: '3 / 2',
                              borderRadius: 12,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              backgroundColor: '#f0f0f0',
                            }}
                            onMouseEnter={(e) => {
                              const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                              if (img) {
                                img.style.transform = 'scale(1.02)';
                                img.style.filter = 'brightness(0.96)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                              if (img) {
                                img.style.transform = 'scale(1)';
                                img.style.filter = 'brightness(1)';
                              }
                            }}
                          >
                            <Image
                              src={p.url}
                              alt={p.alt || cat.name}
                              fill
                              unoptimized
                              style={{
                                objectFit: 'cover',
                                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease',
                              }}
                            />
                          </div>
                        );
                      }

                      // 2-column row
                      return (
                        <div
                          key={`row-${rowIdx}`}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 10,
                          }}
                        >
                          {row.map((p) => {
                            const globalIdx = photos.findIndex((item) => item.id === p.id);
                            return (
                              <div
                                key={p.id}
                                onClick={() => setLightboxIndex(globalIdx)}
                                style={{
                                  position: 'relative',
                                  width: '100%',
                                  aspectRatio: '3 / 2',
                                  borderRadius: 12,
                                  overflow: 'hidden',
                                  cursor: 'pointer',
                                  backgroundColor: '#f0f0f0',
                                }}
                                onMouseEnter={(e) => {
                                  const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                                  if (img) {
                                    img.style.transform = 'scale(1.02)';
                                    img.style.filter = 'brightness(0.96)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                                  if (img) {
                                    img.style.transform = 'scale(1)';
                                    img.style.filter = 'brightness(1)';
                                  }
                                }}
                              >
                                <Image
                                  src={p.url}
                                  alt={p.alt || cat.name}
                                  fill
                                  unoptimized
                                  style={{
                                    objectFit: 'cover',
                                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease',
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
