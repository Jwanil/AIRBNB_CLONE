'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGallery } from '@/context/GalleryContext';
import { useBooking } from '@/context/BookingContext';
import { useAuth } from '@/context/AuthContext';

const navTabs = [
  { id: 'photos', label: 'Photos' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { setReservationModalOpen } = useGallery();
  const { checkInDate, checkOutDate, isDatesLoading } = useBooking();
  const { user, openAuthModal, logout } = useAuth();

  const nights = checkInDate && checkOutDate
    ? Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000))
    : 5;
  const calculatedTotal = nights === 5 ? 28499 : Math.round(5500 * nights * 1.0363);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 550);

      // Determine active section based on scroll position
      const amenitiesEl = document.getElementById('amenities');
      const reviewsEl = document.getElementById('reviews');
      const locationEl = document.getElementById('location');

      const amenitiesTop = amenitiesEl ? amenitiesEl.offsetTop - 120 : 1200;
      const reviewsTop = reviewsEl ? reviewsEl.offsetTop - 120 : 2000;
      const locationTop = locationEl ? locationEl.offsetTop - 120 : 2800;

      if (scrollY >= locationTop) {
        setActiveTab('location');
      } else if (scrollY >= reviewsTop) {
        setActiveTab('reviews');
      } else if (scrollY >= amenitiesTop) {
        setActiveTab('amenities');
      } else {
        setActiveTab('photos');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    if (id === 'photos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToReserve = () => {
    const el = document.getElementById('amenities');
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className="sticky top-0 z-40 bg-white transition-all duration-200"
      style={{
        borderBottom: '1px solid #EBEBEB',
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.06)' : 'none',
        width: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. SCROLLED STICKY LISTING NAVBAR (Secondary Bar)
      ───────────────────────────────────────────────────────────── */}
      {isScrolled ? (
        <div
          style={{
            width: '100%',
            maxWidth: 1150,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left Navigation Tabs */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 24, height: '100%' }}>
            {navTabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0 4px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    color: '#222222',
                    position: 'relative',
                    borderBottom: isActive ? '2px solid #222222' : '2px solid transparent',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Price + Rating + Reserve Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ lineHeight: 1.2, minHeight: 20, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 5 }}>
                {isDatesLoading ? (
                  <div className="airbnb-skeleton" style={{ width: 110, height: 16, borderRadius: 4 }} />
                ) : checkInDate && checkOutDate ? (
                  <>
                    <span style={{ fontSize: 16, fontWeight: 500, color: '#222222' }}>₹{calculatedTotal.toLocaleString()}</span>
                    <span style={{ fontSize: 14, fontWeight: 400, color: '#222222' }}>for {nights} night{nights !== 1 ? 's' : ''}</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 16, fontWeight: 500, color: '#222222' }}>₹5,500</span>
                    <span style={{ fontSize: 14, fontWeight: 400, color: '#717171' }}>night</span>
                  </>
                )}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#222222',
                  marginTop: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  justifyContent: 'flex-end',
                }}
              >
                <span>★</span>
                <span>4.95 · 19 reviews</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!user) {
                  openAuthModal('login');
                } else {
                  setReservationModalOpen(true);
                }
              }}
              style={{
                background: 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%)',
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 600,
                padding: '9px 22px',
                borderRadius: 30,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'opacity 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.92')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Reserve
            </button>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────────
            2. MAIN AIRBNB TOP NAVBAR (Default Bar)
        ───────────────────────────────────────────────────────────── */
        <div
          style={{
            width: '100%',
            maxWidth: 1400,
            margin: '0 auto',
            padding: '0 52px',
            height: 86,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          {/* Left: Original Airbnb SVG Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="/"
              style={{
                color: '#FF385C',
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
              }}
              aria-label="Airbnb homepage"
            >
              <svg
                viewBox="0 0 3490 1080"
                style={{ display: 'block', height: 34, width: 'auto', fill: '#FF385C' }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1494.71 456.953C1458.28 412.178 1408.46 389.892 1349.68 389.892C1233.51 389.892 1146.18 481.906 1146.18 605.892C1146.18 729.877 1233.51 821.892 1349.68 821.892C1408.46 821.892 1458.28 799.605 1494.71 754.83L1500.95 810.195H1589.84V401.588H1500.95L1494.71 456.953ZM1369.18 736.895C1295.33 736.895 1242.08 683.41 1242.08 605.892C1242.08 528.373 1295.33 474.888 1369.18 474.888C1443.02 474.888 1495.49 529.153 1495.49 605.892C1495.49 682.63 1443.8 736.895 1369.18 736.895ZM1656.11 810.195H1750.46V401.588H1656.11V810.195ZM948.912 666.715C875.618 506.859 795.308 344.664 713.438 184.809C698.623 155.177 670.554 98.2527 645.603 67.8412C609.736 24.1733 556.715 0.779785 502.915 0.779785C449.115 0.779785 396.094 24.1733 360.227 67.8412C335.277 98.2527 307.207 155.177 292.392 184.809C210.522 344.664 130.212 506.859 56.9187 666.715C47.5621 687.769 24.9504 737.675 16.3736 760.289C6.2373 787.581 0.779297 817.213 0.779297 846.845C0.779297 975.509 101.362 1079.22 235.473 1079.22C346.193 1079.22 434.3 1008.26 502.915 934.18C571.53 1008.26 659.638 1079.22 770.357 1079.22C904.468 1079.22 1005.83 975.509 1005.83 846.845C1005.83 817.213 999.593 787.581 989.457 760.289C980.88 737.675 958.268 687.769 948.912 666.715ZM502.915 810.195C447.555 738.455 396.094 649.56 396.094 577.819C396.094 506.079 446.776 470.209 502.915 470.209C559.055 470.209 610.516 508.419 610.516 577.819C610.516 647.22 558.275 738.455 502.915 810.195ZM770.357 998.902C688.362 998.902 618.032 941.557 555.741 872.656C619.966 792.541 690.826 679.121 690.826 577.819C690.826 458.513 598.04 389.892 502.915 389.892C407.79 389.892 315.784 458.513 315.784 577.819C315.784 679.098 386.145 792.478 450.144 872.593C387.845 941.526 317.491 998.902 235.473 998.902C146.586 998.902 81.0898 931.061 81.0898 846.845C81.0898 826.57 84.2087 807.856 91.2261 788.361C98.2436 770.426 120.855 720.52 130.212 701.025C203.505 541.17 282.256 380.534 364.126 220.679C378.941 191.047 403.891 141.921 422.605 119.307C442.877 94.3538 470.947 81.0975 502.915 81.0975C534.883 81.0975 562.953 94.3538 583.226 119.307C601.939 141.921 626.89 191.047 641.704 220.679C723.574 380.534 802.325 541.17 875.618 701.025C884.975 720.52 907.587 770.426 914.604 788.361C921.622 807.856 925.52 826.57 925.52 846.845C925.52 931.061 859.244 998.902 770.357 998.902ZM3285.71 389.892C3226.91 389.892 3175.97 413.098 3139.91 456.953V226.917H3045.56V810.195H3134.45L3140.69 754.83C3177.12 799.605 3226.94 821.892 3285.71 821.892C3401.89 821.892 3489.22 729.877 3489.22 605.892C3489.22 481.906 3401.89 389.892 3285.71 389.892ZM3266.22 736.895C3191.6 736.895 3139.91 682.63 3139.91 605.892C3139.91 529.153 3191.6 474.888 3266.22 474.888C3340.85 474.888 3393.32 528.373 3393.32 605.892C3393.32 683.41 3340.07 736.895 3266.22 736.895ZM2827.24 389.892C2766.15 389.892 2723.56 418.182 2699.37 456.953L2693.13 401.588H2604.24V810.195H2698.59V573.921C2698.59 516.217 2741.47 474.888 2800.73 474.888C2856.87 474.888 2888.84 513.097 2888.84 578.599V810.195H2983.19V566.903C2983.19 457.733 2923.15 389.892 2827.24 389.892ZM1911.86 460.072L1905.62 401.588H1816.73V810.195H1911.08V604.332C1911.08 532.592 1954.74 486.585 2027.26 486.585C2042.85 486.585 2058.44 488.144 2070.92 492.043V401.588C2059.22 396.91 2044.41 395.35 2028.04 395.35C1978.58 395.35 1936.66 421.177 1911.86 460.072ZM2353.96 389.892C2295.15 389.892 2244.21 413.098 2208.15 456.953V226.917H2113.8V810.195H2202.69L2208.93 754.83C2245.36 799.605 2295.18 821.892 2353.96 821.892C2470.13 821.892 2557.46 729.877 2557.46 605.892C2557.46 481.906 2470.13 389.892 2353.96 389.892ZM2334.46 736.895C2259.84 736.895 2208.15 682.63 2208.15 605.892C2208.15 529.153 2259.84 474.888 2334.46 474.888C2409.09 474.888 2461.56 528.373 2461.56 605.892C2461.56 683.41 2408.31 736.895 2334.46 736.895ZM1703.28 226.917C1669.48 226.917 1642.08 254.326 1642.08 288.13C1642.08 321.934 1669.48 349.343 1703.28 349.343C1737.09 349.343 1764.49 321.934 1764.49 288.13C1764.49 254.326 1737.09 226.917 1703.28 226.917Z" />
              </svg>
            </Link>
          </div>

          {/* Center: Search Bar with House Icon */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #DDDDDD',
                borderRadius: 40,
                padding: '6px 8px 6px 14px',
                height: 48,
                boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                gap: 0,
                transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              className="hidden md:flex"
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.16), 0 1px 2px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)';
              }}
            >
              {/* House Illustration */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, marginRight: 8, flexShrink: 0 }}>
                <Image
                  src="/images/searchbar-house.png"
                  alt="House"
                  width={48}
                  height={48}
                  unoptimized
                  style={{ objectFit: 'contain', width: 48, height: 48, transform: 'scale(1.35)', transformOrigin: 'center' }}
                />
              </div>

              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#222222',
                  padding: '0 16px 0 6px',
                  borderRight: '1px solid #DDDDDD',
                }}
              >
                Anywhere
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#222222',
                  padding: '0 16px',
                  borderRight: '1px solid #DDDDDD',
                }}
              >
                Anytime
              </span>
              <span style={{ fontSize: 14, color: '#717171', padding: '0 18px 0 16px' }}>
                Add guests
              </span>

              {/* Pink Search Circle */}
              <div
                style={{
                  backgroundColor: '#FF385C',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginLeft: 4,
                }}
              >
                <svg viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="4" width="12" height="12">
                  <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right: Become a host + Circular Globe + Circular 3-Bars Menu */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
            <Link
              href="#"
              style={{
                fontSize: 14,
                fontWeight: 600,
                padding: '10px 14px',
                borderRadius: 22,
                textDecoration: 'none',
                color: '#222222',
                whiteSpace: 'nowrap',
              }}
              className="hidden md:block hover:bg-gray-100 transition"
            >
              Become a host
            </Link>

            {/* Globe Button with soft grey background */}
            <button
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: '#F2F2F2',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#222222',
                transition: 'background-color 0.15s ease',
              }}
              className="hidden md:flex hover:bg-gray-200 transition"
              aria-label="Language & currency"
            >
              <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="16" cy="16" r="13" />
                <path d="M3 16h26M16 3a18 18 0 0 1 0 26M16 3a18 18 0 0 0 0 26" />
              </svg>
            </button>

            {/* User Menu Container with dropdown */}
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  height: 44,
                  padding: user ? '4px 6px 4px 12px' : '4px 10px 4px 12px',
                  borderRadius: 24,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #DDDDDD',
                  cursor: 'pointer',
                  color: '#222222',
                  boxShadow: menuOpen ? '0 2px 4px rgba(0,0,0,0.14)' : 'none',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}
                className="hover:shadow-md transition"
                aria-label="Main navigation menu"
                aria-expanded={menuOpen}
              >
                <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16" strokeLinecap="round">
                  <path d="M6 10h20M6 16h20M6 22h20" />
                </svg>

                {user ? (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      backgroundColor: '#222222',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                ) : (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      backgroundColor: '#717171',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg viewBox="0 0 32 32" fill="currentColor" width="14" height="14">
                      <path d="M16 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm0 18c-6.627 0-12 3.582-12 8v2h24v-2c0-4.418-5.373-8-12-8z" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: 240,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 14,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #EBEBEB',
                    padding: '8px 0',
                    zIndex: 100,
                    fontSize: 14,
                  }}
                >
                  {user ? (
                    <>
                      <div style={{ padding: '10px 16px', borderBottom: '1px solid #EBEBEB' }}>
                        <div style={{ fontWeight: 600, color: '#222222' }}>{user.name}</div>
                        <div style={{ fontSize: 12, color: '#717171', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.email}
                        </div>
                      </div>
                      <button
                        onClick={() => setMenuOpen(false)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#222222',
                          fontFamily: 'inherit',
                          fontSize: 14,
                        }}
                        className="hover:bg-gray-100"
                      >
                        Wishlists
                      </button>
                      <button
                        onClick={() => setMenuOpen(false)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#222222',
                          fontFamily: 'inherit',
                          fontSize: 14,
                        }}
                        className="hover:bg-gray-100"
                      >
                        Airbnb your home
                      </button>
                      <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', margin: '4px 0' }} />
                      <button
                        onClick={async () => {
                          setMenuOpen(false);
                          await logout();
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#C13515',
                          fontWeight: 500,
                          fontFamily: 'inherit',
                          fontSize: 14,
                        }}
                        className="hover:bg-gray-100"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          openAuthModal('register');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                          color: '#222222',
                          fontFamily: 'inherit',
                          fontSize: 14,
                        }}
                        className="hover:bg-gray-100"
                      >
                        Sign up
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          openAuthModal('login');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#222222',
                          fontFamily: 'inherit',
                          fontSize: 14,
                        }}
                        className="hover:bg-gray-100"
                      >
                        Log in
                      </button>
                      <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', margin: '4px 0' }} />
                      <button
                        onClick={() => setMenuOpen(false)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#222222',
                          fontFamily: 'inherit',
                          fontSize: 14,
                        }}
                        className="hover:bg-gray-100"
                      >
                        Airbnb your home
                      </button>
                      <button
                        onClick={() => setMenuOpen(false)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#222222',
                          fontFamily: 'inherit',
                          fontSize: 14,
                        }}
                        className="hover:bg-gray-100"
                      >
                        Help Centre
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
