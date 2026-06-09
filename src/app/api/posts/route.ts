import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

type MediaInput = {
  url: string;
  type: 'PHOTO' | 'VIDEO';
  thumbUrl?: string | null;
  width?: number | null;
  height?: number | null;
  durationSec?: number | null;
  mimeType?: string | null;
  altText?: string | null;
  sortOrder?: number;
};

export async function POST(req: Request) {
  const body = await req.json();

  // You’ll replace this with your real auth user/profile lookup
  const profileId = body.profileId as string;

  const caption = (body.caption ?? null) as string | null;
  const location = (body.location ?? null) as string | null;
  const media = (body.media ?? []) as MediaInput[];

  if (!profileId) return Response.json({ error: 'Missing profileId' }, { status: 400 });
  if (media.length === 0) return Response.json({ error: 'Missing media' }, { status: 400 });

  const post = await prisma.post.create({
    data: {
      profileId,
      caption,
      location,
      publishedAt: new Date(),
      media: {
        create: media.map((m, i) => ({
          url: m.url,
          type: m.type,
          thumbUrl: m.thumbUrl ?? null,
          width: m.width ?? null,
          height: m.height ?? null,
          durationSec: m.durationSec ?? null,
          mimeType: m.mimeType ?? null,
          altText: m.altText ?? null,
          sortOrder: m.sortOrder ?? i,
        })),
      },
    },
    include: { media: true },
  });

  return Response.json(post);
}
