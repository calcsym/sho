'use client';

import { useState } from 'react';

export default function CreatePost({ profileId }: { profileId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState('');
  const [busy, setBusy] = useState(false);

  async function uploadOne(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Upload failed');
    return res.json() as Promise<{
      url: string;
      mimeType: string;
      width: number | null;
      height: number | null;
      durationSec: number | null;
    }>;
  }

  async function onSubmit() {
    setBusy(true);
    try {
      const uploaded = await Promise.all(files.map(uploadOne));

      const media = uploaded.map((u, i) => ({
        url: u.url,
        type: u.mimeType.startsWith('video/') ? 'VIDEO' : 'PHOTO',
        mimeType: u.mimeType,
        width: u.width,
        height: u.height,
        durationSec: u.durationSec,
        sortOrder: i,
      }));

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, caption, media }),
      });

      if (!res.ok) throw new Error('Create post failed');
      setFiles([]);
      setCaption('');
      alert('Posted!');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
      />
      <textarea
        placeholder="Caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button disabled={busy || files.length === 0} onClick={onSubmit}>
        {busy ? 'Uploading...' : 'Post'}
      </button>
    </div>
  );
}
