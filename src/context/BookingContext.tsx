'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { addDays } from 'date-fns';

type BookingContextType = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setDateRange: (inDate: Date | null, outDate: Date | null) => void;
  isDatesLoading: boolean;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  // Default dates: Today for 5 nights
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const defaultCheckIn = today;
  const defaultCheckOut = addDays(today, 5);

  const [checkInDate, setCheckInDate] = useState<Date | null>(defaultCheckIn);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(defaultCheckOut);
  const [isDatesLoading, setIsDatesLoading] = useState(false);

  const setDateRange = (inDate: Date | null, outDate: Date | null) => {
    setIsDatesLoading(true);
    setCheckInDate(inDate);
    setCheckOutDate(outDate);
    setTimeout(() => {
      setIsDatesLoading(false);
    }, 240);
  };

  return (
    <BookingContext.Provider value={{
      checkInDate, checkOutDate,
      setDateRange, isDatesLoading,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
}
