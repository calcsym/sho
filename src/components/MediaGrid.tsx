"use client";

import { useMemo, useState } from "react";
import MediaLightbox from "./MediaLightbox";
import Link from "next/link";

type MediaItem = {
  id: string;
  type: "PHOTO" | "VIDEO";
  url: string;
  thumbUrl: string | null;
  width: number | null;
  height: number | null;
  durationSec: number | null;
  altText: string | null;
  postId: string;
};

export default function MediaGrid({ items = [] }: { items?: MediaItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeIndex = useMemo(() => {
    if (!activeId) return -1;
    return items.findIndex((x) => x.id === activeId);
  }, [activeId, items]);

  if (!items.length) {
    return <div style={{ opacity: 0.7 }}>No posts yet.</div>;
  }

  return (
    <>
      <div className="ig-grid">
        {items.map((m) => (
          <Link key={m.id} href={`/p/${m.postId}`} className="ig-tile">
            <div className="ig-box">
              {m.type === "PHOTO" ? (
                <img
                  src={m.url}
                  alt={m.altText ?? ""}
                  className="ig-media"
                  loading="lazy"
                />
              ) : (
                <img
                  src={m.thumbUrl ?? m.url}
                  alt={m.altText ?? ""}
                  className="ig-media"
                  loading="lazy"
                />
              )}

              <div className="ig-hover" />

              {m.type === "VIDEO" && <div className="ig-videoBadge">▶</div>}
            </div>
          </Link>
        ))}
      </div>

      {activeId && activeIndex >= 0 ? (
        <MediaLightbox
          items={items}
          index={activeIndex}
          onClose={() => setActiveId(null)}
          onNavigate={(nextIndex) => setActiveId(items[nextIndex]?.id ?? null)}
        />
      ) : null}

      {
        <style jsx>{`
          .ig-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 6px;
          }
          .ig-tile {
            text-decoration: none;
          }
          .ig-box {
            position: relative;
            width: 100%;
            aspect-ratio: 1 / 1;
            overflow: hidden;
            border-radius: 10px;
            background: #0b0b0b;
          }
          .ig-media {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1);
            transition: transform 180ms ease;
          }
          .ig-hover {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0);
            transition: background 180ms ease;
          }
          .ig-box:hover .ig-media {
            transform: scale(1.04);
          }
          .ig-box:hover .ig-hover {
            background: rgba(0, 0, 0, 0.18);
          }
          .ig-videoBadge {
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 6px 8px;
            border-radius: 999px;
            background: rgba(0, 0, 0, 0.55);
            color: white;
            font-size: 12px;
          }
        `}</style>
      }
    </>
  );
}

/*
<button key={m.id} className="ig-tile" onClick={() => setActiveId(m.id)}>
            <div className="ig-box">
              {m.type === 'PHOTO' ? (
                <img src={m.url} alt={m.altText ?? ''} className="ig-media" loading="lazy" />
              ) : (
                <img
                  src={m.thumbUrl || m.url}
                  alt={m.altText ?? ''}
                  className="ig-media"
                  loading="lazy"
                />
              )}

              <div className="ig-hover" />

              {m.type === 'VIDEO' ? <div className="ig-videoBadge">▶</div> : null}
            </div> 
</button>
*/

// @ts-ignore
/*import g1 from '../assets/grid-1.jpg';
// @ts-ignore
import g2 from '../assets/grid-2.jpg';
// @ts-ignore
import g3 from '../assets/grid-3.jpg';

const items = [
  { id: 1, img: g1, badge: 'pin' },
  { id: 2, img: g2, badge: 'copy' },
  { id: 3, img: g3, badge: 'copy' },
  { id: 4, img: g1, badge: 'copy' },
  { id: 5, img: g2, badge: 'copy' },
  { id: 6, img: g3, badge: 'copy' },
];

export default function MediaGrid() {
  return (
    <section className="gridWrap">
      <div className="tabRow">
        <button className="tab active" aria-label="Grid">
          ▦
        </button>
        <button className="tab" aria-label="Reels">
          ▶
        </button>
        <button className="tab" aria-label="Tagged">
          👤
        </button>
      </div>

      <div className="grid">
        {items.map((it) => (
          <div key={it.id} className="gridItem">
            <img className="gridImg" src={it.img} alt={`post-${it.id}`} />
            <div className="gridBadge" title={it.badge}>
              {it.badge === 'pin' ? '📌' : '▢'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
*/
