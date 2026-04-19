import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: "Missing file" }), {
      status: 400,
    });
  }

  // Convert File -> base64 data URI (simple approach)
  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const isVideo = file.type.startsWith("video/");
  const resource_type = isVideo ? "video" : "image";

  const uploaded = await cloudinary.uploader.upload(dataUri, {
    resource_type,
    folder: "showport",
  });

  // Cloudinary returns secure_url; for images you can also create transformations for thumbs
  return Response.json({
    url: uploaded.secure_url,
    mimeType: file.type,
    resourceType: resource_type,
    width: uploaded.width ?? null,
    height: uploaded.height ?? null,
    durationSec: uploaded.duration ?? null,
  });
}
