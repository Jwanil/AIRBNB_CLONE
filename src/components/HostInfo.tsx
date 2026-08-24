import Image from 'next/image';

export default function HostInfo({ host }: { host: any }) {
  const yearsHosting = new Date().getFullYear() - host.joinedYear;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ position: 'relative', width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
        <Image src={host.avatar} alt={host.name} fill unoptimized style={{ objectFit: 'cover' }} />
      </div>
      <div>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#222222' }}>Hosted by {host.name}</div>
        <div style={{ fontSize: 14, color: '#717171', marginTop: 2 }}>
          {yearsHosting} year{yearsHosting !== 1 ? 's' : ''} hosting
        </div>
      </div>
    </div>
  );
}
