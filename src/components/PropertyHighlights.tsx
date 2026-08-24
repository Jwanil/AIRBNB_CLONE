import AirbnbIcon from './AirbnbIcon';

const highlights = [
  {
    iconKey: 'image (8).svg',
    title: 'Outdoor entertainment',
    subtitle: 'The pool and alfresco dining area are great for summer trips.',
  },
  {
    iconKey: 'image (9).svg',
    title: 'Designed for staying cool',
    subtitle: 'Beat the heat with the A/C and ceiling fan.',
  },
  {
    iconKey: 'image (10).svg',
    title: 'Self check-in',
    subtitle: 'Check yourself in with the smart lock.',
  },
];

export default function PropertyHighlights() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {highlights.map((h, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AirbnbIcon name={h.iconKey} size={28} color="#222222" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#222222', marginBottom: 4 }}>{h.title}</div>
            <div style={{ fontSize: 13, color: '#717171', lineHeight: 1.5 }}>{h.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
