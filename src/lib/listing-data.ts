export interface PhotoItem {
  id: string;
  url: string;
  alt: string;
  room: string;
}

export interface RoomCategory {
  name: string;
  subtitle: string;
  cover: string;
}

export const listing = {
  id: 'romantic-jacuzzi-1bhk-candolim',
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  propertyType: 'Entire serviced apartment in Candolim, India',
  location: 'Candolim, India',
  guestCount: 3,
  bedroomCount: 1,
  bedCount: 1,
  bathCount: 1,
  rating: 4.95,
  reviewCount: 19,
  pricePerNight: 5500,
  currency: '₹',
  cleaningFee: 800,
  description: '🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴',

  roomCategories: [
    {
      name: 'Living room 1',
      subtitle: 'Sofa · Air conditioning · Ceiling fan · TV',
      cover: '/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg',
    },
    {
      name: 'Living room 2',
      subtitle: 'Ceiling fan · Hot tub',
      cover: '/images/b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg',
    },
    {
      name: 'Full kitchen',
      subtitle: 'Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery',
      cover: '/images/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg',
    },
    {
      name: 'Bedroom',
      subtitle: 'Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi',
      cover: '/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg',
    },
    {
      name: 'Full bathroom',
      subtitle: 'Hairdryer · Hot water · Shampoo · Shower gel',
      cover: '/images/97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg',
    },
    {
      name: 'Gym',
      subtitle: 'Air conditioning · Gym · Exercise equipment · Ceiling fan',
      cover: '/images/9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg',
    },
    {
      name: 'Exterior',
      subtitle: '',
      cover: '/images/23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg',
    },
    {
      name: 'Pool',
      subtitle: 'Pool',
      cover: '/images/8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg',
    },
    {
      name: 'Additional photos',
      subtitle: '',
      cover: '/images/70325367-cbae-4993-b560-18cd3f6edd53.jpeg',
    },
  ] as RoomCategory[],

  // All 43 photos mapped strictly to the 9 reference categories in order
  photos: [
    // === 1. Living room 1 (3 photos) ===
    { id: 'p-1',  url: '/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg', alt: 'Living room with leather sofa, coffee table and oriental rug', room: 'Living room 1' },
    { id: 'p-2',  url: '/images/79addceb-8c2d-419b-80ff-e29af426a94c.jpeg', alt: 'Living room TV credenza with yellow accent wall and ambient lighting', room: 'Living room 1' },
    { id: 'p-3',  url: '/images/f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg', alt: 'Living room perspective towards dining area and kitchen', room: 'Living room 1' },

    // === 2. Living room 2 (7 photos) ===
    { id: 'p-4',  url: '/images/b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg', alt: 'Atrium lounge with wicker armchairs and grey slate feature wall', room: 'Living room 2' },
    { id: 'p-5',  url: '/images/9be71047-fc52-438a-9270-75cb470f6752.jpeg', alt: 'Built-in private jacuzzi hot tub with wooden deck steps', room: 'Living room 2' },
    { id: 'p-6',  url: '/images/cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg', alt: 'Double height atrium courtyard with hot tub and lounge seating', room: 'Living room 2' },
    { id: 'p-7',  url: '/images/2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg', alt: 'Atrium lounge seating next to jacuzzi hot tub', room: 'Living room 2' },
    { id: 'p-8',  url: '/images/34529829-a971-44d3-ac2f-90ea3678a34d.jpeg', alt: 'Atrium dining area with high architectural ceilings and plants', room: 'Living room 2' },
    { id: 'p-9',  url: '/images/dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg', alt: 'Atrium overview showing wooden steps, dining table and skylight', room: 'Living room 2' },
    { id: 'p-10', url: '/images/3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg', alt: 'Atrium dining table with custom built-in concrete bench', room: 'Living room 2' },

    // === 3. Full kitchen (2 photos) ===
    { id: 'p-11', url: '/images/56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg', alt: 'Full kitchen with wooden cabinetry, refrigerator, toaster and induction hob', room: 'Full kitchen' },
    { id: 'p-12', url: '/images/ddc853d7-e658-405c-bedc-8f31106c447e.jpeg', alt: 'Kitchen countertop with cooking basics looking into dining nook', room: 'Full kitchen' },

    // === 4. Bedroom (6 photos) ===
    { id: 'p-13', url: '/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg', alt: 'Bedroom suite with double bed, arched vanity mirror and wardrobe', room: 'Bedroom' },
    { id: 'p-14', url: '/images/1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg', alt: 'Bedroom doorway view looking out into the sunlit atrium', room: 'Bedroom' },
    { id: 'p-15', url: '/images/090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg', alt: 'Double bed with woven rattan headboard and bedside lamp', room: 'Bedroom' },
    { id: 'p-16', url: '/images/153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg', alt: 'Bedroom wardrobe closet with patterned glass panels', room: 'Bedroom' },
    { id: 'p-17', url: '/images/48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg', alt: 'Bedroom closet, mirror and entry door perspective', room: 'Bedroom' },
    { id: 'p-18', url: '/images/3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg', alt: 'Bedroom front view with air conditioning unit and window drapery', room: 'Bedroom' },

    // === 5. Full bathroom (1 photo) ===
    { id: 'p-19', url: '/images/97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg', alt: 'Full bathroom with marble tiles, vessel sink, mirror and walk-in shower', room: 'Full bathroom' },

    // === 6. Gym (5 photos) ===
    { id: 'p-20', url: '/images/9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg', alt: 'Gym with treadmill, elliptical, stationary bike and dumbbell rack', room: 'Gym' },
    { id: 'p-21', url: '/images/246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg', alt: 'Gym multi-function weight machine and exercise ball', room: 'Gym' },
    { id: 'p-22', url: '/images/4fede77d-7a71-446f-89e3-263af937f3fa.jpeg', alt: 'Gym dumbbell rack with adjustable workout bench', room: 'Gym' },
    { id: 'p-23', url: '/images/79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg', alt: 'Gym fitness area with yoga mat and Aerofit multi-station', room: 'Gym' },
    { id: 'p-24', url: '/images/f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg', alt: 'Gym fitness floor with natural daylight through courtyard windows', room: 'Gym' },

    // === 7. Exterior (6 photos) ===
    { id: 'p-25', url: '/images/23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg', alt: 'Aerial drone view of Amor de Goa building surrounded by greenery', room: 'Exterior' },
    { id: 'p-26', url: '/images/5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg', alt: 'Aerial landscape panorama with ocean coastline in the background', room: 'Exterior' },
    { id: 'p-27', url: '/images/5b856fde-a393-41bf-b373-c9d02e64221f.jpeg', alt: 'Amor de Goa building exterior facade with red tiled roof', room: 'Exterior' },
    { id: 'p-28', url: '/images/42befad7-fb29-473d-91db-b03e7a544d1d.jpeg', alt: 'Aerial overhead view of the apartment building complex', room: 'Exterior' },
    { id: 'p-29', url: '/images/608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg', alt: 'Building corner architecture and balconies from high vantage point', room: 'Exterior' },
    { id: 'p-30', url: '/images/0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg', alt: 'Amor de Goa entrance and facade from road level', room: 'Exterior' },

    // === 8. Pool (3 photos) ===
    { id: 'p-31', url: '/images/8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg', alt: 'Central courtyard swimming pool with wooden sun deck from upper balcony', room: 'Pool' },
    { id: 'p-32', url: '/images/929545d3-e241-46c0-8a70-c24531ce7b54.jpeg', alt: 'Swimming pool deck area with Amor de Goa sign', room: 'Pool' },
    { id: 'p-33', url: '/images/fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg', alt: 'Swimming pool viewed from the main courtyard entrance', room: 'Pool' },

    // === 9. Additional photos (10 photos) ===
    { id: 'p-34', url: '/images/70325367-cbae-4993-b560-18cd3f6edd53.jpeg', alt: 'Jacuzzi deck with lounge armchairs and wall sconces', room: 'Additional photos' },
    { id: 'p-35', url: '/images/b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg', alt: 'Outdoor patio lounge with ambient warm lighting', room: 'Additional photos' },
    { id: 'p-36', url: '/images/30ad93b2-293f-494d-b645-626303c6cb93.jpeg', alt: 'Jacuzzi hot tub with wooden deck steps and chair', room: 'Additional photos' },
    { id: 'p-37', url: '/images/9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg', alt: 'Sink vanity counter with Mona Lisa wall art and washing machine', room: 'Additional photos' },
    { id: 'p-38', url: '/images/f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg', alt: 'Atrium lounge view looking across dining area to jacuzzi', room: 'Additional photos' },
    { id: 'p-39', url: '/images/3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg', alt: 'Dining table with decorative wooden cutting boards on wall', room: 'Additional photos' },
    { id: 'p-40', url: '/images/fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg', alt: 'Detail of Mona Lisa painting above wet bar and washing machine', room: 'Additional photos' },
    { id: 'p-41', url: '/images/a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg', alt: 'Living room entertainment center with warm ambient lighting', room: 'Additional photos' },
    { id: 'p-42', url: '/images/862d936c-0f34-4e50-af87-b519e2781d19.jpeg', alt: 'Atrium dining table and wooden cutting boards feature wall', room: 'Additional photos' },
    { id: 'p-43', url: '/images/a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg', alt: 'Bedroom suite with full-length arched gold mirror', room: 'Additional photos' },
  ] as PhotoItem[],

  amenities: [
    { label: 'Fast WiFi',                   icon: 'wifi' },
    { label: 'Private hot tub / Jacuzzi',   icon: 'hottub' },
    { label: 'Outdoor shared swimming pool',icon: 'pool' },
    { label: 'Air conditioning',            icon: 'ac' },
    { label: 'Dedicated gym / fitness',     icon: 'workspace' },
    { label: 'Full kitchen',                icon: 'kitchen' },
    { label: 'Washing machine in unit',     icon: 'washer' },
    { label: '55" HDTV with streaming',     icon: 'tv' },
    { label: 'Free parking on premises',    icon: 'parking' },
    { label: 'Private entrance',            icon: 'entrance' },
    { label: 'Double bed & Bed linen',      icon: 'sofa' },
    { label: 'Walk-in shower & Bathtub',    icon: 'bathtub' },
    { label: 'Self check-in with lockbox',  icon: 'checkin' },
    { label: 'Long-term stays allowed',     icon: 'outdoor' },
    { label: 'Cleaning products & iron',    icon: 'security' },
    { label: 'Hairdryer & toiletries',      icon: 'baby' },
  ],
  reviews: [
    { author: 'Rohan',       avatar: '/images/rev1.jpeg', date: 'October 2024',  text: 'Absolutely stunning property. The private jacuzzi and the double height living space made our stay truly unforgettable!' },
    { author: 'Priya',       avatar: '/images/rev2.jpeg', date: 'November 2024', text: 'A perfect peaceful getaway in Candolim. Sparkling clean, fast wifi, and the courtyard pool was fantastic.' },
    { author: 'Sophie',      avatar: '/images/rev3.jpeg', date: 'December 2024', text: 'Beautiful architecture and thoughtful touches everywhere. Truly a luxury experience close to the beach.' },
    { author: 'Anika',       avatar: '/images/rev4.jpeg', date: 'January 2025',  text: 'Loved our stay here. The gym was very well equipped and having a private jacuzzi inside the apartment was incredible.' },
    { author: 'Marco & Lia', avatar: '/images/rev5.jpeg', date: 'February 2025', text: 'We spent our holiday here and it exceeded all expectations. Exceptional host and amazing apartment!' },
    { author: 'Vikram',      avatar: '/images/rev1.jpeg', date: 'March 2025',    text: 'Great location in Candolim, very secure building with great amenities. Highly recommend!' },
  ],
  ratingCategories: [
    { label: 'Cleanliness',   score: 5.0, icon: '/images/cleanliness.png' },
    { label: 'Accuracy',      score: 4.9, icon: '/images/accuracy.png' },
    { label: 'Hospitality',   score: 5.0, icon: '/images/hospitality.png' },
    { label: 'Indoor Spaces', score: 5.0, icon: '/images/indoor-spaces.png' },
    { label: 'Decor',         score: 5.0, icon: '/images/decor.png' },
    { label: 'Comfort',       score: 4.9, icon: '/images/comfort.png' },
    { label: 'Condition',     score: 4.9, icon: '/images/condition.png' },
    { label: 'Location',      score: 4.9, icon: '/images/location.png' },
  ],
  host: {
    name: 'Mirashya Homes',
    avatar: '/images/host.jpeg',
    joinedYear: 2022,
    isSuperhost: true,
    responseRate: 100,
    responseTime: 'within an hour',
    coHosts: [
      { name: 'Sharath', avatar: '/images/co1.jpg' },
      { name: 'Simran',  avatar: '/images/co2.jpg' },
      { name: 'Shruti',  avatar: null },
    ],
  },
  neighbourhood: {
    description: 'Amor De Goa is situated in Candolim, North Goa — just minutes away from pristine beaches, beach shacks, famous restaurants, and vibrant nightlife while offering a tranquil, secure oasis.',
    highlights: [
      { icon: '🏖️', name: 'Candolim Beach',            distance: '800 m · 3 min drive' },
      { icon: '🏖️', name: 'Calangute Beach',           distance: '2.5 km · 7 min drive' },
      { icon: '🏰', name: 'Aguada Fort',               distance: '4.2 km · 10 min drive' },
      { icon: '🍽️', name: 'Fisherman\'s Wharf',        distance: '1.2 km · 4 min drive' },
      { icon: '✈️', name: 'Mopa International Airport', distance: '30 km · 45 min drive' },
    ],
  },
  houseRules: ['Check-in: 2:00 PM – 10:00 PM', 'Checkout before 11:00 AM', '4 guests maximum', 'No smoking inside'],
  safetyFeatures: ['Smoke alarm', 'Carbon monoxide alarm', 'First aid kit', 'Fire extinguisher', '24/7 Security guard'],
  cancellationPolicy: ['Free cancellation for 48 hours.', 'Cancel before check-in on the day of arrival to get a 50% refund, minus the first night and service fee.'],
};
