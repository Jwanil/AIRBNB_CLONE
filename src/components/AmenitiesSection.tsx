'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AirbnbIcon from './AirbnbIcon';

// Map semantic amenity keys to exact scraped SVGs
const AMENITY_SVG_MAP: Record<string, string> = {
  // Bathroom
  hairdryer: 'image (43).svg',
  cleaning_products: 'image (44).svg',
  shampoo: 'image (45).svg',
  hot_water: 'image (46).svg',
  shower_gel: 'image (47).svg',

  // Bedroom and laundry
  washing_machine: 'image (48).svg',
  hangers: 'image (49).svg',
  bed_linen: 'image (50).svg',
  blinds: 'image (51).svg',
  iron: 'image (52).svg',
  clothes_storage: 'image (53).svg',
  cot: 'image (54).svg',

  // Entertainment
  tv: 'image (55).svg',

  // Heating and cooling
  ac: 'image (56).svg',
  ceiling_fan: 'image (9).svg',

  // Home safety
  security_camera: 'image (cam-svg).svg',
  carbon_monoxide: 'image (19).svg',
  smoke_alarm: 'image (20).svg',

  // Internet and office
  wifi: 'image (13).svg',
  workspace: 'image (14).svg',

  // Kitchen and dining
  kitchen: 'image (12).svg',
  fridge: 'image (57).svg',
  freezer: 'image (57).svg',
  microwave: 'image (58).svg',
  cooking_basics: 'image (12).svg',
  crockery: 'image (59).svg',
  kettle: 'image (60).svg',
  coffee: 'image (61).svg',
  wine_glasses: 'image (62).svg',
  toaster: 'image (63).svg',
  blender: 'image (64).svg',
  cooker: 'image (65).svg',

  // Location features
  entrance: 'image (66).svg',

  // Outdoor
  patio: 'image (67).svg',
  outdoor_dining: 'image (68).svg',

  // Parking and facilities
  parking: 'image (15).svg',
  pool: 'image (16).svg',
  hottub: 'image (17).svg',
  gym: 'image (69).svg',

  // Services
  pets: 'image (18).svg',
  cleaning_stay: 'image (25).svg',
  long_term: 'image (70).svg',
  self_checkin: 'image (10).svg',
};

const AmenityIcon = ({ name, isCrossedOut = false }: { name: string; isCrossedOut?: boolean }) => {
  const iconFile = AMENITY_SVG_MAP[name] || 'image (8).svg';
  return (
    <div
      style={{
        position: 'relative',
        width: 24,
        height: 24,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AirbnbIcon name={iconFile} size={24} color={isCrossedOut ? '#717171' : '#222222'} />
      {isCrossedOut && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: -2,
            right: -2,
            height: 2,
            backgroundColor: '#717171',
            transform: 'rotate(-45deg)',
            borderRadius: 1,
          }}
        />
      )}
    </div>
  );
};

// Exact preview amenities from reference screenshot (2 columns of 5)
const previewItems = [
  { label: 'Kitchen', icon: 'kitchen' },
  { label: 'Wifi', icon: 'wifi' },
  { label: 'Dedicated workspace', icon: 'workspace' },
  { label: 'Free parking on premises', icon: 'parking' },
  { label: 'Pool', icon: 'pool' },
  { label: 'Hot tub', icon: 'hottub' },
  { label: 'Pets allowed', icon: 'pets' },
  { label: 'Exterior security cameras on property', icon: 'security_camera' },
  { label: 'Carbon monoxide alarm', icon: 'carbon_monoxide', crossedOut: true },
  { label: 'Smoke alarm', icon: 'smoke_alarm', crossedOut: true },
];

