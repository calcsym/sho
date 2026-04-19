import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ postId: string }> },
) {
  const { postId } = await context.params;

  const body = await request.json().catch(() => ({}));
  const profileId = body?.profileId ? String(body.profileId) : "";

  if (!profileId) {
    return new Response(JSON.stringify({ error: "Missing profileId" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const existingCount = await prisma.like.count({
    where: { postId, profileId },
  });

  if (existingCount === 0) {
    await prisma.like.create({
      data: { postId, profileId },
    });
  }

  return new Response(JSON.stringify({ liked: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ postId: string }> },
) {
  const { postId } = await context.params;

  const body = await request.json().catch(() => ({}));
  const profileId = body?.profileId ? String(body.profileId) : "";

  if (!profileId) {
    return new Response(JSON.stringify({ error: "Missing profileId" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  await prisma.like.deleteMany({
    where: { postId, profileId },
  });

  return new Response(null, { status: 204 });
}
