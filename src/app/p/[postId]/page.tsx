import { prisma } from '@/lib/prisma';
import PostDetail from '@/components/PostDetail';

export default async function PostPage({ params }: { params: { postId: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: {
      media: { orderBy: { sortOrder: 'asc' } },
      tags: { include: { tag: true } }, // PostTag -> Tag
      _count: { select: { likes: true, comments: true } },
      comments: {
        orderBy: { createdAt: 'desc' },
        include: {
          profile: { select: { id: true, name: true, image: true } },
        },
        take: 50,
      },
    },
  });

  if (!post) return <div style={{ padding: 16 }}>Post not found.</div>;

  // TEMP (until you hook up auth):
  // replace with session user/profile lookup later
  const viewerProfileId = post.profileId; // for now: owner can like their own post

  const liked = await prisma.like.findUnique({
    where: { profileId_postId: { profileId: viewerProfileId, postId: post.id } },
  });

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: 16 }}>
      <PostDetail
        post={{
          id: post.id,
          caption: post.caption ?? '',
          location: post.location ?? '',
          media: post.media,
          tags: post.tags.map((pt) => pt.tag.name),
          likeCount: post._count.likes,
          commentCount: post._count.comments,
          comments: post.comments.map((c) => ({
            id: c.id,
            body: c.body,
            createdAt: c.createdAt.toISOString(),
            author: {
              id: c.profile.id,
              name: c.profile.name ?? 'NO_NAME',
              image: c.profile.image ?? null,
            },
          })),
        }}
        viewerProfileId={viewerProfileId}
        initiallyLiked={!!liked}
      />
    </div>
  );
}
