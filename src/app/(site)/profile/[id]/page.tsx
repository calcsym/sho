import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const posts = await prisma.post.findMany({
    where: { profileId: params.id },
    orderBy: { createdAt: 'desc' },
    include: { media: { orderBy: { sortOrder: 'asc' } } },
  });

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      {posts.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: 12 }}>
          {p.caption ? <p>{p.caption}</p> : null}

          <div style={{ display: 'grid', gap: 8 }}>
            {p.media.map((m) =>
              m.type === 'PHOTO' ? (
                // Next/Image is recommended; using <img> for simplicity
                <img key={m.id} src={m.url} alt={m.altText ?? ''} style={{ maxWidth: '100%' }} />
              ) : (
                <video key={m.id} src={m.url} controls style={{ maxWidth: '100%' }} />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