// Complete Categorized Amenities for the Full Modal (Exact sequence from user)
const amenityCategories = [
  {
    category: 'Bathroom',
    items: [
      { label: 'Hairdryer', icon: 'hairdryer' },
      { label: 'Cleaning products', icon: 'cleaning_products' },
      { label: 'Shampoo', icon: 'shampoo' },
      { label: 'Hot water', icon: 'hot_water' },
      { label: 'Shower gel', icon: 'shower_gel' },
    ],
  },
  {
    category: 'Bedroom and laundry',
    items: [
      { label: 'Washing machine', icon: 'washing_machine' },
      { label: 'Hangers', icon: 'hangers' },
      { label: 'Bed linen', icon: 'bed_linen' },
      { label: 'Room-darkening blinds', icon: 'blinds' },
      { label: 'Iron', icon: 'iron' },
      { label: 'Clothes storage', icon: 'clothes_storage' },
      { label: 'Cot', icon: 'cot' },
    ],
  },
  {
    category: 'Entertainment',
    items: [{ label: 'TV', icon: 'tv' }],
  },
  {
    category: 'Family',
    items: [{ label: 'Cot', icon: 'cot' }],
  },
  {
    category: 'Heating and cooling',
    items: [
      { label: 'Air conditioning', icon: 'ac' },
      { label: 'Ceiling fan', icon: 'ceiling_fan' },
    ],
  },
  {
    category: 'Home safety',
    items: [
      { label: 'Exterior security cameras on property', icon: 'security_camera' },
      { label: 'Carbon monoxide alarm', icon: 'carbon_monoxide', crossedOut: true },
      { label: 'Smoke alarm', icon: 'smoke_alarm', crossedOut: true },
    ],
  },
  {
    category: 'Internet and office',
    items: [
      { label: 'Wifi', icon: 'wifi' },
      { label: 'Dedicated workspace', icon: 'workspace' },
    ],
  },
  {
    category: 'Kitchen and dining',
    items: [
      { label: 'Kitchen', icon: 'kitchen' },
      { label: 'Fridge', icon: 'fridge' },
      { label: 'Freezer', icon: 'freezer' },
      { label: 'Microwave', icon: 'microwave' },
      { label: 'Cooking basics', icon: 'cooking_basics' },
      { label: 'Crockery and cutlery', icon: 'crockery' },
      { label: 'Kettle', icon: 'kettle' },
      { label: 'Coffee', icon: 'coffee' },
      { label: 'Wine glasses', icon: 'wine_glasses' },
      { label: 'Toaster', icon: 'toaster' },
      { label: 'Blender', icon: 'blender' },
      { label: 'Cooker', icon: 'cooker' },
    ],
  },
  {
    category: 'Location features',
    items: [{ label: 'Private entrance', icon: 'entrance' }],
  },
  {
    category: 'Outdoor',
    items: [
      { label: 'Patio or balcony', icon: 'patio' },
      { label: 'Outdoor dining area', icon: 'outdoor_dining' },
    ],
  },
  {
    category: 'Parking and facilities',
    items: [
      { label: 'Free parking on premises', icon: 'parking' },
      { label: 'Pool', icon: 'pool' },
      { label: 'Hot tub', icon: 'hottub' },
      { label: 'Gym', icon: 'gym' },
    ],
  },
  {
    category: 'Services',
    items: [
      { label: 'Pets allowed', icon: 'pets' },
      { label: 'Cleaning available during stay', icon: 'cleaning_stay' },
      { label: 'Long-term stays allowed', icon: 'long_term' },
      { label: 'Self check-in', icon: 'self_checkin' },
    ],
  },
];

export default function AmenitiesSection({ amenities }: { amenities?: any[] } = {}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 24px', letterSpacing: -0.2 }}>
        What this place offers
      </h2>

      {/* 2-column preview grid matching reference */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: 32 }}>
        {previewItems.map((amenity, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <AmenityIcon name={amenity.icon} isCrossedOut={amenity.crossedOut} />
            <span
              style={{
                fontSize: 16,
                color: amenity.crossedOut ? '#717171' : '#222222',
                textDecoration: amenity.crossedOut ? 'line-through' : 'none',
              }}
            >
              {amenity.label}
            </span>
          </div>
        ))}
      </div>

      {/* "Show all 50 amenities" button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          border: '1px solid #222222',
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          padding: '13px 23px',
          fontSize: 16,
          fontWeight: 500,
          color: '#222222',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background-color 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F7F7F7')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
      >
        Show all 50 amenities
      </button>

      {/* Complete All 50 Amenities Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 24px',
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: '24px 32px 40px',
                width: '100%',
                maxWidth: 780,
                maxHeight: '85vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Top-Left Close Button Above Title (Shifted Left) */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close amenities modal"
                style={{
                  alignSelf: 'flex-start',
                  width: 32,
                  height: 32,
                  minWidth: 32,
                  minHeight: 32,
                  borderRadius: '50%',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: -22,
                  marginBottom: 24,
                  color: '#222222',
                  transition: 'background-color 0.15s ease',
                  padding: 0,
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F2F2F2')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <AirbnbIcon name="image (21).svg" size={16} />
              </button>

              {/* Title */}
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: '#222222',
                  margin: '0 0 28px',
                  letterSpacing: -0.2,
                }}
              >
                What this place offers
              </h2>

              {/* Categorized Amenities List */}
              <div>
                {amenityCategories.map((group, groupIdx) => (
                  <div key={groupIdx} style={{ marginBottom: 28 }}>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        color: '#222222',
                        margin: '0 0 12px',
                        letterSpacing: -0.1,
                      }}
                    >
                      {group.category}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {group.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16,
                            padding: '16px 0',
                            borderBottom: '1px solid #EBEBEB',
                          }}
                        >
                          <AmenityIcon name={item.icon} isCrossedOut={item.crossedOut} />
                          <span
                            style={{
                              fontSize: 16,
                              color: item.crossedOut ? '#717171' : '#222222',
                              textDecoration: item.crossedOut ? 'line-through' : 'none',
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
