import Image from 'next/image';

const sleepingSpaces = [
  {
    label: 'Bedroom',
    beds: '1 double bed',
    image: '/images/67c61c6f-6260-4809-9510-0360e58a345d.jpeg',
  },
  {
    label: 'Living room',
    beds: '1 sofa',
    image: '/images/a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg',
  },
];

export default function SleepingArrangements() {
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 24px', letterSpacing: -0.2 }}>
        Where you&apos;ll sleep
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {sleepingSpaces.map((room, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Room Photo without outer container border */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3 / 2',
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
              }}
            >
              <Image src={room.image} alt={room.label} fill unoptimized style={{ objectFit: 'cover' }} />
            </div>

            {/* Room Info */}
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 500, fontSize: 16, color: '#222222', marginBottom: 2 }}>
                {room.label}
              </div>
              <div style={{ fontSize: 14, color: '#717171' }}>{room.beds}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
