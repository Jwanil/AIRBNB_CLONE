import { GalleryProvider } from '@/context/GalleryContext';
import { BookingProvider } from '@/context/BookingContext';
import { listing } from '@/lib/listing-data';
import Header from '@/components/Header';
import HeroGrid from '@/components/HeroGrid';
import ListingTitle from '@/components/ListingTitle';
import GuestFavourite from '@/components/GuestFavourite';
import PropertyHighlights from '@/components/PropertyHighlights';
import HostInfo from '@/components/HostInfo';
import DescriptionSection from '@/components/DescriptionSection';
import SleepingArrangements from '@/components/SleepingArrangements';
import AmenitiesSection from '@/components/AmenitiesSection';
import AvailabilitySection from '@/components/AvailabilitySection';
import BookingCard from '@/components/BookingCard';
import DiscountBanner from '@/components/DiscountBanner';
import ReviewsSection from '@/components/ReviewsSection';
import LocationSection from '@/components/LocationSection';
import MeetYourHost from '@/components/MeetYourHost';
import ThingsToKnow from '@/components/ThingsToKnow';
import NearbyStays from '@/components/NearbyStays';
import Footer from '@/components/Footer';
import PhotoTour from '@/components/PhotoTour';
import Lightbox from '@/components/Lightbox';

const HR = () => <hr style={{ border: 'none', borderTop: '1px solid #DDDDDD', margin: '32px 0' }} />;

export default function Home() {
  return (
    <GalleryProvider>
      <BookingProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'AirbnbCereal, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: '#fff', color: '#222' }}>
          <Header />

          <main style={{ maxWidth: 1150, margin: '0 auto', padding: '0 24px 60px', width: '100%', flex: 1 }}>
            {/* Main Title Row */}
            <ListingTitle listing={listing} />

            {/* Hero Photo Grid */}
            <div id="photos">
              <HeroGrid photos={listing.photos} />
            </div>

            {/* Two-column Main Content */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 370px', gap: 80, marginTop: 32, alignItems: 'start' }}>
              {/* LEFT Column */}
              <div>
                {/* Room Category Header */}
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: 0, lineHeight: 1.3 }}>
                    {listing.propertyType}
                  </h2>
                  <div style={{ fontSize: 15, color: '#222222', marginTop: 4 }}>
                    {listing.guestCount} guests · {listing.bedroomCount} bedroom · {listing.bedCount} bed · {listing.bathCount} bathroom
                  </div>
                </div>

                {/* Guest Favourite Card */}
                <GuestFavourite listing={listing} />

                <HR />
                <HostInfo host={listing.host} />

                <HR />
                <PropertyHighlights />

                <HR />
                <DescriptionSection description={listing.description} />

                <HR />
                <SleepingArrangements />

                <HR />
                <div id="amenities">
                  <AmenitiesSection amenities={listing.amenities} />
                </div>

                <HR />
                <AvailabilitySection />
              </div>

              {/* RIGHT Column: Sticky Discount Banner + Booking Card */}
              <div style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <DiscountBanner />
                <BookingCard listing={listing} />
              </div>
            </div>

            <HR />
            <div id="reviews">
              <ReviewsSection listing={listing} />
            </div>

            <HR />
            <div id="location">
              <LocationSection />
            </div>

            <HR />
            <MeetYourHost host={listing.host} />

            <HR />
            <ThingsToKnow />

            <HR />
            <NearbyStays />
          </main>

          <Footer />

          <PhotoTour photos={listing.photos} />
          <Lightbox photos={listing.photos} />
        </div>
      </BookingProvider>
    </GalleryProvider>
  );
}

