'use client';

import { useMemo, useState } from 'react';

type Media = {
  id: string;
  type: 'PHOTO' | 'VIDEO';
  url: string;
  thumbUrl: string | null;
  altText: string | null;
};

export default function MediaCarousel({ media }: { media: Media[] }) {
  const [i, setI] = useState(0);
  const item = media[i];

  const dots = useMemo(() => media.length > 1, [media.length]);

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 10',
          borderRadius: 14,
          overflow: 'hidden',
          background: '#0b0b0b',
        }}
      >
        {item.type === 'PHOTO' ? (
          <img
            src={item.url}
            alt={item.altText ?? ''}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <video
            src={item.url}
            controls
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}

        {media.length > 1 ? (
          <>
            <button
              onClick={() => setI((x) => Math.max(0, x - 1))}
              disabled={i === 0}
              style={navBtn('left')}
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => setI((x) => Math.min(media.length - 1, x + 1))}
              disabled={i === media.length - 1}
              style={navBtn('right')}
              aria-label="Next"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {dots ? (
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {media.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setI(idx)}
              aria-label={`Go to item ${idx + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                border: 0,
                background: idx === i ? '#111' : '#ddd',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function navBtn(side: 'left' | 'right') {
  return {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    [side]: 10,
    width: 40,
    height: 40,
    borderRadius: 999,
    border: 0,
    background: 'rgba(0,0,0,0.55)',
    color: 'white',
    fontSize: 28,
    cursor: 'pointer',
  };
}
