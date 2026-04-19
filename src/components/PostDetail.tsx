'use client';

import { useMemo, useState } from 'react';
import MediaCarousel from './MediaCarousel';

type Media = {
  id: string;
  type: 'PHOTO' | 'VIDEO';
  url: string;
  thumbUrl: string | null;
  altText: string | null;
};

type CommentVM = {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; image: string | null };
};

export default function PostDetail({
  post,
  viewerProfileId,
  initiallyLiked,
}: {
  post: {
    id: string;
    caption: string;
    location: string;
    media: Media[];
    tags: string[];
    likeCount: number;
    commentCount: number;
    comments: CommentVM[];
  };
  viewerProfileId: string;
  initiallyLiked: boolean;
}) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');
  const [busy, setBusy] = useState(false);

  const tagLine = useMemo(() => post.tags.map((t) => `#${t}`).join(' '), [post.tags]);

  async function toggleLike() {
    // optimistic UI
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikeCount((c) => c + (nextLiked ? 1 : -1));

    const res = await fetch(`/api/posts/${post.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId: viewerProfileId }),
    });

    if (!res.ok) {
      // rollback on failure
      setLiked(!nextLiked);
      setLikeCount((c) => c + (nextLiked ? -1 : 1));
      alert('Like failed');
      return;
    }

    const data = await res.json();
    setLiked(data.liked);
    setLikeCount(data.likeCount);
  }

  async function addComment() {
    const body = commentText.trim();
    if (!body) return;

    setBusy(true);
    try {
      const res = await fetch(`/api/posts/${post.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: viewerProfileId, body }),
      });

      if (!res.ok) throw new Error('Comment failed');

      const data = await res.json();
      setComments((prev) => [data.comment, ...prev]);
      setCommentText('');
    } catch {
      alert('Comment failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <MediaCarousel media={post.media} />

      <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={toggleLike}
            style={{
              borderRadius: 999,
              padding: '8px 12px',
              border: '1px solid #ddd',
              background: liked ? 'black' : 'white',
              color: liked ? 'white' : 'black',
              cursor: 'pointer',
            }}
          >
            {liked ? '♥ Liked' : '♡ Like'}
          </button>

          <div style={{ color: '#444' }}>
            <b>{likeCount}</b> likes · <b>{comments.length}</b> comments
          </div>
        </div>

        {post.caption ? <div style={{ fontSize: 15, lineHeight: 1.4 }}>{post.caption}</div> : null}

        {tagLine ? <div style={{ color: '#666', fontSize: 14 }}>{tagLine}</div> : null}

        <div style={{ display: 'grid', gap: 8, marginTop: 6 }}>
          <div style={{ fontWeight: 700 }}>Comments</div>

          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment…"
              style={{
                flex: 1,
                border: '1px solid #ddd',
                borderRadius: 10,
                padding: '10px 12px',
              }}
            />
            <button
              disabled={busy}
              onClick={addComment}
              style={{
                borderRadius: 10,
                padding: '10px 12px',
                border: '1px solid #ddd',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Post
            </button>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {comments.map((c) => (
              <div key={c.id} style={{ display: 'flex', gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: '#eee',
                    overflow: 'hidden',
                    flex: '0 0 auto',
                  }}
                >
                  {c.author.image ? (
                    <img
                      src={c.author.image}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : null}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>
                    <b>{c.author.name}</b> <span style={{ color: '#555' }}>{c.body}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
