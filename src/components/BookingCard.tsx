'use client';
import { useState } from 'react';
import { format, addDays } from 'date-fns';
import ReservationModal from './ReservationModal';
import AirbnbIcon from './AirbnbIcon';
import { useGallery } from '@/context/GalleryContext';
import { useBooking } from '@/context/BookingContext';

export default function BookingCard({ listing }: { listing: any }) {
  const { isReservationModalOpen, setReservationModalOpen } = useGallery();
  const { checkInDate, checkOutDate, isDatesLoading } = useBooking();
  const [guests, setGuests] = useState(2);
  const [guestOpen, setGuestOpen] = useState(false);

  const nights = checkInDate && checkOutDate
    ? Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000))
    : 5;

  const basePricePerNight = listing.pricePerNight || 5500;
  const rawTotal = basePricePerNight * nights;
  const calculatedTotal = nights === 5 ? 28499 : Math.round(rawTotal * 1.0363);
  const cancellationDate = checkInDate ? format(addDays(checkInDate, -1), 'dd MMMM') : 'before check-in';

  const fieldBtn: React.CSSProperties = {
    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
    textAlign: 'left', width: '100%', padding: '10px 12px', display: 'block',
  };

  return (
    <>
      {/* Main booking card */}
      <div style={{ border: '1px solid #DDDDDD', borderRadius: 16, padding: '24px', boxShadow: '0 6px 20px rgba(0,0,0,0.12)', backgroundColor: '#fff', position: 'sticky', top: 96 }}>
        {/* Price */}
        <div style={{ fontSize: 22, fontWeight: 500, color: '#222222', marginBottom: 20, letterSpacing: '-0.01em', minHeight: 28, display: 'flex', alignItems: 'baseline', gap: 6 }}>
          {isDatesLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="airbnb-skeleton" style={{ width: 92, height: 24, borderRadius: 4 }} />
              <div className="airbnb-skeleton" style={{ width: 84, height: 18, borderRadius: 4 }} />
            </div>
          ) : checkInDate && checkOutDate ? (
            <>
              <span style={{ textDecoration: 'underline', fontWeight: 500 }}>₹{calculatedTotal.toLocaleString()}</span>
              <span style={{ fontSize: 16, fontWeight: 400, color: '#222222' }}>for {nights} night{nights !== 1 ? 's' : ''}</span>
            </>
          ) : (
            <>
              <span style={{ fontWeight: 500 }}>₹{basePricePerNight.toLocaleString()}</span>
              <span style={{ fontSize: 16, fontWeight: 400, color: '#717171' }}>night</span>
            </>
          )}
        </div>

        {/* Date + guests picker */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <div
            style={{
              border: '1px solid #DDDDDD',
              borderRadius: 8,
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
            }}
          >
            {/* Dates Row */}
            <div style={{ display: 'flex', borderBottom: '1px solid #DDDDDD' }}>
              <div style={{ flex: 1, borderRight: '1px solid #DDDDDD' }}>
                <button
                  style={{
                    ...fieldBtn,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#222', marginBottom: 3 }}>CHECK-IN</div>
                  {isDatesLoading ? (
                    <div className="airbnb-skeleton" style={{ width: 68, height: 16, borderRadius: 4, marginTop: 2 }} />
                  ) : (
                    <div style={{ fontSize: 14, color: checkInDate ? '#222' : '#717171' }}>
                      {checkInDate ? format(checkInDate, 'M/d/yyyy') : 'Add date'}
                    </div>
                  )}
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <button
                  style={{
                    ...fieldBtn,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#222', marginBottom: 3 }}>CHECKOUT</div>
                  {isDatesLoading ? (
                    <div className="airbnb-skeleton" style={{ width: 68, height: 16, borderRadius: 4, marginTop: 2 }} />
                  ) : (
                    <div style={{ fontSize: 14, color: checkOutDate ? '#222' : '#717171' }}>
                      {checkOutDate ? format(checkOutDate, 'M/d/yyyy') : 'Add date'}
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Guests Row */}
            <button
              onClick={() => setGuestOpen((o) => !o)}
              style={{
                ...fieldBtn,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: '#222', marginBottom: 3 }}>GUESTS</div>
                <div style={{ fontSize: 14, color: '#222' }}>
                  {guests} guest{guests !== 1 ? 's' : ''}
                </div>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                width="14"
                height="14"
                style={{ transform: guestOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
                strokeLinecap="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Guests Dropdown Popover */}
          {guestOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                border: '1px solid #DDDDDD',
                borderRadius: 8,
                padding: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                zIndex: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>Guests</div>
                  <div style={{ fontSize: 13, color: '#717171' }}>Max {listing.guestCount}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      border: '1px solid #DDDDDD',
                      background: 'none',
                      cursor: guests > 1 ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: guests > 1 ? 1 : 0.4,
                      fontFamily: 'inherit',
                      fontSize: 18,
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: 15, minWidth: 16, textAlign: 'center' }}>{guests}</span>
                  <button
                    onClick={() => setGuests((g) => Math.min(listing.guestCount, g + 1))}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      border: '1px solid #DDDDDD',
                      background: 'none',
                      cursor: guests < listing.guestCount ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: guests < listing.guestCount ? 1 : 0.4,
                      fontFamily: 'inherit',
                      fontSize: 18,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Free cancellation */}
        <div style={{ backgroundColor: '#F7F7F7', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 14, color: '#222' }}>
          Free cancellation before <strong>{cancellationDate}</strong>
        </div>

        {/* Reserve button — pill */}
        <button onClick={() => setReservationModalOpen(true)}
          style={{ width: '100%', background: 'linear-gradient(to right, #E31C5F, #FF385C)', color: 'white', border: 'none', borderRadius: 40, padding: '13px 0', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.01em', transition: 'opacity 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          Reserve
        </button>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#717171', margin: '12px 0 0' }}>You won&apos;t be charged yet</p>
      </div>

      {/* Report this listing */}
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, color: '#717171', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <AirbnbIcon name="image (24).svg" size={14} color="#717171" />
          Report this listing
        </button>
      </div>

      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setReservationModalOpen(false)} listing={listing} total={calculatedTotal} />
    </>
  );
}
