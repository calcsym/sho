import { prisma } from '@/lib/prisma';

export async function POST(req: Request, ctx: { params: { postId: string } }) {
  const { postId } = ctx.params;
  const { profileId, body } = (await req.json()) as {
    profileId: string;
    body: string;
  };

  if (!profileId) return Response.json({ error: 'Missing profileId' }, { status: 400 });
  if (!body?.trim()) return Response.json({ error: 'Empty comment' }, { status: 400 });

  const c = await prisma.comment.create({
    data: { postId, profileId, body: body.trim() },
    include: {
      profile: { select: { id: true, name: true, image: true } },
    },
  });

  return Response.json({
    comment: {
      id: c.id,
      body: c.body,
      createdAt: c.createdAt.toISOString(),
      author: {
        id: c.profile.id,
        name: c.profile.name ?? 'NO_NAME',
        image: c.profile.image ?? null,
      },
    },
  });
}
