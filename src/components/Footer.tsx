export default function Footer() {
  const links = ['Privacy', 'Terms', 'Sitemap', 'Company details'];
  return (
    <footer style={{ borderTop: '1px solid #DDDDDD', marginTop: 40, padding: '24px', backgroundColor: '#F7F7F7' }}>
      <div style={{ maxWidth: 1150, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontSize: 14, color: '#717171' }}>© 2026 Airbnb, Inc.</span>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {links.map(l => (
            <a key={l} href="#" style={{ fontSize: 14, color: '#222', textDecoration: 'underline' }}>{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
