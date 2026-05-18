import { prisma } from "@/lib/prisma";
import MediaGrid from "@/components/MediaGrid";

export default async function ProfileGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const media = await prisma.postMedia.findMany({
    where: { post: { profileId: id } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      url: true,
      thumbUrl: true,
      width: true,
      height: true,
      durationSec: true,
      altText: true,
      postId: true,
    },
  });

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
        Gallery
      </h1>
      <MediaGrid items={media ?? []} />
    </div>
  );
}
