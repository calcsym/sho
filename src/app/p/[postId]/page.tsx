import { prisma } from "@/lib/prisma";
import PostDetail from "@/components/PostDetail";

export default async function PostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: {
      media: true,
      tags: { include: { tag: true } },
      _count: { select: { likes: true, comments: true } },
      comments: { include: { profile: true } },
    },
  });

  if (!post) return null;

  return (
    <PostDetail
      post={{
        id: post.id,
        caption: post.caption ?? "",
        location: post.location ?? "",
        media: post.media.map((m: NonNullable<typeof post.media>[number]) => ({
          id: m.id,
          url: m.url,
          type: m.type as "PHOTO" | "VIDEO",
          thumbUrl: m.thumbUrl ?? "",
          altText: m.altText ?? "",
        })),
        tags: post.tags.map((pt: { tag: { name: string } }) => pt.tag.name),
        likeCount: post._count.likes,
        commentCount: post._count.comments,
        comments: post.comments.map(
          (c: NonNullable<typeof post.comments>[number]) => ({
            id: c.id,
            body: c.body,
            createdAt: c.createdAt.toISOString(),
            author: {
              id: c.profile.id,
              name: c.profile.name ?? "",
              image: c.profile.logoUrl ?? null,
            },
          }),
        ),
      }}
      viewerProfileId=""
      initiallyLiked={false}
    />
  );
}
