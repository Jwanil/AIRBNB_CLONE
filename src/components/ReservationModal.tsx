'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReservationModal({ isOpen, onClose, listing, total }: { isOpen: boolean; onClose: () => void; listing: any; total: number }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            style={{ position: 'relative', backgroundColor: '#fff', borderRadius: 16, padding: 32, maxWidth: 480, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <div style={{ fontSize: 32, textAlign: 'center', marginBottom: 8 }}>🎉</div>
            <h2 style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', color: '#222', margin: '0 0 8px' }}>Reservation request sent!</h2>
            <p style={{ fontSize: 15, color: '#717171', textAlign: 'center', margin: '0 0 24px' }}>
              {listing.host.name} will confirm your stay shortly.
            </p>
            <div style={{ backgroundColor: '#f7f7f7', borderRadius: 8, padding: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: '#717171' }}>Property</span>
                <span style={{ fontWeight: 500, color: '#222', textAlign: 'right', maxWidth: '60%' }}>{listing.title}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#717171' }}>Total</span>
                <span style={{ fontWeight: 600, fontSize: 16, color: '#222' }}>{listing.currency}{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{ width: '100%', backgroundColor: '#FF385C', color: 'white', border: 'none', borderRadius: 8, padding: '14px 0', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E31C5F')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF385C')}
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
