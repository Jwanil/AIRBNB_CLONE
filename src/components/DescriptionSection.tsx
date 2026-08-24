'use client';
import { useState } from 'react';

export default function DescriptionSection({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = description.split('\n\n').filter(Boolean);
  const firstParagraph = paragraphs[0];
  const rest = paragraphs.slice(1).join('\n\n');
  const short = firstParagraph.slice(0, 300);
  const hasMore = firstParagraph.length > 300 || paragraphs.length > 1;

  return (
    <div>
      {/* "Automatically translated" notice */}
      <div style={{ backgroundColor: '#F7F7F7', borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#222' }}>
        Some info has been automatically translated.{' '}
        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: '#222', textDecoration: 'underline' }}>
          Show original
        </button>
      </div>

      <div style={{ fontSize: 15, color: '#222', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
        {expanded ? description : (hasMore ? short + '…' : firstParagraph)}
      </div>

      {hasMore && (
        <button onClick={() => setExpanded(e => !e)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 12, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, color: '#222', textDecoration: 'underline' }}>
          {expanded ? 'Show less' : 'Show more'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} strokeLinecap="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}
    </div>
  );
}
