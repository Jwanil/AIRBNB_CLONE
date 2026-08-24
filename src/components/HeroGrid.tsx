'use client';
import { useGallery } from '@/context/GalleryContext';
import Image from 'next/image';
import AirbnbIcon from './AirbnbIcon';


export default function HeroGrid({ photos }: { photos: any[] }) {
  const { setPhotoTourOpen, setSavedScrollY, setTourTargetRoom } = useGallery();

  const openTourAtPhoto = (photo: any) => {
    setSavedScrollY(window.scrollY);
    setTourTargetRoom(photo.room);
    setPhotoTourOpen(true);
  };

  const openTourTop = () => {
    setSavedScrollY(window.scrollY);
    setTourTargetRoom(null);
    setPhotoTourOpen(true);
  };

  // Exact 5 photos from the reference screenshot:
  // 1. Living room 2 main (rattan chairs)
  // 2. Living room 2 couch
  // 3. Jacuzzi
  // 4. Bedroom
  // 5. Exterior
  const mainPhoto = photos.find((p) => p.id === 'p-4') || photos[3] || photos[0];
  const gridPhotos = [
    photos.find((p) => p.id === 'p-6') || photos[5] || photos[1], // Living room 2 couch
    photos.find((p) => p.id === 'p-5') || photos[4] || photos[2], // Jacuzzi
    photos.find((p) => p.id === 'p-13') || photos[12] || photos[3], // Bedroom
    photos.find((p) => p.id === 'p-25') || photos[24] || photos[4], // Exterior
  ];

  return (
    <div
      style={{
        position: 'relative',
        marginTop: 16,
        borderRadius: 16,
        overflow: 'hidden',
        height: 480,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
      }}
    >
      {/* Left: Large Primary Image */}
      <div
        style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
        onClick={() => openTourAtPhoto(mainPhoto)}
        onMouseEnter={(e) => {
          const img = e.currentTarget.querySelector('img') as HTMLImageElement;
          if (img) {
            img.style.transform = 'scale(1.02)';
            img.style.filter = 'brightness(0.94)';
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
          src={mainPhoto.url}
          alt={mainPhoto.alt}
          fill
          unoptimized
          priority
          style={{
            objectFit: 'cover',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease',
          }}
        />
      </div>

      {/* Right: 2×2 Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 8,
        }}
      >
        {gridPhotos.map((photo) => (
          <div
            key={photo.id}
            style={{ position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => openTourAtPhoto(photo)}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('img') as HTMLImageElement;
              if (img) {
                img.style.transform = 'scale(1.02)';
                img.style.filter = 'brightness(0.94)';
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
              src={photo.url}
              alt={photo.alt}
              fill
              unoptimized
              style={{
                objectFit: 'cover',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease',
              }}
            />
          </div>
        ))}
      </div>

      {/* "Show all photos" button with 9-dot icon */}
      <button
        onClick={openTourTop}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          backgroundColor: '#FFFFFF',
          border: '1px solid #222222',
          borderRadius: 8,
          padding: '7px 15px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
          fontFamily: 'inherit',
          zIndex: 5,
          color: '#222222',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
      >
        <AirbnbIcon name="image (5).svg" size={16} />
        Show all photos
      </button>
    </div>
  );
}
