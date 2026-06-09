import React from 'react';

export default function MediaGrid({ items = [] }) {
  return (
    <div style={styles.grid}>
      {items.map((it) => (
        <button key={it.id} style={styles.tile} type="button">
          <img src={it.src} alt={it.alt ?? ''} loading="lazy" style={styles.img} />
        </button>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 10,
  },
  tile: {
    border: 0,
    padding: 0,
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: 14,
    overflow: 'hidden',
    aspectRatio: '1 / 1', // key: square tiles
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
};
