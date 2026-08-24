'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type GalleryContextType = {
  isPhotoTourOpen: boolean;
  setPhotoTourOpen: (val: boolean) => void;
  lightboxIndex: number | null;
  setLightboxIndex: (val: number | null) => void;
  savedScrollY: number;
  setSavedScrollY: (val: number) => void;
  /** Room name to scroll to when Photo Tour opens (null = top) */
  tourTargetRoom: string | null;
  setTourTargetRoom: (val: string | null) => void;
  isReservationModalOpen: boolean;
  setReservationModalOpen: (val: boolean) => void;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [isPhotoTourOpen, setPhotoTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [savedScrollY, setSavedScrollY] = useState(0);
  const [tourTargetRoom, setTourTargetRoom] = useState<string | null>(null);
  const [isReservationModalOpen, setReservationModalOpen] = useState(false);

  return (
    <GalleryContext.Provider value={{
      isPhotoTourOpen, setPhotoTourOpen,
      lightboxIndex, setLightboxIndex,
      savedScrollY, setSavedScrollY,
      tourTargetRoom, setTourTargetRoom,
      isReservationModalOpen, setReservationModalOpen,
    }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGallery must be used within GalleryProvider');
  return context;
}
