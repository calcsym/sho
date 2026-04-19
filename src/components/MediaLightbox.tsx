'use client';

import { useEffect } from 'react';

type MediaItem = {
  id: string;
  type: 'PHOTO' | 'VIDEO';
  url: string;
  thumbUrl: string | null;
  altText: string | null;
};

export default function MediaLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const item = items[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(Math.max(0, index - 1));
      if (e.key === 'ArrowRight') onNavigate(Math.min(items.length - 1, index + 1));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <>
      <div className="lb-backdrop" onClick={onClose} />
      <div className="lb-modal" role="dialog" aria-modal="true">
        <button className="lb-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <button
          className="lb-nav lb-left"
          onClick={() => onNavigate(Math.max(0, index - 1))}
          disabled={index === 0}
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          className="lb-nav lb-right"
          onClick={() => onNavigate(Math.min(items.length - 1, index + 1))}
          disabled={index === items.length - 1}
          aria-label="Next"
        >
          ›
        </button>

        <div className="lb-content">
          {item.type === 'PHOTO' ? (
            <img src={item.url} alt={item.altText ?? ''} className="lb-img" />
          ) : (
            <video src={item.url} controls autoPlay className="lb-video" />
          )}
        </div>
      </div>

      <style jsx>{`
        .lb-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 50;
        }
        .lb-modal {
          position: fixed;
          inset: 0;
          display: grid;
          place-items: center;
          z-index: 60;
          padding: 16px;
        }
        .lb-content {
          width: min(980px, 96vw);
          height: min(760px, 86vh);
          background: rgba(12, 12, 12, 0.95);
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          display: grid;
          place-items: center;
        }
        .lb-img,
        .lb-video {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: black;
        }
        .lb-close {
          position: fixed;
          top: 14px;
          right: 18px;
          z-index: 70;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          border: 0;
          background: rgba(0, 0, 0, 0.55);
          color: white;
          font-size: 28px;
          cursor: pointer;
        }
        .lb-nav {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 70;
          width: 44px;
          height: 44px;
          border-radius: 999px;
          border: 0;
          background: rgba(0, 0, 0, 0.55);
          color: white;
          font-size: 28px;
          cursor: pointer;
        }
        .lb-nav:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .lb-left {
          left: 18px;
        }
        .lb-right {
          right: 18px;
        }
      `}</style>
    </>
  );
}
