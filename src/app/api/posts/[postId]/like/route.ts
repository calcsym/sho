import { prisma } from '@/lib/prisma';

export async function POST(req: Request, ctx: { params: { postId: string } }) {
  const { postId } = ctx.params;
  const body = await req.json();
  const profileId = body.profileId as string;

  if (!profileId) return Response.json({ error: 'Missing profileId' }, { status: 400 });

  const existing = await prisma.like.findUnique({
    where: { profileId_postId: { profileId, postId } },
  });

  if (existing) {
    await prisma.like.delete({
      where: { profileId_postId: { profileId, postId } },
    });
  } else {
    await prisma.like.create({
      data: { profileId, postId },
    });
  }

  const likeCount = await prisma.like.count({ where: { postId } });

  return Response.json({ liked: !existing, likeCount });
}
