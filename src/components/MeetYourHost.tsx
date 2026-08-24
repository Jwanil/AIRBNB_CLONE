'use client';
import Image from 'next/image';
import AirbnbIcon from './AirbnbIcon';


export default function MeetYourHost({ host }: { host: any }) {
  const yearsHosting = new Date().getFullYear() - host.joinedYear;

  const coHosts = [
    { name: 'Sharath', avatar: '/images/co1.jpg' },
    { name: 'Aman Dev Pahwa', avatar: '/images/co2.jpg' },
    { name: 'Maria Karen Priyanka', avatar: '/images/co3.jpg' },
    { name: 'Simran', avatar: '/images/rev5.jpeg' },
    { name: 'Pallavi', avatar: '/images/rev1.jpeg' },
    { name: 'Sanyukta', avatar: '/images/rev2.jpeg' },
    { name: 'Shruti', initial: 'S', bg: '#FCE4EC', color: '#D81B60' },
    { name: 'Amisha', initial: 'A', bg: '#E3F2FD', color: '#1976D2' },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 24px' }}>Meet your host</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 48, alignItems: 'flex-start' }}>
        {/* LEFT: profile card */}
        <div>
          {/* Card: avatar LEFT, stats RIGHT */}
          <div style={{ border: '1px solid #DDDDDD', borderRadius: 24, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              {/* Avatar + name + title */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden' }}>
                    <Image src={host.avatar} alt={host.name} width={88} height={88} unoptimized style={{ objectFit: 'cover' }} />
                  </div>
                  {/* Verified badge */}
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, backgroundColor: '#FF385C', borderRadius: '50%', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AirbnbIcon name="image (26).svg" size={16} />
                  </div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#222222', textAlign: 'center', lineHeight: 1.2 }}>{host.name}</div>
                <div style={{ fontSize: 13, color: '#717171', marginTop: 4 }}>Host</div>
              </div>

              {/* Stats: stacked vertically on the right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#222222' }}>1,463</div>
                  <div style={{ fontSize: 13, color: '#717171' }}>Reviews</div>
                </div>
                <div style={{ height: 1, backgroundColor: '#EBEBEB' }} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#222222', display: 'flex', alignItems: 'center', gap: 4 }}>
                    4.68
                    <AirbnbIcon name="image (7).svg" size={14} color="#222222" />
                  </div>
                  <div style={{ fontSize: 13, color: '#717171' }}>Rating</div>
                </div>
                <div style={{ height: 1, backgroundColor: '#EBEBEB' }} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#222222' }}>{yearsHosting}</div>
                  <div style={{ fontSize: 13, color: '#717171' }}>Years hosting</div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal details below card */}
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#222' }}>
              <AirbnbIcon name="image (35).svg" size={20} color="#222222" />
              Born in the 80s
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#222' }}>
              <AirbnbIcon name="image (36).svg" size={20} color="#222222" />
              Where I went to school: NICMAR GOA
            </div>
          </div>
        </div>

        {/* RIGHT: co-hosts + host details */}
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 500, color: '#222222', margin: '0 0 16px', letterSpacing: -0.2 }}>
            Co-Hosts
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px 16px', marginBottom: 36 }}>
            {coHosts.map((ch, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    position: 'relative',
                    backgroundColor: ch.bg || '#DDDDDD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {ch.avatar ? (
                    <Image src={ch.avatar} alt={ch.name} fill unoptimized style={{ objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontWeight: 500, fontSize: 14, color: ch.color || '#717171' }}>
                      {ch.initial}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 14, color: '#222222' }}>{ch.name}</span>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 500, color: '#222222', margin: '0 0 12px' }}>Host details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 15, color: '#222222', marginBottom: 24 }}>
            <div>Response rate: {host.responseRate}%</div>
            <div>Responds {host.responseTime}</div>
          </div>

          <button style={{ border: '1px solid #222222', borderRadius: 8, padding: '13px 24px', fontSize: 15, fontWeight: 500, background: 'none', cursor: 'pointer', fontFamily: 'inherit', color: '#222222', marginBottom: 24 }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}>
            Message host
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#717171', lineHeight: 1.5 }}>
            <div style={{ width: 18, height: 18, flexShrink: 0, marginTop: 1 }}>
              <AirbnbIcon name="image (37).svg" size={18} color="#717171" />
            </div>
            To help protect your payment, always use Airbnb to send money and communicate with hosts.
          </div>
        </div>
      </div>
    </div>
  );
}
