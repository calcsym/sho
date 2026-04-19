import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ postId: string }> },
) {
  const { postId } = await context.params;

  const body = await request.json().catch(() => ({}));
  const text = String(body?.text ?? "").trim();
  const profileId = body?.profileId ? String(body.profileId) : "";

  if (!text) {
    return new Response(JSON.stringify({ error: "Missing text" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (!profileId) {
    return new Response(JSON.stringify({ error: "Missing profileId" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  const comment = await prisma.comment.create({
    data: {
      postId,
      profileId, // ✅ required
      body: text,
    },
  });

  return new Response(JSON.stringify({ comment }), {
    status: 201,
    headers: { "content-type": "application/json" },
  });
}
